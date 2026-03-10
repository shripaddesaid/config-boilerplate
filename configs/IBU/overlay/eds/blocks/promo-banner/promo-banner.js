import { moveInstrumentation } from "../../scripts/scripts.js";
import { loadCSS } from "../../utils/css-loader.js";
import { COMBINED_PROMO_BANNER_CONFIGS } from "./promo-banner-config.js";

function innerParseBlockData(
  eyebrowDiv,
  headerDiv,
  descriptionDiv,
  ctaDiv,
  ctaAssetDiv,
  isNewStructure = false,
) {
  let eyebrowEl = null;
  let titleEl = null;
  const descriptions = [];
  let ctaLinkAnchor = null;
  let ctaAssetAnchor = null;

  // For new structure (5 divs), eyebrowDiv is a separate div
  if (isNewStructure && eyebrowDiv) {
    const eyebrowInner = eyebrowDiv.querySelector("div");
    if (eyebrowInner?.textContent?.trim()) {
      eyebrowEl = eyebrowDiv;
    }
  }

  // Process header div (title only in new structure, or eyebrow+title in old structure)
  if (headerDiv) {
    const headerInner = headerDiv.children[0];
    if (headerInner) {
      const children = Array.from(headerInner.children);

      if (isNewStructure) {
        // New structure: header div contains only title
        titleEl = document.createElement("div");
        children.forEach((child) => {
          const cleanChild = document.createElement(child.tagName);
          cleanChild.innerHTML = child.innerHTML;
          titleEl.appendChild(cleanChild);
        });
      } else {
        // Old structure: header div may contain eyebrow and title together
        if (children.length >= 2) {
          // Has both eyebrow and title
          eyebrowEl = children[0];
          // Create a clean wrapper div for title content (no attributes)
          titleEl = document.createElement("div");
          // Get only the innerHTML of remaining children to avoid attribute pollution
          children.slice(1).forEach((child) => {
            const cleanChild = document.createElement(child.tagName);
            cleanChild.innerHTML = child.innerHTML;
            titleEl.appendChild(cleanChild);
          });
        } else if (children.length === 1) {
          // Only title, no eyebrow
          titleEl = children[0];
        }
      }
    }
  }
  // Process description div
  if (descriptionDiv) {
    const descInner = descriptionDiv.querySelector("div");
    if (descInner) {
      const descChildren = Array.from(descInner.children);
      descChildren.forEach((ch) => {
        if (ch.textContent?.trim()) {
          descriptions.push(ch);
        }
      });
    }
  }

  // Process CTA div
  if (ctaDiv) {
    const ctaInner = ctaDiv.querySelector("div");
    if (ctaInner) {
      const anchors = ctaInner.querySelectorAll("a");
      if (anchors.length) {
        ctaLinkAnchor = anchors[0];
      }
    }
  }

  if (ctaAssetDiv) {
    const ctaInner = ctaAssetDiv.querySelector("div");
    if (ctaInner) {
      const anchors = ctaInner.querySelectorAll("a");
      if (anchors.length) {
        ctaAssetAnchor = anchors[0];
      }
    }
  }
  return { eyebrowEl, titleEl, descriptions, ctaLinkAnchor, ctaAssetAnchor };
}

function parseBlockData(block, PromoBannerContract) {
  if (!block) return {};

  const blockClassList = [...block.classList];

  // Helper functions
  const getTrimmedHTML = (el) => (el ? el.innerHTML || "" : "");

  let eyebrowEl = null;
  let titleEl = null;
  const descriptions = [];
  let ctaLinkAnchor = null;
  let ctaAssetAnchor = null;
  // Content data
  let contentData = {
    blockClassList,
    eyebrow: eyebrowEl,
    title: titleEl,
    descriptions: descriptions,
    ctaLinkAnchor,
    ctaAssetAnchor,
  };

  if (block.children.length === 5) {
    // New structure: 5 divs (eyebrow, header, description, cta, cta-asset)
    const [eyebrowDiv, headerDiv, descriptionDiv, ctaDiv, ctaAssetDiv] =
      Array.from(block.children);
    const result = innerParseBlockData(
      eyebrowDiv,
      headerDiv,
      descriptionDiv,
      ctaDiv,
      ctaAssetDiv,
      true,
    );
    eyebrowEl = result.eyebrowEl;
    titleEl = result.titleEl;
    descriptions.push(...result.descriptions);
    ctaLinkAnchor = result.ctaLinkAnchor;
    ctaAssetAnchor = result.ctaAssetAnchor;
  } else if (block.children.length === 4) {
    // Old structure: 4 divs (header with eyebrow+title, description, cta, cta-asset)
    const [headerDiv, descriptionDiv, ctaDiv, ctaAssetDiv] = Array.from(
      block.children,
    );
    const result = innerParseBlockData(
      null,
      headerDiv,
      descriptionDiv,
      ctaDiv,
      ctaAssetDiv,
      false,
    );
    eyebrowEl = result.eyebrowEl;
    titleEl = result.titleEl;
    descriptions.push(...result.descriptions);
    ctaLinkAnchor = result.ctaLinkAnchor;
    ctaAssetAnchor = result.ctaAssetAnchor;
  }

  // Update contentData with parsed values
  contentData = {
    blockClassList,
    eyebrow: eyebrowEl,
    title: titleEl,
    descriptions: descriptions,
    ctaLinkAnchor,
    ctaAssetAnchor,
    shouldUnderscoreHighlight: false,
  };

  // Create PromoBannerContract instance and populate properties
  const promoBannerObj = new PromoBannerContract();
  promoBannerObj.componentName = "Promo Banner";
  promoBannerObj.blockClassList = blockClassList;
  promoBannerObj.title = getTrimmedHTML(titleEl);
  promoBannerObj.ctaLinkAnchor = ctaLinkAnchor;
  promoBannerObj.ctaAssetAnchor = ctaAssetAnchor;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, promoBannerObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/promo-banner/promo-banner.min.css",
    );
    const [, promoBannerModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/promo-banner/promo-banner.min.js"),
    ]);

    const PromoBanner = promoBannerModule.default;
    const PromoBannerContract = promoBannerModule.PromoBannerContract;

    const { parsedData, promoBannerObj } = parseBlockData(
      block,
      PromoBannerContract,
    );

    const promoBanner = new PromoBanner(block, {
      moveInstrumentation,
      componentName: "Promo Banner",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_PROMO_BANNER_CONFIGS),
      parsedData,
      promoBannerObj,
    });

    promoBanner.init();
    const ctaContainer = block.querySelector(".promo-banner-container a");
    if (ctaContainer) {
      ctaContainer.classList.remove("cta-button-primary-lime-green");
      ctaContainer.classList.add("cta-button-primary-light");
    }

    // Add aria-hidden="true" to all img elements
    block.querySelectorAll("img").forEach((img) => {
      img.setAttribute("aria-hidden", "true");
    });
  } catch (error) {
    console.error("Error loading promo-banner:", error);
  }
}
