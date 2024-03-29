// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import siteSettings from "./documents/siteSettings";
import page from "./documents/page";
import guide from "./documents/guide";
import teamMember from "./documents/teamMember";
import story from "./documents/story";
import school from "./documents/school";
import teacher from "./documents/teacher";
import book from "./documents/book";
import newsItem from "./documents/newsItem";

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

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    page,
    guide,
    siteSettings,
    teamMember,
    story,
    school,
    teacher,
    book,
    newsItem,

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

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
});
