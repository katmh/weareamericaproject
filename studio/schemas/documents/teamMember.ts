export default {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bio",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      title: "Headshot",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "showLower",
      title: "Show lower on page",
      description:
        "This person is a current team member, but for some reason (e.g. they don't have a professional headshot) we want them to appear below all others who don't have this checked off.",
      type: "boolean",
    },
    {
      name: "isInactive",
      title: "Inactive",
      description:
        "This person will be shown in a separate section for former team members.",
      type: "boolean",
    },
    {
      name: "story",
      title: "Story",
      type: "reference",
      to: [{ type: "story" }],
    },
  ],
};
