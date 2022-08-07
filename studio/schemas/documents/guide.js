export default {
  name: "guide",
  type: "document",
  title: "Conversation Guides",
  preview: {
    select: {
      title: "partner",
    },
  },
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
      name: "isExternal",
      type: "boolean",
      title: "Use external link",
      description:
        "If the guide lives on a different website, turn this switch on.",
    },
    {
      name: "url",
      type: "url",
      title: "External URL",
      description:
        "If the guide lives on a different website, paste the link to it here.",
    },
    {
      name: "content",
      type: "bodyPortableText",
      title: "Content",
      description:
        "If the guide lives on our website, paste and format the guide's contents here.",
    },
  ],
};
