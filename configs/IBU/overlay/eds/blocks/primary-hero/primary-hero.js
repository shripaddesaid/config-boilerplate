import { createOptimizedPicture, decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { loadCSS } from "../../utils/css-loader.js";
import { COMBINED_PRIMARY_HERO_CONFIGS } from "./primary-hero-config.js";

function parseBlockData(
  block,
  PrimaryHeroContract,
  extractCTAData,
  getFirstElement,
) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...(block?.classList || [])];
  const [
    titleElement,
    descElem,
    offsetContent,
    bgImageElem,
    videoElem,
    iconElem,
    ctaLink,
    ctaAssetLink,
    ctaLink2,
    ctaAssetLink2,
  ] = [...children];

  // Helper function to safely get text content
  const getTrimmedText = (el) => {
    const text = el?.textContent?.trim() || "";
    if (el) el.textContent = "";
    return text;
  };

  // Helper function to safely get HTML content
  const getTrimmedHTML = (el) => {
    if (!el) return "";
    const html = el.innerHTML || "";
    return html;
  };

  // Parse image and video elements using utility functions
  const imageElem = getFirstElement(bgImageElem, "img");
  const iconImageElem = getFirstElement(iconElem, "img");
  const videoSource = getFirstElement(videoElem, "a");

  // Parse CTA elements using utility functions
  const firstCTA = getFirstElement(ctaLink, "a");
  const firstAssetCTA = getFirstElement(ctaAssetLink, "a");
  const secondCTA = getFirstElement(ctaLink2, "a");
  const secondAssetCTA = getFirstElement(ctaAssetLink2, "a");

  // Extract background type from class list
  let backgroundType = "imageSlide"; // default
  const bgType = blockClassList.find(
    (cls) => cls === "imageSlide" || cls === "videoSlide",
  );
  backgroundType = bgType || backgroundType;

  // Extract text color from class list
  const textColorClass = blockClassList.find((cls) =>
    cls.startsWith("textcolor-"),
  );
  const textColor = textColorClass
    ? textColorClass.replace("textcolor-", "")
    : "white";

  // Enable gradient only when text color is white
  const enableGradient = textColor.toLowerCase() === "white";

  // Content data
  const contentData = {
    title: getTrimmedHTML(titleElement),
    description: getTrimmedHTML(descElem),
    offsetContent: getTrimmedText(offsetContent) || "false",
    backgroundType,
    backgroundImage: imageElem?.src || "",
    imageAlt: imageElem?.alt || "",
    backgroundVideo: videoSource?.href || "",
    icon: iconImageElem?.src || "",
    iconAlt: iconImageElem?.alt || "",
    enableGradient: String(enableGradient),
  };

  // CTA data using utility functions
  const ctaData = {
    primary: extractCTAData(firstCTA, firstAssetCTA),
    secondary: extractCTAData(secondCTA, secondAssetCTA),
  };

  // Create PrimaryHeroContract instance and populate properties
  const primaryHeroObj = new PrimaryHeroContract(
    "Primary Hero",
    getTrimmedHTML(titleElement),
    getTrimmedHTML(descElem),
    imageElem?.src || "",
    videoSource?.href || "",
  );

  const parsedData = {
    content: contentData,
    ctaData,
    elements: {
      titleElement,
      descElem,
      offsetContent,
      bgImageElem,
      videoElem,
      iconElem,
      ctaLink,
      ctaAssetLink,
      ctaLink2,
      ctaAssetLink2,
    },
  };

  return { parsedData, primaryHeroObj };
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/primary-hero/primary-hero.min.css",
    );

    const [, primaryHeroModule, domUtilsModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/primary-hero/primary-hero.min.js"),
      import("../../../platform-blocks/utils/dom-utils.min.js"),
    ]);

    const PrimaryHero = primaryHeroModule.default;
    const PrimaryHeroContract = primaryHeroModule.PrimaryHeroContract;
    const { extractCTAData, getFirstElement } = domUtilsModule;

    const { parsedData, primaryHeroObj } = parseBlockData(
      block,
      PrimaryHeroContract,
      extractCTAData,
      getFirstElement,
    );

    const primaryHero = new PrimaryHero(block, {
      createOptimizedPicture,
      moveInstrumentation,
      decorateIcon,
      componentName: "Primary Hero",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_PRIMARY_HERO_CONFIGS),
      parsedData,
      primaryHeroObj,
    });

    primaryHero.init();

    // Ensure font class is properly applied to title
    const titleElement = block.querySelector(".title");
    if (titleElement) {
      const blockClasses = [...block.classList];
      const titleFontClass = blockClasses.find((cls) =>
        cls.startsWith("titlefont-"),
      );

      if (titleFontClass) {
        const fontName = titleFontClass.replace("titlefont-", "").toLowerCase();
        const fontClassMap = {
          garamond: "Garamond",
          ringside: "Ringside",
        };
        const mappedClass = fontClassMap[fontName];
        if (mappedClass) {
          titleElement.classList.add(mappedClass);
        }
      }
    }

    const ctaContainer = block.querySelectorAll(".btn-container a");
    if (ctaContainer && ctaContainer.length > 1) {
      ctaContainer?.forEach((item) => {
        if (item.classList.contains("cta-button-primary-white")) {
          item.classList.remove("cta-button-primary-white");
          item.classList.add("cta-button-primary-light");
        } else if (item.classList.contains("cta-button-secondary-white")) {
          item.classList.remove("cta-button-secondary-white");
          item.classList.add("cta-button-primary-dark");
        }
      });
    }
  } catch (error) {
    console.error("Error loading primary-hero:", error);
  }
}
