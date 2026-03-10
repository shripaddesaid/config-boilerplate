import { decorateIcon, loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import {
  addDotPagination,
  addNumericalPagination,
} from "../../utils/carousel.js";
import formatDate from "../../utils/formatdate.js";

/**
 * Parse block data from DOM structure following the news-tile-item authoring model
 * @param {HTMLElement} block - The block element
 * @param {Function} NewsTileContract - Contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, NewsTileContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper to get trimmed text
  const getTrimmedText = (el) => el?.textContent?.trim() || "";

  // Parse each tile based on the news-tile-item authoring model
  const tiles = children
    .map((tileNode, index) => {
      const tileChildren = [...tileNode.children];

      // Handle 6-column structure (condensed authoring format)
      if (tileChildren.length === 6) {
        const [
          eyebrowText,
          titleDiv,
          configDiv,
          descriptionDiv,
          ctaLinkLabel,
          ctaAssetLabel,
        ] = tileChildren;

        // Parse config from column 2
        const configText = getTrimmedText(configDiv);
        const configValues = configText.split(",").map((s) => s.trim());

        // Extract date from title div if present
        let dateValue = null;
        let cleanTitleDiv = titleDiv;

        if (titleDiv) {
          const titleParagraphs = titleDiv.querySelectorAll("p");
          if (titleParagraphs.length >= 2) {
            const secondPText = titleParagraphs[1].textContent?.trim();
            if (secondPText?.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
              dateValue = secondPText;
              cleanTitleDiv = titleDiv.cloneNode(false);
              cleanTitleDiv.appendChild(titleParagraphs[0].cloneNode(true));
            }
          }
        }

        // Extract CTA information from authored data
        let authoredCtaUrl = null;
        let authoredAssetUrl = null;
        let ctaAriaLabel = null;

        tileChildren.forEach((col) => {
          const links = col.querySelectorAll("a");
          links.forEach((link) => {
            const href = link.getAttribute("href");
            ctaAriaLabel = link.getAttribute("title");
            if (href) {
              if (!authoredCtaUrl && !href.includes("sample-document.pdf")) {
                authoredCtaUrl = href;
              }
              if (
                href.includes(".pdf") ||
                href.includes("/content/dam/") ||
                href.includes("delivery-p") ||
                href.includes("adobe/assets") ||
                href.includes(".avif") ||
                href.includes(".png") ||
                href.includes(".jpg") ||
                href.includes(".jpeg")
              ) {
                authoredAssetUrl = href;
              }
            }
          });
        });

        return {
          eyebrowText,
          titleDiv: cleanTitleDiv,
          dateElement: dateValue,
          descriptionDiv,
          ctaLinkLabel,
          ctaAssetLabel,
          ctaAriaLabel,
          authoredCtaUrl,
          authoredAssetUrl,
          tileConfig: configValues,
          originalElement: tileNode,
        };
      }

      // Handle full authoring model structure (9+ columns)
      if (tileChildren.length >= 9) {
        const [
          eyebrowText,
          titleDiv,
          titleFontSize,
          date,
          descriptionDiv,
          descriptionFontSize,
          ctaTypeElement,
          ctaLinkText,
          ctaAssetText,
          ctaLinkUrl,
          ctaAssetUrl,
          ctaLinkAriaLabel,
          ctaAssetAriaLabel,
          targetPath,
          exitInterstitial,
        ] = tileChildren;

        return {
          eyebrowText,
          titleDiv,
          titleFontSize,
          dateElement: date,
          descriptionDiv,
          descriptionFontSize,
          ctaTypeElement,
          ctaLinkText,
          ctaAssetText,
          ctaLinkUrl,
          ctaAssetUrl,
          ctaLinkAriaLabel,
          ctaAssetAriaLabel,
          targetPath,
          exitInterstitial,
          originalElement: tileNode,
        };
      }

      console.warn(
        `Unsupported column count: ${tileChildren.length} for tile ${index}`,
      );
      return null;
    })
    .filter(Boolean);

  // Content data
  const contentData = {
    blockClassList,
    tiles,
  };

  // Contract validation
  const newsTileObj = new NewsTileContract("News Tile", tiles.length);
  newsTileObj.componentName = "News Tile";
  newsTileObj.blockClassList = blockClassList;
  newsTileObj.tiles = tiles;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, newsTileObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/news-tile/news-tile.min.css",
    );

    const [, newsTileModule, configModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/news-tile/news-tile.min.js"),
      import("./news-tile-config.js"),
    ]);

    const NewsTile = newsTileModule.default;
    const NewsTileContract = newsTileModule.NewsTileContract;
    const { COMBINED_NEWS_TILE_CONFIGS } = configModule;

    // Parse block data in EDS layer
    const { parsedData, newsTileObj } = parseBlockData(block, NewsTileContract);

    const newsTile = new NewsTile(block, {
      moveInstrumentation,
      formatDate,
      decorateIcon,
      addDotPagination,
      addNumericalPagination,
      componentName: "News Tile",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_NEWS_TILE_CONFIGS),
      parsedData,
      newsTileObj,
    });

    newsTile.init();
  } catch (error) {
    console.error("Error loading news-tile:", error);
  }
}
