/**
 * Primary Hero Field Configurations
 * Contains field mappings and configurations for the Primary Hero component
 */
import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../utils/base-config.js";
export const PRIMARY_HERO_FIELD_CONFIGS = {
  // Background type configuration
  primaryBackgroundType: {
    field: "primaryBackgroundType",
    pattern: /^(imageslide|videoslide)$/,
    default: "imageslide",
    defaultFromField: true,
  },
  // Font size configurations
  textRteFontSize: {
    field: "textRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },
  descriptionRteFontSize: {
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
  // Title font configuration
  titleFont: {
    field: "titleFont",
    pattern: /^titlefont-(.+)$/,
    prefix: "titlefont-",
    default: "Ringside",
    defaultFromField: true,
  },
  // Hero size configuration
  size: {
    field: "size",
    pattern: /^herosize-(.+)$/,
    prefix: "herosize",
    default: "large",
    defaultFromField: true,
  },
  // Text color configuration
  textColor: {
    field: "textColor",
    pattern: /^textcolor-(.+)$/,
    prefix: "textcolor",
    default: "white",
    defaultFromField: true,
  },
  // Overlay effect configuration
  overlayEffect: {
    field: "overlayEffect",
    pattern: /^overlay-(.+)$/,
    prefix: "overlay",
    default: "light",
    defaultFromField: true,
  },
};

export const COMBINED_PRIMARY_HERO_CONFIGS = {
  ...PRIMARY_HERO_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
