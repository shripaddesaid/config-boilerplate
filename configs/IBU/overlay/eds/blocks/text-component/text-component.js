import { loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { processUnderscoreHighlights } from "../../utils/common.js";
import { COMBINED_TEXT_COMPONENT_CONFIGS } from "./text-component-config.js";

/**
 * Parse block data and extract content and CTA information
 * @param {HTMLElement} block - The block element to parse
 * @returns {Object} Object containing parsedData and textComponentObj
 */
function parseBlockData(
  block,
  TextComponentContract,
  RTE_CONTENT_SELECTORS,
  RTE_DESC_SELECTORS,
  RTE_FIELD_SELECTORS,
) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...(block?.classList || [])];

  const [
    iconImg,
    eyebrowText,
    title,
    description,
    footnote,
    firstLinkCta,
    firstAssetCta,
    secondLinkCta,
    secondAssetCTA,
  ] = children;

  // Helper to get a specific child element from a parent
  const getElement = (el, selector) => el?.querySelector(selector) || null;

  // Parse icon
  const iconImgElement = getElement(iconImg, "img");
  const iconData = {
    iconImgSrc: iconImgElement?.src || "",
    iconImgAlt: iconImgElement?.alt || "",
  };

  // Parse content fields with RTE support
  const contentData = {
    eyebrowText:
      eyebrowText?.querySelector(RTE_CONTENT_SELECTORS)?.innerHTML ||
      eyebrowText?.innerHTML ||
      "",
    title: title?.innerHTML || "",
    description:
      description?.querySelector(RTE_DESC_SELECTORS)?.innerHTML ||
      description?.innerHTML ||
      "",
    footnote:
      footnote?.querySelector(RTE_DESC_SELECTORS)?.innerHTML ||
      footnote?.innerHTML ||
      "",
  };

  // Helper function to extract CTA data
  const extractCtaData = (element, type, suffix) => {
    const linkEl = getElement(element, "a");
    if (!linkEl) return {};

    const prefix = type === "asset" ? "asset" : "cta";
    return {
      [`${prefix}Label${suffix}`]: linkEl.textContent?.trim() || "",
      [`${prefix}Link${suffix}`]: linkEl.getAttribute("href") || "",
      [`${prefix}AriaLabel${suffix}`]: linkEl.getAttribute("title") || "",
    };
  };

  // Extract all CTA data
  const ctaData = {
    ...extractCtaData(firstLinkCta, "cta", "1"),
    ...extractCtaData(firstAssetCta, "asset", "1"),
    ...extractCtaData(secondLinkCta, "cta", "2"),
    ...extractCtaData(secondAssetCTA, "asset", "2"),
  };

  // Create contract instance for validation
  const textComponentObj = new TextComponentContract(
    "Text Component",
    blockClassList,
    { ...iconData, ...contentData },
  );

  const parsedData = {
    content: { ...iconData, ...contentData },
    ctaData,
    elements: {
      iconImg,
      eyebrowText,
      title,
      description,
      footnote,
      firstLinkCta,
      firstAssetCta,
      secondLinkCta,
      secondAssetCTA,
    },
  };

  return { parsedData, textComponentObj };
}

/**
 * Decorate the text-component block
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  try {
    // Parse block data in EDS layer

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/text-component/text-component.min.css",
    );
    const [, TextComponentModule, domUtilsModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/text-component/text-component.min.js"),
      import("../../../platform-blocks/utils/dom-utils.min.js"),
    ]);
    const { RTE_CONTENT_SELECTORS, RTE_DESC_SELECTORS, RTE_FIELD_SELECTORS } =
      domUtilsModule;
    const TextComponent = TextComponentModule.default;
    const TextComponentContract = TextComponentModule.TextComponentContract;

    const { parsedData, textComponentObj } = parseBlockData(
      block,
      TextComponentContract,
      RTE_CONTENT_SELECTORS,
      RTE_DESC_SELECTORS,
      RTE_FIELD_SELECTORS,
    );

    const textComponent = new TextComponent(block, {
      moveInstrumentation,
      componentName: "Text Component",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_TEXT_COMPONENT_CONFIGS),
      parsedData,
      textComponentObj,
      processUnderscoreHighlights,
    });

    textComponent.init();
    //CTA classes adjustment
    const ctaButtons = block.querySelectorAll(".cta-button-wrapper a");
    ctaButtons.forEach((button) => {
      if (button.classList.contains("cta-button-primary-primary-light")) {
        button.classList.remove("cta-button-primary-primary-light");
        button.classList.add("cta-button-primary-light");
      }
      if (button.classList.contains("cta-button-secondary-primary-light")) {
        button.classList.remove("cta-button-secondary-primary-light");
        button.classList.add("cta-button-outline");
      }
    });

    // Reset classes to base + text-color-none
    ["text-title", "text-desc", "text-eyebrow"].forEach((cls) => {
      const el = block.querySelector(`.${cls}`);
      if (el) el.className = `${cls} text-color-none`;
    });
  } catch (error) {
    console.error("Error loading text-component:", error);
  }
}
