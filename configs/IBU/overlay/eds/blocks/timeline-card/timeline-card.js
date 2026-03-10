// Block: timeline-card
import { loadCSS } from "../../scripts/aem.js";
import { createOptimizedPicture } from "../../scripts/aem.js";
import { sanitizeHTML } from "../../utils/common.js";
import { COMBINED_TIMELINE_CARD_CONFIGS } from "./timeline-card-config.js";

/**
 * Extract image data from DOM element
 * @param {HTMLElement} el - The element containing the image
 * @returns {Object} - Image src and alt
 */
const extractImageData = (el) => {
  let src = "";
  let alt = "";
  if (el?.innerHTML) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = el.innerHTML;
    const img = tempDiv.querySelector("img");
    if (img) {
      src = img.getAttribute("src") || img.src || "";
      alt = img.getAttribute("alt") || "";
    }
  }
  return { src, alt };
};

/**
 * Parse block data from DOM structure
 * @param {HTMLElement} block - The block element
 * @param {Function} TimelineCardContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, TimelineCardContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function to get trimmed HTML content
  const getTrimmedHTML = (el) => (el ? sanitizeHTML(el.innerHTML || "") : "");

  // Timeline card structure:
  // 0: image, 1: title, 2: description
  const [imageElement, titleElement, descriptionElement] = children;

  // Extract image data
  const imageData = extractImageData(imageElement);

  // Content data
  const contentData = {
    blockClassList,
    image: imageData.src
      ? {
          src: imageData.src,
          alt: imageData.alt,
        }
      : null,
    title: getTrimmedHTML(titleElement),
    description: getTrimmedHTML(descriptionElement),
  };

  // Create TimelineCardContract instance and populate properties
  const timelineCardObj = new TimelineCardContract();
  timelineCardObj.componentName = "TimelineCard";
  timelineCardObj.blockClassList = blockClassList;
  timelineCardObj.image = contentData.image;
  timelineCardObj.title = contentData.title;
  timelineCardObj.description = contentData.description;
  timelineCardObj.imagePlacement = "left";
  timelineCardObj.titleFontSize = "";
  timelineCardObj.descriptionFontSize = "";

  const parsedData = {
    content: contentData,
  };

  return { parsedData, timelineCardObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/timeline-card/timeline-card.min.css",
    );
    const [, timelineCardModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/timeline-card/timeline-card.min.js"),
    ]);

    const TimelineCardBlock = timelineCardModule.default;
    const TimelineCardContract = timelineCardModule.TimelineCardContract;

    const { parsedData, timelineCardObj } = parseBlockData(
      block,
      TimelineCardContract,
    );

    const timelineCardBlock = new TimelineCardBlock(block, {
      createOptimizedPicture,
      componentName: "TimelineCard",
      enableAccessibility: true,
      fieldConfigs: COMBINED_TIMELINE_CARD_CONFIGS,
      parsedData,
      timelineCardObj,
    });

    timelineCardBlock.init();
  } catch (error) {
    console.error("Error loading timeline-card:", error);
  }
}
