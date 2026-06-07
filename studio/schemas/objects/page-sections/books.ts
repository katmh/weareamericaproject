export default {
  title: "Books",
  name: "booksSection",
  type: "object",
  fields: [
    {
      title: "Books",
      name: "books",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Book",
          to: [{ type: "book" }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Books",
      };
    },
  },
};
