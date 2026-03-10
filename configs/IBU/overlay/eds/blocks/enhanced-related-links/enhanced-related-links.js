import { EnhancedRelatedLinksContract } from "../../../platform-blocks/enhanced-related-links/enhanced-related-links.min.js";
import { loadCSS } from "../../scripts/aem.js";
import { decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { createCTAButton } from "../../utils/cta.js";
// Block: enhanced-related-links
import {
  COMBINED_ENHANCED_RELATED_LINKS_CONFIGS,
  ENHANCED_RELATED_LINKS_ITEM_CONFIGS,
} from "./enhanced-related-links-config.js";

/**
 * Parses enhanced related links block data
 * Handles both old and new DOM structures
 * @param {HTMLElement} block - The block element
 * @returns {Object} Parsed data including items and parent properties
 */
function parseBlockData(block) {
  if (!block) return { items: [], parentProps: {} };

  const children = [...(block?.children || [])];

  // Detect if this is new structure (with metadata in first div of items)
  // or old structure (with individual property divs for each field)
  const isNewStructure = detectNewStructure(children);

  if (isNewStructure) {
    return parseNewStructure(block, children);
  }
  return parseOldStructure(block, children);
}

/**
 * Detect if block uses new or old DOM structure
 * New structure: items have first div with comma-separated metadata
 * Old structure: items have separate divs for each property
 */
function detectNewStructure(children) {
  // Look for items (divs with data-aue-resource containing "item")
  for (const child of children) {
    if (
      child.hasAttribute("data-aue-resource") &&
      child.getAttribute("data-aue-resource").includes("/item")
    ) {
      // Check if first child div contains metadata text with "ctaselection-"
      const firstDiv = child.querySelector("div");
      if (firstDiv) {
        const text = firstDiv.textContent?.trim() || "";
        if (text.includes("ctaselection-")) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Parse new DOM structure where items have metadata in comma-separated format
 */
function parseNewStructure(block, children) {
  const parentProps = {
    overlap: "false",
    colVariation: "3-col",
  };

  // Extract parent properties from block className
  const classList = [...block.classList];
  classList.forEach((cls) => {
    if (cls === "true") {
      parentProps.overlap = "true";
    } else if (cls.match(/^\d+-col$/)) {
      parentProps.colVariation = cls;
    }
  });

  // Also check for overlap in the first child (old compatibility)
  if (children[0]) {
    const overlapText = children[0].textContent?.trim() || "";
    if (overlapText.toLowerCase() === "true") {
      parentProps.overlap = "true";
    }
  }

  // Filter out parent property divs and collect items
  const items = [];
  for (const child of children) {
    if (
      child.hasAttribute("data-aue-resource") &&
      child.getAttribute("data-aue-resource").includes("/item")
    ) {
      items.push(child);
    }
  }

  return {
    items,
    parentProps,
  };
}

/**
 * Parse old DOM structure (backward compatibility)
 */
function parseOldStructure(block, children) {
  const parentProps = {
    overlap: "false",
    colVariation: "3-col",
  };

  // Extract from old structure: first 3 divs contain overlap, eyebrow, colVariation
  if (children[0]) {
    const overlapText = children[0].textContent?.trim() || "";
    if (overlapText.toLowerCase() === "true") {
      parentProps.overlap = "true";
    }
  }

  if (children[2]) {
    const varText = children[2].textContent?.trim() || "";
    if (varText === "4-col" || varText === "3-col") {
      parentProps.colVariation = varText;
    }
  }

  // Extract items (divs with data-aue-resource containing "/item")
  const items = [];
  for (const child of children) {
    if (
      child.hasAttribute("data-aue-resource") &&
      child.getAttribute("data-aue-resource").includes("/item")
    ) {
      items.push(child);
    }
  }

  return {
    items,
    parentProps,
  };
}

/**
 * Extract metadata from new structure item metadata string
 * Format: "enhanced-related-link, ctaselection-asset, ctatarget-newTab, ctaexitinterstitial-select"
 */
function extractItemMetadata(metadataString) {
  const metadata = {
    ctaSelection: "link",
    targetPath: "sameTab",
    exitInterstitial: "",
  };

  if (!metadataString) return metadata;

  // Parse using regex patterns from config
  Object.values(ENHANCED_RELATED_LINKS_ITEM_CONFIGS).forEach((config) => {
    const match = metadataString.match(config.pattern);
    if (match?.[1]) {
      metadata[config.field] = match[1];
    }
  });

  return metadata;
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer
    const { items, parentProps } = parseBlockData(block);

    // Extract eyebrow from parent structure (div[1])
    let eyebrowHtml = "";
    const children = [...(block?.children || [])];
    if (children[1]) {
      const eyebrowDiv = children[1].querySelector("div");
      if (eyebrowDiv) {
        eyebrowHtml = eyebrowDiv.innerHTML || "";
      }
    }

    // Create contract object for validation
    const enhancedRelatedLinksObj = new EnhancedRelatedLinksContract(
      "Enhanced Related Links",
      items,
    );

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/enhanced-related-links/enhanced-related-links.min.css",
    );
    const [, { default: EnhancedRelatedLinks }] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/enhanced-related-links/enhanced-related-links.min.js"
      ),
    ]);

    // Transform items to extract field data
    const parsedItems = items.map((itemDiv) => {
      const itemChildren = [...itemDiv.children];

      // Extract metadata from first div (new structure)
      const metadataDiv = itemChildren[0];
      const metadataString = metadataDiv?.textContent?.trim() || "";
      const itemMetadata = extractItemMetadata(metadataString);

      // Extract link data from div[1] if it has an anchor tag
      let linkHeadline = "";
      let linkUrl = "";
      let linkAriaLabel = "";
      let linkAnchor = null;

      if (itemChildren[1]) {
        linkAnchor = itemChildren[1].querySelector("a");
        if (linkAnchor) {
          linkHeadline = linkAnchor.textContent?.trim() || "";
          linkUrl = linkAnchor.href || "";
          linkAriaLabel =
            linkAnchor.getAttribute("title") ||
            linkAnchor.getAttribute("aria-label") ||
            "";
        }
      }

      // Extract asset data from div[2] if it has an anchor tag
      let assetAnchor = null;
      let assetLabel = "";
      let assetAriaLabel = "";
      let assetUrl = "";

      if (itemChildren[2]) {
        assetAnchor = itemChildren[2].querySelector("a");
        if (assetAnchor) {
          assetLabel = assetAnchor.textContent?.trim() || "";
          assetAriaLabel =
            assetAnchor.getAttribute("title") ||
            assetAnchor.getAttribute("aria-label") ||
            "";
          assetUrl = assetAnchor.href || "";
        }
      }

      return {
        headlinkLabel: linkHeadline,
        ctaType: itemMetadata.ctaSelection,
        headlinkUrl: linkUrl,
        linkAnchor: linkAnchor,
        assetAnchor: assetAnchor,
        assetUrl: assetUrl,
        assetLabel: assetLabel,
        ariaLabel: linkAriaLabel,
        assetAriaLabel: assetAriaLabel,
        headlinkTargetPath: itemMetadata.targetPath,
        exitInterstitial: itemMetadata.exitInterstitial,
        // Keep original div for instrumentation
        originalDiv: itemDiv,
      };
    });

    const enhancedRelatedLinks = new EnhancedRelatedLinks(block, {
      moveInstrumentation,
      decorateIcon,
      createCTAButton,
      componentName: "Enhanced Related Links",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_ENHANCED_RELATED_LINKS_CONFIGS),
      parsedData: {
        items: parsedItems,
        parentProps: {
          ...parentProps,
          eyebrow: eyebrowHtml,
        },
      },
      enhancedRelatedLinksObj,
    });

    enhancedRelatedLinks.init();
  } catch (error) {
    console.error("Error loading enhanced-related-links:", error);
  }
}
