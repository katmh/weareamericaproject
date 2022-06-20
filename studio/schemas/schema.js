// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import post from "./documents/post";
import siteSettings from "./documents/siteSettings";
import page from "./documents/page";
import teamMember from "./documents/teamMember";

// Object types
import textSection from "./objects/textSection";
import partnersSection from "./objects/partnersSection";
import partner from "./objects/partner";
import contactSection from "./objects/contactSection";
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import mainImage from "./objects/mainImage";

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
    siteSettings,
    post,
    teamMember,

    mainImage,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    textSection,
    partnersSection,
    partner,
    contactSection,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
});
