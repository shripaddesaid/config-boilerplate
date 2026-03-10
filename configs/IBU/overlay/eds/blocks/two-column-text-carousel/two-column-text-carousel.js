import { loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import {
  addDotPagination,
  addNumericalPagination,
} from "../../utils/carousel.js";
import { TWO_COLUMN_TEXT_CAROUSEL_FIELD_CONFIGS } from "./two-column-text-carousel-config.js";

/**
 * Parse block data from DOM structure
 * Extracts slide data from AEM authored content
 * @param {HTMLElement} block - The block element to parse
 * @param {Function} TwoColumnTextCarouselContract - Contract constructor
 * @returns {Object} Object containing parsed data and contract instance
 */
function parseBlockData(block, TwoColumnTextCarouselContract) {
  if (!block) {
    console.error("Two Column Text Carousel: Block element is required");
    return { parsedData: { slides: [] }, twoColumnTextCarouselObj: null };
  }

  const children = [...(block?.children || [])];

  // Create contract instance for validation
  const twoColumnTextCarouselObj = new TwoColumnTextCarouselContract(
    "Two Column Text Carousel",
    children.length,
  );

  // Parse each slide from DOM
  const slides = Array.from(children)
    .map((item, index) => {
      try {
        const [
          leftColumnEyebrow,
          leftColumnText,
          configContainer,
          rightColumnEyebrow,
          rightColumnText,
          ariaLabel,
        ] = item.children;

        // Extract font sizes from config container
        // Config format: two-column-text-carousel-item, leftcolumntext-fs-100px, rightcolumntext-fs-100px
        const configText =
          configContainer?.querySelector("p")?.innerText ||
          configContainer?.textContent?.trim() ||
          "";

        let leftFontSizeValue = null;
        let rightFontSizeValue = null;

        if (configText) {
          // Split by comma and trim each value
          const values = configText.split(",").map((v) => v.trim());

          for (const val of values) {
            // Check for left column font size pattern (case-insensitive)
            const leftMatch = val.match(/^leftcolumntext-fs-(.+)$/i);
            if (leftMatch) {
              leftFontSizeValue = leftMatch[1].trim();
            }

            // Check for right column font size pattern (case-insensitive)
            const rightMatch = val.match(/^rightcolumntext-fs-(.+)$/i);
            if (rightMatch) {
              rightFontSizeValue = rightMatch[1].trim();
            }
          }
          // Fallback: If no pattern-based config found, use direct px values
          if (!leftFontSizeValue) {
            const pxVal = values.find((v) => v.match(/^\d+px$/));
            if (pxVal) leftFontSizeValue = pxVal;
          }
          if (!rightFontSizeValue) {
            // If there are two px values, use the second for right column
            const pxVals = values.filter((v) => v.match(/^\d+px$/));
            if (pxVals.length > 1) {
              rightFontSizeValue = pxVals[1];
            } else if (pxVals.length === 1 && !leftFontSizeValue) {
              rightFontSizeValue = pxVals[0];
            }
          }
        }
        // Create element-like objects for compatibility with getDefaultValue()
        const leftColumnTextFontSize = leftFontSizeValue
          ? { textContent: leftFontSizeValue }
          : configContainer;
        const rightColumnTextFontSize = rightFontSizeValue
          ? { textContent: rightFontSizeValue }
          : configContainer;

        // Extract left column data
        const leftEyebrowHtml = leftColumnEyebrow?.innerHTML?.trim() || "";
        const leftTextHtml = leftColumnText?.innerHTML?.trim() || "";
        const leftFontSize = getDefaultValue(leftColumnTextFontSize);

        // Extract right column data
        const rightEyebrowHtml = rightColumnEyebrow?.innerHTML?.trim() || "";
        const rightTextHtml = rightColumnText?.innerHTML?.trim() || "";
        const rightFontSize = getDefaultValue(rightColumnTextFontSize);

        // Extract ARIA label
        const parsedAriaLabel = getDefaultValue(ariaLabel);

        return {
          leftColumn: {
            eyebrowNode: leftColumnEyebrow,
            eyebrowHtml: leftEyebrowHtml,
            textNode: leftColumnText,
            textHtml: leftTextHtml,
            fontSize: leftFontSize,
          },
          rightColumn: {
            eyebrowNode: rightColumnEyebrow,
            eyebrowHtml: rightEyebrowHtml,
            textNode: rightColumnText,
            textHtml: rightTextHtml,
            fontSize: rightFontSize,
          },
          ariaLabel: parsedAriaLabel,
          sourceRow: item,
        };
      } catch (error) {
        console.error(
          `Two Column Text Carousel: Error parsing slide ${index + 1}:`,
          error,
        );
        return null;
      }
    })
    .filter(Boolean);

  const parsedData = {
    slides,
    elements: {
      children,
    },
  };

  return { parsedData, twoColumnTextCarouselObj };
}

/**
 * Extract default value from DOM element
 * @param {HTMLElement} el - Element to extract value from
 * @param {string} defaultValue - Default value if element is empty
 * @returns {string} Extracted or default value
 */
function getDefaultValue(el, defaultValue = "") {
  const value = el?.textContent?.trim();
  return value !== undefined && value !== "" ? value : defaultValue;
}

/**
 * Decorate function - Entry point for block initialization
 * Loads CSS, parses data, and initializes the component
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/two-column-text-carousel/two-column-text-carousel.min.css",
    );

    // Destructure directly in the Promise.all
    const [
      ,
      { default: TwoColumnTextCarousel, TwoColumnTextCarouselContract },
    ] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/two-column-text-carousel/two-column-text-carousel.min.js"
      ),
    ]);

    // Parse block data in EDS layer with contract
    const { parsedData, twoColumnTextCarouselObj } = parseBlockData(
      block,
      TwoColumnTextCarouselContract,
    );

    // Validate that we have slides
    if (!parsedData.slides || parsedData.slides.length === 0) {
      console.warn("Two Column Text Carousel: No slides found in block data");
      return;
    }

    // Initialize component with all required dependencies
    const twoColumnTextCarousel = new TwoColumnTextCarousel(block, {
      moveInstrumentation,
      addDotPagination,
      addNumericalPagination,
      componentName: "Two Column Text Carousel",
      fieldConfigs: Object.values(TWO_COLUMN_TEXT_CAROUSEL_FIELD_CONFIGS),
      parsedData,
      twoColumnTextCarouselObj,
    });

    // Initialize the component
    twoColumnTextCarousel.init();
  } catch (error) {
    console.error("Error loading two-column-text-carousel:", error);
  }
}
