import loadCSS from "../../../platform-blocks/utils/css-loader.min.js";
import { getFirstElement } from "../../../platform-blocks/utils/dom-utils.min.js";
import { decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_ICON_LIST_WITH_EYEBROW_CONFIGS } from "./icon-list-with-eyebrow-config.js";

function parseBlockData(block, IconListWithEyebrowContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper functions
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  // Extract main component elements (first 2 elements are eyebrow and font size)
  const [eyebrowElement, eyebrowFontSizeElement] = children;

  // Parse icon list items (remaining elements after the first 2)
  const iconListItems = children.slice(2).map((row) => {
    const itemChildren = row.children;
    const [
      iconImg,
      eyebrowText,
      title,
      titleFontSize,
      description,
      descriptionFontSize,
    ] = itemChildren;

    // Parse icon image
    const iconImageElem = getFirstElement(iconImg, "img");

    const titleFontSizeText = titleFontSize?.textContent;
    let titleFontSizeValue;
    if (titleFontSizeText) {
      titleFontSizeValue = titleFontSizeText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "icon-tile-eyebrow");
    }

    const descriptionFontSizeText = descriptionFontSize?.textContent;
    let descriptionFontSizeValue;
    if (descriptionFontSizeText) {
      descriptionFontSizeValue = descriptionFontSizeText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "icon-tile-eyebrow");
    }

    return {
      iconImg: iconImageElem,
      eyebrowText: eyebrowText,
      title: title,
      titleFontSize: titleFontSizeValue,
      description: description,
      descriptionFontSize: descriptionFontSizeValue,
      originalElement: row,
    };
  });

  // Content data with default config values
  const contentData = {
    blockClassList,
    eyebrow: eyebrowElement,
    eyebrowFontSize: eyebrowFontSizeElement?.textContent?.trim() || "",
    iconListItems,
    // Add default config values that will be overridden by CSS classes
    sectionTitleRteFontSize: "18px",
    textRteFontSize: "16px",
    descriptionRteFontSize: "14px",
  };

  // Create IconListWithEyebrowContract instance and populate properties
  const iconListWithEyebrowObj = new IconListWithEyebrowContract();
  iconListWithEyebrowObj.componentName = "Icon List With Eyebrow";
  iconListWithEyebrowObj.eyebrow = getTrimmedHTML(eyebrowElement);
  iconListWithEyebrowObj.iconListItems = iconListItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, iconListWithEyebrowObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/icon-list-with-eyebrow/icon-list-with-eyebrow.min.css",
    );
    const [, iconListWithEyebrowModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/icon-list-with-eyebrow/icon-list-with-eyebrow.min.js"
      ),
    ]);

    const IconListWithEyebrow = iconListWithEyebrowModule.default;
    const IconListWithEyebrowContract =
      iconListWithEyebrowModule.IconListWithEyebrowContract;

    const { parsedData, iconListWithEyebrowObj } = parseBlockData(
      block,
      IconListWithEyebrowContract,
    );

    const iconListWithEyebrow = new IconListWithEyebrow(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "Icon List With Eyebrow",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_ICON_LIST_WITH_EYEBROW_CONFIGS),
      parsedData,
      iconListWithEyebrowObj,
    });

    iconListWithEyebrow.init();
  } catch (error) {
    console.error("Error loading icon-list-with-eyebrow:", error);
  }
}
