import { createOptimizedPicture, decorateIcon } from "../../scripts/aem.js";
import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import pushAdobeAnalyticsEvent from "../../utils/analytics/launch-util.js";
import { loadCSS } from "../../utils/css-loader.js";
import { ALL_VIDEO_CONFIGS } from "./video-config.js";

/**
 * Get video item classes from class list element
 * @param {HTMLElement} classListElem - Element containing class list
 * @returns {string[]} - Array of class names
 */
const getVideoItemClasses = (classListElem) => {
  const classList = classListElem?.textContent?.trim() || "";
  return classList
    .split(",")
    .map((cls) => cls.trim())
    .filter(Boolean);
};

/**
 * Extract font size from class array at specific index
 * @param {string[]} classList - Array of class names
 * @param {number} index - Index in the array to check
 * @param {string} prefix - Font size prefix to remove
 * @returns {string} - Extracted font size value
 */
const extractFontSizeFromArray = (classList, index, prefix) => {
  if (!classList || classList.length <= index) return "";

  const fontClass = classList[index];
  if (!fontClass || !fontClass.includes(prefix)) return "";

  return fontClass.split(prefix)[1] || "";
};

/**
 * Parse configuration for individual video items
 * @param {string[]} classList - Array of class names for the video item
 * @returns {Object} - Parsed configuration for the video item
 */
const parseVideoItemConfiguration = (classList) => {
  const config = {
    videoType: "standard",
    titleFontSize: "",
    descriptionFontSize: "",
    quoteFontSize: "",
    patientNameFontSize: "",
    conditionFontSize: "",
    transcriptFontSize: "",
    ctaColor: "primary-light",
    ctaStyle: "",
  };

  // Determine video type
  if (
    classList.some(
      (cls) =>
        cls.toLowerCase().includes("quote") ||
        cls.toLowerCase() === "videowithquote",
    )
  ) {
    config.videoType = "quote";
  }

  // Extract font sizes from class array (legacy format)
  config.titleFontSize = extractFontSizeFromArray(classList, 2, "title-fs-");
  config.descriptionFontSize = extractFontSizeFromArray(
    classList,
    3,
    "description-fs-",
  );
  config.quoteFontSize = extractFontSizeFromArray(classList, 2, "quote-fs-");
  config.patientNameFontSize = extractFontSizeFromArray(
    classList,
    3,
    "patientname-fs-",
  );
  config.conditionFontSize = extractFontSizeFromArray(
    classList,
    4,
    "condition-fs-",
  );
  config.transcriptFontSize = extractFontSizeFromArray(
    classList,
    6,
    "transcript-fs-",
  );

  // Extract CTA configuration
  if (classList.length > 4) {
    config.ctaStyle = classList[4] || "";
  }
  if (classList.length > 5) {
    config.ctaColor = classList[5] || "primary-light";
  }

  return config;
};

/**
 * Parse video content from block structure
 * @param {HTMLElement[]} children - Array of child elements from the video block
 * @returns {Array} - Array of parsed video item objects
 */
const parseVideoContent = (children) => {
  return children.map((row, index) => {
    const [
      mediaElem,
      classListElem,
      videoTitleElement,
      videoDescriptionElement,
      quoteIconElement,
      patientQuoteElement,
      patientNameElement,
      patientConditionElement,
    ] = row.children;

    // Extract basic elements
    const imageDiv = mediaElem?.querySelector("img");
    const videoElem = mediaElem?.querySelector("a");
    const videoTranscriptElement = document.createElement("div");

    const RTE_DESC_SELECTORS = "h1, h2, h3, h4, h5, h6, p, pre";
    const mediaElemContents = mediaElem.querySelectorAll(RTE_DESC_SELECTORS);
    mediaElemContents.forEach((el, id) => {
      if (id !== 0 && id !== 1) videoTranscriptElement.append(el);
    });

    // Extract CTA and quote labels from media element
    const ctaLinkText = mediaElem?.children[1]?.querySelector("a")?.innerText;
    const ctaLabel = ctaLinkText || "Watch Now";
    const quoteLabel = ctaLinkText || "Watch Patient Story";

    // Parse configuration from classList
    const classList = getVideoItemClasses(classListElem);
    const config = parseVideoItemConfiguration(classList);

    return {
      index,
      image: imageDiv,
      video: videoElem,
      transcript: videoTranscriptElement,
      title: videoTitleElement,
      description: videoDescriptionElement,
      quoteIcon: quoteIconElement,
      quote: patientQuoteElement,
      patientName: patientNameElement,
      condition: patientConditionElement,
      config,
      classList,
      row,
      ctaLabel,
      quoteLabel,
    };
  });
};

/**
 * Parse video block data and structure into video items
 * @param {HTMLElement} block - The video block element
 * @returns {Object} - Parsed data and contract object
 */
function parseBlockData(block, VideoContract) {
  if (!block) return {};

  try {
    const children = [...(block?.children || [])];
    const blockClassList = [...(block?.classList || [])];

    // Parse video items using the parsing functions
    const videoItems = parseVideoContent(children);

    // Content data
    const contentData = {
      blockClassList,
      videoItems,
    };

    // Create VideoContract instance
    const videoContractObj = new VideoContract(
      "Video",
      blockClassList,
      videoItems,
    );

    const parsedData = {
      content: contentData,
      elements: {
        children,
      },
    };

    return { parsedData, videoContractObj };
  } catch (error) {
    console.error("Error parsing block data:", error);
    return {
      parsedData: { content: { videoItems: [] }, elements: {} },
      videoContractObj: null,
    };
  }
}

