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
        ],
      },
    },
  ],
};
