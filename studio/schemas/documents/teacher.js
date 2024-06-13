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
      type: "string",
      options: {
        list: [
          "Cohort 1 (2019-2020)",
          "Cohort 2 (2020-2021)",
          "Cohort 3 (2021-2022)",
          "Cohort 4 (2022-2023)",
          "Cohort 5 (2023-2024)",
          "Cohort 6 (2024-2025)",
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
