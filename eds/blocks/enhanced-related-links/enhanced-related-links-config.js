/**
 * Enhanced Related Links specific field configurations
 * These configurations parse metadata from the new DOM structure
 * where parent-level properties come from block classList
 * and item-level properties come from comma-separated text values
 */
export const ENHANCED_RELATED_LINKS_FIELD_CONFIGS = {
  overlap: {
    field: "overlap",
    pattern: /^overlap$/,
    default: "false",
    description: "Whether links overlap with previous section",
  },
  colVariation: {
    field: "colVariation",
    pattern: /^(\d+-col)$/,
    default: "3-col",
    description: "Column layout variation (3-col or 4-col)",
  },
};

/**
 * Item-level (child component) field configurations
 * These are used to parse metadata from the first div containing comma-separated values
 * Format: "enhanced-related-link, ctaselection-asset, ctatarget-newTab, ctaexitinterstitial-select"
 */
export const ENHANCED_RELATED_LINKS_ITEM_CONFIGS = {
  ctaSelection: {
    field: "ctaSelection",
    pattern: /ctaselection-([^,]+)/,
    default: "link",
    description: "CTA selection type (link or asset)",
  },
  targetPath: {
    field: "targetPath",
    pattern: /ctatarget-([^,]+)/,
    default: "sameTab",
    description: "Target path for link navigation",
  },
  exitInterstitial: {
    field: "exitInterstitial",
    pattern: /ctaexitinterstitial-([^,]+)/,
    default: "",
    description: "Exit interstitial configuration",
  },
};

/**
 * Combined configurations for Enhanced Related Links component
 */
export const COMBINED_ENHANCED_RELATED_LINKS_CONFIGS = [
  ...Object.values(ENHANCED_RELATED_LINKS_FIELD_CONFIGS),
  ...Object.values(ENHANCED_RELATED_LINKS_ITEM_CONFIGS),
];
