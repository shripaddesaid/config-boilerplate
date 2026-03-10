import { loadCSS } from "../../scripts/aem.js";
import { getAemConfig } from "../../scripts/scripts.js";
import { getLocale } from "../../utils/locale-utils.js";

/**
 * Decorate federated component block
 * @param {Element} block The federated component block element
 */
export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/federated-components/federated-components.min.css",
    );
    const [, { default: FederatedComponent }, unexFederatedCompUrl] =
      await Promise.all([
        loadCSS(cssPath),
        import(
          "../../../platform-blocks/federated-components/federated-components.min.js"
        ),
        getAemConfig("UNEX_FEDERATED_URL"),
      ]);

    const federatedComponent = new FederatedComponent(block, {
      unexFederatedCompUrl,
    });

    federatedComponent.init();

    // Get locale value to set on federated component elements
    const locale = await getLocale();

    // Set locale attribute after component element is created
    // Use MutationObserver to wait for the federated component element to be added
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === 1 &&
            node.tagName.toLowerCase().startsWith("unex-")
          ) {
            if (locale) {
              node.setAttribute("locale", locale);
            }
          }
        }
      }
    });

    observer.observe(block, { childList: true, subtree: true });
  } catch (error) {
    console.error("Error loading federated-components:", error);
  }
}
