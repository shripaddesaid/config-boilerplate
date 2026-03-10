/**
 * Press Release Feed Configurable Field Configurations
 * Contains field mappings and configurations for the Press Release Feed Configurable component
 */

/**
 * Press Release Feed Configurable specific field configurations for class parsing
 * Based on _press-release-feed-configurable.json schema
 */
export const PRFC_FIELD_CONFIGS = {
  // Component type (entire-feed or custom-feed)
  componentType: {
    field: "componentType",
    pattern: /^(entire-feed|custom-feed)$/,
    default: "entire-feed",
    defaultFromField: false,
  },
  // Number of press releases for custom feed
  customFeedCount: {
    field: "customFeedCount",
    pattern: /^(three|four|five|six|seven|eight|nine)-press-releases$/,
    default: "three-press-releases",
    defaultFromField: false,
  },
};

/**
 * Combined Press Release Feed Configurable configurations
 */
export const COMBINED_PRFC_CONFIGS = {
  ...PRFC_FIELD_CONFIGS,
};
