import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  loadScript,
} from "./aem.js";
import { initAuth0 } from "./auth.js"; 
import { initBreadcrumbs } from "../utils/breadcrumbs.js";
import pageLoadEvents from "../utils/pageLoadAnalytics.js";
import createISIDecorate from "../utils/isi.js";

/**
 * Ensures the Stencil modal overlay web component is defined.
 * Exposes a lightweight, centralized initializer for any block that needs a modal.
 */
export async function ensureModalOverlay() {
  try {
    const { defineCustomElements } = await import("stencil-web-components");
    defineCustomElements(window, ["modal-overlay"]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to load stencil-web-components:", e);
  }
}

/**
 * Attaches accessible modal behavior to a provided modal overlay and a set of opener links.
 * - Traps focus by inerting siblings of the provided container
 * - Prevents navigation on openers during an open session and restores afterward
 * - Restores focus to the first opener on close
 *
 * @param {Object} options
 * @param {Element} options.container - The container that holds the modal block (siblings will be inerted).
 * @param {HTMLElement} options.modalOverlay - The <modal-overlay> element instance.
 * @param {string|NodeList|Element[]} options.openers - CSS selector, NodeList, or array of opener elements.
 * @returns {{ close: Function, open: Function }} control API for consumers
 */
export function attachModalOverlayBehavior({
  container,
  modalOverlay,
  openers,
  openersRoot,
}) {
  if (!modalOverlay || !container) return { close: () => {}, open: () => {} };

  // Normalize openers to array of elements
  let openerElements = [];
  if (typeof openers === "string") {
    const root = openersRoot || document;
    openerElements = Array.from(root.querySelectorAll(openers));
  } else if (openers && typeof openers.forEach === "function") {
    openerElements = Array.from(openers);
  }

  if (!openerElements.length) return { close: () => {}, open: () => {} };

  const parentContainer = container.parentNode;

  function setInert(exceptNode, inert = true) {
    if (!parentContainer) return;
    Array.from(parentContainer.children).forEach((sibling) => {
      if (sibling === exceptNode) return;
      if (inert) {
        sibling.setAttribute("aria-hidden", "true");
        sibling.setAttribute("tabindex", "-1");
      } else {
        sibling.removeAttribute("aria-hidden");
        sibling.removeAttribute("tabindex");
      }

      const focusableSelectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
        "audio[controls]",
        "video[controls]",
        '[contenteditable]:not([contenteditable="false"])',
      ];
      sibling.querySelectorAll(focusableSelectors.join(", ")).forEach((el) => {
        if (inert) {
          el.setAttribute("tabindex", "-1");
        } else {
          el.removeAttribute("tabindex");
        }
      });
    });
  }

  function findFirstFocusable(root) {
    const focusableSelector = [
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ].join(", ");
    let focusable = root.querySelector(focusableSelector);
    if (focusable) return focusable;
    const shadowHosts = Array.from(root.children).filter((el) => el.shadowRoot);
    for (const host of shadowHosts) {
      // eslint-disable-next-line no-use-before-define
      focusable = findFirstFocusable(host.shadowRoot);
      if (focusable) return focusable;
    }
    return null;
  }

  const originalHrefs = new Map();
  openerElements.forEach((link) => {
    // Prevent duplicate bindings if multiple blocks accidentally target the same opener
    if (link.dataset.modalBound === "true") return;
    link.dataset.modalBound = "true";
    originalHrefs.set(link, link.getAttribute("href") || "");
  });

  function restoreOpeners() {
    openerElements.forEach((link) => {
      const originalHref = originalHrefs.get(link);
      if (originalHref === "") {
        link.removeAttribute("href");
      } else {
        link.href = originalHref;
      }
    });
  }

  function focusFirstOpener() {
    if (openerElements.length > 0) {
      openerElements[0].focus();
    }
  }

  function open() {
    setInert(container, true);
    modalOverlay.isopen = true;
    setTimeout(() => {
      const firstFocusable = findFirstFocusable(modalOverlay);
      if (firstFocusable) firstFocusable.focus();
    }, 100);
  }

  function close() {
    modalOverlay.isopen = false;
    setInert(container, false);
    restoreOpeners();
    focusFirstOpener();
  }

  openerElements.forEach((link) => {
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Neutralize navigation while remaining a valid anchor
        // eslint-disable-next-line no-param-reassign
        link.href = "#";
        open();
      },
      true,
    );
  });

  modalOverlay.addEventListener("modalClosed", () => {
    close();
  });

  return { close, open };
}

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  let attributesToMove = attributes;
  if (!attributes) {
    attributesToMove = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributesToMove.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

export async function getAemConfig(configKey) {
  if (!window.aemConfig) {
    const configUrlBase = `${window.hlx.codeBasePath}/site-config/configuration.json`;
    const res = await fetch(configUrlBase);
    const json = await res.json();
    window.aemConfig = json.data;
    const filteredList = window.aemConfig.filter(
      (entry) => entry.key === configKey,
    );
    return filteredList.length > 0 ? filteredList[0].value : "";
  }
  const filteredList = window.aemConfig.filter(
    (entry) => entry.key === configKey,
  );
  return filteredList.length > 0 ? filteredList[0].value : "";
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter(
        (attr) =>
          attr.startsWith("data-aue-") || attr.startsWith("data-richtext-"),
      ),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes("localhost"))
      sessionStorage.setItem("fonts-loaded", "true");
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  // TODO: add auto block, if needed
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  // decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = "en";
  decorateTemplateAndTheme();
  const main = doc.querySelector("main");
  if (main) {
    decorateMain(main);
    document.body.classList.add("appear");
    await loadSection(main.querySelector(".section"), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem("fonts-loaded")) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}
async function loadUnexBootstrap() {
  const unexFederatedCompUrl = await getAemConfig("UNEX_FEDERATED_URL");
  try {
    if (unexFederatedCompUrl) {
      await loadScript(`https://${unexFederatedCompUrl}/loader-bootstrap.js`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
async function loadUnexFooter(footer) {
  const unexFederatedCompUrl = await getAemConfig("UNEX_FEDERATED_URL");
  try {
    if (unexFederatedCompUrl) {
      await loadScript(`https://${unexFederatedCompUrl}/unex-footer-loader.js`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  loadFooter(footer);
}

/**
 * Loads a block named 'loadInterstitialsr' directly into body as <unex-interstitials>
 * @returns {Promise}
 */
async function loadInterstitialsr() {
  const interstitial = document.createElement("unex-interstitials");
  // Add locale attribute similar to header/footer/federated components
  try {
    const { setLocaleAttribute } = await import("../utils/locale-utils.js");
    await setLocaleAttribute(interstitial);
  } catch (e) {
    // Log but continue so component can still mount
    console.error("Failed to set locale on interstitials component", e);
  }
  document.body.appendChild(interstitial);
}

async function loadUnexInterstitials() {
  const unexFederatedCompUrl = await getAemConfig("UNEX_FEDERATED_URL");
  try {
    if (unexFederatedCompUrl) {
      await loadScript(
        `https://${unexFederatedCompUrl}/unex-interstitials-loader.js`
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
  loadInterstitialsr();
}

/**
 * Loads the Auth0 script and initializes Auth0 after the script is loaded.
 * @returns {Promise<void>}
 */

async function loadAndInitAuth0() {
  const auth0ScriptUrl = await getAemConfig("AUTH0_SCRIPT_URL");
  try {
    await loadScript(auth0ScriptUrl);
    await initAuth0(); // Call your Auth0 initialization function here
  } catch (error) {
    console.error("Error loading or initializing Auth0:", error);
  }
}

async function loadUnexHeader(header) {
  const unexFederatedCompUrl = await getAemConfig("UNEX_FEDERATED_URL");
  try {
    if (unexFederatedCompUrl) {
      await loadScript(`https://${unexFederatedCompUrl}/unex-header-loader.js`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  await loadAndInitAuth0();
  loadHeader(header);
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector("main");
  // Federated Components
  loadUnexBootstrap()
    .then(() => {
      loadUnexInterstitials();
      loadUnexHeader(doc.querySelector("header"));
      loadUnexFooter(doc.querySelector("footer"));
    })
    .catch((e) => {
      console.error("Error loading federated components:", e);
    });
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  // cookie banner
  const { loadCookieBanner } = await import("./cookie.js");
  const cookieHostname = await getAemConfig("COMMON_ASSETS_CFD_HOST");
  loadCookieBanner(
    `https://${cookieHostname}/public/syrenis-cookie-management.css`,
    `https://${cookieHostname}/public/syrenis-cookie-management.js`,
  );

  loadCSS(`${window.hlx.codeBasePath}/assets/styles/lazy-styles.css`);
  loadFonts();
  // Delay to ensure critical resources load before initializing page scripts
  // and avoid race conditions with federated components
  const PAGE_LOAD_LAZY_DELAY_MS = 3000;
  setTimeout(async () => {
    loadMartech();
  }, PAGE_LOAD_LAZY_DELAY_MS);
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  pageLoadEvents();
  // eslint-disable-next-line import/no-cycle
  createISIDecorate();
  const PAGE_LOAD_DELAY_MS = 1000;
  window.setTimeout(async () => {
    try {
      await import("./delayed.js");
    } catch (error) {
      console.error("Failed to load delayed.js:", error);
    }
  }, PAGE_LOAD_DELAY_MS);
  // load anything that can be postponed to the latest here
}

/**
 * Loads SEO Schema.
 */
function loadSchemaJson() {
  const metaTag = document.querySelector('meta[name="jsonschema"]');
  const scriptType = "application/ld+json";
  if (metaTag) {
    let content = metaTag.getAttribute("content");
    content = content.replace(/&nbsp;/g, "");
    const script = document.createElement("script");
    script.type = scriptType;
    script.textContent = content;
    document.head.appendChild(script);
    metaTag.remove();
  }
}
/**
 * Appends query parameters to a URL
 * @param {URL} url The base URL object
 * @param {URLSearchParams} searchParams The query parameters to append
 * @returns {string} The URL with appended query parameters
 */
function appendQueryParams(url, searchParams) {
  const newUrl = new URL(url.href);
  searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });
  return newUrl.href;
}

/**
 * Creates an optimized picture element for an image.
 * If the image is not an absolute URL, it will be passed to libCreateOptimizedPicture.
 * @param {string} src The image source URL
 * @param {string} alt The image alt text
 * @param {boolean} eager Whether to load the image eagerly
 * @param {object[]} breakpoints The breakpoints to use
 * @returns {Element} The picture element
 *
 */
export function createOptimizedPicture(
  src,
  alt = "",
  eager = false,
  breakpoints = [
    { media: "(min-width: 600px)", width: "2000" },
    { width: "750" },
  ],
) {
  const picture = document.createElement("picture");

  if (src.startsWith("https://delivery")) {
    let optimizedSrc = src;

    // Check if src contains the keyword "assetname"
    if (!src.includes("assetname")) {
      const altText = alt || "LillyImage";
      const assetName = altText.substring(0, 25).replace(/\s+/g, "_");
      optimizedSrc += `/as/${assetName}.jpg?assetname=${assetName}.jpg`;
    }

    const url = new URL(optimizedSrc);
    const { pathname } = url;
    const ext = pathname.substring(pathname.lastIndexOf(".") + 1);

    // webp
    breakpoints.forEach((br) => {
      const source = document.createElement("source");
      if (br.media) source.setAttribute("media", br.media);
      source.setAttribute("type", "image/webp");
      const searchParams = new URLSearchParams({
        width: br.width,
        format: "webp",
      });
      source.setAttribute("srcset", appendQueryParams(url, searchParams));
      picture.appendChild(source);
    });

    // fallback
    breakpoints.forEach((br, i) => {
      const searchParams = new URLSearchParams({
        width: br.width,
        format: ext,
      });

      if (i < breakpoints.length - 1) {
        const source = document.createElement("source");
        if (br.media) source.setAttribute("media", br.media);
        source.setAttribute("srcset", appendQueryParams(url, searchParams));
        picture.appendChild(source);
      } else {
        const img = document.createElement("img");
        img.setAttribute("loading", eager ? "eager" : "lazy");
        img.setAttribute("alt", alt);
        picture.appendChild(img);
        img.setAttribute("src", appendQueryParams(url, searchParams));
      }
    });
  } else {
    const img = document.createElement("img");
    img.setAttribute("loading", eager ? "eager" : "lazy");
    img.setAttribute("alt", alt);
    img.setAttribute("src", src);
    picture.appendChild(img);
  }

  return picture;
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  // Call breadcrumbs after main is decorated and blocks are present
  const main = document.querySelector("main");
  if (main) {
    await initBreadcrumbs(main);
  }
  loadDelayed();
  //loadSchemaJson();
  document.body.classList.add("zepbound");
}

async function loadMartech() {
  const launchUrl = await getAemConfig("ADOBE_LAUNCH_URL");
  const fedUrl = await getAemConfig("UNEX_FEDERATED_URL");
  await loadScript(launchUrl);
  await loadScript(`https://${fedUrl}/unex-data-layer-loader.js`);
}

// Check if window.hlx is initialized by aem.js before proceeding
function checkAemInitialized() {
  document.body.classList.add("zepbound");
  if (window.hlx && window.hlx.codeBasePath !== undefined) {
    // aem.js has initialized, safe to proceed
    loadPage();
  } else {
    // If aem.js hasn't initialized yet, use requestAnimationFrame for the next check
    // This is more efficient than setTimeout and will check during the next rendering cycle
    window.requestAnimationFrame(checkAemInitialized);
  }
}

export async function sendCRMPayload(data) {
  // Validate input data
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data provided to sendCRMPayload");
  }

  try {
    const apiUrl = await getAemConfig("CRM_API_URL");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("API submission error:", error);
    return { success: false, error: error.message };
  }
}

// Start the initialization process
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAemInitialized);
} else {
  checkAemInitialized();
}
