import { decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { sanitizeHTML } from "../../utils/common.js";

function parseBlockData(block, BulletedIconListContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];

  const blockClassList = [...block.classList];

  // Helper functions
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  // Extract main component elements
  const [description, ctaLink, ctaAsset] = children;

  // Parse CTA
  const ctaLinkAnchor = ctaLink?.querySelector("a");
  const ctaAssetAnchor = ctaAsset?.querySelector("a");

  // Parse bulleted items
  const bulletedItems = children.slice(3).map((row) => {
    const itemChildren = row.children;
    const [iconContainer, descriptionContainer, dropdownFields] = itemChildren;
    const iconImg = iconContainer?.querySelector("img");
    let childDescFontSize;
    if (dropdownFields) {
      childDescFontSize = dropdownFields.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "bulleted-icon-list-item");
    }
    return {
      icon: iconImg,
      iconDescription: descriptionContainer,
      iconDescriptionFontSize: childDescFontSize,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    description,
    ctaLinkAnchor,
    ctaAssetAnchor,
    bulletedItems,
  };

  // Create BulletedIconListContract instance and populate properties
  const bulletedIconListObj = new BulletedIconListContract();
  bulletedIconListObj.componentName = "Bulleted Icon List";
  // Use sanitizeHTML utility for description
  bulletedIconListObj.description = description
    ? sanitizeHTML(getTrimmedHTML(description))
    : "";
  bulletedIconListObj.ctaLinkAnchor = ctaLinkAnchor;
  bulletedIconListObj.ctaAssetAnchor = ctaAssetAnchor;
  bulletedIconListObj.bulletedItems = bulletedItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, bulletedIconListObj };
}

export default async function decorate(block) {
  try {
    // Import loadCSS dynamically
    const { default: loadCSS } = await import(
      "../../../platform-blocks/utils/css-loader.min.js"
    );

    const cssPath = import.meta.resolve(
      "../../../platform-blocks/bulleted-icon-list/bulleted-icon-list.min.css",
    );
    const [, bulletedIconListModule, configModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/bulleted-icon-list/bulleted-icon-list.min.js"
      ),
      import("./bulleted-icon-list-config.js"),
    ]);

    const BulletedIconList = bulletedIconListModule.default;
    const BulletedIconListContract =
      bulletedIconListModule.BulletedIconListContract;
    const { COMBINED_BULLETED_ICON_LIST_CONFIGS } = configModule;

    const { parsedData, bulletedIconListObj } = parseBlockData(
      block,
      BulletedIconListContract,
    );

    const bulletedIconList = new BulletedIconList(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "Bulleted Icon List",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_BULLETED_ICON_LIST_CONFIGS),
      parsedData,
      bulletedIconListObj,
    });

    bulletedIconList.init();
  } catch (error) {
    console.error("Error loading bulleted-icon-list:", error);
  }
}
