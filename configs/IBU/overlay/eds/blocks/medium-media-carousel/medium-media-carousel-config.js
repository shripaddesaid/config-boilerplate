/**
 * Medium Media Carousel Field Configurations
 * Contains field mappings and configurations for the Medium Media Carousel component
 */
import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../../platform-blocks/utils/class-parser.min.js";

export const MEDIUM_MEDIA_CAROUSEL_FIELD_CONFIGS = {
  // Title font size configuration
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "",
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
};

export const COMBINED_MEDIUM_MEDIA_CAROUSEL_CONFIGS = {
  ...MEDIUM_MEDIA_CAROUSEL_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
