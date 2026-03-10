import { loadCSS } from "../../../platform-blocks/utils/css-loader.min.js";
import { getMetadata } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { t } from "../../translations/index.js";

function parseBlockData(block, PressReleaseBannerContract) {
  if (!block) return {};

  // Contract validation
  const pressReleaseBannerContractObj = new PressReleaseBannerContract();
  pressReleaseBannerContractObj.componentName = "PressReleaseBanner";

  // Content data
  const contentData = {
    metaTitleText: getMetadata("pressreleasebanner-title") || "",
    metaDateValue: getMetadata("pressreleasebanner-date") || "",
    metaAuthorValue: getMetadata("pressreleasebanner-author")?.trim() || "",
    metaLocationValue: getMetadata("pressreleasebanner-location")?.trim() || "",
  };
  const parsedData = {
    content: contentData,
  };

  return { parsedData, pressReleaseBannerContractObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/press-release-banner/press-release-banner.min.css",
    );
    const [, pressReleaseBannerModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/press-release-banner/press-release-banner.min.js"
      ),
    ]);

    const PressReleaseBannerBlock = pressReleaseBannerModule.default;

    const { parsedData, PressReleaseBannerContract } = parseBlockData(
      block,
      pressReleaseBannerModule.PressReleaseBannerContract,
    );
    const pressReleaseBannerBlock = new PressReleaseBannerBlock(block, {
      moveInstrumentation,
      t,
      parsedData,
      PressReleaseBannerContract,
    });
    pressReleaseBannerBlock.init();
  } catch (error) {
    console.error("Error loading press-release-banner:", error);
  }
}
