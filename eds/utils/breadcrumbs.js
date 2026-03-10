import { getAemConfig } from "../scripts/scripts.js";
import { t } from "../translations/index.js";
import { getPageLanguage } from "./page-language.js";
import { setAttributes } from "./setAttributes.js";

// Extract the path from the current page url
let basePath;
const getPathFromUrl = () => {
  const { origin, pathname } = window.location;
  basePath = origin;
  if (origin.includes("author")) {
    const match = pathname.match(
      /\/content\/ewi-lilly-com(-[^\/]*)?(-[^\/]*)?\/(us\/en\/)?/,
    );
    if (match) {
      basePath += match[0].slice(0, -1);
    }
  }
  let relativePath = pathname.replace(basePath.replace(origin, ""), "");
  relativePath = relativePath.replace(/\.html.*/, "");
  return relativePath.toLowerCase();
};

// Build breadcrumb path array from API data
const buildPageArray = (data, remainingUrl) => {
  const item = data.find(({ path }) => path === remainingUrl);
  if (!item) return [];
  const array = [];
  let tempPath = item.path;
  while (tempPath) {
    array.push(tempPath);
    const lastSlash = tempPath.lastIndexOf("/");
    if (lastSlash > 0) tempPath = tempPath.substring(0, lastSlash);
    else break;
  }
  return array;
};

// Build crumbs with URLs and titles
const buildCrumbs = (pageArray, data) =>
  pageArray
    .map((pageItem) => {
      const match = data.find(({ path }) => path === pageItem);
      if (!match) return null;
      let pageUrl = `${basePath}${match.path}`;
      if (pageUrl.includes("author")) {
        pageUrl = `${pageUrl}.html`;
      }
      return { pageTitle: match.pageTitle, pageUrl };
    })
    .filter(Boolean);

// Create a crumb element (link or text)
const createCrumb = (crumb, isLink = true) => {
  const el = document.createElement(isLink ? "a" : "p");
  el.className = "breadcrumb-item";

  if (crumb.pageTitle) el.textContent = crumb.pageTitle;

  // Base attributes common to both link and current page representation
  const baseAttrs = {
    "data-track-event": "Breadcrumb click",
    "data-track-component": "Breadcrumb",
  };

  // Add link-specific attributes if it's a link
  if (isLink) {
    const ariaLabel = crumb.pageTitle ? crumb.pageTitle : t("HOME");
    Object.assign(baseAttrs, {
      "aria-label": ariaLabel,
    });
    el.href = crumb.pageUrl;
    el.classList.add("breadcrumb-link");
    el.tabIndex = 0;
  } else {
    el.classList.add("current-page");
  }

  setAttributes(el, baseAttrs);
  return el;
};

// Adds divider
const addDivider = (parent, idx, arr) => {
  if (idx < arr.length - 1) {
    const divider = document.createElement("span");
    divider.textContent = " / ";
    divider.className = "breadcrumb-divider";
    parent.appendChild(divider);
  }
};

