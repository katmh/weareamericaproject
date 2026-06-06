export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Currently not used for anything",
    },
    {
      name: "navItems",
      type: "array",
      of: [{ type: "navItem" }],
      title: "Navigation Links",
      description: "Header and footer links to pages in the website",
    },
  ],
};
