import { decorateIcon } from "../scripts/aem.js";
import pushAdobeAnalyticsEvent from "./analytics/launch-util.js";
import { attachCarouselEventListeners } from "./carouselEventListeners.js";

/**
 * Pushes a standardized carousel analytics event.
 * @param {string} eventName - The name for the analytics event (e.g., 'Carousel Left').
 * @param {string} linkText - The text of the element interacted with (e.g., 'Previous').
 * @param {string} componentName - The name of the parent component.
 */
function pushCarouselAnalytics(eventName, linkText, componentName) {
  const eventsData = {
    event: "cta_click",
    eventinfo: {
      eventName,
      linkText,
      linkType: "Internal",
      linkUrl: "",
      linkLocation: componentName,
      linkLabel: "",
    },
    componentInfo: {
      componentName: componentName || "",
    },
  };
  pushAdobeAnalyticsEvent(eventsData);
}

/**
 * Core setup function for carousels with shared logic for navigation,
 * events, and analytics.
 * @param {object} options - Configuration for the carousel.
 */
function setupCarousel(options) {
  const {
    block,
    cardsCount,
    ul,
    onPageChange,
    cardNum,
    componentName,
    position,
    paginationType, // 'dots' or 'numerical'
  } = options;

  // --- 1. Initial Setup (Common) ---
  const paginationContainer = document.createElement("div");
  paginationContainer.className = `${paginationType}-pagination-container`;
  paginationContainer.setAttribute("role", "navigation");
  paginationContainer.setAttribute(
    "aria-label",
    `${paginationType} pagination`,
  );

  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "sr-only carousel-live-region";
  Object.assign(liveRegion.style, {
    position: "absolute",
    left: "-10000px",
    width: "1px",
    height: "1px",
    overflow: "hidden",
  });

  const isMobile = window.innerWidth <= 768;
  let totalPages;
  const desktopVisibleCards = 3;
  if (paginationType === "dots") {
    totalPages = isMobile ? cardsCount - 1 : cardsCount - cardNum - 1;
  } else {
    // numerical
    totalPages =
      isMobile || cardNum === 1
        ? cardsCount
        : cardsCount - (desktopVisibleCards - 1);
  }
  let currentIndex = 0;

  // --- 2. Create UI Elements (Common Arrows, Specific Controls) ---
  const prevButton = document.createElement("span");
  prevButton.className = "icon-caretleft arrow prev disabled";
  prevButton.setAttribute("tabindex", "0");
  prevButton.setAttribute("role", "button");
  prevButton.setAttribute("aria-label", "previous");
  prevButton.setAttribute("data-track-event", "Carousel left");
  prevButton.setAttribute("data-track-component", componentName);
  prevButton.setAttribute("data-track-location", componentName);
  decorateIcon(prevButton, "");

  const nextButton = document.createElement("span");
  nextButton.className = "icon-caretright arrow next";
  nextButton.setAttribute("tabindex", "0");
  nextButton.setAttribute("role", "button");
  nextButton.setAttribute("aria-label", "next");
  nextButton.setAttribute("data-track-event", "Carousel right");
  nextButton.setAttribute("data-track-component", componentName);
  nextButton.setAttribute("data-track-location", componentName);
  decorateIcon(nextButton, "");

  let paginationControls;
  let updateUI; // This will hold either updateDots or updatePagination

  // --- 3. Type-Specific UI and Update Logic ---
  if (paginationType === "dots") {
    const dotWrapper = document.createElement("div");
    dotWrapper.className = "dot-pagination";
    const dots = [];
    const indicator = document.createElement("div");
    indicator.className = "div-indicator";

    Array.from({ length: totalPages + 1 }).forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = i === 0 ? "dot active" : "dot";
      dotWrapper.appendChild(dot);
      dots.push(dot);
    });
    dotWrapper.appendChild(indicator);
    paginationControls = dotWrapper;

    updateUI = () => {
      onPageChange?.(currentIndex);
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.style.width = isActive ? "40px" : "8px";
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };
  } else {
    // numerical
    const pageInfoWrapper = document.createElement("div");
    pageInfoWrapper.className = "page-info-wrapper";
    const activePageContainer = document.createElement("div");
    activePageContainer.className = "active-page-container";
    const totalPageInfoContainer = document.createElement("div");
    totalPageInfoContainer.className = "total-page-info-container";
    totalPageInfoContainer.textContent = ` of ${totalPages}`;
    pageInfoWrapper.append(activePageContainer, totalPageInfoContainer);
    paginationControls = pageInfoWrapper;

    updateUI = () => {
      onPageChange?.(currentIndex);
      activePageContainer.textContent = currentIndex + 1;
    };
  }

  // A shared function to update common UI state after an index change
  const updateSharedUIState = () => {
    const endPageIndex =
      paginationType === "dots" ? totalPages : totalPages - 1;
    if (currentIndex === 0) {
      prevButton.classList.add("disabled");
      prevButton.setAttribute("tabindex", "-1");
      prevButton.setAttribute("aria-disabled", "true");
      if (document.activeElement === prevButton) {
        nextButton.focus();
      }
    } else {
      prevButton.classList.remove("disabled");
      prevButton.setAttribute("tabindex", "0");
      prevButton.removeAttribute("aria-disabled");
    }
    if (currentIndex === endPageIndex) {
      nextButton.classList.add("disabled");
      nextButton.setAttribute("tabindex", "-1");
      nextButton.setAttribute("aria-disabled", "true");
      // If nextButton is focused, move focus to prevButton or next interactive element
      if (document.activeElement === nextButton) {
        prevButton.focus();
      }
    } else {
      nextButton.classList.remove("disabled");
      nextButton.setAttribute("tabindex", "0");
      nextButton.removeAttribute("aria-disabled");
    }
    // Call the specific UI update function
    updateUI();

    // Announce page change to screen readers
    const currentPage = currentIndex + 1;
    const maxPages = paginationType === "dots" ? totalPages + 1 : totalPages;
    liveRegion.textContent = `Page ${currentPage} of ${maxPages}`;

    // Call the milestone analytics tracker
    updateViewedCards();
  };

  // Clamp index utility
  function clampIndex(idx) {
    const min = 0;
    const max = paginationType === "dots" ? totalPages : totalPages - 1;
    return Math.max(min, Math.min(idx, max));
  }

  // --- 4. Centralized Event Handlers (Common) ---
  const handleNavigation = (direction, eventType = "click") => {
    const prevIndex = currentIndex;
    const endPageIndex =
      paginationType === "dots" ? totalPages : totalPages - 1;

    if (direction === "prev" && currentIndex > 0) {
      currentIndex = clampIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < endPageIndex) {
      currentIndex = clampIndex(currentIndex + 1);
    }

    if (prevIndex !== currentIndex) {
      updateSharedUIState();
      const eventName = `Carousel ${direction === "prev" ? "Left" : "Right"}${
        eventType === "keydown" ? " keydown" : ""
      }`;
      const linkText = direction === "prev" ? "Previous" : "Next";
      pushCarouselAnalytics(eventName, linkText, componentName);
    }
  };

  prevButton.addEventListener("click", () => handleNavigation("prev"));
  nextButton.addEventListener("click", () => handleNavigation("next"));

  const handleKeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget === prevButton) handleNavigation("prev", "keydown");
      if (e.currentTarget === nextButton) handleNavigation("next", "keydown");
    }
  };

  prevButton.addEventListener("keydown", handleKeydown);
  nextButton.addEventListener("keydown", handleKeydown);

  // --- 5. Touch and Other UL Listeners (Common) ---
  // Only pass parameters for listeners handled in carouselEventListeners.js
  attachCarouselEventListeners({
    ul,
    block,
    isMobile,
    cardNum,
    totalPages,
    updateSharedUIState,
    pushCarouselAnalytics,
    componentName,
    paginationType,
    getCurrentIndex: () => currentIndex,
    setCurrentIndex: (val) => {
      currentIndex = clampIndex(val);
    },
  });

  // DOT PAGINATION (Tab trapping and Enter/Space support)
  if (paginationType === "dots") {
    paginationContainer.addEventListener("keydown", (e) => {
      const lastDot = dots[dots.length - 1];
      const firstDot = dots[0];
      if (e.key === "Tab") {
        if (document.activeElement === lastDot && !e.shiftKey) {
          e.preventDefault();
          nextButton.focus();
        } else if (document.activeElement === nextButton && e.shiftKey) {
          e.preventDefault();
          lastDot.focus();
        } else if (document.activeElement === prevButton && e.shiftKey) {
          e.preventDefault();
          firstDot.focus();
        }
      } else if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement === prevButton) {
          if (currentIndex > 0) {
            currentIndex = clampIndex(currentIndex - 1);
            updateSharedUIState();
          }
        } else if (document.activeElement === nextButton) {
          if (currentIndex < totalPages) {
            currentIndex = clampIndex(currentIndex + 1);
            updateSharedUIState();
          }
        } else if (dots.includes(document.activeElement)) {
          const dotIndex = dots.indexOf(document.activeElement);
          if (dotIndex !== -1) {
            currentIndex = clampIndex(dotIndex);
            updateSharedUIState();
          }
        }
      }
    });
  }

  // --- 6. Milestone Analytics (Common, with specific update logic) ---
  const viewedCards = new Set();

  function isBlockInViewport() {
    const rect = block.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  // This function will be defined based on pagination type, but called from a common place
  let updateViewedCards;
  if (paginationType === "dots") {
    updateViewedCards = (isInitial = false) => {
      if (!isBlockInViewport()) return;
      const cards = Array.from(ul.querySelectorAll(".cardcontainer"));
      const ulRect = ul.getBoundingClientRect();

      // Always count the first card as viewed if there are cards
      if (cards.length > 0) {
        viewedCards.add(0); // Always add the first card (index 0) for initial milestone
      }

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.right > ulRect.left && cardRect.left < ulRect.right) {
          viewedCards.add(idx);
        }
      });
    };
  } else {
    updateViewedCards = (isInitial = false) => {
      if (!isBlockInViewport()) return;
      const cards = Array.from(ul.querySelectorAll(".cardcontainer"));

      // Always count the first card as viewed if there are cards
      if (cards.length > 0) {
        viewedCards.add(0);
      }

      // Use currentIndex as the active card index
      const activeCardIdx = typeof currentIndex === "number" ? currentIndex : 0;
      // The active card number is 1-based (so add 1)
      const activeCardNumber = activeCardIdx + 1;
    };
  }

  // --- 7. DOM Assembly (Common) ---
  // ul.setAttribute("tabindex", "0");
  ul.setAttribute("role", "list");
  ul.setAttribute(
    "aria-label",
    `${componentName} carousel with ${cardsCount} items`,
  );

  paginationContainer.append(prevButton, paginationControls, nextButton);

  const existingWrapper = block.querySelector(".pagination-wrapper");
  if (existingWrapper) existingWrapper.remove();

  const paginationWrapper = document.createElement("div");
  paginationWrapper.className = "pagination-wrapper col-12";
  const justifyContent = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };
  paginationWrapper.style.justifyContent =
    justifyContent[position] || "flex-start";

  paginationWrapper.append(paginationContainer, liveRegion);
  block.appendChild(paginationWrapper);

  // --- 8. Add aria-labels to each card for screen reader context ---
  const cards = Array.from(ul.querySelectorAll(".cardcontainer"));
  cards.forEach((card, index) => {
    const cardNumber = index + 1;
    card.setAttribute("role", "listitem");

    // Find the link inside the card and enhance its aria-label
    const link = card.querySelector("a");
    if (link) {
      const existingLabel =
        link.getAttribute("aria-label") || link.textContent.trim();
      link.setAttribute(
        "aria-label",
        `Card ${cardNumber} of ${cards.length}, ${existingLabel}`,
      );
    }
  });

  // --- 9. Initial State (Common) ---
  updateSharedUIState();
}

/**
 * Adds dot pagination controls to a carousel block.
 * (This is now a wrapper around the core setup function)
 */
export function addDotPagination(
  block,
  cardsCount,
  ul,
  onPageChange,
  cardNum,
  componentName = "",
  position = "left",
) {
  setupCarousel({
    block,
    cardsCount,
    ul,
    onPageChange,
    cardNum,
    componentName,
    position,
    paginationType: "dots",
  });
}

/**
 * Adds numerical pagination controls to a carousel block.
 * (This is now a wrapper around the core setup function)
 */
export function addNumericalPagination(
  block,
  cardsCount,
  ul,
  onPageChange,
  cardNum,
  componentName = "",
  position = "left",
) {
  setupCarousel({
    block,
    cardsCount,
    ul,
    onPageChange,
    cardNum,
    componentName,
    position,
    paginationType: "numerical",
  });
}
