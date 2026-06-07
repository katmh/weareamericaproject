export default {
  name: "secondLanguageAudio",
  title: "Second language audio",
  type: "object",
  fields: [
    {
      title: "Language",
      name: "language",
      type: "string",
    },
    {
      title: "Second language audio",
      name: "audio",
      type: "file",
      accept: "audio/*",
    },
  ],
};
