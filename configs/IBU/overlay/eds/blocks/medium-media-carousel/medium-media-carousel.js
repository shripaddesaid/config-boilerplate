import { MediumMediaCarouselContract } from "../../../platform-blocks/medium-media-carousel/medium-media-carousel.min.js";
import { loadCSS } from "../../scripts/aem.js";
import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import pushAdobeAnalyticsEvent from "../../utils/analytics/launch-util.js";
import { sanitizeHTML } from "../../utils/common.js";
import { createlinks } from "../../utils/cta.js";
import { COMBINED_MEDIUM_MEDIA_CAROUSEL_CONFIGS } from "./medium-media-carousel-config.js";

function parseBlockData(block) {
  if (!block) return {};

  const children = [...(block?.children || [])];

  // Helper function to get trimmed text content
  const getTrimmedText = (el) => (el ? el.textContent?.trim() || "" : "");
  const getTrimmedHTML = (el) => (el ? sanitizeHTML(el.innerHTML || "") : "");

  // Create MediumMediaCarouselContract instance with slide count
  const mediumMediaCarouselObj = new MediumMediaCarouselContract(
    "Medium Media Carousel",
    children.length,
  );

  // Parse each slide in EDS layer
  const slides = Array.from(children)
    .map((item) => {
      const rowChildren = item.children;

      // New structure:
      // 0: title, 1: config, 2: image, 3: ctaLinkContainer, 4: ctaAssetContainer
      const [
        titleContainer,
        configContainer,
        imageContainer,
        ctaLinkContainer,
        ctaAssetContainer,
      ] = rowChildren;

      // Extract image
      const imageElement = imageContainer?.querySelector("img");

      // Extract CTAs
      const ctaLinkAnchor = ctaLinkContainer?.querySelector("a");
      const ctaAssetAnchor = ctaAssetContainer?.querySelector("a");

      // Extract field classes from config container (comma-separated)
      const configText = configContainer?.querySelector("p")?.innerText || "";
      const fieldClasses = configText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      return {
        title: getTrimmedHTML(titleContainer),
        image: imageElement
          ? {
              src: imageElement.src,
              alt: imageElement.alt || "",
            }
          : null,
        // Primary CTA (prefer asset over link)
        ctaLabel: getTrimmedText(ctaAssetAnchor || ctaLinkAnchor),
        ctaLink: ctaAssetAnchor?.href || ctaLinkAnchor?.href || "",
        ctaAriaLabel:
          ctaAssetAnchor?.getAttribute("title") ||
          ctaLinkAnchor?.getAttribute("title") ||
          "",
        ctaAsset: ctaAssetAnchor,
        isAsset: !!ctaAssetAnchor,
        fieldClasses: fieldClasses,
        originalElement: item,
      };
    })
    .filter(Boolean);

  const parsedData = {
    slides,
    elements: {
      children,
    },
  };

  return { parsedData, mediumMediaCarouselObj };
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer
    const { parsedData, mediumMediaCarouselObj } = parseBlockData(block);

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/medium-media-carousel/medium-media-carousel.min.css",
    );
    const [, { default: MediumMediaCarousel }] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/medium-media-carousel/medium-media-carousel.min.js"
      ),
    ]);

    const mediumMediaCarousel = new MediumMediaCarousel(block, {
      moveInstrumentation,
      createlinks,
      pushAdobeAnalyticsEvent,
      createOptimizedPicture,
      componentName: "Medium Media Carousel",
      fieldConfigs: Object.values(COMBINED_MEDIUM_MEDIA_CAROUSEL_CONFIGS),
      parsedData,
      mediumMediaCarouselObj,
    });

    mediumMediaCarousel.init();
  } catch (error) {
    console.error("Error loading medium-media-carousel:", error);
  }
}
