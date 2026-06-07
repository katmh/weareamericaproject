export default {
  name: "consent",
  title: "Consent",
  type: "object",
  fields: [
    {
      name: "approvedByParent",
      title: "Parent/guardian consent",
      description:
        "I, the student’s teacher, confirm that the student’s parent/guardian has read this story and signed off and confirmed that this story can be made public.",
      type: "boolean",
      validation: (Rule) =>
        Rule.custom((isTrue) => isTrue).error("Must be checked"),
    },
    {
      name: "approvedBySchool",
      title: "School consent",
      description:
        "I, the student’s teacher, confirm that our school has read this student’s story and signed off and confirmed that this story can be made public.",
      type: "boolean",
      validation: (Rule) =>
        Rule.custom((isTrue) => isTrue).error("Must be checked"),
    },
  ],
};
