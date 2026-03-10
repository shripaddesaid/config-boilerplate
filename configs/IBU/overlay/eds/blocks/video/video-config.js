/**
 * Video component specific field configurations for class parsing
 * Updated to match _video.json and _video-item.json schema
 */
export const VIDEO_FIELD_CONFIGS = {
  // Video type configuration
  videoType: {
    field: "classes",
    pattern: /^video-(standard|quote)$/,
    prefix: "video",
    default: "standard",
    defaultFromField: true,
  },

  // Quote icon configuration
  quoteIcon: {
    field: "quotrIcon",
    pattern: /^quote-icon-(.+)$/,
    prefix: "quote-icon",
    default: "false",
    defaultFromField: true,
  },

  titlePlacement: {
    field: "titlePlacement",
    pattern: /^titleplacement-(.+)$/,
    prefix: "titleplacement",
    default: "top",
    defaultFromField: true,
  },

  // Font size configurations for video standard type
  titleRteFontSize: {
    field: "titleRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },

  descriptionPlacement: {
    field: "descriptionPlacement",
    pattern: /^descriptionplacement-(.+)$/,
    prefix: "descriptionplacement",
    default: "center",
    defaultFromField: true,
  },

  descriptionRteFontSize: {
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },

  // Font size configurations for video quote type
  quoteRteFontSize: {
    field: "quoteRteFontSize",
    pattern: /^quote-fs-(.+)$/,
    prefix: "quote-fs",
    default: "24px",
    defaultFromField: true,
  },

  patientNameRteFontSize: {
    field: "patientNameRteFontSize",
    pattern: /^patientname-fs-(.+)$/,
    prefix: "patientname-fs",
    default: "18px",
    defaultFromField: true,
  },

  conditionRteFontSize: {
    field: "conditionRteFontSize",
    pattern: /^condition-fs-(.+)$/,
    prefix: "condition-fs",
    default: "16px",
    defaultFromField: true,
  },

  // Video transcript font size
  transcriptFontSize: {
    field: "transcriptFontSize",
    pattern: /^transcript-fs-(.+)$/,
    prefix: "transcript-fs",
    default: "14px",
    defaultFromField: true,
  },

  // CTA configurations
  ctaColor: {
    field: "classes_ctacolor",
    pattern: /^ctacolor-(.+)$/,
    prefix: "ctacolor",
    default: "light",
    defaultFromField: true,
  },

  ctaStyle: {
    field: "classes_ctastyle",
    pattern: /^ctastyle-(.+)$/,
    prefix: "ctastyle",
    default: "primary",
    defaultFromField: true,
  },

  ctaArrowStyle: {
    field: "ctaArrowStyle",
    pattern: /^buttonctastyle-(.+)$/,
    prefix: "buttonctastyle",
    default: "arrow",
    defaultFromField: true,
  },
};

/**
 * Complete field configurations combining all video component fields
 */
export const ALL_VIDEO_CONFIGS = {
  ...VIDEO_FIELD_CONFIGS,
};
