import { getMetadata, loadCSS } from "../../scripts/aem.js";
import { getLocale } from "../../utils/locale-utils.js";
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const cssPath = import.meta.resolve(
      "../../../platform-blocks/footer/footer.min.css",
    );
    const [, { default: Footer }] = await Promise.all([
      loadCSS(cssPath),
      import("../../../platform-blocks/footer/footer.min.js"),
    ]);
    const footerMmn = await getMetadata("footer_mmn");
    const footerMmnDate = await getMetadata("footer_mmn_date");
    const locale = await getLocale();
    const footer = new Footer(block, {
      getMetadata,
      attributes: {
        type: "",
        locale: locale || "",
        mmn: footerMmn || "",
        mmnDate: footerMmnDate || "",
      },
    });
    footer.init();
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}
