export default {
  title: "Conversation Guides",
  name: "guidesSection",
  type: "object",
  fields: [
    {
      title: "Converation Guides",
      name: "guides",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Guide",
          to: [{ type: "guide" }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Converation Guides",
      };
    },
  },
};
