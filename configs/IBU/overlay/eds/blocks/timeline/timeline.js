import { decorateIcon, loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { sanitizeHTML } from "../../utils/common.js";
import { COMBINED_TIMELINE_CONFIGS } from "./timeline-config.js";

/**
 * Parse block data from DOM structure
 * @param {HTMLElement} block - The block element
 * @param {Function} TimelineContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, TimelineContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function to get trimmed and sanitized HTML content
  const getTrimmedHTML = (el) => (el ? sanitizeHTML(el.innerHTML || "") : "");

  // Parse individual timeline items data
  const timelineItems = children.map((row) => {
    const rowChildren = row.children;

    // Structure:
    // 0: image, 1: title, 2: config (font sizes), 3: description
    const [
      imageContainer,
      titleContainer,
      configContainer,
      descriptionContainer,
    ] = rowChildren;

    // Extract image
    const imageElement = imageContainer?.querySelector("img");

    // Extract field classes from config container (comma-separated)
    const configText = configContainer?.querySelector("p")?.textContent || "";
    const fieldClasses = configText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      image: imageElement
        ? {
            src: imageElement.src || "",
            alt: imageElement.alt || "",
          }
        : null,
      title: getTrimmedHTML(titleContainer),
      description: getTrimmedHTML(descriptionContainer),
      fieldClasses,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    timelineItems,
  };

  // Create TimelineContract instance and populate properties
  const timelineObj = new TimelineContract();
  timelineObj.componentName = "Timeline";
  timelineObj.blockClassList = blockClassList;
  timelineObj.timelineItems = timelineItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, timelineObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/timeline/timeline.min.css",
    );
    const [, timelineModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/timeline/timeline.min.js"),
    ]);

    const TimelineBlock = timelineModule.default;
    const TimelineContract = timelineModule.TimelineContract;

    const { parsedData, timelineObj } = parseBlockData(block, TimelineContract);

    // Add timeline-carousel class
    block.classList.add("timeline-carousel");

    // Set accessibility attributes on block
    block.setAttribute("role", "region");
    block.setAttribute("aria-label", "Timeline carousel");

    const timelineBlock = new TimelineBlock(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "Timeline",
      enableAccessibility: true,
      fieldConfigs: COMBINED_TIMELINE_CONFIGS,
      parsedData,
      timelineObj,
    });

    timelineBlock.init();
  } catch (error) {
    console.error("Error loading timeline:", error);
  }
}
