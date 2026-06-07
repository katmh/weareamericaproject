export default {
  title: "Partners section",
  name: "partnersSection",
  type: "object",
  fields: [
    {
      title: "Partners",
      name: "partners",
      type: "array",
      of: [{ type: "partner" }],
    },
  ],
  preview: {
    select: {
      partners: "partners",
    },
    prepare(selection) {
      return {
        title: "Partners section",
        subtitle: selection.partners.map((p) => p.name).join(", "),
      }
    },
  },
}
