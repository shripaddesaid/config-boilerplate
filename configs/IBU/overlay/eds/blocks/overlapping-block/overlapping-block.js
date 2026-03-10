import { moveAttributes, moveInstrumentation } from "../../scripts/scripts.js";
import { loadCSS } from "../../utils/css-loader.js";

function parseBlockData(block, OverlappingBlockContract) {
  if (!block) return {};

  // Get grandparent background color
  const parent = block.parentElement;
  const grandparent = parent ? parent.parentElement : null;
  let backgroundColor = "";

  if (grandparent?.classList.contains("section")) {
    const computedStyle = window.getComputedStyle(grandparent);
    backgroundColor = computedStyle.backgroundColor;
  }

  // Content data
  const contentData = {
    backgroundColor,
  };

  // Contract validation
  const overlappingBlockObj = new OverlappingBlockContract(
    "Overlapping Block",
    backgroundColor,
  );
  overlappingBlockObj.componentName = "Overlapping Block";
  overlappingBlockObj.backgroundColor = backgroundColor;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, overlappingBlockObj };
}

export default async function decorate(block) {
  try {
    // Load CSS and JS modules in parallel
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/overlapping-block/overlapping-block.min.css",
    );
    const [, overlappingBlockModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/overlapping-block/overlapping-block.min.js"
      ),
    ]);

    const OverlappingBlock = overlappingBlockModule.default;
    const OverlappingBlockContract =
      overlappingBlockModule.OverlappingBlockContract;

    // Parse block data in EDS layer
    const { parsedData, overlappingBlockObj } = parseBlockData(
      block,
      OverlappingBlockContract,
    );

    // Initialize the component
    const overlappingBlock = new OverlappingBlock(block, {
      moveInstrumentation,
      moveAttributes,
      componentName: "Overlapping Block",
      enableAccessibility: true,
      parsedData,
      overlappingBlockObj,
    });

    overlappingBlock.init();
  } catch (error) {
    console.error("Error loading overlapping-block:", error);
  }
}
