export default {
  name: "book",
  type: "document",
  title: "Book",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
    },
    {
      name: "url",
      title: "Link",
      type: "url",
    },
  ],
};
