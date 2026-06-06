export default {
  name: "cohort",
  title: "Cohorts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Cohort 9 (2027-2028)"',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title" },
  },
};
