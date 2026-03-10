import {
  createOptimizedPicture,
  decorateIcon,
  loadCSS,
} from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import pushAdobeAnalyticsEvent from "../../utils/analytics/launch-util.js";
import { applyCustomFontSize, decorateIconSvg } from "../../utils/common.js";
import { SEARCH_FAQ_FIELD_CONFIGS } from "./search-faq-config.js";

function parseBlockData(block, SearchFaqContract) {
  if (!block) return {};

  // Helper function to get trimmed text content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  const children = Array.from(block.children);
  const blockClassList = [...block.classList];

  const [accTitle, accSubtitle, placeHolderTitle, placeHolderText] = children;

  const items = children.slice(4).map((row) => {
    const rowChildren = row.children;
    const [
      groupTitleContainer,
      titleContainer,
      configContainer,
      descriptionContainer,
    ] = rowChildren;
    const groupTitleContainerText =
      groupTitleContainer?.querySelector("p")?.innerText || "";
    const titleContainerText =
      titleContainer?.querySelector("p")?.innerText || "";
    const configText = configContainer?.querySelector("p")?.innerText || "";
    const fieldClasses = configText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const childtitleRteFontSize = fieldClasses.filter((cls) =>
      cls.startsWith("title-fs-"),
    );
    const descriptionRteFontSize = fieldClasses.filter((cls) =>
      cls.startsWith("description-fs-"),
    );

    const descriptionContainerText =
      descriptionContainer?.querySelector("p")?.innerText || "";
    return {
      groupTitle: groupTitleContainer,
      title: titleContainer,
      fieldClasses: fieldClasses, // config
      childtitleRteFontSize: childtitleRteFontSize,
      descriptionRteFontSize: descriptionRteFontSize,
      description: descriptionContainer,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    accTitle: getTrimmedHTML(accTitle),
    accSubtitle: getTrimmedHTML(accSubtitle),
    placeHolderTitle: getTrimmedHTML(placeHolderTitle),
    placeHolderText: getTrimmedText(placeHolderText),
    items: items,
  };

  // Create Contract instance and populate properties
  const searchFaqObj = new SearchFaqContract({
    componentName: "Search FAQ",
    blockClassList,
    accTitle: contentData.accTitle,
    accSubtitle: contentData.accSubtitle,
    placeHolderTitle: contentData.placeHolderTitle,
    placeHolderText: contentData.placeHolderText,
    items: contentData.items,
  });

  const parsedData = {
    content: contentData,
  };

  return { parsedData, searchFaqObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/search-faq/search-faq.min.css",
    );
    const [, searchFaqModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/search-faq/search-faq.min.js"),
    ]);
    const SearchFaq = searchFaqModule.default;
    const SearchFaqContract = searchFaqModule.SearchFaqContract;

    const { parsedData, searchFaqObj } = parseBlockData(
      block,
      SearchFaqContract,
    );

    const searchFaq = new SearchFaq(block, {
      componentName: "Search FAQ",
      enableAccessibility: true,
      fieldConfigs: Object.values(SEARCH_FAQ_FIELD_CONFIGS),
      moveInstrumentation,
      applyCustomFontSize,
      pushAdobeAnalyticsEvent,
      decorateIconSvg,
      decorateIcon,
      createOptimizedPicture,
      parsedData,
      searchFaqObj,
    });
    searchFaq.init();
  } catch (error) {
    console.error("Error loading search-faq:", error);
  }
}
