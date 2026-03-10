import { getAemConfig } from "../scripts/scripts.js";

/**
 * Retrieves the locale from AEM config or falls back to html lang attribute
 * @returns {Promise<string>} The locale string (e.g., 'en-us')
 */
export async function getLocale() {
  let locale = await getAemConfig("LOCALE");

  if (!locale) {
    // Fallback: get from <html lang="...">
    locale = document.documentElement?.lang
      ? document.documentElement.lang.toLowerCase()
      : "";
  }

  return locale;
}

/**
 * Sets locale attribute on a federated component element
 * @param {HTMLElement} element - The element to set locale on
 * @param {string} [customLocale] - Optional custom locale, otherwise fetches from config
 * @returns {Promise<void>}
 */
export async function setLocaleAttribute(element, customLocale = null) {
  if (!element) return;

  const locale = customLocale || (await getLocale());

  if (locale) {
    element.setAttribute("locale", locale);
  }
}
