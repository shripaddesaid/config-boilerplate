import { decorateIcon, loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_SMALL_WIDTH_MEDIA_CONFIGS } from "./small-width-media-config.js";

function parseBlockData(block, SmallWidthMediaContract) {
  if (!block) return {};

  const [
    eyebrowTextDiv,
    imageAndTitleDiv,
    descriptionDiv,
    ctaLabelDiv,
    ctaAssetDiv,
  ] = block.children;

  const blockClassList = [...block.classList];

  // Extract eyebrow text
  const eyebrowText =
    eyebrowTextDiv?.querySelector("p")?.textContent?.trim() || "";

  // Extract image and title
  const [imgElement, titleElement] =
    imageAndTitleDiv?.children[0]?.children || [];
  const imageUrl = imgElement?.querySelector("img")?.getAttribute("src") || "";
  const imageAlt = imgElement?.querySelector("img")?.getAttribute("alt") || "";

  // Extract description
  const descriptionElement = descriptionDiv?.querySelector("div");

  // Extract CTAs
  const ctaLinkElement = ctaLabelDiv?.querySelector("a");
  const ctaAssetElement = ctaAssetDiv?.querySelector("a");

  // Content data
  const contentData = {
    blockClassList,
    eyebrowText,
    imageUrl,
    imageAlt,
    title: titleElement,
    description: descriptionElement,
    ctaLinkElement,
    ctaAssetElement,
  };

  // Create SmallWidthMediaContract instance and populate properties
  const smallWidthMediaObj = new SmallWidthMediaContract();
  smallWidthMediaObj.componentName = "Small Width Media";
  smallWidthMediaObj.blockClassList = blockClassList;
  smallWidthMediaObj.content = contentData;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, smallWidthMediaObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/small-width-media/small-width-media.min.css",
    );

    const [, { default: SmallWidthMedia, SmallWidthMediaContract }] =
      await Promise.all([
        loadCSS(cssPath),
        import(
          "../../../platform-blocks/small-width-media/small-width-media.min.js"
        ),
      ]);

    const { parsedData, smallWidthMediaObj } = parseBlockData(
      block,
      SmallWidthMediaContract,
    );

    const smallWidthMedia = new SmallWidthMedia(block, {
      moveInstrumentation,
      decorateIcon,
      componentName: "Small Width Media",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_SMALL_WIDTH_MEDIA_CONFIGS),
      parsedData,
      smallWidthMediaObj,
    });

    smallWidthMedia.init();

    // Fix accessibility: Remove role="img" and add aria-label content for screen readers
    const container = block.querySelector(".smallwidthmedia-container");
    if (container) {
      // Get the aria-label from container
      const ariaLabel = container.getAttribute("aria-label");
      container.removeAttribute("role");
      container.removeAttribute("aria-label");

      // Create a visually hidden element with the aria-label at the start of container
      if (ariaLabel) {
        const srImageLabel = document.createElement("div");
        srImageLabel.className = "sr-only";
        srImageLabel.textContent = ariaLabel;
        container.insertBefore(srImageLabel, container.firstChild);
      }

      // Hide arrow icons from screen readers
      const ctaWrapper = container.querySelector(
        ".smallwidthmedia-cta-wrapper",
      );
      if (ctaWrapper) {
        const ctaImages = ctaWrapper.querySelectorAll("img");
        ctaImages.forEach((img) => {
          img.setAttribute("aria-hidden", "true");
          img.setAttribute("alt", "");
        });
      }
    }

    const ctaWrapper = block.querySelector(".smallwidthmedia-cta-wrapper");
    const ctaLink = ctaWrapper?.querySelector(
      "a.cta-button-primary-lime-green.cta-icon-right",
    );
    if (ctaLink) {
      ctaLink.classList.remove("cta-button-primary-lime-green");
      ctaLink.classList.add("cta-button-primary-light");
    }

    // Hide icon images inside CTA wrapper from screen readers
    if (ctaWrapper) {
      const ctaImages = ctaWrapper.querySelectorAll("img");
      ctaImages.forEach((img) => {
        img.setAttribute("aria-hidden", "true");
      });
    }
  } catch (error) {
    console.error("Error loading small-width-media:", error);
  }
}
