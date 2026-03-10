export const SEARCH_FAQ_FIELD_CONFIGS = {
  subtitleRteFontSize: {
    field: "subtitleRteFontSize",
    pattern: /^subtitle-fs-(.+)$/,
    prefix: "subtitle-fs",
    default: "16px",
  },
  placeholdertitleRteFontSize: {
    field: "placeholdertitleRteFontSize",
    pattern: /^placeholdertitle-fs-(.+)$/,
    prefix: "placeholdertitle-fs",
    default: "16px",
  },
  titleRteFontSize: {
    field: "titleRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },
  descriptionRteFontSize: {
    field: "descriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
  childtitleRteFontSize: {
    field: "childtitleRteFontSize",
    pattern: /^title-fs-(.+)$/,
    prefix: "title-fs",
    default: "32px",
    defaultFromField: true,
  },
  childdescriptionRteFontSize: {
    field: "childdescriptionRteFontSize",
    pattern: /^description-fs-(.+)$/,
    prefix: "description-fs",
    default: "16px",
    defaultFromField: true,
  },
};
