/**
 * Small Width Media Field Configurations
 * Contains field mappings and configurations for the Small Width Media component
 */

import { COMMON_CTA_CONFIGS } from "../../utils/base-config.js";

/**
 * Small Width Media specific field configurations for class parsing
 * Updated to match _small-width-media.json schema
 */
export const SMALL_WIDTH_MEDIA_FIELD_CONFIGS = {
  // Text alignment configuration
  textAlignment: {
    field: "classes_textalignment",
    pattern: /^textalign-(.+)$/,
    prefix: "textalign",
    default: "center",
    defaultFromField: true,
  },

  // Font size configurations matching JSON schema
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

  backgroundVerticalPosition: {
    field: "backgroundVerticalPosition",
    pattern: /^background-vertical-(.+)$/,
    prefix: "background-vertical",
    default: "center",
    defaultFromField: true,
  },
  backgroundHorizontalPosition: {
    field: "backgroundHorizontalPosition",
    pattern: /^background-horizontal-(.+)$/,
    prefix: "background-horizontal",
    default: "center",
    defaultFromField: true,
  },
};

/**
 * Combined field configurations for the Small Width Media component
 */
export const COMBINED_SMALL_WIDTH_MEDIA_CONFIGS = {
  ...SMALL_WIDTH_MEDIA_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
};
