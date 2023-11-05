export default {
  name: "story",
  title: "Stories",
  type: "document",
  fields: [
    {
      name: "author",
      title: "Author Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "authorFirstName",
      title: "Author First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "authorLastName",
      title: "Author Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "storyTitle",
      title: "Story Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "text",
      title: "Text",
      description:
        "Only one line break/“enter”/return is needed between paragraphs. You may need to reformat the story text a bit.",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      description:
        "The front page of the We Are America Project website showcases a rotation of randomly chosen featured stories. You can designate a story as featured here. Please select a maximum of 2-3 stories from your classroom to be featured.",
      type: "boolean",
    },
    {
      name: "isHidden",
      title: "Hide story",
      type: "boolean",
    },
  ],
};
