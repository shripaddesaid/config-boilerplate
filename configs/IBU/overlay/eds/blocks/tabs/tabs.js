import { moveInstrumentation } from "../../scripts/scripts.js";
import { loadCSS } from "../../utils/css-loader.js";

function parseBlockData(block, TabsContract) {
  if (!block) return {};
  const children = [...(block?.children || [])];
  const dropdownTitle = children[0]?.textContent?.trim() || "";
  const tabItems = children.slice(1).map((row) => {
    const [tabName, tabId] = row.children;
    return {
      title: tabName?.textContent?.trim() || "",
      id: tabId?.textContent?.trim() || "",
      originalElement: row,
    };
  });
  // Content data
  const contentData = {
    dropdownTitle,
    tabItems,
  };
  // Contract validation
  const tabsContractObj = new TabsContract("Tabs", tabItems);
  tabsContractObj.componentName = "Tabs";
  tabsContractObj.dropdownTitle = dropdownTitle;
  tabsContractObj.tabItems = tabItems;
  const parsedData = {
    content: contentData,
  };
  return { parsedData, tabsContractObj };
}

export default async function decorate(block) {
  try {
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/tabs/tabs.min.css",
    );
    const [, tabsModule] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/tabs/tabs.min.js"),
    ]);

    const TabsBlock = tabsModule.default;
    const TabsContract = tabsModule.TabsContract;

    const { parsedData, tabsContractObj } = parseBlockData(block, TabsContract);
    const tabsBlock = new TabsBlock(block, {
      moveInstrumentation,
      parsedData,
      tabsContractObj,
    });
    tabsBlock.init();
  } catch (error) {
    console.error("Error loading tabs:", error);
  }
}
