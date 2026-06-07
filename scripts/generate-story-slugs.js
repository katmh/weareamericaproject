#!/usr/bin/env node

const API_VERSION = "2023-08-01";
const DEFAULT_PROJECT_ID = "nr9digz2";
const DEFAULT_DATASET = "production";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const isVerbose = args.has("--verbose");
const shouldPrintRedirects = args.has("--redirects") || isVerbose;
const projectId = process.env.SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || DEFAULT_DATASET;
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function getLegacyStorySlug(storyTitle, authorFirstName) {
  const truncatedStoryTitle = storyTitle
    .split(" ")
    .slice(0, 4)
    .join(" ");
  const firstLetterOfName = authorFirstName[0];
  return slugify(`${truncatedStoryTitle}-${firstLetterOfName}`);
}

function normalizeStorySlug(slug) {
  return slug.replace(/^\/+/, "").replace(/^story\//, "").replace(/\/+$/, "");
}

function storyYear(story) {
  return new Date(story._createdAt).getUTCFullYear();
}

function baseSlug(story) {
  const titleSlug = slugify(story.storyTitle) || "untitled-story";
  return `${storyYear(story)}/${titleSlug}`;
}

async function sanityQuery(query) {
  const url = new URL(
    `https://${projectId}.api.sanity.io/v${API_VERSION}/data/query/${dataset}`
  );
  url.searchParams.set("query", query);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(
      `Sanity query failed: ${data.error?.description || response.statusText}`
    );
  }

  return data.result;
}

async function sanityMutate(mutations) {
  if (!token) {
    throw new Error(
      "Missing SANITY_WRITE_TOKEN or SANITY_AUTH_TOKEN for --write."
    );
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${API_VERSION}/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mutations })
    }
  );
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(
      `Sanity mutation failed: ${data.error?.description || response.statusText}`
    );
  }

  return data;
}

function assignCanonicalSlugs(stories) {
  const groups = new Map();

  for (const story of stories) {
    const base = baseSlug(story);
    groups.set(base, [...(groups.get(base) || []), story]);
  }

  const assignments = [];

  for (const [base, group] of groups) {
    const sorted = group.sort((a, b) => {
      if (a._createdAt === b._createdAt) {
        return a._id.localeCompare(b._id);
      }
      return a._createdAt.localeCompare(b._createdAt);
    });

    sorted.forEach((story, index) => {
      assignments.push({
        ...story,
        canonicalSlug: index === 0 ? base : `${base}-${index + 1}`,
        hadCanonicalCollision: sorted.length > 1
      });
    });
  }

  return assignments.sort((a, b) => a.canonicalSlug.localeCompare(b.canonicalSlug));
}

function getRedirects(assignments) {
  const legacyGroups = new Map();

  for (const story of assignments) {
    const legacyPath = `/story/${getLegacyStorySlug(
      story.storyTitle,
      story.authorFirstName
    )}/`;
    legacyGroups.set(legacyPath, [...(legacyGroups.get(legacyPath) || []), story]);
  }

  const redirects = [];
  const ambiguous = [];

  for (const [legacyPath, stories] of legacyGroups) {
    if (stories.length > 1) {
      ambiguous.push({ legacyPath, stories });
      continue;
    }

    const story = stories[0];
    const canonicalPath = `/story/${story.canonicalSlug}/`;

    if (legacyPath !== canonicalPath) {
      redirects.push(`${legacyPath}  ${canonicalPath}  301!`);
    }
  }

  return { redirects: redirects.sort(), ambiguous };
}

function printReport(assignments) {
  const changes = assignments.filter(
    story => normalizeStorySlug(story.slug || "") !== story.canonicalSlug
  );
  const collisions = assignments.filter(story => story.hadCanonicalCollision);
  const { redirects, ambiguous } = getRedirects(assignments);

  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Stories: ${assignments.length}`);
  console.log(`Slug updates needed: ${changes.length}`);
  console.log(`Canonical collisions needing suffixes: ${collisions.length}`);
  console.log(`Safe legacy redirects: ${redirects.length}`);
  console.log(`Ambiguous legacy redirects skipped: ${ambiguous.length}`);

  if (collisions.length) {
    console.log("\nCanonical collision suffixes:");
    for (const story of collisions) {
      console.log(
        `- ${story.canonicalSlug}: ${story.storyTitle} (${story.authorFirstName}, ${story._id})`
      );
    }
  }

  if (changes.length) {
    const visibleChanges = isVerbose ? changes : changes.slice(0, 25);
    console.log("\nSlug updates:");
    for (const story of visibleChanges) {
      console.log(
        `- ${story._id}: ${story.slug || "(empty)"} -> ${story.canonicalSlug}`
      );
    }
    if (!isVerbose && changes.length > visibleChanges.length) {
      console.log(
        `...and ${changes.length - visibleChanges.length} more. Re-run with --verbose to show every update.`
      );
    }
  }

  if (redirects.length && shouldPrintRedirects) {
    console.log("\nRedirects to add to web/static/_redirects:");
    console.log(redirects.join("\n"));
  } else if (redirects.length) {
    console.log(
      "\nRe-run with --redirects to print safe redirects for web/static/_redirects."
    );
  }

  if (ambiguous.length) {
    console.log("\nAmbiguous legacy redirects skipped:");
    for (const { legacyPath, stories } of ambiguous) {
      console.log(`- ${legacyPath}`);
      for (const story of stories) {
        console.log(`  - /story/${story.canonicalSlug}/ (${story._id})`);
      }
    }
  }
}

async function main() {
  const stories = await sanityQuery(`*[
    _type == "story" &&
    isHidden != true &&
    defined(storyTitle) &&
    defined(authorFirstName) &&
    defined(_createdAt)
  ] | order(_createdAt asc, _id asc) {
    _id,
    _createdAt,
    authorFirstName,
    storyTitle,
    slug
  }`);

  const assignments = assignCanonicalSlugs(stories);
  printReport(assignments);

  if (!shouldWrite) {
    console.log("\nDry run only. Re-run with --write to patch Sanity slugs.");
    return;
  }

  const mutations = assignments
    .filter(story => normalizeStorySlug(story.slug || "") !== story.canonicalSlug)
    .map(story => ({
      patch: {
        id: story._id,
        set: {
          slug: story.canonicalSlug
        }
      }
    }));

  if (!mutations.length) {
    console.log("\nNo Sanity slug updates needed.");
    return;
  }

  await sanityMutate(mutations);
  console.log(`\nPatched ${mutations.length} Sanity story slugs.`);
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
