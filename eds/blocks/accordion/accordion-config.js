/**
 * Accordion Component Field Configurations
 * Contains field mappings and configurations for the Accordion Component
 */

/**
 * Accordion Component specific field configurations for class parsing
 */
const ACCORDION_FIELD_CONFIGS = {
  mainTileFontSize: {
    field: "mainTileFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "16px",
  },
  accordionExpansion: {
    field: "accordionExpansion",
    pattern: /^accordion-(.+)$/,
    prefix: "accordion",
    default: "none",
  },
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "16px",
  },
  accordionTitleStyle: {
    field: "accordionTitleStyle",
    pattern: /^titlestyle-(.+)$/,
    prefix: "titlestyle",
  },
  accordionLayout: {
    field: "accordionLayout",
    pattern: /^layout-(.+)$/,
    prefix: "layout",
  },
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
  },
  columnOneType: {
    field: "columnOneType",
    pattern: /^column1-contenttype(.+)$/,
    prefix: "column1-contenttype",
  },
  columnOneDescriptionFontSize: {
    field: "columnOneDescriptionFontSize",
    pattern: /^contenttypedescription-fs-(.+)$/,
    prefix: "contenttypedescription-fs",
  },
  columnTwoType: {
    field: "columnTwoType",
    pattern: /^column2-seccontenttype(.+)$/,
    prefix: "column2-seccontenttype",
  },
  columnTwoDescriptionFontSize: {
    field: "columnTwoDescriptionFontSize",
    pattern: /^seccontentdescription-fs-(.+)$/,
    prefix: "seccontentdescription-fs",
  },
  columnTwoIconDescriptionFontSize: {
    field: "columnTwoIconDescriptionFontSize",
    pattern: /^seccontenticondescription-fs-(.+)$/,
    prefix: "seccontenticondescription-fs",
  },
};

// Helper to create field configs for cta for column 1 and 2
function createCtaConfigs(column, isSecondCta) {
  const suffix = column.charAt(0).toUpperCase() + column.slice(1);
  const two = isSecondCta ? "-two" : "";
  const obj = {};

  if (!isSecondCta) {
    obj[`ctaNumber${suffix}`] = {
      field: `ctaNumber${suffix}`,
      pattern: new RegExp(`^ctanumber-${column}-.*$`),
      prefix: `ctanumber-${column}`,
      default: "one",
    };
    obj[`ctaStyle${suffix}`] = {
      field: `ctaStyle${suffix}`,
      pattern: new RegExp(`^ctastyle-${column}-.*$`),
      prefix: `ctastyle-${column}`,
      default: "primary",
    };
    obj[`ctaColor${suffix}`] = {
      field: `ctaColor${suffix}`,
      pattern: new RegExp(`^ctacolor-${column}-.*$`),
      prefix: `ctacolor-${column}`,
      default: "light",
      defaultFromField: true,
    };
    obj[`ctaType${suffix}`] = {
      field: `ctaType${suffix}`,
      pattern: new RegExp(`^ctatype-${column}-.*$`),
      prefix: `ctatype-${column}`,
      default: "link",
      defaultFromField: true,
    };
    obj[`ctaSelection${suffix}`] = {
      field: `ctaSelection${suffix}`,
      pattern: new RegExp(`^ctaselection-${column}.*$`),
      prefix: `ctaselection-${column}`,
      default: "link",
      defaultFromField: true,
    };
    obj[`targetPath${suffix}`] = {
      field: `targetPath${suffix}`,
      pattern: new RegExp(`^ctatarget-${column}-.*$`),
      prefix: `ctatarget-${column}`,
      default: "sameTab",
      defaultFromField: true,
    };
    obj[`exitInterstitial${suffix}`] = {
      field: `exitInterstitial${suffix}`,
      pattern: new RegExp(`^ctaexitinterstitial-${column}-.*$`),
      prefix: `ctaexitinterstitial-${column}`,
      default: "select",
      defaultFromField: true,
    };
  } else {
    obj[`secCtaStyle${suffix}`] = {
      field: `secCtaStyle${suffix}`,
      pattern: new RegExp(`^ctastyle-${column}-.*${two}$`),
      default: "primary",
      prefix: `ctastyle-${column}`,
      defaultFromField: true,
    };
    obj[`secCtaColor${suffix}`] = {
      field: `secCtaColor${suffix}`,
      pattern: new RegExp(`^ctacolor-${column}-.*${two}$`),
      prefix: `ctacolor-${column}`,
      default: "light",
      defaultFromField: true,
    };
    obj[`secCtaType${suffix}`] = {
      field: `secCtaType${suffix}`,
      pattern: new RegExp(`^ctatype-${column}-.*${two}$`),
      prefix: `ctatype-${column}`,
      default: "link",
      defaultFromField: true,
    };
    obj[`secCtaSelection${suffix}`] = {
      field: `secCtaSelection${suffix}`,
      pattern: new RegExp(`^ctaselection-${column}-.*${two}$`),
      prefix: `ctaselection-${column}`,
      default: "link",
      defaultFromField: true,
    };
    obj[`secTargetPath${suffix}`] = {
      field: `secTargetPath${suffix}`,
      pattern: new RegExp(`^ctatarget-${column}-.*${two}$`),
      default: "sameTab",
      prefix: `ctatarget-${column}`,
      defaultFromField: true,
    };
    obj[`secExitInterstitial${suffix}`] = {
      field: `secExitInterstitial${suffix}`,
      pattern: new RegExp(`^ctaexitinterstitial-${column}-.*${two}$`),
      prefix: `ctaexitinterstitial-${column}`,
      default: "select",
      defaultFromField: true,
    };
  }
  return obj;
}

