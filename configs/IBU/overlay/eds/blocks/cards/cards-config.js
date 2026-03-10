import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../utils/base-config.js";

/**
 * Cards specific field configurations for class parsing
 * Updated to match _cards.json and _card.json schema
 */
export const CARDS_FIELD_CONFIGS = {
  // Section title font size from _cards.json
  sectionTitleFontSize: {
    field: "sectionTitleFontSize",
    pattern: /^section-title-fs-(.+)$/,
    prefix: "section-title-fs",
    default: "",
    defaultFromField: true,
  },
  // Card title font size from _card.json
  cardTitleFontSize: {
    field: "cardTitleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "",
    defaultFromField: true,
  },
  // Card titleone font size from _card.json
  titleOneFontSize: {
    field: "titleOneFontSize",
    pattern: /^titleone-fs-(.+)$/,
    prefix: "titleone-fs",
    default: "",
    defaultFromField: true,
  },
  // Card description font size from _card.json
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "",
    defaultFromField: true,
  },
};

/**
 * Combined Cards configurations including CTA configs
 */
export const COMBINED_CARDS_CONFIGS = {
  ...CARDS_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
