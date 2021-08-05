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
        sites: [
          // TODO: use correct build hook IDs, Netlify site names, and API IDs
          {
            buildHookId: "6109a6fe7fe03d00b3ca57b9",
            title: "Content Management System ",
            name: "sanity-gatsby-blog-studio-d48352sg",
            apiId: "6fdca64d-8908-44cd-96de-15527630fd62",
          },
          {
            buildHookId: "6109a6fe0b2c3700c247e0a0",
            title: "weareamericaproject.com ",
            name: "sanity-gatsby-blog-web-qq95ktt1",
            apiId: "a035bc43-5b9f-4b1d-99b0-47a80007b84f",
          },
        ],
      },
    },
    
  ],
};
