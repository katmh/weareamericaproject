export default {
  name: "story",
  title: "Stories",
  type: "document",
  fields: [
    {
      name: "author",
      title: "Author Full Name",
      description:
        "We store the student's full name to keep track of stories in our system, but the website will only show the student's first name, which you can specify in the next box.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "authorFirstName",
      title: "Author First Name",
      description: "This is what will show on the website.",
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
      title: "Story Text",
      description:
        "Note: You only need to hit “enter” once in between paragraphs. This might mean that the text needs to be reformatted a bit.",
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
      name: "tags",
      title: "Tags",
      description: "Topics relevant to this story",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              "Appearance",
              "Arts and Expression",
              "Community",
              "Different Abilities",
              "Discrimination",
              "Education",
              "Family",
              "Friendship and Kindness",
              "Gender and Sexuality",
              "Health and Illness",
              "Justice and Law",
              "Language and Communication",
              "Loneliness, Doubt or Loss",
              "Mentors",
              "Migration",
              "Spirituality and Faith",
              "Sports",
              "Violence",
            ],
          },
        },
      ],
    },
    {
      name: "secondLanguageAudio",
      title: "Second language audio (if applicable)",
      description:
        "Some students record a version of their story in another language, such as their native language. If applicable, you can specify the language and audio recording here.",
      type: "secondLanguageAudio",
    },
    {
      name: "school",
      title: "School",
      type: "reference",
      to: [{ type: "school" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "teacher",
      title: "Teacher",
      description:
        "Note: The options in this dropdown depend on the school selected.",
      type: "reference",
      to: [{ type: "teacher" }],
      options: {
        filter: ({ document }) => {
          console.log(document);
          if (document.school) {
            return {
              filter: "school._ref == $school",
              params: { school: document.school._ref },
            };
          } else {
            return {
              filter: "",
            };
          }
        },
        disableNew: true,
      },
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "consent",
      title: "Consent (required)",
      type: "consent",
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
      description:
        "Check this box to unpublish the story from the website. This is intended for admin use.",
      type: "boolean",
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
      hidden: true, // Hide in Sanity Studio.
    },
  ],
};
