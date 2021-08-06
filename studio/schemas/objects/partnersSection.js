export default {
  title: "Partners section",
  name: "partnersSection",
  type: "object",
  fields: [
    {
      title: "Partners",
      name: "partners",
      type: "array",
      of: [
        {
          title: "Partner",
          name: "partner",
          type: "object",
          fields: [
            {
              title: "Partner name",
              name: "name",
              type: "string",
            },
            {
              title: "Partner logo",
              name: "logo",
              type: "image",
            },
            {
              title: "Partner website URL",
              name: "url",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      partners: "partners",
    },
    prepare(selection) {
      console.log(selection)
      return {
        title: "Partners section",
        subtitle: selection.partners.map((p) => p.name).join(", "),
      }
    },
  },
}
