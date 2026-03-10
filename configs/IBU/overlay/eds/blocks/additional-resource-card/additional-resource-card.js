import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { createOptimizedPicture } from "../../scripts/scripts.js";
import { sanitizeHTML } from "../../utils/common.js";

function parseBlockData(block, AdditionalResourceCardContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Parse each card item
  const cards = children.map((cardElement) => {
    const cardChildren = [...cardElement.children];

    // Card structure: [icon, title, config, date, description, cta]
    const iconContainer = cardChildren[0] || null;
    const iconImg = iconContainer?.querySelector("img") || null;
    const title = cardChildren[1] || null;
    const configDiv = cardChildren[2] || null;
    const dateElement = cardChildren[3] || null;
    const description = cardChildren[4] || null;
    const ctaElement = cardChildren[5] || null;
    const ctaLink = ctaElement?.querySelector("a");

    // Parse config string for card-specific settings
    let cardConfig = [];
    if (configDiv?.textContent) {
      cardConfig = configDiv.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Extract icon image data
    const iconData = iconImg
      ? {
          src: iconImg.src || iconImg.getAttribute("src"),
          alt: iconImg.alt || iconImg.getAttribute("alt") || "",
          element: iconImg,
        }
      : null;

    // Use sanitizeHTML utility for title and description
    return {
      iconImg: iconData,
      title: title ? sanitizeHTML(title.innerHTML) : "",
      dateElement: dateElement,
      description: description ? sanitizeHTML(description.innerHTML) : "",
      cta: {
        label: ctaLink?.textContent.trim() || "",
        link: ctaLink?.href || "",
        ariaLabel: ctaLink?.getAttribute("aria-label") || "",
      },
      cardConfig,
      originalElement: cardElement,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    cards,
  };

  // Contract validation
  const additionalResourceCardObj = new AdditionalResourceCardContract(
    "Additional Resource Card",
    blockClassList,
    cards,
  );
  additionalResourceCardObj.componentName = "Additional Resource Card";
  additionalResourceCardObj.blockClassList = blockClassList;
  additionalResourceCardObj.cards = cards;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, additionalResourceCardObj };
}

export default async function decorate(block) {
  try {
    // Import loadCSS dynamically
    const { default: loadCSS } = await import(
      "../../../platform-blocks/utils/css-loader.min.js"
    );
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/additional-resource-card/additional-resource-card.min.css",
    );

    const [, additionalResourceCardModule, formatDateModule, configModule] =
      await Promise.all([
        loadCSS(cssPath),
        import(
          "../../../platform-blocks/additional-resource-card/additional-resource-card.min.js"
        ),
        import("../../utils/common.js"),
        import("./additional-resource-card-config.js"),
      ]);

    const AdditionalResourceCard = additionalResourceCardModule.default;
    const AdditionalResourceCardContract =
      additionalResourceCardModule.AdditionalResourceCardContract;
    const { COMBINED_ADDITIONAL_RESOURCE_CARD_CONFIGS } = configModule;
    const formatDate = formatDateModule.default;

    // Parse block data in EDS layer
    const { parsedData, additionalResourceCardObj } = parseBlockData(
      block,
      AdditionalResourceCardContract,
    );

    const additionalResourceCard = new AdditionalResourceCard(block, {
      moveInstrumentation,
      formatDate,
      moveAttributes,
      createOptimizedPicture,
      componentName: "Additional Resource Card",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_ADDITIONAL_RESOURCE_CARD_CONFIGS),
      parsedData,
      additionalResourceCardObj,
    });

    additionalResourceCard.init();
  } catch (error) {
    console.error("Error loading additional-resource-card:", error);
  }
}
