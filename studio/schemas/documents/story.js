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
      name: "school",
      title: "School",
      type: "reference",
      to: [{ type: "school" }],
    },
    {
      name: "tags",
      title: "Tags",
      description: "Topics relevant to this story",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              "Family",
              "Community",
              "Health and Illness",
              "Friendship and Kindness",
              "Migration",
              "Violence",
              "Gender and Sexuality",
              "Loneliness, Doubt or Loss",
              "Education",
              "Language and Communication",
              "Sports",
              "Justice and Law",
              "Discrimination",
              "Appearance",
              "Spirituality and Faith",
              "Arts and Expression",
              "Different Abilities",
              "Mentors",
            ],
          },
        },
      ],
    },
    {
      name: "secondLanguageAudio",
      title: "Second language audio (if applicable)",
      type: "secondLanguageAudio",
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
