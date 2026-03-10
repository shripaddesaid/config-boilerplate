import {
  COMMON_CTA_CONFIGS,
  SECONDARY_CTA_CONFIGS,
} from "../../utils/class-parser.js";

/**
 * Icon Card specific field configurations for class parsing
 * Updated to match _icon-card.json schema
 */
export const ICON_CARD_FIELD_CONFIGS = {
  columnConfiguration: {
    field: "columnConfiguration",
    pattern: /^column-configuration-(.+)-col$/,
    prefix: "column-configuration",
    default: "2",
    defaultFromField: true,
  },
  backgroundColor: {
    field: "backgroundColor",
    pattern: /^background-color-.*$/,
    prefix: "background-color",
    default: "transparent",
    defaultFromField: true,
  },
  titleRteFontSize: {
    field: "titleRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "16px",
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
 * Icon Card CTA configurations extending common patterns
 * Updated to match _icon-card.json schema
 */
export const ICON_CARD_CTA_CONFIGS = {
  // Primary and secondary CTAs
  ...COMMON_CTA_CONFIGS,
  ...SECONDARY_CTA_CONFIGS,
};
