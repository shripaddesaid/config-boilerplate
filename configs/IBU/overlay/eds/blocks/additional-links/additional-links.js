import { AdditionalLinksContract } from "../../../platform-blocks/additional-links/additional-links.min.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { createlinks } from "../../utils/cta.js";

function parseBlockData(block) {
  if (!block) return {};

  const children = [...(block?.children || [])];

  // Create AdditionalLinksContract instance

  const additionalLinksObj = new AdditionalLinksContract(
    "Additional Links",

    children,
  );

  const parsedData = {
    items: children,

    elements: {
      children,
    },
  };

  return { parsedData, additionalLinksObj };
}

export default async function decorate(block) {
  try {
    const { default: loadCSS } = await import(
      "../../../platform-blocks/utils/css-loader.min.js"
    );

    // Parse block data in EDS layer
    const { parsedData, additionalLinksObj } = parseBlockData(block);

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/additional-links/additional-links.min.css",
    );

    const [, { default: AdditionalLinks }] = await Promise.all([
      loadCSS(cssPath),

      import(
        "../../../platform-blocks/additional-links/additional-links.min.js"
      ),
    ]);

    const additionalLinks = new AdditionalLinks(block, {
      moveInstrumentation,
      createlinks,
      componentName: "Additional Links",
      enableAccessibility: true,
      parsedData,
      additionalLinksObj,
    });

    additionalLinks.init();

    // Wrap headline text in h6 tags
    block.querySelectorAll(".headline").forEach((headline) => {
      headline.innerHTML = `<h6>${headline.textContent}</h6>`;
    });
  } catch (error) {
    console.error("Error loading additional-links:", error);
  }
}
