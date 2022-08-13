export default {
  name: "guide",
  type: "document",
  title: "Conversation Guides",
  preview: {
    select: {
      title: "partner",
    },
  },
  fieldsets: [
    { name: "external", title: "If the guide lives on a different website..." },
    { name: "internal", title: "If the guide lives on our website..." },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Guide Title/Page Title",
      description: "Example: Tenement Museum Conversation Starters",
    },
    {
      name: "partner",
      type: "string",
      title: "Partner Organization Name",
      description: "Example: The Tenement Museum",
    },
    {
      name: "url",
      type: "url",
      title: "External URL",
      description:
        "If the guide lives on a different website, paste the link to it here.",
      fieldset: "external",
    },
    {
      name: "path",
      type: "string",
      title: "Path",
      description:
        "If the guide lives on our website, write the URL-friendly text that comes after `weareamericaproject.com/guides/` here.",
      fieldset: "internal",
    },
    {
      name: "content",
      type: "bodyPortableText",
      title: "Content",
      description:
        "If the guide lives on our website, paste and format the guide's contents here.",
      fieldset: "internal",
    },
  ],
};
