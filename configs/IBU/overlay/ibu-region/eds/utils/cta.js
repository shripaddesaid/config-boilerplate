import { decorateIcon } from "../scripts/aem.js";
import { exitInterstitialTypeMap } from "./common.js";
import { handleShowInterstitial } from "./federated-components/Interstitial.js";

function isLinkOrEmpty(str) {
  if (str === "") return true;
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Creates a CTA button element.
 *
 * @param {Object} options - The CTA button options.
 * @param {string} [options.action=''] - Action of CTA,
 * 'navigation' - <a> where we need to navigate to links,
 * 'event-handling' - <button> where we need to handle events on button click.
 * @param {string} [options.type=''] - Type of CTA,
 * 'link' - links,
 * 'asset' - images or pdf.
 * @param {string} [options.variation='cta-button-filled'] - CSS class for styling the button
 * 'cta-button-filled' for filled button,
 * 'cta-text' for text cta.
 * @param {string} [options.label=''] - The visible text of the button.
 * @param {string} [options.href=''] - The URL for navigation (used if type is 'navigation').
 * @param {string} [options.targetPath=''] - 'newTab' , 'sameTab'.
 * @param {Function} [options.onClick] - Click handler (used if type is 'event-handling')
 * @param {boolean} [options.disabled=false] - If true, disables the button.
 * @param {string} [options.ariaLabel=''] - Custom aria-label for accessibility
 * if not provided, the label will be used as the aria-label.
 * @param {string} [options.icon=''] - The icon name - 'arrow-icon'.
 * @param {string} [options.iconPosition='right'] - icon position inside button - 'left','right'.
 * @param {HTMLElement} [options.block] - block to access the bakcgroundcolor.
 * @returns {HTMLElement|null} The CTA button element wrapped in a div, or null if label is missing.
 */
export function createCTAButton({
  action = "",
  type = "",
  variation = "cta-button-filled",
  label = "",
  href = "",
  ctaAsset = null,
  targetPath = "",
  onClick,
  disabled = false,
  ariaLabel = "",
  icon = "",
  iconPosition = "right",
  componentName = "",
  exitInterstitial = "",
  block = null,
  id = "",
} = {}) {
  if (!label) return null;

  let element;
  if (action === "navigation") {
    element = document.createElement("a");
    if (type === "link") {
      element.href = href;
      element.target =
        typeof targetPath === "string" && targetPath.toLowerCase() === "newtab"
          ? "_blank"
          : "_self";
    } else if (ctaAsset) {
      const isDirectLink = isLinkOrEmpty(ctaAsset);
      if (isDirectLink) {
        element.href = ctaAsset;
      } else if (ctaAsset?.querySelector("img")) {
        element.href = ctaAsset?.querySelector("img").src || "";
      } else if (ctaAsset?.querySelector("a")) {
        element.href = ctaAsset?.querySelector("a").href || "";
      }
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      exitInterstitial = "";
    }
  } else if (action === "event-handling") {
    element = document.createElement("button");
    element.type = "button";
    element.disabled = !!disabled;
    const shouldAddClickListener =
      typeof onClick === "function" &&
      (exitInterstitial === "" || exitInterstitial === "select");

    if (shouldAddClickListener) {
      element.addEventListener("click", onClick);
    }
  }

  if (label instanceof HTMLElement) {
    const altText = label.getAttribute?.("alt") || "";
    element.appendChild(label);
    label = altText || label?.textContent || "";
  } else {
    element.textContent = label;
  }

  element.className = variation;
  let ariaValue = ariaLabel !== "" ? ariaLabel : label;
  if (typeof targetPath === "string" && targetPath.toLowerCase() === "newtab") {
    ariaValue += " (opens in new tab)";
  }
  if (element.href?.trim().toLowerCase().endsWith(".pdf")) {
    ariaValue += "(Opens a PDF Link)";
  }
  element.id = id;
  element.setAttribute("aria-label", ariaValue);
  element.tabIndex = 0;
  exitInterstitial = exitInterstitial === "select" ? "" : exitInterstitial;

  // Set data-track-component attribute
  element.setAttribute("data-track-component", componentName || "");
  element.setAttribute("data-track-location", componentName || "");

  setupCtaWithInterstitial(
    element,
    {
      type: exitInterstitial || "",
      url: element.href || "",
      ariaLabel: ariaValue,
      target: element.target,
      vendorName: componentName || "",
      callbackFunction: onClick || null,
    },
    exitInterstitial,
  );

  const icons = {
    "arrow-icon": { className: "icon-arrow-right", alt: "arrow-right" },
    "download-icon": {
      className: "icon-download-white-icon",
      alt: "download-white-icon",
    },
    "black-arrow-right": {
      className: "icon-black-arrow",
      alt: "black-arrow-right",
    },
    "play-icon": {
      className: "icon-play",
      alt: "play",
    },
    "plus-icon": {
      className: "icon-plus",
      alt: "plus",
    },
    "green-arrow-right": {
      className: "icon-green-arrow",
      alt: "green-arrow-right",
    },
    "white-arrow-right": {
      className: "icon-arrow-right",
      alt: "white-arrow-right",
      width: 20,
      height: 20,
    },
  };

  if (icon && icons[icon]) {
    element.classList.add(`cta-icon-${iconPosition}`);
    const iconElement = document.createElement("span");
    iconElement.className = icons[icon].className;
    decorateIcon(
      iconElement,
      "",
      icons[icon].alt,
      icons[icon].width,
      icons[icon].height,
    );
    element.appendChild(iconElement);
  }

  if (variation === "cta-text" && block) {
    const sectionDiv = block.parentElement.parentElement;
    if (
      sectionDiv.classList.contains("background-quaternary-gray") ||
      sectionDiv.classList.contains("background-secondary-green") ||
      sectionDiv.classList.contains("background-tertiary-blue")
    ) {
      element.classList.add("cta-text-black");
    } else {
      element.classList.add("cta-text-brand-color");
    }
  }

  return element;
}

export function createlinks({
  type = "",
  label = "",
  href = "",
  ctaAsset = null,
  targetPath = "",
  ariaLabel = "",
  componentName = "",
  exitInterstitial = "",
} = {}) {
  if (!label) return null;

  const element = document.createElement("a");
  if (type === "link") {
    element.href = href;
    element.target =
      typeof targetPath === "string" && targetPath.toLowerCase() === "newtab"
        ? "_blank"
        : "_self";
  } else if (ctaAsset) {
    if (ctaAsset?.querySelector("img")) {
      element.href = ctaAsset?.querySelector("img").src || "";
    } else if (ctaAsset?.querySelector("a")) {
      element.href = ctaAsset?.querySelector("a").href || "";
    } else {
      element.href = ctaAsset;
    }
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    exitInterstitial = "";
  }

  element.textContent = label;
  let ariaValue = ariaLabel !== "" ? ariaLabel : label;
  if (typeof targetPath === "string" && targetPath.toLowerCase() === "newtab") {
    ariaValue += " (opens in new tab)";
  }
  if (href?.trim().toLowerCase().endsWith(".pdf")) {
    element.setAttribute("download", "");
    ariaValue += "(PDF)";
  }
  element.setAttribute("aria-label", ariaValue);
  element.setAttribute("role", "link");
  element.tabIndex = 0;
  exitInterstitial = exitInterstitial === "select" ? "" : exitInterstitial;

  element.setAttribute("data-track-component", componentName || "");

  setupCtaWithInterstitial(
    element,
    {
      type: exitInterstitial || "",
      url: element.href || "",
      ariaLabel: ariaValue,
      target: element.target,
      vendorName: componentName || "",
    },
    exitInterstitial,
  );

  return element;
}

/**
 * Creates a social link element and adds an event listener for analytics tracking.
 * @param {HTMLElement} linkElement - The element containing the anchor tag.
 * @param {Array<string>} className - The class name for the social link
 * @param {string} label - The aria-label for the social link.
 * @param {string} componentName - The name of the AEM component (for analytics tracking).
 * @param {string} linkLocation - The section where the link resides (for analytics tracking).
 * @returns {HTMLElement|null} - The created anchor element or null if not valid.
 */
export function createSocialLink(
  url,
  label,
  componentName = "",
  classNames = [],
) {
  // Remove interstitial suffix from url and determine interstitial type
  let interstitialType = "";
  const interstitialSuffixMap = {
    _INTERSTITIAL_GENERAL_THIRD_PARTIES: "general-third-parties",
    _INTERSTITIAL_TELEHEALTH: "telehealth",
    _INTERSTITIAL_ACCOUNT: "account",
    _INTERSTITIAL_EMBEDDED_TOOLS_NOURISH: "embedded-tools-nourish",
    _INTERSTITIAL_ACCOUNT_WELLBEING: "account-wellbeing",
    _INTERSTITIAL_EMBEDDED_TOOLS_HEALTHGRADES: "embedded-tools-healthgrades",
  };
  let processedUrl = url;
  const upperCaseUrl = processedUrl.toUpperCase();
  const match = Object.entries(interstitialSuffixMap).find(([suffix]) =>
    upperCaseUrl.includes(suffix),
  );
  if (match) {
    const [suffix, value] = match;
    const regex = new RegExp(suffix, "gi");
    processedUrl = processedUrl.replace(regex, "");
    interstitialType = value;
  }

  const anchor = document.createElement("a");
  anchor.href = processedUrl;
  anchor.target = "_blank";
  anchor.role = "button";
  anchor.setAttribute("aria-label", `${label} (opens in a new tab)`);
  if (Array.isArray(classNames)) {
    anchor.className = classNames.join(" ");
  }

  anchor.setAttribute("data-track-component", componentName || "");

  anchor.addEventListener("click", (e) => {
    if (interstitialType) {
      e.preventDefault();
      if (typeof handleShowInterstitial === "function") {
        handleShowInterstitial({
          type: interstitialType,
          url: anchor.href,
          ariaLabel: anchor.getAttribute("aria-label"),
        });
      }
    }
  });

  return anchor;
}

/**
 * Utility to handle CTA button clicks with interstitial support.
 * @param {HTMLElement} ctaButton - The CTA button element.
 * @param {Object} interstitialData - Data for the interstitial (type, url, ariaLabel, etc.).
 */
export function setupCtaWithInterstitial(
  ctaButton,
  interstitialData,
  exitInterstitial,
) {
  if (!ctaButton) return;

  ctaButton.addEventListener("click", async (e) => {
    if (exitInterstitial) {
      e.preventDefault();
      const updatedInterstitialData = {
        ...interstitialData,
        url: ctaButton?.href || interstitialData?.url || "",
      };
      handleShowInterstitial(updatedInterstitialData);
    }
  });
}

export function triggerQuiz(label, labelId1, labelId2) {
  sessionStorage.setItem("quizLabelId1", labelId1);
  sessionStorage.setItem("quizLabelId2", labelId2);

  const QUIZ_TRIGGER = "takethequiz";
  const condition = label?.replaceAll(/\s/g, "").toLowerCase() === QUIZ_TRIGGER;
  if (condition) {
    const modalOverlay = document.querySelector("modal-overlay");
    if (modalOverlay) {
      modalOverlay.isopen = true;
      modalOverlay.addEventListener("modalClosed", () => {
        modalOverlay.isopen = false;
      });
    } else {
      console.warn("Quiz modal-overlay element not found in DOM.");
    }
  }
}

export function getInterstitialTypeFromClassList(
  block,
  individualMapping = false,
) {
  const classList = individualMapping ? [block] : Array.from(block || []);
  for (const type of exitInterstitialTypeMap) {
    if (classList.some((cls) => cls.includes(type))) {
      return type;
    }
  }
  return "select";
}
