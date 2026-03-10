/**
 * Text Component Field Configurations
 * Contains field mappings and configurations for the Text Component
 * Updated to match _text-component.json schema and modern class-parser patterns
 */

import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../utils/base-config.js";

/**
 * Text Component specific field configurations for class parsing
 */
export const TEXT_COMPONENT_FIELD_CONFIGS = {
  // Alignment configuration
  alignment: {
    field: "alignment",
    pattern: /^alignment-(.+)$/,
    prefix: "alignment",
    default: "left",
  },

  // Font size configurations matching JSON schema
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
  },
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
  },
  footnoteFontSize: {
    field: "footnoteFontSize",
    pattern: /^footnote-fs-(.+)$/,
    prefix: "footnote-fs",
  },
  // title-font-color-secondary
  titleFontColor: {
    field: "titleFontColor",
    pattern: /^title-font-color-(.+)$/,
    prefix: "title-font-color",
    default: "primary",
  },
  titleHighlightColor: {
    field: "titleHighlightColor",
    pattern: /^title-highlighted-color-(.+)$/,
    prefix: "title-highlighted",
    default: "primary",
  },
  descriptionFontColor: {
    field: "descriptionFontColor",
    pattern: /^description-font-color-(.+)$/,
    prefix: "description-font-color",
    default: "primary",
  },
  descriptionHighlightColor: {
    field: "descriptionHighlightColor",
    pattern: /^description-highlighted-color-(.+)$/,
    prefix: "description-highlighted",
    default: "primary",
  },
};
export const TEXT_COMPONENT_CTA_CONFIGS = {
  // CTA 1 configurations
  ctaColorOne: {
    field: "ctaColorOne",
    pattern: /^ctacolor-(.+)$/,
    prefix: "ctacolor",
    default: "lime-green",
  },
  ctaStyleOne: {
    field: "ctaStyleOne",
    pattern: /^ctastyle-(.+)$/,
    prefix: "ctastyle",
    default: "primary-light",
  },
  ctaTypeOne: {
    field: "ctaTypeOne",
    pattern: /^ctaselection-(.+)$/,
    prefix: "ctaselection",
    default: "link",
  },
  ctaTargetOne: {
    field: "ctaTargetOne",
    pattern: /^ctatarget-(.+)$/,
    prefix: "ctatarget",
    default: "sameTab",
  },
  ctaExitInterstitialOne: {
    field: "ctaExitInterstitialOne",
    pattern: /^ctaexitinterstitial-(.+)$/,
    prefix: "ctaexitinterstitial",
    default: "select",
  },
};

export const TEXT_COMPONENT_CTATWO_CONFIGS = {
  // CTA 2 configurations
  ctaColorTwo: {
    field: "ctaColorTwo",
    pattern: /^ctacolor-(.+)-two$/,
    prefix: "ctacolor",
    default: "lime-green",
  },
  ctaStyleTwo: {
    field: "ctaStyleTwo",
    pattern: /^ctastyle-(.+)-two$/,
    prefix: "ctastyle",
    default: "primary-light",
  },
  ctaTypeTwo: {
    field: "ctaTypeTwo",
    pattern: /^ctaselection-(.+)-two$/,
    prefix: "ctaselection",
    default: "link",
  },
  ctaTargetTwo: {
    field: "ctaTargetTwo",
    pattern: /^ctatarget-(.+)-two$/,
    prefix: "ctatarget",
    default: "sameTab",
  },
  ctaExitInterstitialTwo: {
    field: "ctaExitInterstitialTwo",
    pattern: /^ctaexitinterstitial-(.+)-two$/,
    prefix: "ctaexitinterstitial",
    default: "select",
  },
};

/**
 * Combined field configurations for the Text Component
 */
export const COMBINED_TEXT_COMPONENT_CONFIGS = {
  ...TEXT_COMPONENT_FIELD_CONFIGS,
  ...TEXT_COMPONENT_CTA_CONFIGS,
  ...TEXT_COMPONENT_CTATWO_CONFIGS,
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
