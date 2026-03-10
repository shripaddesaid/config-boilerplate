export function getPageLanguage() {
  // Try document.documentElement.lang first
  const htmlLang = document.documentElement?.lang;
  if (htmlLang) return htmlLang;

  // Try meta tag
  const metaLang =
    document.querySelector('meta[name="language"]')?.content ||
    document.querySelector('meta[http-equiv="content-language"]')?.content;
  if (metaLang) return metaLang;

  // Try browser language as fallback
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang) return browserLang.split("-")[0]; // Get just the language part (e.g., 'en' from 'en-US')

  // Final fallback
  return "es";
}
