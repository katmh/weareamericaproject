export default {
  title: "Contact section",
  name: "contactSection",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "bodyPortableText",
    },
  ],
  preview: {
    select: {
      content: "description",
    },
    prepare(selection) {
      return {
        title: "Contact section",
        subtitle: selection?.content[0]?.children[0]?.text || "",
      }
    },
  },
}
