/**
 * Promo Banner Field Configurations
 * Contains field mappings and configurations for the Promo Banner component
 */

import { COMMON_CTA_CONFIGS } from "../../utils/class-parser.js";

/**
 * Promo Banner specific field configurations for class parsing
 */
export const PROMO_BANNER_FIELD_CONFIGS = {
  textAlignment: {
    field: "textAlignment",
    pattern: /^textalign-(.+)$/,
    prefix: "textalign",
    default: "left",
    defaultFromField: true,
  },
  highlightColor: {
    field: "highlightColor",
    pattern: /^highlight-(.+)$/,
    prefix: "highlight",
    default: "lime-green",
    defaultFromField: true,
  },
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    defaultFromField: true,
  },
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    defaultFromField: true,
  },
};

/**
 * Promo Banner CTA configurations based on JSON structure
 */
export const PROMO_BANNER_CTA_CONFIGS = {
  // CTA Color Configuration
  ctaColorOne: {
    field: "ctaColorOne",
    pattern: /^ctacolor-(.+)$/,
    prefix: "ctacolor",
    default: "lime-green",
    defaultFromField: true,
  },

  // CTA Style Configuration
  ctaStyleOne: {
    field: "ctaStyleOne",
    pattern: /^ctastyle-(.+)$/,
    prefix: "ctastyle",
    default: "primary-light",
    defaultFromField: true,
  },

  // CTA Type Configuration (button vs link styling)
  ctaTypeOne: {
    field: "ctaTypeOne",
    pattern: /^ctatype-(.+)$/,
    prefix: "ctatype",
    default: "button",
    defaultFromField: true,
  },

  // CTA Selection Configuration
  ctaSelectionOne: {
    field: "ctaSelectionOne",
    pattern: /^ctaselection-(.+)$/,
    prefix: "ctaselection",
    default: "link",
    defaultFromField: true,
  },

  // Target Path Configuration
  ctaTargetOne: {
    field: "ctaTargetOne",
    pattern: /^ctatarget-(.+)$/,
    prefix: "ctatarget",
    default: "sameTab",
    defaultFromField: true,
  },

  // Exit Interstitial Configuration
  ctaExitInterstitialOne: {
    field: "ctaExitInterstitialOne",
    pattern: /^ctaexitinterstitial-(.+)$/,
    prefix: "ctaexitinterstitial",
    default: "select",
    defaultFromField: true,
  },
};

/**
 * Combined field configurations for the Promo Banner component
 */
export const COMBINED_PROMO_BANNER_CONFIGS = {
  ...PROMO_BANNER_FIELD_CONFIGS,
  ...PROMO_BANNER_CTA_CONFIGS,
  ...COMMON_CTA_CONFIGS,
};
