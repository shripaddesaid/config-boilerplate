import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../utils/base-config.js";
/**
 * Two Column With Image specific field configurations for class parsing
 * Updated to match _two-column-with-image.json schema
 */
export const TWO_COLUMN_WITH_IMAGE_FIELD_CONFIGS = {
  // Image placement configuration
  imagePlacement: {
    field: "imagePlacement",
    pattern: /^imageplacement-(.+)$/,
    prefix: "imageplacement",
    default: "left",
    defaultFromField: true,
  },

  ctaAlignment: {
    field: "ctaAlignment",
    pattern: /^ctaalignment-(.+)$/,
    prefix: "ctaalignment",
    default: "left",
    defaultFromField: true,
  },
  // Background color configuration
  backgroundColor: {
    field: "backgroundColor",
    pattern: /^background-color-(.+)$/,
    prefix: "background-color",
    default: "transparent",
    defaultFromField: true,
  },

  // Media type configuration
  mediaType: {
    field: "classes_mediatype",
    pattern: /^mediaType-(.+)$/,
    prefix: "mediaType",
    default: "picture",
    defaultFromField: true,
  },

  // Font size configurations
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },

  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },

  footnoteFontSize: {
    field: "footnoteFontSize",
    pattern: /^footnote-fs-(.+)$/,
    prefix: "footnote-fs",
    default: "14px",
    defaultFromField: true,
  },

  // Text vertical alignment configuration
  textPlacement: {
    field: "textPlacement",
    pattern: /^textplacement-(.+)$/,
    prefix: "textplacement",
    default: "top",
    defaultFromField: true,
  },
};

/**
 * Complete field configurations combining all component fields
 */
export const ALL_TWO_COLUMN_WITH_IMAGE_CONFIGS = {
  ...TWO_COLUMN_WITH_IMAGE_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
