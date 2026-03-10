import { applyCustomFontSize } from "../../utils/common.js";
import { decorateIconSvg } from "../../utils/common.js";
import { createCTAButton } from "../../utils/cta.js";

function hasContent(el) {
  return el?.textContent?.trim() || "";
}

export function generateAccordionId() {
  return `accordion-${crypto.randomUUID().slice(0, 11)}`;
}

export function addKeyboardAccessibility(element) {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      element.click();
    }
  });
}

export function createTitleWrapper(div, rowIndex) {
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "accordion-comp-header";
  titleWrapper.setAttribute("tabindex", "0");

  const span = document.createElement("span");
  span.className = "accordion-headline";
  span.innerHTML = div.innerHTML;
  span.setAttribute("role", "button");
  span.setAttribute("aria-expanded", "false");
  span.setAttribute(
    "aria-controls",
    `${generateAccordionId()}-headline-${rowIndex + 1}`,
  );
  span.id = `${generateAccordionId()}-headline-${rowIndex + 1}`;
  span.setAttribute("data-track-component", "Accordion");
  span.setAttribute("data-track-event", "Accordion Open");
  addKeyboardAccessibility(span);

  const iconSpan = document.createElement("span");
  iconSpan.className = "accordion-icon";
  iconSpan.setAttribute("role", "button");
  iconSpan.setAttribute("data-track-component", "Accordion");
  iconSpan.setAttribute("data-track-event", "Accordion Open");
  iconSpan.setAttribute(
    "aria-label",
    `Toggle ${div.textContent.trim()} section`,
  );
  iconSpan.setAttribute("aria-labelledby", `accordion${rowIndex + 1}-headline`);
  addKeyboardAccessibility(iconSpan);

  const iconImg = document.createElement("span");
  iconImg.className = "icon-accordion-arrow";
  decorateIconSvg(iconImg, "", "Accordion arrow icon");
  iconImg.setAttribute("aria-hidden", "true");
  iconSpan.appendChild(iconImg);

  titleWrapper.appendChild(span);
  titleWrapper.appendChild(iconSpan);
  addKeyboardAccessibility(titleWrapper);

  const parentLi = titleWrapper.closest(".accordion-item");
  const isExpanded = parentLi?.classList.contains("active");
  const eventName = isExpanded ? "Accordion Open" : "Accordion Close";
  iconSpan.addEventListener("click", () => {
    iconSpan.setAttribute("data-track-event", eventName);
  });
  titleWrapper.addEventListener("click", () => {
    titleWrapper.setAttribute("data-track-event", eventName);
    span.setAttribute("data-track-event", eventName);
  });

  div.replaceWith(titleWrapper);

  return titleWrapper;
}

export function createContentDiv(div, className, rowIndex = null) {
  // Convert className to kebab-case if not already
  const kebabClass = className
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
  const contentDiv = document.createElement("div");
  contentDiv.className = `${kebabClass} content`;
  contentDiv.innerHTML = div.innerHTML;
  if (rowIndex !== null) contentDiv.id = `content-${rowIndex}`;
  div.replaceWith(contentDiv);
  return contentDiv;
}

export function toggleAccordionState(li, itemsDiv, rowIndex, defaultBehavior) {
  const contentElements = li.querySelectorAll(".content");
  const isActive =
    defaultBehavior === "all" ||
    (defaultBehavior === "first" && rowIndex === 0);

  contentElements.forEach((content) => {
    content.style.display = isActive ? "" : "none";
  });

  li.classList.toggle("active", isActive);
  const headline = itemsDiv.querySelector(".accordion-headline");
  if (headline) headline.setAttribute("aria-expanded", isActive);
  li.setAttribute("aria-expanded", isActive);
}

export function handleAccordionClick(event) {
  // Only allow toggle if the click is on the .accordion-comp-header or its children (not on links)
  const header = event.target.closest(".accordion-comp-header");
  if (!header || event.target.tagName === "A" || event.target.closest("a")) {
    return;
  }
  const parentLi = header.closest(".accordion-item");
  if (parentLi) {
    const contentElements = parentLi.querySelectorAll(".content");
    const isExpanded = parentLi.classList.contains("active");
    contentElements.forEach((content) => {
      content.style.display = isExpanded ? "none" : "";
    });
    parentLi.classList.toggle("active", !isExpanded);
    parentLi.setAttribute("aria-expanded", !isExpanded);
    const title = header.querySelector(".accordion-headline");
    if (title) title.setAttribute("aria-expanded", !isExpanded);
    const icon = header.querySelector(".accordion-icon");
    if (icon) icon.setAttribute("aria-expanded", !isExpanded);
  }
}

export function optimizeImages(ul) {
  ul.querySelectorAll("picture > img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
  });
}

