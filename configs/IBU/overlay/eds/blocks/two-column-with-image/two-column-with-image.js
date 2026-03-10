import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { hasContent } from "../../utils/common.js";

function parseBlockData(block, TwoColumnWithImageContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Parse block children according to the component structure
  const [
    image,
    iconImg,
    eyebrowText,
    title,
    description,
    footnote,
    ctaLink,
    ctaAsset,
    secCtaLink,
    secCtaAsset,
  ] = children;

  const contentTexts = [
    { element: iconImg, name: "iconImg", class: "icon-container" },
    { element: eyebrowText, name: "eyebrowText", class: "eyebrow-text" },
    { element: title, name: "title", class: "title" },
    { element: description, name: "description", class: "description" },
    // Only include footnote if it has content
    ...(hasContent(footnote)
      ? [{ element: footnote, name: "footnote", class: "footnote" }]
      : []),
  ];
  // Content data structure
  const contentData = {
    blockClassList,
    image,
    contentTexts,
    ctaLink,
    ctaAsset,
    secCtaLink,
    secCtaAsset,
  };

  // Create TwoColumnWithImageContract instance
  const twoColumnWithImageObj = new TwoColumnWithImageContract();
  twoColumnWithImageObj.componentName = "Two Column With Image";
  twoColumnWithImageObj.image = image;
  twoColumnWithImageObj.contentTexts = contentTexts;
  twoColumnWithImageObj.ctaLink = ctaLink;
  twoColumnWithImageObj.ctaAsset = ctaAsset;
  twoColumnWithImageObj.secCtaLink = secCtaLink;
  twoColumnWithImageObj.secCtaAsset = secCtaAsset;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, twoColumnWithImageObj };
}

export default async function decorate(block) {
  try {
    const [{ default: loadCSS }, { ALL_TWO_COLUMN_WITH_IMAGE_CONFIGS }] =
      await Promise.all([
        import("../../../platform-blocks/utils/css-loader.min.js"),
        import("./two-column-with-image-config.js"),
      ]);
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/two-column-with-image/two-column-with-image.min.css",
    );
    const [, twoColumnWithImageModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/two-column-with-image/two-column-with-image.min.js"
      ),
    ]);

    const TwoColumnWithImage = twoColumnWithImageModule.default;
    const TwoColumnWithImageContract =
      twoColumnWithImageModule.TwoColumnWithImageContract;

    const { parsedData, twoColumnWithImageObj } = parseBlockData(
      block,
      TwoColumnWithImageContract,
    );

    const twoColumnWithImage = new TwoColumnWithImage(block, {
      moveInstrumentation,
      createOptimizedPicture,
      moveAttributes,
      componentName: "Two Column With Image",
      enableAccessibility: true,
      fieldConfigs: Object.values(ALL_TWO_COLUMN_WITH_IMAGE_CONFIGS),
      parsedData,
      twoColumnWithImageObj,
    });

    twoColumnWithImage.init();

    // Fix CTA button class names
    const ctaWrapper = block.querySelector(".cta-container");
    const ctaLink = ctaWrapper?.querySelector(
      "a.cta-button-secondary-light.cta-icon-right",
    );
    if (ctaLink) {
      ctaLink.classList.remove("cta-button-secondary-light");
      ctaLink.classList.add("cta-button-outline");
    }

    // Platform component creates footnote div during init() regardless of contentTexts array
    // Cleanup required to remove empty footnote divs from DOM
    const footnoteDiv = block.querySelector(".footnote");
    if (footnoteDiv && !hasContent(footnoteDiv)) {
      footnoteDiv.remove();
    }

    // Fix CTA arrow icons FIRST - add aria-hidden and set alt=""
    const ctaArrows = block.querySelectorAll(
      ".cta-container img, .cta-button-filled img, .cta-button-outline img, .cta-link img",
    );
    ctaArrows.forEach((arrow) => {
      // Check if this is an arrow icon (including empty alt or null)
      if (
        !arrow.alt ||
        arrow.alt === "" ||
        arrow.alt === "null" ||
        arrow.alt === "black-arrow-right" ||
        arrow.alt.toLowerCase().includes("arrow")
      ) {
        arrow.setAttribute("aria-hidden", "true");
        arrow.alt = "";
      }
    });

    // Fix alt text for remaining images - ensure alt="" when no alt text is authored
    const images = block.querySelectorAll(
      "img:not(.cta-container img):not(.cta-button-filled img):not(.cta-button-outline img):not(.cta-link img)",
    );
    images.forEach((img) => {
      if (!img.alt || img.alt === "null") {
        img.alt = "";
      }
    });
  } catch (error) {
    console.error("Error loading two-column-with-image:", error);
  }
}
