import loadCSS from "../../../platform-blocks/utils/css-loader.min.js";
import { decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import {
  ICON_CARD_CTA_CONFIGS,
  ICON_CARD_FIELD_CONFIGS,
} from "./icon-card-config.js";

/**
 * Parse block data for Icon Card component
 * @param {HTMLElement} block - The block element
 * @param {Function} IconCardContract - Contract class constructor
 * @returns {Object} Parsed data and contract object
 */
function parseBlockData(block, IconCardContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  // Parse icon card items
  const iconCardItems = children.map((row) => {
    let innerDivs = row.querySelectorAll(":scope > div");
    if (!innerDivs.length) innerDivs = row.children;

    const [
      eyebrow,
      image,
      title,
      metadata,
      description,
      cta1Link,
      cta1Asset,
      cta2Link,
      cta2Asset,
    ] = innerDivs;

    // Parse metadata for item-specific configurations
    const metadataElement = metadata?.querySelector("p");
    const metadataArray = metadataElement?.innerText
      ? metadataElement.innerText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    return {
      eyebrow,
      image,
      title,
      description,
      metadata: metadataArray,
      cta1Link,
      cta1Asset,
      cta2Link,
      cta2Asset,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    iconCardItems,
  };

  // Create IconCardContract instance
  const iconCardObj = new IconCardContract();
  iconCardObj.componentName = "Icon Card";
  iconCardObj.blockClassList = blockClassList;
  iconCardObj.iconCardItems = iconCardItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, iconCardObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/icon-card/icon-card.min.css",
    );
    const [, iconCardModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/icon-card/icon-card.min.js"),
    ]);

    const IconCard = iconCardModule.default;
    const IconCardContract = iconCardModule.IconCardContract;

    const { parsedData, iconCardObj } = parseBlockData(block, IconCardContract);

    // Combine field configs
    const combinedFieldConfigs = {
      ...ICON_CARD_FIELD_CONFIGS,
      ...ICON_CARD_CTA_CONFIGS,
    };

    const iconCard = new IconCard(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "Icon Card",
      enableAccessibility: true,
      fieldConfigs: Object.values(combinedFieldConfigs),
      parsedData,
      iconCardObj,
    });

    iconCard.init();
  } catch (error) {
    console.error("Error loading icon-card:", error);
  }
}
