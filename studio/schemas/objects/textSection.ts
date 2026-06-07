export default {
  title: "Text section",
  name: "textSection",
  type: "object",
  fields: [
    {
      name: "content",
      type: "bodyPortableText",
    },
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare(selection) {
      return {
        title: "Text section",
        subtitle: selection?.content[0]?.children[0]?.text || "",
      }
    },
  },
}
