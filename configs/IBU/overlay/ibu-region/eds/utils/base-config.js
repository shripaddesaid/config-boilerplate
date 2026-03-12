const COMMON_CTA_CONFIGS = {
  ctaNumber: {
    field: "ctaNumber",
    pattern: /^ctanumber-.*$/,
    prefix: "ctanumber",
    default: "one",
  },
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

  ctaType: {
    field: "ctaType",
    pattern: /^ctatype-.*$/,
    prefix: "ctatype",
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

/**
 * Secondary CTA field configurations (using common CTA logic)
 */
const SECONDARY_CTA_CONFIGS = {
  secCtaStyle: {
    field: "secCtaStyle",
    pattern: /^ctastyle-.*-two$/,
    default: "primary",
    prefix: "ctastyle",
    defaultFromField: true,
  },
  secCtaColor: {
    field: "secCtaColor",
    pattern: /^ctacolor-.*-two$/,
    prefix: "ctacolor",
    default: "primary-light",
    defaultFromField: true,
  },
  secCtaType: {
    field: "secCtaType",
    pattern: /^ctatype-.*-two$/,
    prefix: "ctatype",
    defaultFromField: true,
  },
  secCtaSelection: {
    field: "secCtaSelection",
    pattern: /^ctaselection-.*-two$/,
    prefix: "ctaselection",
    defaultFromField: true,
  },

  secTargetPath: {
    field: "secTargetPath",
    pattern: /^ctatarget-.*-two$/,
    default: "sameTab",
    prefix: "ctatarget",
    defaultFromField: true,
  },
  secExitInterstitial: {
    field: "secExitInterstitial",
    pattern: /^ctaexitinterstitial-.*-two$/,
    prefix: "ctaexitinterstitial",
    defaultFromField: true,
  },
};
export { SECONDARY_CTA_CONFIGS, COMMON_CTA_CONFIGS };
