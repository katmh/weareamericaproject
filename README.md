# We Are America Project

Website for We Are America ([weareamericaproject.com](https://www.weareamericaproject.com)), a storytelling project with 1300+ students and teachers from 28 states, sparking a national conversation about what it means to be American. Built with Gatsby and Netlify CMS and hosted on Netlify.

## Useful commands

### Setup

```
npm i
npm run dev
```

### Tests

```
npm test
npm --prefix web run test:update
```

### Story URL migration

Story pages use the hidden Sanity `story.slug` field when it is present. The
canonical format is `/story/{year}/{title-slug}/`, where `year` falls back to
the story document creation year during migration.

Preview the proposed Sanity slug updates and legacy redirects:

```
npm run story-slugs:audit
```

Apply the slug backfill after reviewing the audit output:

```
SANITY_WRITE_TOKEN=... npm run story-slugs:write
```

The audit also prints safe redirects to copy into `web/static/_redirects`.
Use `npm run story-slugs:audit -- --redirects` to print the full redirect list.
Ambiguous legacy redirects are skipped and listed separately.

## Deploy Sanity GraphQL API

```
# from /studio
sanity graphql deploy
```
