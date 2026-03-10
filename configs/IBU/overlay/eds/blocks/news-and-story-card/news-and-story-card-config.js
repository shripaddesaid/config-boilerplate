/**
 * News and Story Card Field Configurations
 * Contains field mappings and configurations for the News and Story Card component
 */
import { COMMON_CTA_CONFIGS } from "../../utils/class-parser.js";

export const NEWS_AND_STORY_CARD_FIELD_CONFIGS = {
  // Component title font size configuration (from block classList)
  componentTitleFontSize: {
    field: "componentTitleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },
  // Card title font size configuration (from card-level config)
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "24px",
    defaultFromField: true,
  },
};

export const COMBINED_NEWS_AND_STORY_CARD_CONFIGS = {
  ...NEWS_AND_STORY_CARD_FIELD_CONFIGS,
  ...COMMON_CTA_CONFIGS,
};
