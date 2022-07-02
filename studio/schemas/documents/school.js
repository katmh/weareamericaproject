export default {
  name: "school",
  title: "Schools",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "location",
      title: "State/Location",
      type: "string",
    },
    {
      name: "grade",
      title: "Grade Level",
      type: "string",
      list: ["High School", "8th Grade"],
    },
    {
      name: "teachers",
      title: "WAA Teacher Fellow(s)",
      type: "array",
      of: [{ type: "teacher" }],
    },
  ],
};
