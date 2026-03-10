import { decorateIcon, loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_EXTERNAL_VIDEO_PLAYER_LINK_CONFIGS } from "./external-video-player-link-config.js";

// Block: external video player link

function parseBlockData(block, extractCTAData, getFirstElement) {
  if (!block) return {};

  const children = [...(block?.children || [])];

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

  const items = children.map((row) => {
    const rowChildren = Array.from(row.children);
    const [
      imageDiv,
      mobileImageDiv,
      titleDiv,
      configDiv,
      descriptionDiv,
      ctaLinkDiv,
      assetDiv,
    ] = rowChildren;

    // Parse image elements
    const imageElem = getFirstElement(imageDiv, "img");
    const mobileImageElem = getFirstElement(mobileImageDiv, "img");

    // Parse config classes
    const configText = getTrimmedText(configDiv);
    const configClasses = configText
      ? configText.split(",").map((cls) => cls.trim())
      : [];

    // Parse CTA elements
    const ctaLink = getFirstElement(ctaLinkDiv, "a");
    const assetLink = getFirstElement(assetDiv, "a");

    // Extract CTA data
    const ctaData = extractCTAData(ctaLink, assetLink);

    // Determine CTA type from config
    let ctaType = "link";
    configClasses.forEach((className) => {
      if (className.startsWith("ctaselection-")) {
        ctaType = className.replace("ctaselection-", "");
      }
    });

    // Add ctaType to ctaData
    ctaData.ctaType = ctaType;

    // Item-specific configuration fields
    const itemFields = new Map([
      ["descriptionRteFontSize", "16px"],
      ["titleFontSize", "32px"],
      ["ctaColorOne", "lime-green"],
      ["ctaStyleOne", "primary-light"],
      ["ctaTypeOne", ctaType],
      ["exitInterstitial", "select"],
    ]);

    // Manual extraction from config classes
    configClasses.forEach((className) => {
      if (className.startsWith("title-fs-")) {
        const fontSize = className.replace("title-fs-", "");
        itemFields.set("titleFontSize", fontSize);
      }
      if (className.startsWith("description-fs-")) {
        const fontSize = className.replace("description-fs-", "");
        itemFields.set("descriptionRteFontSize", fontSize);
      }
      if (className.startsWith("ctacolor-")) {
        const color = className.replace("ctacolor-", "");
        itemFields.set("ctaColorOne", color);
      }
      if (className.startsWith("ctastyle-")) {
        const style = className.replace("ctastyle-", "");
        itemFields.set("ctaStyleOne", style);
      }
      if (className.startsWith("ctaselection-")) {
        const type = className.replace("ctaselection-", "");
        itemFields.set("ctaTypeOne", type);
      }
      if (className.startsWith("ctaexitinterstitial-")) {
        const interstitial = className.replace("ctaexitinterstitial-", "");
        itemFields.set("exitInterstitial", interstitial);
      }
    });

    return {
      desktopImage: imageElem?.src || "",
      mobileImage: mobileImageElem?.src || "",
      imageAlt: imageElem?.alt || "",
      title: getTrimmedHTML(titleDiv),
      description: getTrimmedHTML(descriptionDiv),
      ctaData,
      itemFields,
      configClasses,
      originalElement: row,
    };
  });

  const parsedData = {
    items,
  };

  return { parsedData };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/external-video-player-link/external-video-player-link.min.css",
    );
    const [, ExternalVideoPlayerLinkModule, domUtilsModule] = await Promise.all(
      [
        loadCSS(cssPath),
        import(
          "../../../platform-blocks/external-video-player-link/external-video-player-link.min.js"
        ),
        import("../../../platform-blocks/utils/dom-utils.min.js"),
      ],
    );
    const { extractCTAData, getFirstElement } = domUtilsModule;
    const ExternalVideoPlayerLink = ExternalVideoPlayerLinkModule.default;
    const ExternalVideoPlayerLinkContract =
      ExternalVideoPlayerLinkModule.ExternalVideoPlayerLinkContract;

    // Parse block data in EDS layer
    const { parsedData } = parseBlockData(
      block,
      extractCTAData,
      getFirstElement,
    );

    // Create ExternalVideoPlayerLinkContract instance
    const externalVideoPlayerLinkObj = new ExternalVideoPlayerLinkContract(
      "External Video Player Link",
      parsedData.items,
    );

    const externalVideoPlayerLink = new ExternalVideoPlayerLink(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "External Video Player Link",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_EXTERNAL_VIDEO_PLAYER_LINK_CONFIGS),
      parsedData,
      externalVideoPlayerLinkObj,
    });

    externalVideoPlayerLink.init();
  } catch (error) {
    console.error("Error loading external-video-player-link:", error);
  }
}
