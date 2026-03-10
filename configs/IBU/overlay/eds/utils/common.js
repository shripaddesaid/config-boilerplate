const fontSizeClassMap = {
  ringside: {
    "14px": "lds-ringside-body-small",
    "16px": "lds-ringside-body-medium",
    "20px": "lds-ringside-body-large",
    "24px": "lds-ringside-heading-6",
    "28px": "lds-ringside-heading-5",
    "32px": "lds-ringside-heading-4",
    "36px": "lds-ringside-heading-3",
    "48px": "lds-ringside-heading-2",
    "60px": "lds-ringside-heading-1",
    "100px": "lds-ringside-display-extra-large",
  },
  garamond: {
    "14px": "lds-rte-garamond-font-14",
    "16px": "lds-rte-garamond-font-16",
    "20px": "lds-rte-garamond-font-20",
    "24px": "lds-garamond-heading-6",
    "28px": "lds-garamond-heading-5",
    "32px": "lds-garamond-heading-4",
    "36px": "lds-garamond-heading-3",
    "48px": "lds-garamond-heading-2",
    "60px": "lds-garamond-heading-1",
    "100px": "lds-ringside-garamond-extra",
  },
};

export const exitInterstitialTypeMap = [
  "general-third-parties",
  "telehealth",
  "account-wellbeing",
  "account",
  "embedded-tools-healthgrades",
  "embedded-tools-nourish",
];

export const RTE_FIELD_SELECTORS = "h1, h2, h3, h4, h5, h6, p";
export const RTE_DESC_SELECTORS = "h1, h2, h3, h4, h5, h6, p, div, ul, ol, a";
export const RTE_CONTENT_SELECTORS = "h1, h2, h3, h4, h5, h6, p, div";

export function applyCustomFontSize(domElem, fontSize, isRingside) {
  const styleType = isRingside ? "ringside" : "garamond";
  const className = fontSizeClassMap[styleType][fontSize];
  if (!className) return domElem;

  // Check if domElem has children
  if (domElem.children && domElem.children.length > 0) {
    // If it has children, add class to each child
    domElem.querySelectorAll("*").forEach((child) => {
      child.classList.add(className);
    });
  } else {
    // If no children, just add class to the element itself
    domElem.classList.add(className);
  }
  return domElem;
}
export function extractFontSize(block, componentName, className, defaultFont) {
  if (
    block.classList.contains(componentName) &&
    block.classList.contains("block")
  ) {
    const classNames = [...block.classList];
    const fontSizeClass = classNames.find((classvalue) =>
      classvalue.includes(className),
    );
    if (fontSizeClass) {
      return fontSizeClass.split(className)[1];
    }
  }
  return defaultFont;
}

export function recreateVideoPath(path) {
  // Replace '/play?assetname=' with '/renditions/original/as/'
  return path.replace("/play?assetname=", "/renditions/original/as/");
}

/**
 * Process text nodes recursively to highlight text between underscores
 * @param {Node} node - The DOM node to process
 */
export function processTextNodesRecursively(node, classname) {
  if (node.nodeType === Node.TEXT_NODE) {
    // If it's a text node, process underscores
    if (node.textContent.includes("_")) {
      const span = document.createElement("span");

      // Replace underscores with spans and sanitize
      const replaced = node.textContent.replace(
        /_([^_]+)_/g,
        `<span class="${classname}">$1</span>`,
      );
      if (window.DOMPurify) {
        span.innerHTML = window.DOMPurify.sanitize(replaced, {
          USE_PROFILES: { html: true },
        });
      } else {
        span.innerHTML = replaced;
      }

      // Replace the original text node with our processed content
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = span.innerHTML;

      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      node.parentNode.replaceChild(fragment, node);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Skip script and style tags
    if (node.tagName === "SCRIPT" || node.tagName === "STYLE") {
      return;
    }

    // Process child nodes (make a copy of the childNodes to avoid live collection issues)
    const childNodes = Array.from(node.childNodes);
    childNodes.forEach((child) =>
      processTextNodesRecursively(child, classname),
    );
  }
}
/**
 * Process HTML content to add green highlighting to text between underscores
 * @param {string} html - The HTML content to process
 * @returns {string} - Processed HTML with spans for highlighted portions
 */
export function processUnderscoreHighlights(
  html,
  classname,
  isPlainHTML = false,
) {
  if (!html || typeof html !== "string") return html;

  // if not a dom node
  if (isPlainHTML) {
    // Regex matches underscores wrapping any content, including tags and spaces (non-greedy)
    return html.replace(
      /_([\s\S]+?)_/g,
      (match, p1) => `<span class="${classname}">${p1.trim()}</span>`,
    );
  }
  // Create a temporary div to safely work with HTML content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Process text nodes recursively
  processTextNodesRecursively(tempDiv, classname);

  // Return the processed HTML
  return tempDiv.innerHTML;
}

export function ctaClassProvider(variant, affix = "") {
  let cleanVariant = variant;
  let affixRemoved = false;
  if (affix) {
    if (cleanVariant.startsWith(`${affix}-`)) {
      cleanVariant = cleanVariant.slice(affix.length + 1);
      affixRemoved = true;
    } else if (cleanVariant.startsWith(affix)) {
      cleanVariant = cleanVariant.slice(affix.length);
      affixRemoved = true;
    }
    if (cleanVariant.endsWith(`-${affix}`)) {
      cleanVariant = cleanVariant.slice(0, -affix.length - 1);
      affixRemoved = true;
    } else if (cleanVariant.endsWith(affix)) {
      cleanVariant = cleanVariant.slice(0, -affix.length);
      affixRemoved = true;
    }
  }
  const baseClass = "cta-button";
  let className = baseClass;
  if (affix && !affixRemoved) {
    className = `${className}-${affix}`;
  }
  return `${className}-${cleanVariant}`;
}

/**
 * Add <SVG> for icon, prefixed with codeBasePath and optional prefix.
 * @param {Element} [span] span element with icon classes
 * @param {string} [prefix] prefix to be added to icon src
 * @param {string} [alt] alt text to be added to icon
 */
export function decorateIconSvg(span, prefix = "", alt = "") {
  const iconName = Array.from(span.classList)
    .find((c) => c.startsWith("icon-"))
    .substring(5);
  fetch(`${window.hlx.codeBasePath}${prefix}/assets/icons/${iconName}.svg`)
    .then((response) => response.text())
    .then((svgText) => {
      span.innerHTML = svgText;
    })
    .catch((error) => console.error("Error fetching SVG:", error));
}

export function formatDate(dateString, { style = "short" } = {}) {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) return null;

  if (style === "long") {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  }

  // Default short format: MM/DD/YYYY
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Process HTML content to sanitize
 * @param {string} html - The HTML content to process
 * @returns {string} - Returns a sanitized HTML string
 */
export function sanitizeHTML(html) {
  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }
  return html;
}

/**
 * Check if an element has meaningful content
 * @param {HTMLElement} element - The DOM element to check
 * @returns {boolean} - Returns true if element has content, false otherwise
 */
export function hasContent(element) {
  if (!element) return false;

  // Check if element has text content (excluding whitespace)
  const textContent = element.textContent?.trim();
  if (textContent && textContent.length > 0) return true;

  // Check if element has child elements (like images, videos, etc.)
  if (element.children && element.children.length > 0) return true;

  return false;
}
