import { loadCSS } from "../../scripts/aem.js";
import { createOptimizedPicture, decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { sanitizeHTML } from "../../utils/common.js";
import formatDate from "../../utils/formatdate.js";
import { COMBINED_NEWS_AND_STORY_CARD_CONFIGS } from "./news-and-story-card-config.js";

/**
 * Parse block data from DOM structure
 * @param {HTMLElement} block - The block element
 * @param {Function} NewsAndStoryCardContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, NewsAndStoryCardContract) {
  if (!block) return {};

  const children = Array.from(block.children);
  const blockClassList = [...block.classList];

  // Helper function to get trimmed text content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");
  const getTrimmedHTML = (el) => (el ? sanitizeHTML(el.innerHTML || "") : "");

  // First row: component title
  const componentTitleNode = children[0] || null;
  const componentTitleHtml = getTrimmedHTML(componentTitleNode);

  // Component title font size comes from block classList (e.g., title-fs-60px)
  // This will be processed by field configs in src layer

  // Remaining rows: card items (starting from index 1)
  const cardNodes = children.slice(1);
  const cardsCount = cardNodes.length;

  // Create NewsAndStoryCardContract instance with card count
  const newsAndStoryCardObj = new NewsAndStoryCardContract(
    "News and Story Card",
    cardsCount,
  );

  // Parse each card
  const cards = cardNodes
    .map((cardNode) => {
      const cardChildren = Array.from(cardNode.children);

      // News and Story Card structure:
      // 0: cardImage, 1: cardDate, 2: cardTitle, 3: config, 4: ctaContainer (div > p > anchor)
      const [cardImage, cardDate, cardTitle, configContainer, ctaContainer] =
        cardChildren;

      // Extract CTA anchors from container: div > p > a
      // Following cards.js pattern: separate link and asset anchors
      const ctaLinkAnchor = ctaContainer?.querySelector("p a");
      const ctaAssetAnchor = null; // News and story card doesn't have separate asset anchor

      // Extract field classes from config container (comma-separated in p tag)
      // Example: "news-and-story-card-item, title-fs-60px, ctaselection-link, ctaexitinterstitial-select"
      const configText = configContainer?.querySelector("p")?.innerText || "";
      const fieldClasses = configText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      return {
        cardImage,
        cardDate,
        cardTitle,
        // CTA data (matching cards.js pattern exactly)
        cardCtaLabel: getTrimmedText(ctaAssetAnchor || ctaLinkAnchor),
        ctaLink: ctaAssetAnchor?.href || ctaLinkAnchor?.href || "",
        ctaAriaLabel:
          ctaAssetAnchor?.getAttribute("title") ||
          ctaLinkAnchor?.getAttribute("title") ||
          ctaAssetAnchor?.getAttribute("aria-label") ||
          ctaLinkAnchor?.getAttribute("aria-label") ||
          "",
        ctaAsset: ctaAssetAnchor,
        isAsset: !!ctaAssetAnchor,
        fieldClasses,
        sourceRow: cardNode,
      };
    })
    .filter(Boolean);

  const parsedData = {
    componentTitle: {
      node: componentTitleNode,
      html: componentTitleHtml,
      fontSize: "", // Will be parsed from blockClassList by field configs
    },
    cards,
    blockClassList,
    elements: {
      children,
    },
  };

  return { parsedData, newsAndStoryCardObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/news-and-story-card/news-and-story-card.min.css",
    );

    const [, newsAndStoryCardModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/news-and-story-card/news-and-story-card.min.js"
      ),
    ]);

    const NewsAndStoryCard = newsAndStoryCardModule.default;
    const NewsAndStoryCardContract =
      newsAndStoryCardModule.NewsAndStoryCardContract;

    const { parsedData, newsAndStoryCardObj } = parseBlockData(
      block,
      NewsAndStoryCardContract,
    );

    const newsAndStoryCard = new NewsAndStoryCard(block, {
      moveInstrumentation,
      formatDate,
      decorateIcon,
      createOptimizedPicture,
      componentName: "News and Story Card",
      enableAccessibility: true,
      fieldConfigs: COMBINED_NEWS_AND_STORY_CARD_CONFIGS,
      parsedData,
      newsAndStoryCardObj,
    });

    newsAndStoryCard.init();
  } catch (error) {
    console.error("Error loading news-and-story-card:", error);
  }
}
