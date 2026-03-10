import { loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { createlinks } from "../../utils/cta.js";

/**
 * Parse block data from DOM structure in EDS layer
 * This layer handles DOM parsing and data extraction
 */
function parseBlockData(block) {
  if (!block) return { links: [], parsedData: { elements: {} } };

  const children = [...(block?.children || [])];
  const links = [];

  children.forEach((row, rowIndex) => {
    if (rowIndex > 1) return; // Only process first 2 rows (0 and 1)

    const containers = [...row.children];

    // Extract selection flags from the first child
    const selectionText = containers[0]?.textContent || "";
    const selections = selectionText.split(",").map((s) => s.trim());

    // Parse selections (index based on the comma-separated order)
    const useAssetForMain = selections[1]?.includes("asset");
    const mainHeadTargetPath = selections[2]?.includes("newtab")
      ? "newTab"
      : "sameTab";
    const exitInterstitial = selections[3]?.split("-")?.[1] || "select";
    const useAssetForSecond = selections[4]?.includes("asset");
    const subHeadTargetPath = selections[5]?.includes("newtab")
      ? "newTab"
      : "sameTab";
    const exitInterstitialTwo = selections[6]?.split("-")?.[1] || "select";

    // Helper to extract link or asset data
    const extractLinkOrAssetData = (
      linkContainer,
      assetContainer,
      useAsset,
    ) => {
      const result = {
        label: "",
        url: "",
        assetContainer: null,
        linkContainer: null,
        ariaLabel: "",
      };

      const assetElement = assetContainer?.querySelector("a");
      const hasAsset = assetElement?.innerText?.trim();

      const linkElement = linkContainer?.querySelector("a");
      const hasLinkAnchor = linkElement?.innerText?.trim();

      let paragraphElement = null;
      if (!linkElement || !hasLinkAnchor) {
        paragraphElement = linkContainer?.querySelector("p");
      }
      const hasParagraph = paragraphElement?.innerText?.trim();

      if (useAsset && hasAsset) {
        result.label = assetElement.innerText || "";
        result.ariaLabel = assetElement.getAttribute("aria-label") || "";
        result.assetContainer = assetContainer;
      } else if (hasLinkAnchor && linkElement) {
        result.label = linkElement.innerText || "";
        result.url = linkElement.href || "";
        result.ariaLabel = linkElement.getAttribute("aria-label") || "";
        result.linkContainer = linkContainer;
      } else if (hasParagraph && paragraphElement) {
        result.label = paragraphElement.innerText || "";
        result.ariaLabel = paragraphElement.getAttribute("aria-label") || "";
      } else if (hasAsset) {
        result.label = assetElement.innerText || "";
        result.ariaLabel = assetElement.getAttribute("aria-label") || "";
        result.assetContainer = assetContainer;
      }

      return result;
    };

    // Extract main link data
    const mainLinkData = extractLinkOrAssetData(
      containers[1],
      containers[2],
      useAssetForMain,
    );

    // Extract description
    let description = "";
    if (containers[3]) {
      const descElement = containers[3].querySelector("p");
      if (descElement) {
        description = descElement.innerText || "";
      }
    }

    // Extract sub-text link data
    const subLinkData = extractLinkOrAssetData(
      containers[4],
      containers[5],
      useAssetForSecond,
    );

    // Build link object
    const linkObj = {
      headlinkLabel: mainLinkData.label,
      headlinkUrl: mainLinkData.url,
      headlinkctaAsset: mainLinkData.assetContainer,
      headlinkLinkContainer: mainLinkData.linkContainer,
      headlinkArialabel: mainLinkData.ariaLabel,
      headlinkExitInterstitial: exitInterstitial,
      headlinkTargetPath: mainHeadTargetPath,
      headlinkType: useAssetForMain ? "asset" : "link",
      headlinkDescription: description,
      subtextHeadlinkLabel: subLinkData.label,
      subtextHeadlinkUrl: subLinkData.url,
      subtextHeadlinkctaAsset: subLinkData.assetContainer,
      subtextHeadlinkLinkContainer: subLinkData.linkContainer,
      subtextArialabel: subLinkData.ariaLabel,
      subexitInterstitial: exitInterstitialTwo,
      subtextHeadlinkTargetpath: subHeadTargetPath,
      subLinkType: useAssetForSecond ? "asset" : "link",
      originalElement: row, // Store original element for instrumentation
    };
    links.push(linkObj);
  });

  const parsedData = {
    links,
    elements: {
      block,
    },
  };

  return { parsedData };
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer
    const { parsedData } = parseBlockData(block);

    // Create contract instance for validation
    const { RelatedLinksContract } = await import(
      "../../../platform-blocks/relatedlinks/relatedlinks.min.js"
    );
    const relatedLinksContract = new RelatedLinksContract(
      "Related Links",
      parsedData.links,
    );

    // Validate
    const validationConfig = {
      links: parsedData.links,
    };
    const isValid = relatedLinksContract.validateContract(validationConfig);
    if (!isValid) {
      relatedLinksContract.logSummary();
    }

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/relatedlinks/relatedlinks.min.css",
    );
    const [, { default: RelatedLinks }] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/relatedlinks/relatedlinks.min.js"),
    ]);

    const relatedLinks = new RelatedLinks(block, {
      createlinks,
      moveInstrumentation,
      componentName: "Related Links",
      enableAccessibility: true,
      parsedData,
      relatedLinksContract,
    });

    relatedLinks.init();

    // Wrap link text in h4 tags
    block.querySelectorAll(".label-container a").forEach((link) => {
      link.innerHTML = `<h4>${link.textContent}</h4>`;
    });
  } catch (error) {
    console.error("Error loading relatedlinks:", error);
  }
}
