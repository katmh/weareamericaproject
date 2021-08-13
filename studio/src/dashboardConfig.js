export default {
  widgets: [
    {
      name: "structure-menu",
      layout: {
        width: "full",
      },
    },
    {
      name: "netlify",
      layout: {
        width: "full",
      },
      options: {
        title: "Republish the website",
        sites: [
          {
            title: "weareamericaproject.com ",
            name: "weareamerica",
            buildHookId: "610b6435e6c8ab72564f8425",
            apiId: "9b7a3a08-a2a5-4535-b715-b101cf4d2086",
          },
        ],
      },
    },
  ],
}
