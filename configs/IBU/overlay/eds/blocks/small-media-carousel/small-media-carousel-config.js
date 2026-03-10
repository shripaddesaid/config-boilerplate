/**
 * Small Media Carousel Field Configurations
 * Contains field mappings and configurations for the Small Media Carousel component
 */

export const SMALL_MEDIA_CAROUSEL_FIELD_CONFIGS = {
  // Title placement configuration
  titlePlacement: {
    field: "titlePlacement",
    pattern: /^titleplacement-(.+)$/,
    prefix: "titleplacement",
    default: "top",
    defaultFromField: true,
  },
  // Font size configurations for carousel items
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: null,
    defaultFromField: true,
  },
};

/**
 * Small Media Carousel Item Field Configurations
 * Contains field mappings for individual carousel items
 */
export const SMALL_MEDIA_CAROUSEL_ITEM_FIELD_CONFIGS = {
  // Item-specific font size configuration
  itemTitleFontSize: {
    field: "itemTitleFontSize",
    pattern: /^item-title-fs-(.+)$/,
    prefix: "item-title-fs",
    default: null,
    defaultFromField: true,
  },
};

export const COMBINED_SMALL_MEDIA_CAROUSEL_CONFIGS = {
  ...SMALL_MEDIA_CAROUSEL_FIELD_CONFIGS,
  ...SMALL_MEDIA_CAROUSEL_ITEM_FIELD_CONFIGS,
};
