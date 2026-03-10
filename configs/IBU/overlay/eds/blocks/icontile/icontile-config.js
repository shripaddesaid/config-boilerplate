/**
 * IconTile Field Configurations
 * Contains field mappings and configurations for the IconTile component
 */

export const ICONTILE_FIELD_CONFIGS = {
  // Font size configurations
  titleRteFontSize: {
    field: "titleRteFontSize",
    pattern: /^sectiontitle-fs-(.+)$/,
    prefix: "sectiontitle-fs",
    default: "32px",
    defaultFromField: true,
  },
  textRteFontSize: {
    field: "textRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "24px",
    defaultFromField: true,
  },
  descriptionRteFontSize: {
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
  // Column configuration
  columnConfiguration: {
    field: "columnConfiguration",
    pattern: /^columnconfig-(.+)$/i,
    prefix: "columnconfig",
    default: "2-col",
    defaultFromField: true,
  },
};

/**
 * IconTile CTA Field Configurations
 * Contains CTA-specific field mappings for IconTile component
 */
export const ICONTILE_CTA_CONFIGS = {
  // CTA Type configuration
  ctaTypeOne: {
    field: "ctaTypeOne",
    pattern: /^ctaSelection-(.+)$/,
    prefix: "ctaSelection",
    default: "link",
    defaultFromField: true,
  },
  // Target Path configuration
  targetPathOne: {
    field: "targetPathOne",
    pattern: /^ctaTarget-(.+)$/,
    prefix: "ctaTarget",
    default: "sameTab",
    defaultFromField: true,
  },
  // Exit Interstitial configuration
  exitInterstitial: {
    field: "exitInterstitial",
    pattern: /^ctaExitInterstitial-(.+)$/,
    prefix: "ctaExitInterstitial",
    default: "select",
    defaultFromField: true,
  },
};

export const COMBINED_ICONTILE_CONFIGS = {
  ...ICONTILE_FIELD_CONFIGS,
  ...ICONTILE_CTA_CONFIGS,
};
