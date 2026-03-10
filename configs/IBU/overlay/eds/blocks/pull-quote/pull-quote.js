import { createOptimizedPicture, loadCSS } from "../../scripts/aem.js";
import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { PULL_QUOTE_FIELD_CONFIGS } from "./pull-quote-config.js";

/**
 * Parse block data from DOM structure
 * @param {HTMLElement} block - The block element
 * @param {Function} PullQuoteContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, PullQuoteContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper functions to get trimmed content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");

  // Pull quote structure: 3 divs
  // Div 0: empty or contains image
  // Div 1: quote text with semantic tags (p, h1-h6)
  // Div 2: two p tags - first is author text, second is author title
  const [imageDiv, quoteDiv, authorDiv] = children;

  // Extract image from first div (if present)
  const imageElement = imageDiv?.querySelector("img");
  const imageData = imageElement
    ? {
        src: imageElement.src || imageElement.getAttribute("src"),
        alt: imageElement.alt || imageElement.getAttribute("alt") || "",
        element: imageElement,
      }
    : null;

  // Extract quote element from second div
  // Look for the inner div that contains the quote content
  const quoteContainer = quoteDiv?.querySelector("div");
  const quoteElement = quoteContainer ? quoteContainer.cloneNode(true) : null;

  // Extract author and author title from third div
  const authorParagraphs = authorDiv?.querySelectorAll("p") || [];
  const author = getTrimmedText(authorParagraphs[0]);
  const authorTitle = getTrimmedText(authorParagraphs[1]);

  // Content data
  const contentData = {
    blockClassList,
    image: imageData,
    quoteElement: quoteElement,
    author: author,
    authorTitle: authorTitle,
  };

  // Create PullQuoteContract instance and populate properties
  const pullQuoteObj = new PullQuoteContract();
  pullQuoteObj.componentName = "Pull Quote";
  pullQuoteObj.blockClassList = blockClassList;
  pullQuoteObj.contentData = contentData;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, pullQuoteObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/pull-quote/pull-quote.min.css",
    );

    const [, pullQuoteModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/pull-quote/pull-quote.min.js"),
    ]);

    const PullQuote = pullQuoteModule.default;
    const PullQuoteContract = pullQuoteModule.PullQuoteContract;

    // Parse block data in EDS layer
    const { parsedData, pullQuoteObj } = parseBlockData(
      block,
      PullQuoteContract,
    );

    const pullQuote = new PullQuote(block, {
      moveInstrumentation,
      moveAttributes,
      createOptimizedPicture,
      componentName: "Pull Quote",
      enableAccessibility: true,
      fieldConfigs: Object.values(PULL_QUOTE_FIELD_CONFIGS),
      parsedData,
      pullQuoteObj,
    });

    pullQuote.init();
  } catch (error) {
    console.error("Error loading pull-quote:", error);
  }
}
