/**
 * Spacer and Divider field configuration
 */

export const SPACER_AND_DIVIDER_FIELD_CONFIGS = {
  elementSelector: {
    pattern: /^(spacer|divider)$/,
    defaultValue: "divider",
  },
  spacerHeight: {
    pattern: /^(small|medium|large)$/,
    defaultValue: "small",
  },
  dividerColor: {
    pattern: /^(warm|secondary|contrast)$/,
    defaultValue: "contrast",
  },
  topBottomSpacing: {
    pattern: /^(small|medium|large)(-one)?$/,
    defaultValue: "small",
  },
};

export const COMBINED_SPACER_AND_DIVIDER_CONFIGS = {
  ...SPACER_AND_DIVIDER_FIELD_CONFIGS,
};
