export const TIMELINE_FIELD_CONFIGS = {
  titleFontSize: {
    field: "titleFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "",
    defaultFromField: true,
  },
  descriptionFontSize: {
    field: "descriptionFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "",
    defaultFromField: true,
  },
};

export const COMBINED_TIMELINE_CONFIGS = {
  ...TIMELINE_FIELD_CONFIGS,
};