const COMMON_CTA_CONFIGS_One = createCtaConfigs("column1");
const SECONDARY_CTA_CONFIGS_One = createCtaConfigs("column1", true);
const COMMON_CTA_CONFIGS_Two = createCtaConfigs("column2");
const SECONDARY_CTA_CONFIGS_Two = createCtaConfigs("column2", true);

const ACCORDION_CTA_CONFIGS = {
  ...COMMON_CTA_CONFIGS_One,
  ...SECONDARY_CTA_CONFIGS_One,
  ...COMMON_CTA_CONFIGS_Two,
  ...SECONDARY_CTA_CONFIGS_Two,
};

//Helper to create default values for cta field configs
function getCtaDefaults(ctaConfig, isSecondary = false) {
  return Object.entries(ctaConfig)
    .map(([key, val]) => {
      let mapKey;
      if (isSecondary) {
        mapKey = key.replace(/Column(one|Two)$/i, "");
        mapKey = mapKey.replace(
          /(sec)(Cta|Target|ExitInter)(Style|Color|Selection|Path|stitial)/,
          (match, ...groups) =>
            match
              .replace(/Column/, "")
              .replace(/Cta/, "Cta")
              .replace(/Target/, "Target")
              .replace(/ExitInter/, "ExitInterstitial"),
        );
      } else {
        mapKey = key.replace(/(One|Two)$/, "");
      }
      return [mapKey, val.default || (val.defaultFromField ? "" : undefined)];
    })
    .filter(([, value]) => value !== undefined);
}

export const ctaFieldDefaults = [
  ...getCtaDefaults(COMMON_CTA_CONFIGS_One),
  ...getCtaDefaults(SECONDARY_CTA_CONFIGS_One, true),
  ...getCtaDefaults(COMMON_CTA_CONFIGS_Two),
  ...getCtaDefaults(SECONDARY_CTA_CONFIGS_Two, true),
];

// Combined configuration export for accordion component
export const COMBINED_ACCORDION_CONFIGS = {
  ...ACCORDION_FIELD_CONFIGS,
  ...ACCORDION_CTA_CONFIGS,
};
