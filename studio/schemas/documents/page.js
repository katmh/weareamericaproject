export default {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "content",
      type: "array",
      title: "Page sections",
      of: [
        { type: "textSection" },
        { type: "partnersSection" },
        { type: "contactSection" },
        { type: "guidesSection" },
        { type: "booksSection" },
      ],
    },
  ],
};
