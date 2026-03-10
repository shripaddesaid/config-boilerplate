import {
  createOptimizedPicture,
  decorateIcon,
  loadCSS,
} from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_CARDS_CONFIGS } from "./cards-config.js";

/**
 * Parse block data from DOM structure (matching backup cards structure)
 * @param {HTMLElement} block - The block element
 * @param {Function} CardsContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, CardsContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function to get trimmed text content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  // Extract section title element (first row only)
  const [cardstitle] = children;

  // Parse individual cards data (starting from row 2)
  const cardsData = children.slice(1).map((row) => {
    const rowChildren = row.children;

    // Backup structure:
    // 0: title, 1: config, 2: image, 3: icon, 4: subtitle, 5: description
    // 6: primary CTA link, 7: primary CTA asset, 8: secondary CTA link, 9: secondary CTA asset
    const [
      titleContainer,
      configContainer,
      imageContainer,
      iconContainer,
      subtitleContainer,
      descriptionContainer,
      ctaLinkContainer,
      ctaAssetContainer,
      secCtaLinkContainer,
      secCtaAssetContainer,
    ] = rowChildren;

    // Extract image
    const imageElement = imageContainer?.querySelector("img");
    const iconElement = iconContainer?.querySelector("img");

    // Extract CTAs
    const ctaLinkAnchor = ctaLinkContainer?.querySelector("a");
    const ctaAssetAnchor = ctaAssetContainer?.querySelector("a");
    const secCtaLinkAnchor = secCtaLinkContainer?.querySelector("a");
    const secCtaAssetAnchor = secCtaAssetContainer?.querySelector("a");

    // Extract field classes from config container (comma-separated)
    const configText = configContainer?.querySelector("p")?.innerText || "";
    const fieldClasses = configText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      image: imageElement
        ? {
            src: imageElement.src,
            alt: imageElement.alt || "",
          }
        : null,
      icon: iconElement
        ? {
            src: iconElement.getAttribute("src") || "",
            alt: iconElement.alt || "",
          }
        : null,
      title: getTrimmedHTML(titleContainer),
      subtitle: getTrimmedHTML(subtitleContainer),
      description: getTrimmedHTML(descriptionContainer),
      // Primary CTA (prefer asset over link)
      ctaLabel: getTrimmedText(ctaAssetAnchor || ctaLinkAnchor),
      ctaLink: ctaAssetAnchor?.href || ctaLinkAnchor?.href || "",
      ctaAriaLabel:
        ctaAssetAnchor?.getAttribute("title") ||
        ctaLinkAnchor?.getAttribute("title") ||
        "",
      ctaAsset: ctaAssetAnchor,
      isAsset1: !!ctaAssetAnchor,
      // Secondary CTA (prefer asset over link)
      secCtaLabel: getTrimmedText(secCtaAssetAnchor || secCtaLinkAnchor),
      secCtaLink: secCtaAssetAnchor?.href || secCtaLinkAnchor?.href || "",
      secCtaAriaLabel:
        secCtaAssetAnchor?.getAttribute("title") ||
        secCtaLinkAnchor?.getAttribute("title") ||
        "",
      secCtaAsset: secCtaAssetAnchor,
      isAsset2: !!secCtaAssetAnchor,
      fieldClasses: fieldClasses,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    cardstitle: getTrimmedHTML(cardstitle),
    cardsData,
  };

  // Create CardsContract instance and populate properties
  const cardsObj = new CardsContract();
  cardsObj.componentName = "Cards";
  cardsObj.blockClassList = blockClassList;
  cardsObj.cardstitle = contentData.cardstitle;
  cardsObj.cardsTitleFontSize = "";
  cardsObj.cardsData = cardsData;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, cardsObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/cards/cards.min.css",
    );
    const [, cardsModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/cards/cards.min.js"),
    ]);

    const CardsBlock = cardsModule.default;
    const CardsContract = cardsModule.CardsContract;

    const { parsedData, cardsObj } = parseBlockData(block, CardsContract);

    const cardsBlock = new CardsBlock(block, {
      moveInstrumentation,
      decorateIcon,
      createOptimizedPicture,
      componentName: "Cards",
      enableAccessibility: true,
      fieldConfigs: COMBINED_CARDS_CONFIGS,
      parsedData,
      cardsObj,
    });

    cardsBlock.init();
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}
