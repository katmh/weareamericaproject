// document schemas
import siteSettings from "./documents/siteSettings";
import page from "./documents/page";
import guide from "./documents/guide";
import teamMember from "./documents/teamMember";
import story from "./documents/story";
import school from "./documents/school";
import cohort from "./documents/cohort";
import teacher from "./documents/teacher";
import book from "./documents/book";
import newsItem from "./documents/newsItem";
import post from "./documents/post";

// Object types
import guidesSection from "./objects/page-sections/guides";
import textSection from "./objects/textSection";
import partnersSection from "./objects/partnersSection";
import partner from "./objects/partner";
import booksSection from "./objects/page-sections/books";
import contactSection from "./objects/contactSection";
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import mainImage from "./objects/mainImage";
import navItem from "./objects/navItem";
import secondLanguageAudio from "./objects/secondLanguageAudio";
import consent from "./objects/consent";

export default [
  page,
  guide,
  siteSettings,
  teamMember,
  story,
  school,
  cohort,
  teacher,
  book,
  newsItem,
  post,

  mainImage,
  bodyPortableText,
  bioPortableText,
  excerptPortableText,
  textSection,
  partnersSection,
  partner,
  contactSection,
  navItem,
  secondLanguageAudio,
  guidesSection,
  booksSection,
  consent,
];