export default async function createBreadcrumbs(
  firstBlock,
  decorateIcon,
  getMetadata,
) {
  if (!getMetadata("enablebreadcrumb")) return;

  const breadcrumbType = getMetadata("breadcrumbtype");
  const apiPath = window.location.origin;
  const remainingUrl = getPathFromUrl();
  let api;
  try {
    const breadcrumbApi = await getAemConfig("BREADCRUMB_API");
    api = `${apiPath}${breadcrumbApi}`;
  } catch (err) {
    console.error("Failed to get BREADCRUMB_API config:", err);
    return;
  }

  let data;
  try {
    const response = await fetch(api);
    if (!response.ok) return;
    data = (await response.json()).data;
  } catch {
    return;
  }

  const pageArray = buildPageArray(data, remainingUrl);
  const crumbs = buildCrumbs(pageArray, data);

  if (!firstBlock || crumbs.length < 1) return;

  const container = document.createElement("div");
  container.className = "breadcrumb-container";

  // const homePageContainer = document.createElement("a");
  // Use getPageLanguage to determine the language path dynamically
  const pageRegionValue = getPageLanguage();
  const pageRegion = pageRegionValue.includes("-")
    ? pageRegionValue.split("-")[1].toLowerCase()
    : "uk"; // Use default region when no hyphen is present
  const homePageContainer = createCrumb(
    { pageTitle: "", pageUrl: `${window.location.origin}/${pageRegion}/` },
    true,
  );
  homePageContainer.className = "breadcrumb-home-page-container";
  homePageContainer.tabIndex = 0;
  const homeIcon = document.createElement("span");
  homeIcon.className = "icon-home-page";
  decorateIcon(homeIcon, "", "home page icon");
  homePageContainer.appendChild(homeIcon);
  const homeLink = createCrumb({ pageTitle: t("HOME"), pageUrl: "" }, false);
  homeLink.className = "home-page-breadcrumb breadcrumb-item breadcrumb-link";
  // homeLink.textContent = "Home";
  // homeLink.tabIndex = 0;
  homePageContainer.appendChild(homeLink);
  const divider = document.createElement("span");
  divider.textContent = " / ";
  divider.className = "breadcrumb-divider home-page-divider";
  homePageContainer.appendChild(divider);

  container.appendChild(homePageContainer);

  const ellipseDropdown = document.createElement("div");
  ellipseDropdown.className = "breadcrumb-ellipse-dropdown";
  ellipseDropdown.style.display = "none";

  const reversedCrumbs = [...crumbs].reverse();

  // Partial breadcrumbs
  if (
    (breadcrumbType === "partial" ||
      window.matchMedia("(max-width: 950px)").matches) &&
    crumbs.length > 2
  ) {
    addDivider(container, 0, reversedCrumbs);

    for (let i = 0; i < reversedCrumbs.length - 1; i++) {
      const dropdownItem = createCrumb(reversedCrumbs[i]);
      dropdownItem.className = "dropdown-item";
      ellipseDropdown.appendChild(dropdownItem);
    }

    const ellipseContainer = document.createElement("div");
    ellipseContainer.className = "breadcrumb-ellipse-container";
    const ellipse = document.createElement("span");
    ellipse.textContent = "...";
    ellipse.tabIndex = 0;
    ellipse.className = "breadcrumb-ellipse";
    const toggleDropdown = (e) => {
      e.stopPropagation();
      ellipseDropdown.style.display =
        ellipseDropdown.style.display === "none" ? "flex" : "none";
    };
    ellipse.addEventListener("click", toggleDropdown);
    ellipse.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown(e);
      }
    });
    document.addEventListener("click", (e) => {
      if (!ellipse.contains(e.target) && !ellipseDropdown.contains(e.target)) {
        ellipseDropdown.style.display = "none";
      }
    });

    ellipseContainer.appendChild(ellipse);
    ellipseContainer.appendChild(ellipseDropdown);
    container.appendChild(ellipseContainer);
    addDivider(container, 1, reversedCrumbs);
    homePageContainer.querySelector(".home-page-divider").remove();
    const lastCrumb = createCrumb(
      reversedCrumbs[reversedCrumbs.length - 1],
      false,
    );
    container.appendChild(lastCrumb);
  } else {
    // Complete breadcrumbs
    reversedCrumbs.forEach((crumb, idx, arr) => {
      const isLast = idx === arr.length - 1;
      const crumbEl = createCrumb(crumb, !isLast);
      container.appendChild(crumbEl);
      addDivider(container, idx, arr);
    });
  }

  // Insert breadcrumbs into DOM based on the firstBlock component
  const hero = firstBlock.querySelector(
    "[class*=hero] .container .lds-layout-container",
  );
  if (hero) {
    hero.prepend(container);
    container.classList.add("hero-breadcrumb", "col-12");
  } else {
    const mainContainer =
      firstBlock.parentElement?.parentElement?.parentElement;
    if (mainContainer) {
      mainContainer.insertBefore(container, mainContainer.firstChild);
      container.classList.add(
        "breadcrumb-top-positioned",
        "lds-layout-container",
      );
    }
  }
}

/**
 * Initialize breadcrumbs for a main element
 * @param {Element} main The main element
 */
export async function initBreadcrumbs(main) {
  if (!main) return;

  const firstBlock = main.querySelector(".section");
  if (!firstBlock) return;

  // Import required dependencies
  const { decorateIcons, getMetadata } = await import("../scripts/aem.js");

  await createBreadcrumbs(firstBlock, decorateIcons, getMetadata);
}
