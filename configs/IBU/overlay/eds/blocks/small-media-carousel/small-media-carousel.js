import { decorateIcon, loadCSS } from "../../scripts/aem.js";
import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_SMALL_MEDIA_CAROUSEL_CONFIGS } from "./small-media-carousel-config.js";

function parseBlockData(block, SmallMediaCarouselContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Parse each carousel item
  const carouselItems = children.map((itemElement, index) => {
    const itemChildren = [...itemElement.children];

    // Item structure: [title, size, image]
    const titleElement = itemChildren[0] || null;
    const sizeElement = itemChildren[1] || null;
    const imageElement = itemChildren[2] || null;

    // Extract font size from the size field (comma-separated values format)
    const sizeText = sizeElement?.textContent?.trim() || "";
    const sizeParts = sizeText.split(",");
    const titleFontSize =
      sizeParts.length > 1 ? sizeParts[1]?.split("-")[2] : null;

    return {
      title: titleElement ? titleElement.innerHTML : "",
      titleFontSize: titleFontSize,
      imageElement: imageElement,
      originalElement: itemElement,
      index: index,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    carouselItems,
    cardsCount: children.length,
  };

  // Create SmallMediaCarouselContract instance and populate properties
  const smallMediaCarouselObj = new SmallMediaCarouselContract();
  smallMediaCarouselObj.componentName = "Small Media Carousel";
  smallMediaCarouselObj.blockClassList = blockClassList;
  smallMediaCarouselObj.carouselItems = carouselItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, smallMediaCarouselObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/small-media-carousel/small-media-carousel.min.css",
    );
    const [, smallMediaCarouselModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/small-media-carousel/small-media-carousel.min.js"
      ),
    ]);

    const SmallMediaCarousel = smallMediaCarouselModule.default;
    const SmallMediaCarouselContract =
      smallMediaCarouselModule.SmallMediaCarouselContract;

    const { parsedData, smallMediaCarouselObj } = parseBlockData(
      block,
      SmallMediaCarouselContract,
    );

    const smallMediaCarousel = new SmallMediaCarousel(block, {
      decorateIcon,
      moveInstrumentation,
      moveAttributes,
      componentName: "Small Media Carousel",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_SMALL_MEDIA_CAROUSEL_CONFIGS),
      parsedData,
      smallMediaCarouselObj,
    });

    smallMediaCarousel.init();

    // Hide decorative icon images from screen readers
    const carouselImageAreas = block.querySelectorAll(".carousel-image-area");
    carouselImageAreas.forEach((imageArea) => {
      const paragraphs = imageArea.querySelectorAll("p");
      // Set aria-hidden on the img inside the second <p> element
      const iconParagraph = paragraphs[1];
      if (iconParagraph) {
        const iconImg = iconParagraph.querySelector("img");
        if (iconImg) {
          iconImg.setAttribute("aria-hidden", "true");
        }
      }
    });
  } catch (error) {
    console.error("Error loading small-media-carousel:", error);
  }
}
