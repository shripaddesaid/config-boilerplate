import { loadCSS } from "../../scripts/aem.js";
import { decorateIcon } from "../../scripts/aem.js";
import { getAemConfig, moveInstrumentation } from "../../scripts/scripts.js";
import { t } from "../../translations/index.js";
import formatDate from "../../utils/formatdate.js";
import { COMBINED_PRFC_CONFIGS } from "./press-release-feed-configurable-config.js";

/**
 * Parse block data from DOM structure
 * @param {HTMLElement} block - The block element
 * @param {Function} PressReleaseFeedConfigurableContract - The contract class constructor
 * @returns {Object} Parsed data and contract instance
 */
function parseBlockData(block, PressReleaseFeedConfigurableContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function to get trimmed text content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");

  // Extract filter tags from first row (if exists)
  const [filterTagsRow] = children;
  const filterTags = filterTagsRow ? getTrimmedText(filterTagsRow) : "";

  // Extract component type and custom feed count from block classes
  let componentType = "entire-feed";
  let customFeedCount = "three-press-releases";

  if (blockClassList.includes("custom-feed")) {
    componentType = "custom-feed";
  } else if (blockClassList.includes("entire-feed")) {
    componentType = "entire-feed";
  }

  // Find custom feed count class
  const customFeedCountClass = blockClassList.find((cls) =>
    cls.match(/^(three|four|five|six|seven|eight|nine)-press-releases$/),
  );
  if (customFeedCountClass) {
    customFeedCount = customFeedCountClass;
  }

  // Content data
  const contentData = {
    blockClassList,
    filterTags,
    componentType,
    customFeedCount,
  };

  // Create PressReleaseFeedConfigurableContract instance and populate properties
  const prfcObj = new PressReleaseFeedConfigurableContract();
  prfcObj.componentName = "Press Release Feed Configurable";
  prfcObj.blockClassList = blockClassList;
  prfcObj.filterTags = filterTags;
  prfcObj.componentType = componentType;
  prfcObj.customFeedCount = customFeedCount;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, prfcObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/press-release-feed-configurable/press-release-feed-configurable.min.css",
    );
    const [, prfcModule, apiUrl] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/press-release-feed-configurable/press-release-feed-configurable.min.js"
      ),
      getAemConfig("PRESS_RELEASE_FEED_CONFIGURABLE_API"),
    ]);

    const PressReleaseFeedConfigurableBlock = prfcModule.default;
    const PressReleaseFeedConfigurableContract =
      prfcModule.PressReleaseFeedConfigurableContract;

    const { parsedData, prfcObj } = parseBlockData(
      block,
      PressReleaseFeedConfigurableContract,
    );

    const prfcBlock = new PressReleaseFeedConfigurableBlock(block, {
      moveInstrumentation,
      decorateIcon,
      formatDate,
      t,
      componentName: "Press Release Feed Configurable",
      enableAccessibility: true,
      fieldConfigs: COMBINED_PRFC_CONFIGS,
      parsedData,
      prfcObj,
      apiUrl,
    });

    prfcBlock.init();
  } catch (error) {
    console.error("Error loading press release feed configurable:", error);
  }
}
