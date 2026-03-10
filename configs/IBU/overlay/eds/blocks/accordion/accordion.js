import { moveInstrumentation } from "../../scripts/scripts.js";
import { createOptimizedPicture } from "../../scripts/scripts.js";
import { decorateIconSvg } from "../../utils/common.js";

function parseBlockData(block, AccordionContract) {
  if (!block) return {};

  const children = [...block.children];

  const accTitle = children[0];

  const blockClassList = [...block.classList];

  // Parse accordion items
  const accordionItems = children.slice(1).map((row) => {
    const itemChildren = row.children;
    const [
      AccordionTitle,
      ItemDropdownValues,
      AccordionDescription,
      ColumnOneContentImage,
      ColumnOneContentDescription,
      ColumnOneCtaOneLink,
      ColumnOneCtaOneAsset,
      ColumnOneCtaTwoLink,
      ColumnOneCtaTwoAsset,
      IconContentDivOne,
      ColumnOneContentIconDescription,
      ColumnTwoContentImage,
      ColumnTwoContentDescription,
      ColumnTwoCtaOneLink,
      ColumnTwoCtaOneAsset,
      ColumnTwoCtaTwoLink,
      ColumnTwoCtaTwoAsset,
      IconContentDivTwo,
      ColumnTwoContentIconDescription,
    ] = itemChildren;

    let dropdownFields;
    if (ItemDropdownValues) {
      dropdownFields = ItemDropdownValues.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "accordion-item");
    }
    return {
      accordionTitle: AccordionTitle,
      itemDropdownValues: dropdownFields,
      accordionDescription: AccordionDescription,
      columnOneContentImage: ColumnOneContentImage,
      columnOneContentDescription: ColumnOneContentDescription,
      columnOneCtaOneLink: ColumnOneCtaOneLink,
      columnOneCtaOneAsset: ColumnOneCtaOneAsset,
      columnOneCtaTwoLink: ColumnOneCtaTwoLink,
      columnOneCtaTwoAsset: ColumnOneCtaTwoAsset,
      iconContentDivOne: IconContentDivOne,
      columnOneContentIconDescription: ColumnOneContentIconDescription,
      columnTwoContentImage: ColumnTwoContentImage,
      columnTwoContentDescription: ColumnTwoContentDescription,
      columnTwoCtaOneLink: ColumnTwoCtaOneLink,
      columnTwoCtaOneAsset: ColumnTwoCtaOneAsset,
      columnTwoCtaTwoLink: ColumnTwoCtaTwoLink,
      columnTwoCtaTwoAsset: ColumnTwoCtaTwoAsset,
      iconContentDivTwo: IconContentDivTwo,
      columnTwoContentIconDescription: ColumnTwoContentIconDescription,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    accTitle,
    accordionItems,
  };

  // Create AccordionContract instance and populate properties
  const accordionObj = new AccordionContract();
  accordionObj.componentName = "Accordion";
  accordionObj.blockClassList = blockClassList;
  accordionObj.accTitle = accTitle;
  accordionObj.accordionItems = accordionItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, accordionObj };
}

export default async function decorate(block) {
  try {
    // Import loadCSS dynamically
    const [{ default: loadCSS }, configModule] = await Promise.all([
      import("../../../platform-blocks/utils/css-loader.min.js"),
      import("./accordion-config.js"),
    ]);
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/accordion/accordion.min.css",
    );
    const [, accordionModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/accordion/accordion.min.js"),
    ]);

    const Accordion = accordionModule.default;
    const AccordionContract = accordionModule.AccordionContract;
    const { COMBINED_ACCORDION_CONFIGS, ctaFieldDefaults } = configModule;

    const { parsedData, accordionObj } = parseBlockData(
      block,
      AccordionContract,
    );

    const accordion = new Accordion(block, {
      moveInstrumentation,
      createOptimizedPicture,
      decorateIconSvg,
      componentName: "Accordion",
      enableAccessibility: true,
      fieldConfigs: Object.values(COMBINED_ACCORDION_CONFIGS),
      ctaFieldDefaults: ctaFieldDefaults,
      parsedData,
      accordionObj,
    });

    accordion.init();
  } catch (error) {
    console.error("Error loading accordion:", error);
  }
}
