import { handleShowInterstitial } from "../utils/federated-components/Interstitial.js";
// import pushAdobeAnalyticsEvent from "./analytics/launch-util.js";

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element - block element containing the RTE content.
 */
export default function decorateRteLinks(element) {
  let blockName;
  const block = element.getAttribute("data-block-name");
  if (block) {
    blockName = block
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  element.querySelectorAll("a").forEach((link) => {
    const linkUrl = link.getAttribute("href");
    let safeHref = "";
    if (linkUrl) {
      try {
        // Allow only http, https, mailto, tel protocols
        const parsed = new URL(
          linkUrl.trim().replace(/%20/g, ""),
          window.location.origin,
        );
        if (
          ["http:", "https:", "mailto:", "tel:", "callto:"].includes(
            parsed.protocol,
          )
        ) {
          safeHref = parsed.href;
        }
      } catch (e) {
        // If invalid URL, do not assign
        safeHref = "";
      }
    }
    if (safeHref) {
      link.href = safeHref;
    } else {
      // Remove href if not safe
      link.removeAttribute("href");
    }
    let ariaLabel = link.textContent.trim();
    link.tabIndex = 0;
    const externalSuffix = "_NEW_TAB";
    if (link.href.toUpperCase().includes(externalSuffix)) {
      link.href = link.href.replace(/_NEW_TAB|_new_tab/g, "");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      ariaLabel += " (opens in new tab)";
    }

    link.setAttribute("aria-label", ariaLabel);
    link.setAttribute("data-track-component", blockName);
    link.classList.add("external-rte__link");

    if (element) {
      const sectionDiv = element.closest("div.section");
      if (sectionDiv) {
        if (
          sectionDiv.classList.contains("background-quaternary-gray") ||
          sectionDiv.classList.contains("background-secondary-green") ||
          sectionDiv.classList.contains("background-tertiary-blue")
        ) {
          link.classList.add("black-inline-link");
        } else {
          link.classList.add("gray-inline-link");
        }
      }
    }

    if (blockName) {
      if (!window.__rteLinkDelegation) {
        window.__rteLinkDelegation = true;
        document.body.addEventListener(
          "click",
          (e) => {
            // closest anchor
            const link = e.target.closest("a");
            // guard clauses
            if (!link) return;
            if (!link.classList.contains("external-rte__link")) return;

            const block = link.closest("[data-block-name]");
            let blockName = "";
            if (block) {
              blockName = block
                .getAttribute("data-block-name")
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            }
            const interstitialSuffixMap = {
              _INTERSTITIAL_GENERAL_THIRD_PARTIES: "general-third-parties",
              _INTERSTITIAL_TELEHEALTH: "telehealth",
              _INTERSTITIAL_ACCOUNT_WELLBEING: "account-wellbeing",
              _INTERSTITIAL_ACCOUNT: "account",
              _INTERSTITIAL_EMBEDDED_TOOLS_HEALTHGRADES:
                "embedded-tools-healthgrades",
              _INTERSTITIAL_EMBEDDED_TOOLS_NOURISH: "embedded-tools-nourish",
            };
            let interstitialType = "";
            let exitInterstitial = false;
            let cleanedHref = link.href;
            Object.entries(interstitialSuffixMap).forEach(([suffix, value]) => {
              if (cleanedHref.toUpperCase().includes(suffix)) {
                const regex = new RegExp(suffix, "gi");
                cleanedHref = cleanedHref.replace(regex, "");
                interstitialType = value;
                exitInterstitial = true;
              }
            });
            if (exitInterstitial) {
              // sanitizing by removing trailing slashes
              cleanedHref = cleanedHref.replace(/\/+$/, "");
              e.preventDefault();
              let target = link.target || "_self";
              if (
                interstitialType === "account-wellbeing" ||
                interstitialType === "account"
              ) {
                target = "_self";
              }
              const interstitialData = {
                type: interstitialType,
                url: cleanedHref,
                ariaLabel: link.getAttribute("aria-label"),
                target: "_blank",
              };
              handleShowInterstitial(interstitialData);
            }
          },
          true,
        );
      }
    }
  });
}
