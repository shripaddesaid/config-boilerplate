/**
 * Icon List With Eyebrow Field Configurations
 * Contains field mappings and configurations for the Icon List With Eyebrow component
 */

/**
 * Field Configuration Object Structure
 * @typedef {Object} FieldConfig
 * @property {string} field - The field name to store the extracted value
 * @property {RegExp} pattern - Regular expression to match CSS class names
 * @property {string} prefix - The prefix used in CSS class names (e.g., "title-fs")
 * @property {string} default - Default value to use when no matching class is found
 * @property {boolean} [defaultFromField=false] - When true, uses the default value as-is.
 *                                                When false or undefined, the default value
 *                                                gets the prefix prepended (e.g., "24px" becomes "title-fs-24px").
 *                                                Use true when the default is already a processed value
 *                                                (like "24px" for font size), and false when it needs
 *                                                to be converted to a class name format.
 */

export const ICON_LIST_WITH_EYEBROW_FIELD_CONFIGS = {
  // Font size configurations - matching JSON field names exactly
  sectionTitleRteFontSize: {
    /** @type {FieldConfig} */
    // For main section title/eyebrow font size (main component level)
    field: "sectionTitleRteFontSize",
    pattern: /^section-title-fs-(.+)$/,
    prefix: "section-title-fs",
    default: "18px",
    defaultFromField: true,
  },
  textRteFontSize: {
    /** @type {FieldConfig} */
    // Matching classes_textRteFontSize from _icon-tile-eyebrow.json
    field: "textRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "16px",
    defaultFromField: true,
  },
  descriptionRteFontSize: {
    /** @type {FieldConfig} */
    // Matching classes_descriptionRteFontSize from _icon-tile-eyebrow.json
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "14px",
    defaultFromField: true,
  },
};

/**
 * Combined configuration object containing all field configurations
 * for the Icon List With Eyebrow component.
 *
 * Usage Example:
 * ```javascript
 * import { COMBINED_ICON_LIST_WITH_EYEBROW_CONFIGS } from './icon-list-with-eyebrow-config.js';
 *
 * const parsed = processFieldConfigs({
 *   classNames: ['title-fs-20px', 'description-fs-16px'],
 *   fieldConfigs: Object.values(COMBINED_ICON_LIST_WITH_EYEBROW_CONFIGS),
 *   componentFields: componentFields,
 *   useSecondaryLogic: true,
 * });
 * // Result: { textRteFontSize: '20px', descriptionRteFontSize: '16px' }
 * ```
 *
 * @type {Object<string, FieldConfig>}
 */
export const COMBINED_ICON_LIST_WITH_EYEBROW_CONFIGS = {
  ...ICON_LIST_WITH_EYEBROW_FIELD_CONFIGS,
};