/**
 * EDS decoration function for the Video block
 * Handles loading resources and initializing the Video component
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  if (!block) {
    console.error("Video: Block element is required");
    return;
  }

  try {
    // Parse block data in EDS layer

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/video/video.min.css",
    );

    const [, VideoModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/video/video.min.js"),
    ]);
    const Video = VideoModule.default;
    const VideoContract = VideoModule.VideoContract;

    const { parsedData, videoContractObj } = parseBlockData(
      block,
      VideoContract,
    );

    if (!Video) {
      throw new Error("Video component not found in imported module");
    }

    // Initialize Video component with options
    const video = new Video(block, {
      createOptimizedPicture,
      moveInstrumentation,
      moveAttributes,
      decorateIcon,
      componentName: "Video",
      enableAccessibility: true,
      fieldConfigs: Object.values(ALL_VIDEO_CONFIGS),
      parsedData,
      videoContractObj,
      pushAdobeAnalyticsEvent,
      componentFields: new Map([
        ["ctaArrowStyle", "play"], // Override to use play icon instead of arrow
      ]),
    });

    // Initialize the component (triggers lifecycle methods)
    video.init();

    // Fix button class names: Replace -primary-primary with -primary
    const fixButtonClasses = () => {
      block
        .querySelectorAll(".cta-button-primary-primary")
        .forEach((button) => {
          button.classList.remove("cta-button-primary-primary");
          button.classList.add("cta-button-primary-light");
        });
      block
        .querySelectorAll(".cta-button-secondary-primary")
        .forEach((button) => {
          button.classList.remove("cta-button-secondary-primary");
          button.classList.add("cta-button-outline");
        });
    };

    // Apply immediately after video.init()
    fixButtonClasses();

    // Fix CTA aria-labels to match the actual CTA text
    const ctaButtons = block.querySelectorAll(".video-carousel-content button");
    ctaButtons.forEach((button) => {
      const buttonText = button.textContent.trim().replace(/\s+/g, " ");
      if (buttonText) {
        button.setAttribute("aria-label", buttonText);
      }
    });

    // Fix single-video-layout: Change transcript footer from col-11 to col-12
    if (block.classList.contains("single-video-layout")) {
      const transcriptFooter = block.querySelector(
        ".video-carousel-transcript-footer",
      );
      if (transcriptFooter) {
        transcriptFooter.classList.remove("col-11");
        transcriptFooter.classList.add("col-12");
      }
    }

    // Enhance accessibility: Add navigation role to dots pagination
    const dotsPagination = block.querySelector(".dots-pagination-container");
    if (dotsPagination) {
      dotsPagination.setAttribute("role", "navigation");
    }

    // Enhance accessibility: Set empty alt attributes for carousel navigation icons
    const carouselArrows = block.querySelectorAll(
      ".dots-pagination-container .icon-caretleft img, .dots-pagination-container .icon-caretright img",
    );
    carouselArrows.forEach((img) => {
      img.setAttribute("alt", "");
    });

    // Override aria-labels for carousel navigation buttons
    const caretLeftButton = block.querySelector(
      ".dots-pagination-container .icon-caretleft",
    );
    const caretRightButton = block.querySelector(
      ".dots-pagination-container .icon-caretright",
    );

    if (caretLeftButton) {
      caretLeftButton.setAttribute("role", "button");
    }
    if (caretRightButton) {
      caretRightButton.setAttribute("aria-label", "next");
      caretRightButton.setAttribute("role", "button");
    }

    // Enhance accessibility: Setup correct tab order and transcript accessibility
    const setupTranscriptAccessibility = () => {
      const transcriptLabelContainer = block.querySelector(
        ".transcript-label-container",
      );
      const transcriptContainer = block.querySelector(
        ".transcript-description",
      );

      if (!transcriptLabelContainer || !transcriptContainer) return;

      // Ensure transcript toggle button is in correct tab order
      transcriptLabelContainer.setAttribute("tabindex", "0");

      // Remove transcript description from tab order but keep accessible to screen readers
      transcriptContainer.setAttribute("tabindex", "-1");

      // Remove all interactive elements from tab order
      const focusableElements = transcriptContainer.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
    };

    // Check if transcript elements exist before setting up observer
    const transcriptLabelContainer = block.querySelector(
      ".transcript-label-container",
    );
    const transcriptContainer = block.querySelector(".transcript-description");

    if (transcriptLabelContainer && transcriptContainer) {
      // Apply initial accessibility setup
      setupTranscriptAccessibility();

      // Set up observer for dynamic content changes
      const observer = new MutationObserver(() => {
        setupTranscriptAccessibility();
      });

      observer.observe(transcriptContainer, {
        childList: true,
        subtree: true,
      });
    }
  } catch (error) {
    console.error(
      "Video: Error loading or initializing video component:",
      error,
    );
  }
}
