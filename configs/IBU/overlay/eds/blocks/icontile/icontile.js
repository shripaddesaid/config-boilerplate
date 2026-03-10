// Block: icontile
import loadCSS from "../../../platform-blocks/utils/css-loader.min.js";
import { decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { applyCustomFontSize } from "../../utils/common.js";
import { COMBINED_ICONTILE_CONFIGS } from "./icontile-config.js";

function parseConfigString(configString) {
  // Split by comma, trim, and match against config patterns
  const config = {};
  if (!configString) return config;
  const parts = configString.split(",").map((s) => s.trim());
  Object.values(COMBINED_ICONTILE_CONFIGS).forEach((cfg) => {
    parts.forEach((part) => {
      // Special handling for columnConfiguration (columnConfig-*)
      if (
        cfg.field === "columnConfiguration" &&
        part.startsWith("columnconfig-")
      ) {
        const match = part.match(/columnconfig-(.+)/);
        if (match) {
          config[cfg.field] = match[1];
        }
        return;
      }
      // Special handling for targetPathOne (ctatarget-*)
      if (cfg.field === "targetPathOne" && part.startsWith("ctatarget-")) {
        const match = part.match(/ctatarget-(.+)/);
        if (match) {
          config[cfg.field] = match[1];
        }
        return;
      }
      // Default pattern match
      const match = part.match(cfg.pattern);
      if (match) {
        config[cfg.field] = match[1];
      }
    });
  });
  return config;
}

function parseBlockData(block, IconTileContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];

  // Parse block-level config from classList
  const blockConfig = {};
  if (block.classList) {
    Object.values(COMBINED_ICONTILE_CONFIGS).forEach((cfg) => {
      [...block.classList].forEach((cls) => {
        const match = cls.match(cfg.pattern);
        if (match) {
          blockConfig[cfg.field] = match[1];
        }
      });
    });
  }

  // Extract main component elements (first child is section title)
  const sectionTitleEl = children[0]?.children?.[0] || null;

  // Parse tiles (all children except the first)
  const tiles = children.slice(1).map((tileElement) => {
    const tileChildren = [...tileElement.children];
    // Find config string in the 4th child (index 3)
    const configDiv = tileChildren[3];
    let configString = "";
    if (configDiv?.textContent) {
      configString = configDiv.textContent;
    }
    const config = parseConfigString(configString);
    const [eyebrowText, iconImg, title, , description, ctaLabel] = tileChildren;
    const ctaLink = ctaLabel?.querySelector("a");

    return {
      eyebrowText: eyebrowText ? eyebrowText.innerHTML : "",
      icon: iconImg?.querySelector("img")?.src || "",
      iconAlt: iconImg?.querySelector("img")?.alt || "",
      title: title ? title.innerHTML : "",
      description: description ? description.innerHTML : "",
      cta: {
        label: ctaLabel ? ctaLabel.textContent.trim() : "",
        link: ctaLink?.href || "",
        ariaLabel: ctaLink?.getAttribute("title") || "",
        type: config.ctaTypeOne,
        targetPath: config.targetPathOne,
        exitInterstitial: config.exitInterstitial,
      },
      titleFontSize: config.textRteFontSize,
      descriptionFontSize: config.descriptionRteFontSize,
      originalElement: tileElement,
    };
  });

  // Content data
  const contentData = {
    sectionTitle: sectionTitleEl ? sectionTitleEl.innerHTML : "",
    titleRteFontSize: blockConfig.titleRteFontSize,
    columnConfiguration: blockConfig.columnConfiguration || "2-col",
    tiles,
  };

  // CTA data
  const ctaData = {
    tiles: tiles.map((tile) => tile.cta),
  };

  // Create IconTileContract instance
  const iconTileObj = new IconTileContract();
  iconTileObj.componentName = "IconTile";
  iconTileObj.sectionTitle = contentData.sectionTitle;
  iconTileObj.tiles = tiles;

  const parsedData = {
    content: contentData,
    ctaData,
    elements: {
      sectionTitleEl,
      tiles: children.slice(1),
    },
  };

  return { parsedData, iconTileObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/icontile/icontile.min.css",
    );
    const [, icontileModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/icontile/icontile.min.js"),
      import("../../../platform-blocks/icontile/icontile-config.min.js"),
    ]);

    const IconTile = icontileModule.default;
    const IconTileContract = icontileModule.IconTileContract;

    const { parsedData, iconTileObj } = parseBlockData(block, IconTileContract);

    const iconTile = new IconTile(block, {
      moveInstrumentation,
      applyCustomFontSize,
      decorateIcon,
      componentName: "IconTile",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_ICONTILE_CONFIGS),
      parsedData,
      iconTileObj,
    });
    iconTile.init();
  } catch (error) {
    console.error("Error loading icontile:", error);
  }
}
