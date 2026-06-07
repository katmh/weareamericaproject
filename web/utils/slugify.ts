export function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function getLegacyStorySlug(storyTitle, authorFirstName) {
  const truncatedStoryTitle = storyTitle
    .split(" ")
    .slice(0, 4)
    .join(" ");
  const firstLetterOfName = authorFirstName[0];
  return slugify(`${truncatedStoryTitle}-${firstLetterOfName}`);
}

export const getStorySlug = getLegacyStorySlug;

export function normalizeStorySlug(slug) {
  return slug.replace(/^\/+/, "").replace(/^story\//, "").replace(/\/+$/, "");
}

export function getStoryPath({ slug, storyTitle, authorFirstName }) {
  const storySlug = slug
    ? normalizeStorySlug(slug)
    : getLegacyStorySlug(storyTitle, authorFirstName);

  return `/story/${storySlug}`;
}

export function getTagSlug(tag) {
  return slugify(tag);
}
