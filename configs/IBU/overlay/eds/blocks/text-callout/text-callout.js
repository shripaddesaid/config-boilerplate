import { decorateIcon } from "../../scripts/aem.js";
import { applyCustomFontSize } from "../../utils/common.js";
import { TEXT_CALLOUT_FIELD_CONFIGS } from "./text-callout-config.js";

/**
 * Parse block DOM structure and extract content data
 * Following the pattern: EDS layer handles DOM parsing, SRC layer handles classList parsing
 *
 * @param {HTMLElement} block - The block element
 * @returns {Object} Parsed content data with description element
 */
function parseBlockData(block) {
  if (!block) return { descriptionElement: null };

  const children = Array.from(block.children || []);

  // The description content is the first child div
  const descriptionElement = children[0] || null;

  return {
    descriptionElement,
  };
}

export default async function decorate(block) {
  try {
    const { default: loadCSS } = await import(
      "../../../platform-blocks/utils/css-loader.min.js"
    );
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/text-callout/text-callout.min.css",
    );
    const [, { default: TextCallOut }] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/text-callout/text-callout.min.js"),
    ]);

    // Parse DOM structure in EDS layer
    const parsedData = parseBlockData(block);

    // Initialize component with parsed data from EDS
    // Component will handle classList parsing and combine with EDS data
    const textCallOut = new TextCallOut(block, {
      decorateIcon,
      applyCustomFontSize,
      fieldConfigs: TEXT_CALLOUT_FIELD_CONFIGS,
      parsedData, // Pass EDS-parsed data
    });

    // Lifecycle: init handles parseBlockData, preRender, render, postRender
    textCallOut.init();
  } catch (error) {
    console.error("Error loading text-callout:", error);
  }
}
