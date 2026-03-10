import { loadCSS } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_SPACER_AND_DIVIDER_CONFIGS } from "./spacer-and-divider-config.js";

function parseBlockData(block, SpacerAndDividerContract) {
  if (!block) return {};

  const blockClassList = [...(block?.classList || [])];

  // Parse configuration from class list
  const elementselector = blockClassList[1]?.trim().toLowerCase() || "divider";
  const spacerheight = blockClassList[2]?.trim().toLowerCase() || "small";
  const dividercolor = (() => {
    const cls = block.className.toLowerCase();
    if (cls.includes("warm")) return "warm";
    if (cls.includes("secondary")) return "secondary";
    if (cls.includes("contrast")) return "contrast";
    return "contrast";
  })();
  const topbottomspacing =
    blockClassList[4]?.replace("-one", "").trim().toLowerCase() || "small";

  // Content data
  const contentData = {
    elementSelector: elementselector,
    spacerHeight: spacerheight,
    dividerColor: dividercolor,
    topBottomSpacing: topbottomspacing,
  };

  // Create SpacerAndDividerContract instance
  const spacerAndDividerObj = new SpacerAndDividerContract(
    "Spacer and Divider",
    elementselector,
    spacerheight || topbottomspacing,
  );

  const parsedData = {
    content: contentData,
  };

  return { parsedData, spacerAndDividerObj };
}

export default async function decorate(block) {
  try {
    // Parse block data in EDS layer

    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/spacer-and-divider/spacer-and-divider.min.css",
    );
    const [, SpacerAndDividerModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/spacer-and-divider/spacer-and-divider.min.js"
      ),
    ]);
    const SpacerAndDivider = SpacerAndDividerModule.default;
    const SpacerAndDividerContract =
      SpacerAndDividerModule.SpacerAndDividerContract;
    const { parsedData, spacerAndDividerObj } = parseBlockData(
      block,
      SpacerAndDividerContract,
    );

    const spacerAndDivider = new SpacerAndDivider(block, {
      moveInstrumentation,
      componentName: "Spacer and Divider",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_SPACER_AND_DIVIDER_CONFIGS),
      parsedData,
      spacerAndDividerObj,
    });

    spacerAndDivider.init();
  } catch (error) {
    console.error("Error loading spacer-and-divider:", error);
  }
}
