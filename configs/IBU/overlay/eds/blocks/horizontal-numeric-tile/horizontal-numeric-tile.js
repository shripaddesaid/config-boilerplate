import loadCSS from "../../../platform-blocks/utils/css-loader.min.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { COMBINED_HORIZONTAL_NUMERIC_TILE_CONFIGS } from "./horizontal-numeric-tile-config.js";

function parseBlockData(block, HorizontalNumericTileContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];

  // Helper function to safely get HTML content
  const getTrimmedHTML = (el) => {
    if (!el) return "";
    return el.innerHTML || "";
  };

  // Parse the block data structure
  const [sectitle, secdescription, footer, ...tiles] = children;

  // Process tiles data
  const tileItems = tiles.map((tileElement) => {
    const [title, ItemDropdownValues, textTitle, description] = [
      ...(tileElement?.children || []),
    ];

    let dropdownFields;
    if (ItemDropdownValues) {
      dropdownFields = ItemDropdownValues.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "numeric-tile");
    }
    return {
      title: getTrimmedHTML(title),
      dropdownFields,
      textTitle: getTrimmedHTML(textTitle),
      description: getTrimmedHTML(description),
      originalElement: tileElement,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    sectitle: getTrimmedHTML(sectitle),
    secdescription: getTrimmedHTML(secdescription),
    footer: getTrimmedHTML(footer),
    tiles: tileItems,
  };

  // Contract validation
  const horizontalNumericTileObj = new HorizontalNumericTileContract(
    "Horizontal Numeric Tile",
    contentData.sectitle,
    contentData.secdescription,
    contentData.variation,
  );

  const parsedData = {
    content: contentData,
    elements: {
      sectitle,
      secdescription,
      footer,
      tiles,
    },
  };

  return { parsedData, horizontalNumericTileObj };
}

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/horizontal-numeric-tile/horizontal-numeric-tile.min.css",
    );
    const [, horizontalNumericTileModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/horizontal-numeric-tile/horizontal-numeric-tile.min.js"
      ),
    ]);

    const HorizontalNumericTile = horizontalNumericTileModule.default;
    const HorizontalNumericTileContract =
      horizontalNumericTileModule.HorizontalNumericTileContract;

    // Parse block data in EDS layer
    const { parsedData, horizontalNumericTileObj } = parseBlockData(
      block,
      HorizontalNumericTileContract,
    );

    const horizontalNumericTile = new HorizontalNumericTile(block, {
      moveInstrumentation,
      componentName: "Horizontal Numeric Tile",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_HORIZONTAL_NUMERIC_TILE_CONFIGS),
      parsedData,
      horizontalNumericTileObj,
    });

    horizontalNumericTile.init();
  } catch (error) {
    console.error("Error loading horizontal-numeric-tile:", error);
  }
}
