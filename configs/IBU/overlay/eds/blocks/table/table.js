import loadCSS from "../../../platform-blocks/utils/css-loader.min.js";
import { createOptimizedPicture, decorateIcon } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { FIELD_CONFIGS } from "./table-version-two-config.js";

function parseBlockData(block, TableVerTwoContract) {
  if (!block) return {};

  const children = [...(block?.children || [])];
  const blockClassList = [...block.classList];
  const [isSticky, header, descriptionLabel, description] = children;

  // Helper function to safely get text content
  const getTrimmedText = (el) => {
    const text = el?.textContent?.trim() || "";
    if (el) el.textContent = "";
    return text;
  };

  // Helper function to safely get HTML content
  const getTrimmedHTML = (el) => {
    if (!el) return "";
    const html = el.innerHTML || "";
    return html;
  };

  const tableItems = children.slice(4).map((row) => {
    const itemChildren = row.children;
    const [isMergeCells, colOneDesc, dropdownValues, ...restColData] =
      itemChildren;
    const colData = [colOneDesc, ...restColData];
    let configValues;
    if (dropdownValues) {
      configValues = dropdownValues.textContent
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((item) => item !== "row");
    }
    return {
      isMergeCells: getTrimmedText(isMergeCells),
      colData,
      configValues,
      originalElement: row,
    };
  });

  // Content data
  const contentData = {
    blockClassList,
    isSticky: getTrimmedText(isSticky),
    header: getTrimmedHTML(header),
    descriptionLabel: getTrimmedHTML(descriptionLabel),
    description: getTrimmedHTML(description),
    tableItems,
  };

  // Create TableContract instance and populate properties
  const tableObj = new TableVerTwoContract();
  tableObj.componentName = "Table";
  tableObj.isSticky = getTrimmedText(isSticky);
  tableObj.header = getTrimmedHTML(header);
  tableObj.descriptionLabel = getTrimmedHTML(descriptionLabel);
  tableObj.description = getTrimmedHTML(description);
  tableObj.tableItems = tableItems;

  const parsedData = {
    content: contentData,
  };

  return { parsedData, tableObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/table-version-two/table-version-two.min.css",
    );
    const [, tableModule] = await Promise.all([
      loadCSS(cssPath),
      import(
        "../../../platform-blocks/table-version-two/table-version-two.min.js"
      ),
    ]);

    const Table = tableModule.default;
    const TableVerTwoContract = tableModule.TableVerTwoContract;

    const { parsedData, tableObj } = parseBlockData(block, TableVerTwoContract);

    const table = new Table(block, {
      moveInstrumentation,
      createOptimizedPicture,
      decorateIcon,
      componentName: "Table",
      enableAccessibility: true,
      fieldConfigs: Object.values(FIELD_CONFIGS),
      parsedData,
      tableObj,
    });

    table.init();
  } catch (error) {
    console.error("Error loading table:", error);
  }
}
