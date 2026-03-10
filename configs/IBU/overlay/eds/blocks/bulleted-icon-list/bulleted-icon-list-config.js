/**
 * BulletedIconList Field Configurations
 * Contains field mappings and configurations for the BulletedIconList component
 */

export const BULLETED_ICON_LIST_FIELD_CONFIGS = {
  // Font size configurations
  mainDescFontSize: {
    field: "mainDescFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
  },
  iconDescriptionFontSize: {
    field: "iconDescriptionFontSize",
    pattern: /^icondescription-fs-(.+)$/,
    prefix: "icondescription-fs",
    default: "16px",
  },
};

/**
 * BulletedIconList CTA Field Configurations
 * Contains CTA-specific field mappings for BulletedIconList component
 */
export const BULLETED_ICON_LIST_CTA_CONFIGS = {
  ctaStyle: {
    field: "ctaStyle",
    pattern: /^ctastyle-.*$/,
    prefix: "ctastyle",
    default: "primary",
  },
  ctaColor: {
    field: "ctaColor",
    pattern: /^ctacolor-.*$/,
    prefix: "ctacolor",
    default: "primary-light",
    defaultFromField: true,
  },
  ctaSelection: {
    field: "ctaSelection",
    pattern: /^ctaselection-.*$/,
    prefix: "ctaselection",
    defaultFromField: true,
  },

  targetPath: {
    field: "targetPath",
    pattern: /^ctatarget-.*$/,
    prefix: "ctatarget",
    default: "sameTab",
    defaultFromField: true,
  },

  exitInterstitial: {
    field: "exitInterstitial",
    pattern: /^ctaexitinterstitial-.*$/,
    prefix: "ctaexitinterstitial",
    defaultFromField: true,
  },
};

export const COMBINED_BULLETED_ICON_LIST_CONFIGS = {
  ...BULLETED_ICON_LIST_FIELD_CONFIGS,
  ...BULLETED_ICON_LIST_CTA_CONFIGS,
};
