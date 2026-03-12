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

/**
 * Finds and extracts values from CSS class names using pattern matching
 * @param {string[]} classNames - Array of CSS class names
 * @param {RegExp} pattern - Regular expression pattern to match
 * @param {string|null} prefix - Optional prefix to extract value from (e.g., "heading-fs")
 * @param {string} defaultValue - Default value if no match is found
 * @returns {string} - Extracted value or default value
 */
const findClassValue = (
  classNames,
  pattern,
  prefix = null,
  defaultValue = "",
) => {
  const className = classNames.find((cls) => cls.trim().match(pattern));
  if (!className) return defaultValue;

  if (prefix) {
    const parts = className.split(`${prefix}-`);
    return parts.length > 1 ? parts[1] : defaultValue;
  }

  return className || defaultValue;
};

/**
 * Helper for secondary CTA values that need special handling (removes "-two" suffix)
 * @param {string[]} classNames - Array of CSS class names
 * @param {RegExp} pattern - Regular expression pattern to match
 * @param {string} defaultValue - Default value if no match is found
 * @returns {string} - Extracted value or default value
 */
const findSecondaryCtaValue = (
  classNames,
  pattern,
  defaultValue = "",
  prefix = null,
) => {
  const className = classNames.find((cls) => cls.trim().match(pattern));
  if (!className) return defaultValue;
  if (
    prefix === "ctanumber" ||
    prefix === "ctanumber-quicklink" ||
    prefix === "bottomCtaNumber"
  ) {
    return className.replace(`${prefix}-`, "") || defaultValue;
  }
  return (
    className
      .replace(/-two|-three|-four|-five|-six|-seven/g, "")
      .replace(`${prefix}-`, "") || defaultValue
  );
};

/**
 * Unified field processor that extracts values from CSS class names
 * @param {Object} options - Configuration options
 * @param {string[]} options.classNames - Array of CSS class names to parse
 * @param {Array} options.fieldConfigs - Array of field configuration objects
 * @param {Map} options.componentFields - Component fields map for default values
 * @param {Function} options.onFieldProcessed - Optional callback when a field is processed
 * @param {boolean} options.useSecondaryLogic - Whether to use secondary CTA logic
 * @returns {Map|Object} - Processed field values as Map or Object
 */
const processFieldConfigs = ({
  classNames,
  fieldConfigs,
  componentFields,
  onFieldProcessed = null,
  useSecondaryLogic = false,
}) => {
  const processedFields = {};

  fieldConfigs.forEach((config) => {
    let value;

    if (config.specialPattern) {
      value = classNames.find(config.specialPattern);
    } else {
      const defaultValue = config.defaultFromField
        ? componentFields.get(config.field)
        : config.default || "";

      if (useSecondaryLogic) {
        value = findSecondaryCtaValue(
          classNames,
          config.pattern,
          defaultValue,
          config.prefix,
        );
      } else {
        value = findClassValue(
          classNames,
          config.pattern,
          config.prefix,
          defaultValue,
        );
      }
    }

    // Determine final value with proper fallback chain
    let finalValue = value?.trim();
    if (!finalValue) {
      if (config.defaultFromField) {
        finalValue = componentFields.get(config.field) || config.default;
      } else {
        finalValue = config.default || componentFields.get(config.field);
      }
    }
    processedFields[config.field] = finalValue;

    if (onFieldProcessed) {
      onFieldProcessed(config.field, finalValue, config);
    }
  });

  return processedFields;
};

export {
  findClassValue,
  findSecondaryCtaValue,
  processFieldConfigs,
  SECONDARY_CTA_CONFIGS,
  COMMON_CTA_CONFIGS,
};
