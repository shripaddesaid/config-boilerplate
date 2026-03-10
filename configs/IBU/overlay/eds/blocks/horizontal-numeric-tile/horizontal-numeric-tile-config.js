/**
 * Field configurations for horizontal numeric tile container
 */
export const HORIZONTAL_NUMERIC_TILE_CONTAINER_CONFIGS = {
  variation: {
    field: "variation",
    pattern: /^variation-(.+)$/,
    prefix: "variation",
    default: "variation-1",
    defaultFromField: true,
  },
  sectionTitleRteFontSize: {
    field: "sectionTitleRteFontSize",
    pattern: /^sectiontitle-fs-(.+)$/,
    prefix: "sectiontitle-fs-",
    default: "24px",
    defaultFromField: true,
  },
  sectionDescriptionRteFontSize: {
    field: "sectionDescriptionRteFontSize",
    pattern: /^sectiondescription-fs-(.+)$/,
    prefix: "sectiondescription-fs-",
    default: "16px",
    defaultFromField: true,
  },
  footerRteFontSize: {
    field: "footerRteFontSize",
    pattern: /^footerdescription-fs-(.+)$/,
    prefix: "footerdescription-fs-",
    default: "14px",
    defaultFromField: true,
  },
};

/**
 * Field configurations for numeric tile items
 */
export const NUMERIC_TILE_CONFIGS = {
  titleRteFontSize: {
    field: "titleRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs-",
    default: "24px",
    defaultFromField: true,
  },
  textTitleRteFontSize: {
    field: "textTitleRteFontSize",
    pattern: /^texttitle-fs-(.+)$/,
    prefix: "texttitle-fs-",
    default: "20px",
    defaultFromField: true,
  },
  descriptionRteFontSize: {
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs-",
    default: "16px",
    defaultFromField: true,
  },
};

/**
 * Combined field configurations for the Horizontal Numeric Tile component
 */
export const COMBINED_HORIZONTAL_NUMERIC_TILE_CONFIGS = {
  ...HORIZONTAL_NUMERIC_TILE_CONTAINER_CONFIGS,
  ...NUMERIC_TILE_CONFIGS,
};
