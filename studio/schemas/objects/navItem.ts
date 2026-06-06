export default {
  name: "navItem",
  title: "Nav Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "The text to show in the navigation for this link",
      type: "string",
    },
    {
      name: "path",
      title: "Path",
      description: "What comes after `weareamericaproject.com/`",
      type: "string",
    },
    {
      name: "subItems",
      title: "Menu Items",
      description:
        "If this link should have a menu, list the menu items here. Only one level of nesting is supported (so items already in a submenu should not themselves have a submenu).",
      type: "array",
      of: [{ type: "navItem" }],
    },
    {
      name: "isEmphasized",
      title: "Emphasize",
      description: "(Used for Stories only)",
      type: "boolean",
    },
  ],
};