//Funcion to create Cta for Accordion columns
export function createColumnCta(
  ctaType,
  columnType,
  ctaSelection,
  cta,
  ctaFields,
  block,
) {
  const isFirstCta = ctaType === "firstCta";
  const ctaNum = columnType === "leftColumn" ? "Column1" : "Column2";
  const prefix = isFirstCta ? "" : "sec";
  const ctaElement = cta.querySelector("a");

  const getField = (field) => ctaFields.get(`${prefix}${field}${ctaNum}`);

  const ctaStyle = getField(prefix ? "CtaStyle" : "ctaStyle");
  const ctaColor = getField(prefix ? "CtaColor" : "ctaColor");
  const ctaClass = `cta-button-${ctaStyle}-${ctaColor}`;

  const ctaData = {
    action: "navigation",
    type: ctaSelection,
    variation: ctaClass,
    label: ctaElement?.textContent.trim() || "",
    href: ctaSelection === "link" ? ctaElement?.getAttribute("href") : "",
    ariaLabel: ctaElement?.getAttribute("title") || "",
    ctaAsset: ctaSelection === "link" ? "" : ctaElement?.href,
    targetPath: getField("targetPath"),
    icon: "black-arrow-right",
    componentName: "accordion",
    exitInterstitial: getField("exitInterstitial"),
    block,
  };

  return createCTAButton(ctaData);
}

//Function to create column layout in accoridon body
export function createColumnContainer(
  block,
  columnContentType,
  contentImage,
  contentDescription,
  contentDescriptionFontSize,
  contentIconImage,
  contentIconSubtitle,
  contentIconDescription,
  contentIconDescriptionFontSize,
  ctaOneLink,
  ctaOneAsset,
  ctaTwoLink,
  ctaTwoAsset,
  ctaFields,
  columnType,
) {
  if (
    columnContentType.includes("image") &&
    contentImage?.querySelector("img")?.src
  ) {
    const imageSrc = contentImage?.querySelector("img")?.src || "";
    const imageAlt = contentImage?.querySelector("img")?.alt || "";
    const imageElement = document.createElement("img");
    imageElement.src = imageSrc;
    imageElement.alt = imageAlt;
    imageElement.className = "contentImage";
    if (columnType === "rightColumn") {
      block.classList.add("right-column-image");
    }
    block.appendChild(imageElement);
  }
  if (
    columnContentType.includes("description") &&
    hasContent(contentDescription)
  ) {
    const kebabClass = "contentDescription"
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
    contentDescription.className = `${kebabClass} content`;
    if (contentDescriptionFontSize) {
      applyCustomFontSize(contentDescription, contentDescriptionFontSize, true);
    }

    const ctaContainer = document.createElement("div");
    ctaContainer.className = "accordion-cta-container";
    const pickField = (base, isSecondary = false) =>
      ctaFields.get(
        columnType === "leftColumn"
          ? `${isSecondary ? "sec" : ""}${base}Column1`
          : `${isSecondary ? "sec" : ""}${base}Column2`,
      );
    const ctaNumber = pickField("ctaNumber");
    // Create first CTA
    if (ctaOneLink.querySelector("a") || ctaOneAsset.querySelector("a")) {
      const ctaOneSelection = pickField("ctaSelection");
      const ctaOne = createColumnCta(
        "firstCta",
        columnType,
        ctaOneSelection,
        ctaOneSelection === "link" ? ctaOneLink : ctaOneAsset,
        ctaFields,
        block,
      );
      ctaContainer.append(ctaOne);
    }
    // Create second CTA
    if (
      ctaNumber !== "one" &&
      (ctaTwoLink.querySelector("a") || ctaTwoAsset.querySelector("a"))
    ) {
      const ctaTwoSelection = pickField("CtaSelection", true);
      const ctaTwo = createColumnCta(
        "secondCta",
        columnType,
        ctaTwoSelection,
        ctaTwoSelection === "link" ? ctaTwoLink : ctaTwoAsset,
        ctaFields,
        block,
      );
      ctaContainer.append(ctaTwo);
    }
    ctaContainer.innerHTML ? contentDescription.append(ctaContainer) : null;
    block.append(contentDescription);
  }
  if (
    columnContentType.includes("icon") &&
    contentIconImage?.querySelector("img")?.src
  ) {
    const imageSrc = contentIconImage?.querySelector("img")?.src || "";
    const imageAlt = contentIconImage?.querySelector("img")?.alt || "";
    const imageElement = document.createElement("img");
    imageElement.src = imageSrc;
    imageElement.alt = imageAlt;
    imageElement.className = "contentIconImage";
    block.appendChild(imageElement);
    // Add icon-subtitle-wrapper class to parent of parent div of .contentIconImage
    const iconDiv = block.querySelector(".contentIconImage");
    if (iconDiv?.parentElement?.parentElement) {
      iconDiv.parentElement.parentElement.classList.add(
        "icon-subtitle-wrapper",
      );
    }
  }
  if (columnContentType.includes("icon") && hasContent(contentIconSubtitle)) {
    const subtitle = createContentDiv(
      contentIconSubtitle,
      "contentIconSubtitle fw-900",
    );
    block.appendChild(subtitle);
  }
  if (
    columnContentType.includes("icon") &&
    hasContent(contentIconDescription)
  ) {
    const kebabClass = "contentIconDescription"
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
    contentIconDescription.className = `${kebabClass} content`;
    if (contentIconDescriptionFontSize) {
      applyCustomFontSize(
        contentIconDescription,
        contentIconDescriptionFontSize,
        true,
      );
    }
    block.appendChild(contentIconDescription);
  }
}
