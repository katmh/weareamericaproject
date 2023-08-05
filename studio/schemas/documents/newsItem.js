export default {
  name: "newsItem",
  title: "News Items",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Headline",
      description:
        "Headline to display on website, can be similar to the headline of the news article",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      description:
        "Date that the linked news item was published, or date of the event",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "who",
      title: "Relevant people or location",
      description:
        "A brief phrase, e.g. We Are America National Team, a particular teacher fellow, a school",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
