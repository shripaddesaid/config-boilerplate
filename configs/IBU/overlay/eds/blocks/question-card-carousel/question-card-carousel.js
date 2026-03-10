import {
  addDotPagination,
  addNumericalPagination,
} from "../../../platform-blocks/utils/carousel-utils.min.js";
import { loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { applyCustomFontSize } from "../../utils/common.js";
import { QUESTION_CARD_CAROUSEL_FIELD_CONFIGS } from "./question-card-carousel-config.js";

function parseBlockData(block, QuestionCardCarouselContract) {
  const children = [...block.children];
  const blockClassList = Array.from(block.classList);
  const cards = children.map((row) => {
    const [eyebrow, description, fontSizeContainer] = row.children;

    // Extract font size directly from third column
    // Authors can input values like: 16px, 20px, 24px, etc.
    // OR config patterns like: description-fs-16px, other-config
    // Regex pattern restricts to valid font sizes: digits followed by px
    const fontSizeText = fontSizeContainer?.textContent?.trim() || "";

    let descriptionFontSizeValue = null;

    if (fontSizeText) {
      // Check if it's a config pattern (description-fs-16px) with restrictive regex
      // Pattern handles comma-separated values: description-fs-16px, other-config
      const configMatch = fontSizeText.match(/description-fs-(\d+px)(?:,|$)/);
      if (configMatch) {
        // Extract from config pattern - only captures valid px values
        descriptionFontSizeValue = configMatch[1];
      } else if (fontSizeText.match(/^\d+px$/)) {
        // Direct font size value (e.g., "16px")
        descriptionFontSizeValue = fontSizeText;
      }
    }

    // Create element-like object for compatibility with getDefaultValue()
    const descriptionFontSize = descriptionFontSizeValue
      ? { textContent: descriptionFontSizeValue }
      : fontSizeContainer;

    return {
      element: row,
      eyebrow,
      description,
      descriptionFontSize,
    };
  });
  const contentData = { blockClassList, cards };
  // Contract object
  const contractObj = new QuestionCardCarouselContract();
  contractObj.componentName = "Question Card Carousel";
  contractObj.cards = cards;
  contractObj.blockClassList = blockClassList;
  contractObj.cardsCount = cards.length;
  const result = {
    parsedData: { content: contentData },
    questionCardCarouselContractObj: contractObj,
  };
  return result;
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/question-card-carousel/question-card-carousel.min.css",
    );
    const [, questionCardCarouselModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/question-card-carousel/question-card-carousel.min.js"
      ),
    ]);
    const QuestionCardCarousel = questionCardCarouselModule.default;
    const QuestionCardCarouselContract =
      questionCardCarouselModule.QuestionCardCarouselContract;

    const { parsedData, questionCardCarouselContractObj } = parseBlockData(
      block,
      QuestionCardCarouselContract,
    );
    const questionCardCarousel = new QuestionCardCarousel(block, {
      moveInstrumentation,
      applyCustomFontSize,
      addDotPagination,
      addNumericalPagination,
      fieldConfigs: Object.values(QUESTION_CARD_CAROUSEL_FIELD_CONFIGS),
      parsedData,
      contractObj: questionCardCarouselContractObj,
    });
    questionCardCarousel.init();
  } catch (error) {
    console.error("Error loading question-card-carousel:", error);
  }
}
