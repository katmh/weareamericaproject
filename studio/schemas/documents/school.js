export default {
  name: "school",
  title: "Schools",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "location",
      title: "State/Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "grade",
      title: "Grade Level",
      type: "string",
      options: {
        list: ["High School", "8th Grade"],
      },
    },
  ],
};
