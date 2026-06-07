export default {
  name: "teacher",
  title: "Teachers",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photo",
      title: "Portrait",
      type: "image",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cohort",
      title: "Cohort",
      type: "reference",
      to: [{ type: "cohort" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
