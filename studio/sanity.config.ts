import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";

import { getDefaultDocumentNode, structure } from "./src/structure/deskStructure";
import schemaTypes from "./schemas/schema";

export default defineConfig({
  name: "default",
  title: "We Are America Project",
  projectId: "nr9digz2",
  dataset: "production",
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
});
