import { COMMON_CTA_CONFIGS } from "../../utils/class-parser.js";

// Additional Links specific field configurations
export const ADDITIONAL_LINKS_FIELD_CONFIGS = {
  // Component-specific configurations can be added here
  // Currently, Additional Links only uses standard CTA configurations
};

// Combined configurations for Additional Links component
export const COMBINED_ADDITIONAL_LINKS_CONFIGS = [
  ...Object.values(ADDITIONAL_LINKS_FIELD_CONFIGS),
  ...Object.values(COMMON_CTA_CONFIGS),
];
