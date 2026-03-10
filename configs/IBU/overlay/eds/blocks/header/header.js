import { authCheck, getUserDetails } from "../../scripts/auth.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { getLocale } from "../../utils/locale-utils.js";

export default async function decorate(block) {
  try {
    // Get CSS path from import and load CSS and JS in parallel for better performance
    const { default: Header } = await import(
      "../../../platform-blocks/header/header.min.js"
    );

    const locale = await getLocale();

    const header = new Header(block, {
      moveInstrumentation,
      authCheck,
      getUserDetails,
      attributes: {
        type: "",
        locale: locale || "",
      },
    });
    header.init();
  } catch (error) {
    console.error("Error loading header:", error);
  }
}
