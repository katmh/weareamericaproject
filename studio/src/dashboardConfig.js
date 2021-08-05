export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "6109a6fe7fe03d00b3ca57b9",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-d48352sg",
                  apiId: "6fdca64d-8908-44cd-96de-15527630fd62",
                },
                {
                  buildHookId: "6109a6fe0b2c3700c247e0a0",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-qq95ktt1",
                  apiId: "a035bc43-5b9f-4b1d-99b0-47a80007b84f",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/katmh/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-qq95ktt1.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
