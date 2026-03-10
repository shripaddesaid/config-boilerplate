/**
 * Timeline Card Field Configurations
 * Based on _timeline-card.json schema
 */

/**
 * Timeline Card specific field configurations for class parsing
 */
export const TIMELINE_CARD_FIELD_CONFIGS = {
  // Image placement from _timeline-card.json
  imagePlacement: {
    field: "imagePlacement",
    pattern: /^imageplacement-(.+)$/,
    prefix: "imageplacement",
    default: "left",
    defaultFromField: true,
  },
  // Title font size from _rte-title.json reference
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "",
    defaultFromField: true,
  },
  // Description font size from _rte-description.json reference
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "",
    defaultFromField: true,
  },
};

/**
 * Combined Timeline Card configurations
 */
export const COMBINED_TIMELINE_CARD_CONFIGS = {
  ...TIMELINE_CARD_FIELD_CONFIGS,
};
