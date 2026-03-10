/**
 * Pull Quote Field Configurations
 * Contains field mappings and configurations for the Pull Quote component
 */

export const PULL_QUOTE_FIELD_CONFIGS = {
  // Component type configuration
  componentType: {
    field: "componentType",
    pattern: /^image-(.+)$/,
    prefix: "image",
    default: "none",
    defaultFromField: true,
  },
  // Image position configuration
  imagePosition: {
    field: "imagePosition",
    pattern: /^align-(.+)$/,
    prefix: "align",
    default: "left",
    defaultFromField: true,
  },
  // Alignment configuration
  alignment: {
    field: "alignment",
    pattern: /^icon-align-(.+)$/,
    prefix: "icon-align",
    default: "left",
    defaultFromField: true,
  },
  // Quote font size configuration
  quoteRteFontSize: {
    field: "quoteRteFontSize",
    pattern: /^quote-fs-(.+)$/,
    prefix: "quote-fs",
    default: "36px",
    defaultFromField: true,
  },
};
