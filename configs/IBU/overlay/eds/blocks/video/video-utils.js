/**
 * Extract font size value from class names
 * @param {string[]} classNames - Array of class names
 * @param {string} prefix - Font size prefix (e.g., "title-fs-")
 * @returns {string} - Extracted font size value or empty string
 */
export const extractFontSize = (classNames, prefix) => {
  const fontClass = classNames.find((cls) => cls.startsWith(prefix));
  return fontClass ? fontClass.replace(prefix, "") : "";
};

/**
 * Extract CTA value from class names
 * @param {string[]} classNames - Array of class names
 * @param {string} prefix - CTA prefix (e.g., "ctaColor-")
 * @param {string} defaultValue - Default value if not found
 * @returns {string} - Extracted CTA value
 */
export const extractCtaValue = (classNames, prefix, defaultValue = "") => {
  const ctaClass = classNames.find((cls) => cls.startsWith(prefix));
  return ctaClass ? ctaClass.replace(prefix, "") : defaultValue;
};

/**
 * Parse video content from block structure
 * @param {HTMLElement[]} children - Array of child elements from the video block
 * @returns {Array} - Array of parsed video item objects
 */
export const parseVideoContent = (children) => {
  return children.map((row, index) => {
    const [
      mediaElem,
      classListElem,
      videoTitleElement,
      videoDescriptionElement,
      quoteIconElement,
      patientQuoteElement,
      patientNameElement,
      patientConditionElement,
    ] = row.children;

    // Extract basic elements
    const imageDiv = mediaElem?.querySelector("img");
    const videoElem = mediaElem?.querySelector("a");
    const videoTranscriptElement =
      mediaElem?.children?.[2] || document.createElement("div");

    const ctaLabel =
      mediaElem?.children[1]?.querySelectorAll("a")?.[0]?.innerText ||
      "Watch Now";
    const quoteLabel =
      mediaElem?.children[2]?.querySelectorAll("a")?.[0]?.innerText ||
      "Watch Patient Story";

    // Parse configuration from classList
    const classList = getVideoItemClasses(classListElem);
    const config = parseVideoItemConfiguration(classList);

    return {
      index,
      image: imageDiv,
      video: videoElem,
      transcript: videoTranscriptElement,
      title: videoTitleElement,
      description: videoDescriptionElement,
      quoteIcon: quoteIconElement,
      quote: patientQuoteElement,
      patientName: patientNameElement,
      condition: patientConditionElement,
      config,
      classList,
      row,
      ctaLabel,
      quoteLabel,
    };
  });
};

/**
 * Get video item classes from class list element
 * @param {HTMLElement} classListElem - Element containing class list
 * @returns {string[]} - Array of class names
 */
export const getVideoItemClasses = (classListElem) => {
  const classList = classListElem?.textContent?.trim() || "";
  return classList
    .split(",")
    .map((cls) => cls.trim())
    .filter(Boolean);
};

/**
 * Parse configuration for individual video items
 * @param {string[]} classList - Array of class names for the video item
 * @returns {Object} - Parsed configuration for the video item
 */
export const parseVideoItemConfiguration = (classList) => {
  const config = {
    videoType: "standard",
    titleFontSize: "",
    descriptionFontSize: "",
    quoteFontSize: "",
    patientNameFontSize: "",
    conditionFontSize: "",
    transcriptFontSize: "",
    ctaColor: "primary-light",
    ctaStyle: "",
  };

  // Determine video type
  if (
    classList.some(
      (cls) =>
        cls.toLowerCase().includes("quote") ||
        cls.toLowerCase() === "videowithquote",
    )
  ) {
    config.videoType = "quote";
  }

  // Extract font sizes from class array (legacy format)
  config.titleFontSize = extractFontSizeFromArray(classList, 2, "title-fs-");
  config.descriptionFontSize = extractFontSizeFromArray(
    classList,
    3,
    "description-fs-",
  );
  config.quoteFontSize = extractFontSizeFromArray(classList, 2, "quote-fs-");
  config.patientNameFontSize = extractFontSizeFromArray(
    classList,
    3,
    "patientname-fs-",
  );
  config.conditionFontSize = extractFontSizeFromArray(
    classList,
    4,
    "condition-fs-",
  );
  config.transcriptFontSize = extractFontSizeFromArray(
    classList,
    6,
    "transcript-fs-",
  );

  // Extract CTA configuration
  if (classList.length > 4) {
    config.ctaStyle = classList[4] || "";
  }
  if (classList.length > 5) {
    config.ctaColor = classList[5] || "primary-light";
  }

  return config;
};

/**
 * Extract font size from class array at specific index
 * @param {string[]} classList - Array of class names
 * @param {number} index - Index in the array to check
 * @param {string} prefix - Font size prefix to remove
 * @returns {string} - Extracted font size value
 */
export const extractFontSizeFromArray = (classList, index, prefix) => {
  if (!classList || classList.length <= index) return "";

  const fontClass = classList[index];
  if (!fontClass || !fontClass.includes(prefix)) return "";

  return fontClass.split(prefix)[1] || "";
};

/**
 * Determine if video item is quote type
 * @param {Object} config - Video item configuration
 * @returns {boolean} - True if video is quote type
 */
export const isQuoteType = (config) => {
  return (
    config.videoType === "quote" ||
    config.classList?.some(
      (cls) =>
        cls.toLowerCase().includes("quote") ||
        cls.toLowerCase() === "videowithquote",
    )
  );
};

/**
 * Get CTA button label based on video type
 * @param {boolean} isQuote - Whether the video is quote type
 * @param {string} customLabel - Custom label if provided
 * @returns {string} - CTA button label
 */
export const getCtaButtonLabel = (isQuote, customLabel = "") => {
  if (customLabel) return customLabel;
  return isQuote ? "Watch patient story" : "Watch now";
};

/**
 * Validate video content structure
 * @param {Array} videoItems - Array of parsed video items
 * @returns {boolean} - True if content is valid
 */
export const validateVideoContent = (videoItems) => {
  if (!Array.isArray(videoItems) || videoItems.length === 0) {
    return false;
  }
  // Check if at least one video item has required content
  return videoItems.some(
    (item) => item.image || item.video || item.title || item.quote,
  );
};

/**
 * Get trimmed text content from element
 * @param {HTMLElement} element - Element to extract text from
 * @returns {string} - Trimmed text content
 */
export const getTrimmedText = (element) => {
  if (!element) return "";
  return element.textContent?.trim() || "";
};

export function normalizeTranscriptStructure(rows) {
  rows.forEach((row) => {
    const mediaElem = row?.children?.[0];
    if (!mediaElem || mediaElem.children.length < 3) return;
    const transcriptCandidate = mediaElem.children[2];
    if (transcriptCandidate?.tagName === "DIV") return;
    const ps = Array.from(mediaElem.children).filter(
      (el, idx) => el.tagName === "P" && idx >= 2,
    );
    if (!ps.length) return;
    const div = document.createElement("div");
    ps.forEach((p) => div.appendChild(p.cloneNode(true)));
    ps.forEach((p) => mediaElem.removeChild(p));
    mediaElem.insertBefore(div, mediaElem.children[2] || null);
  });
}
