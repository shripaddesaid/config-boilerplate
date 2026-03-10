/**
 * Additional Resource Card Field Configurations
 * Contains field mappings and configurations for the Additional Resource Card component
 */

export const ADDITIONAL_RESOURCE_CARD_FIELD_CONFIGS = {
  // Font size configurations
  titleRteFontSize: {
    field: "titleRteFontSize",
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
};

/**
 * Additional Resource Card CTA Field Configurations
 * Contains CTA-specific field mappings for Additional Resource Card component
 */
export const ADDITIONAL_RESOURCE_CARD_CTA_CONFIGS = {
  // CTA Type configuration
  ctaTypeOne: {
    field: "ctaTypeOne",
    pattern: /^ctaselection-(.+)$/i,
    prefix: "ctaselection",
    default: "link",
    defaultFromField: true,
  },
  // Target Path configuration
  targetPathOne: {
    field: "targetPathOne",
    pattern: /^ctatarget-(.+)$/i,
    prefix: "ctatarget",
    default: "sameTab",
    defaultFromField: true,
  },
  // Exit Interstitial configuration
  exitInterstitial: {
    field: "exitInterstitial",
    pattern: /^ctaexitinterstitial-(.+)$/i,
    prefix: "ctaexitinterstitial",
    default: "select",
    defaultFromField: true,
  },
};

export const COMBINED_ADDITIONAL_RESOURCE_CARD_CONFIGS = {
  ...ADDITIONAL_RESOURCE_CARD_FIELD_CONFIGS,
  ...ADDITIONAL_RESOURCE_CARD_CTA_CONFIGS,
};
