import { createOptimizedPicture, decorateIcon } from "../../scripts/aem.js";
import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { loadCSS } from "../../utils/css-loader.js";
import { COMBINED_IMAGE_BLOCK_CONFIGS } from "./image-block-config.js";

function parseBlockData(block, ImageBlockContract, getFirstElement) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const [imageElement, descriptionElement, squareEdgesElement] = children;

  // Helper function to safely get text content
  const getTrimmedText = (el) => {
    const text = el?.textContent?.trim() || "";
    if (el) el.textContent = "";
    return text;
  };

  // Helper function to get text content without clearing
  const getTextContent = (el) => el?.textContent?.trim() || "";

  // Parse image elements using utility functions
  const mainImageElem = getFirstElement(imageElement, "img");

  // Parse description content
  const descElement = descriptionElement?.children?.[0]?.children;
  const rest = Array.from(descElement || []).slice(1);
  const descDiv = document.createElement("div");

  rest?.forEach((item) => {
    const isHTMLAvailable = item?.innerHTML;
    if (isHTMLAvailable) descDiv.appendChild(item.cloneNode(true));
  });

  // Content data
  const contentData = {
    image: mainImageElem?.src || "",
    imageAlt: mainImageElem?.alt || "",
    labelText: getTextContent(descElement?.[0]),
    descriptionElement: descDiv,
    squareEdges: getTrimmedText(squareEdgesElement) || "false",
  };

  // Create ImageBlockContract instance and populate properties
  const imageBlockObj = new ImageBlockContract();
  imageBlockObj.componentName = "Image Block";
  imageBlockObj.image = mainImageElem?.src || "";
  imageBlockObj.imageAlt = mainImageElem?.alt || "";
  imageBlockObj.labelText = getTextContent(descElement?.[0]);
  imageBlockObj.descriptionElement = descDiv;
  imageBlockObj.squareEdges = getTrimmedText(squareEdgesElement) || "false";

  const parsedData = {
    content: contentData,
    elements: {
      imageElement,
      descriptionElement,
      squareEdgesElement,
    },
  };

  return { parsedData, imageBlockObj };
}

export default async function decorate(block) {
  try {
    // Load CSS and JS modules in parallel
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/image-block/image-block.min.css",
    );
    const [, imageBlockModule, domUtilsModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/image-block/image-block.min.js"),
      import("../../../platform-blocks/utils/dom-utils.min.js"),
    ]);

    const ImageBlock = imageBlockModule.default;
    const ImageBlockContract = imageBlockModule.ImageBlockContract;
    const { getFirstElement } = domUtilsModule;
    // Parse block data in EDS layer
    const { parsedData, imageBlockObj } = parseBlockData(
      block,
      ImageBlockContract,
      getFirstElement,
    );

    // Initialize the component
    const imageBlock = new ImageBlock(block, {
      createOptimizedPicture,
      moveInstrumentation,
      moveAttributes,
      decorateIcon,
      componentName: "Image Block",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_IMAGE_BLOCK_CONFIGS),
      parsedData,
      imageBlockObj,
    });

    imageBlock.init();
  } catch (error) {
    console.error("Error loading image-block:", error);
  }
}
