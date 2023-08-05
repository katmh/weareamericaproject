import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import IframePreview from "../previews/IframePreview";

// Web preview configuration
const remoteURL = "https://sanity-gatsby-blog-web-qq95ktt1.netlify.app"; // TODO: update remote URL
const localURL = "http://localhost:8000";
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props;
  if (schemaType == "post") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .title("Web preview")
        .options({ previewURL }),
    ]);
  }
  return S.document().views([S.view.form()]);
};

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title("Content")
    .items([
      S.divider(),
      S.listItem()
        .title("Pages")
        .icon(MdDescription)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("News Items")
        .icon(MdDescription)
        .schemaType("newsItem")
        .child(S.documentTypeList("newsItem").title("News Items")),
      S.listItem()
        .title("Site Settings")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["newsItem", "page", "siteSettings"].includes(listItem.getId())
      ),
    ]);
