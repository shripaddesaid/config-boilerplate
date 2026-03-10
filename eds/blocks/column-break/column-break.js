import { ColumnBreakContract } from "../../../platform-blocks/column-break/column-break.min.js";
import { loadCSS } from "../../scripts/aem.js";

function parseBlockData(block) {
  if (!block) return {};

  const parentDiv = block.parentElement?.parentElement;

  // Content data for column break
  const contentData = {
    parentDiv,
  };

  // Create ColumnBreakContract instance
  const columnBreakObj = new ColumnBreakContract("Column Break", true);

  const parsedData = {
    content: contentData,
  };

  return { parsedData, columnBreakObj };
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer
    const { parsedData, columnBreakObj } = parseBlockData(block);

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/column-break/column-break.min.css",
    );
    const [, { default: ColumnBreak }] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/column-break/column-break.min.js"),
    ]);

    const columnBreak = new ColumnBreak(block, {
      componentName: "Column Break",
      enableAccessibility: false,
      parsedData,
      columnBreakObj,
    });

    columnBreak.init();
  } catch (error) {
    console.error("Error loading column-break:", error);
  }
}
