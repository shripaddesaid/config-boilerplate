/**
 * News Tile Field Configurations
 * Contains field mappings and configurations for the News Tile component
 */
import { COMMON_CTA_CONFIGS } from "../../utils/base-config.js";

export const NEWS_TILE_FIELD_CONFIGS = {
  // Title font size configuration
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "48px",
    defaultFromField: true,
  },
  // Description font size configuration
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
};

/**
 * News Tile CTA Field Configurations
 * Contains CTA-specific field mappings for News Tile component
 */
export const NEWS_TILE_CTA_CONFIGS = {
  // CTA Type configuration
  ctaTypeOne: {
    field: "ctaTypeOne",
    pattern: /^ctaselection-(.+)$/i,
    prefix: "ctaselection",
    default: "link",
    defaultFromField: true,
  },
  // Target Path configuration
  targetPathOne: {
    field: "targetPathOne",
    pattern: /^ctatarget-(.+)$/i,
    prefix: "ctatarget",
    default: "sameTab",
    defaultFromField: true,
  },
  // Exit Interstitial configuration
  exitInterstitial: {
    field: "exitInterstitial",
    pattern: /^ctaexitinterstitial-(.+)$/i,
    prefix: "ctaexitinterstitial",
    default: "select",
    defaultFromField: true,
  },
};

export const COMBINED_NEWS_TILE_CONFIGS = {
  ...NEWS_TILE_FIELD_CONFIGS,
  ...NEWS_TILE_CTA_CONFIGS,
  ...COMMON_CTA_CONFIGS,
};
