export default {
  name: "teacher",
  title: "Teachers",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "photo",
      title: "Portrait",
      type: "image",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
    },
    {
      name: "school",
      title: "School",
      type: "reference",
      to: [{ type: "school" }],
    },
    /* {
      name: "cohorts",
      title: "WAA cohort(s)",
      type: "array",
      of: [{ type: "string" }],
    }, */
  ],
};
