/**
 * Two Column Text Carousel Field Configurations
 * Contains field mappings and configurations for the Two Column Text Carousel component
 */

export const TWO_COLUMN_TEXT_CAROUSEL_FIELD_CONFIGS = {
  // Left column text font size configuration
  leftColumnTextFontSize: {
    field: "leftColumnTextFontSize",
    pattern: /^leftColumntext-fs-(.+)$/,
    prefix: "leftColumntext-fs",
    default: "24px",
    defaultFromField: true,
  },
  // Right column text font size configuration
  rightColumnTextFontSize: {
    field: "rightColumnTextFontSize",
    pattern: /^rightColumntext-fs-(.+)$/,
    prefix: "rightColumntext-fs",
    default: "20px",
    defaultFromField: true,
  },
};
