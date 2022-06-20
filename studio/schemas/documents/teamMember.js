export default {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
    },
    {
      name: "photo",
      title: "Portrait",
      type: "image",
    },
    {
      name: "showLower",
      title: "Show lower on page",
      description:
        "This person is a current team member, but for one reason or another (e.g. they don't have a professional headshot) we want to show them after all the members who don't have this checked off",
      type: "boolean",
    },
    {
      name: "isInactive",
      title: "Inactive",
      description:
        "This person will be shown in a separate section for former team members",
      type: "boolean",
    },
  ],
};
