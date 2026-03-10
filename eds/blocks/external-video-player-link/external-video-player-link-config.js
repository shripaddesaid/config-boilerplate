/**
 * External Video Player Link specific field configurations for class parsing
 * Updated to match _external-video-player-link.json and _external-video-player-link-item.json schema
 */
export const EXTERNAL_VIDEO_PLAYER_LINK_FIELD_CONFIGS = {
  // Font size configurations matching JSON schema
  descriptionRteFontSize: {
    field: "classes_descriptionRtefontsize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },
};

/**
 * External Video Player Link CTA configurations extending common patterns
 * Updated to match JSON schema field names and patterns
 */
export const EXTERNAL_VIDEO_PLAYER_LINK_CTA_CONFIGS = {
  // External Video Player Link specific CTA patterns matching your authored classes
  ctaColorOne: {
    field: "classes_ctacolorone",
    pattern: /^ctacolor-(.+)$/,
    prefix: "ctacolor",
    default: "lime-green",
    defaultFromField: true,
  },
  ctaStyleOne: {
    field: "classes_ctastyleone",
    pattern: /^ctastyle-(.+)$/,
    prefix: "ctastyle",
    default: "primary-light",
    defaultFromField: true,
  },
  ctaTypeOne: {
    field: "classes_ctatypeone",
    pattern: /^ctaselection-(.+)$/,
    prefix: "ctaselection",
    default: "link",
    defaultFromField: true,
  },
  exitInterstitial: {
    field: "classes_exitinterstitial",
    pattern: /^ctaexitinterstitial-(.+)$/,
    prefix: "ctaexitinterstitial",
    default: "select",
    defaultFromField: true,
  },
};

/**
 * Combined External Video Player Link configurations
 */
export const COMBINED_EXTERNAL_VIDEO_PLAYER_LINK_CONFIGS = {
  ...EXTERNAL_VIDEO_PLAYER_LINK_FIELD_CONFIGS,
  ...EXTERNAL_VIDEO_PLAYER_LINK_CTA_CONFIGS,
};
