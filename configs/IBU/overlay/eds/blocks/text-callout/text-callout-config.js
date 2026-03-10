/**
 * TextCallOut Field Configurations
 * Contains field mappings and configurations for the TextCallOut component
 * Follows config-driven approach for parsing classlist values
 *
 * Patterns:
 * - description-fs-48px -> extracts "48px"
 * - text-color-secondary -> extracts "secondary"
 */

export const TEXT_CALLOUT_FIELD_CONFIGS = [
  {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "36px",
  },
  {
    field: "descriptionColor",
    pattern: /^text-color-(.+)$/,
    prefix: "text-color",
    default: "primary",
  },
];

export default TEXT_CALLOUT_FIELD_CONFIGS;
