export default {
  name: "story",
  title: "Stories",
  type: "document",
  fields: [
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "storyTitle",
      title: "Story Title",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
    },
    {
      name: "audio",
      title: "Audio",
      type: "file",
      accept: "audio/*",
    },
    {
      name: "secondLanguageAudio",
      title: "Second language audio (if applicable)",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
        },
        {
          name: "audio",
          title: "Second language audio",
          type: "file",
          accept: "audio/*",
        },
      ],
    },
    /* {
      name: "topics",
      title: "Topic(s)",
      type: "array",
      of: [{ type: "topic" }],
    }, */
    {
      name: "school",
      title: "School",
      type: "reference",
      to: [{ type: "school" }],
    },
    {
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
    },
    {
      name: "isHidden",
      title: "Hide story",
      type: "boolean",
    },
  ],
};
