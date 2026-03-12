import { getBrowserType, getDeviceType } from "../utils/deviceUtils.js";
export default function pageLoadEvents() {
  window.adobeDataLayer = window.adobeDataLayer || [];
  const { adobeDataLayer } = window;
  const { userAgent } = navigator;

  // Utility Functions
  function getPageLanguage() {
    const htmlLang = document.documentElement?.lang;
    if (htmlLang) return htmlLang;
    const metaLang =
      document.querySelector('meta[name="language"]')?.content ||
      document.querySelector('meta[http-equiv="content-language"]')?.content;
    if (metaLang) return metaLang;
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) return browserLang.split("-")[0];
    return "en";
  }

  function getSiteSections(path) {
    const sanitizedPath = path.replace(/\.html$/, "");
    const parts = sanitizedPath.split("/").filter(Boolean);
    return {
      siteSection1: parts[0] || "",
      siteSection2: parts[1] || "",
      siteSection3: parts[2] || "",
      siteSection4: parts[3] || "",
      siteSection5: parts[4] || "",
      siteSection6: parts[5] || "",
      siteSection7: parts[6] || "",
    };
  }

  function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
  }

  function getBrowserVersion() {
    const match = userAgent.match(
      /(Chrome|Firefox|Safari|Edge|MSIE|Trident)\/?\s*(\d+)/i,
    );
    if (!match) return "";
    if (/trident/i.test(match[1])) {
      const rv = userAgent.match(/rv:(\d+)/);
      return `IE ${rv ? rv[1] : ""}`;
    }
    return `${match[1]} ${match[2]}`;
  }
  // Shared Variables
  const brandName = "lilly";
  const previousPageUrl = document.referrer || "";
  const browserType = getBrowserType(userAgent);
  const deviceType = getDeviceType(userAgent);

  // Previous Page Info
  let previousPageNameFormatted = "";
  if (previousPageUrl) {
    try {
      const prevSections = getSiteSections(new URL(previousPageUrl).pathname);
      previousPageNameFormatted = `${brandName}:${prevSections.siteSection1}:${prevSections.siteSection2}:${prevSections.siteSection3}:${prevSections.siteSection4}:${prevSections.siteSection5}:${prevSections.siteSection6}:${prevSections.siteSection7}`;
    } catch {
      previousPageNameFormatted = "";
    }
  }

  //------Error Page Analytics----------
  if (window.isErrorPage === true && window.errorCode === "404") {
    // Use requestIdleCallback for better timing, with fallback
    const fireErrorEvent = () => {
      adobeDataLayer.push({
        event: "site_error",
        pageInfo: {
          pageTitle: document.title || "Page not found",
          pageUrl: window.location.href,
          pagePath: window.location.pathname,
          pageLanguage: getPageLanguage(),
          previousPageUrl: previousPageUrl,
        },
        errorInfo: {
          errorDetails: `${window.errorCode || "404"}:Page not found`,
        },
        applicationInfo: {
          hostName: window.location.hostname || "",
          browserType,
          operatingSystemType: deviceType,
          deviceType,
          screenResolution: getScreenResolution(),
          browserVersion: getBrowserVersion(),
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        },
      });
    };
  }
}
