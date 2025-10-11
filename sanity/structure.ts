import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items(
      // Filter out document types of `media.tag`
      S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "media.tag"
      )
    );
