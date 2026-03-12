import { decorateIcon, getMetadata } from "../scripts/aem.js";
import { getAemConfig } from "../scripts/scripts.js";
import { processUnderscoreHighlights } from "./common.js";
import { ISI_CONFIG, processBracketContent } from "./isi-utils.js";

/**
 * ISI Component Class
 * Implements Important Safety Information accordion functionality
 */
class ISI {
  static isISICreating = false;
  constructor() {
    // Component configuration
    this.config = ISI_CONFIG;

    // Create DOM elements
    this.elements = {
      container: null,
      wrapper: null,
      leftContainer: null,
      rightContainer: null,
      leftTitleBox: null,
      rightTitleBox: null,
      leftPlusIcon: null,
      rightPlusIcon: null,
      leftDescription: null,
      rightDescription: null,
    };
  }

  /**
   * Check if we're in mobile view
   * @returns {boolean} True if in mobile view
   */
  isMobileView() {
    return window.innerWidth <= this.config.mobileBreakpoint;
  }

  /**
   * Create the ISI component structure
   * @returns {HTMLElement} ISI container element
   */
  async createStructure() {
    // Create main container elements
    const container = document.createElement("div");
    container.className = "isi-box-container col-12";

    const wrapper = document.createElement("div");
    wrapper.className = "isi-box-wrapper";
    const isitype = await getMetadata("isitype");
    // Get the URL from AEM config
    const isiHcpUrl = await getAemConfig(
      isitype === "hcp" ? "ISI_HCP_URL" : "ISI_CONSUMER_URL",
    );

    // Default values for content
    let column1Eyebrow = "";
    let column1Description = "";
    let column2Eyebrow = "";
    let column2Description = "";

    // Only attempt to fetch if we have a URL
    if (isiHcpUrl) {
      try {
        // Check if we're in author mode or determine appropriate origin
        const isAuthorMode = window.location.hostname.includes("author");
        let origin = window.location.origin;

        if (isAuthorMode) {
          // Check if URL contains dev or qa and set appropriate origin
          const currentUrl = window.location.href.toLowerCase();
          if (currentUrl.includes("dev")) {
            origin = this.config.origins.devOrigin;
          } else if (currentUrl.includes("qa")) {
            origin = this.config.origins.qaOrigin;
          } else {
            origin = this.config.origins.defaultOrigin; // Default if in author mode
          }
        }

        const response = await fetch(isiHcpUrl, {
          headers: {
            Origin: origin,
          },
        });

        // Process the response if needed
        if (response.ok) {
          const data = await response.text();
          // Handle the fetched data here if needed
          const parseData = JSON.parse(data);
          const isiData = parseData?.data?.isiModelList?.items[0] || {};
          column1Eyebrow = isiData.column1Eyebrow || "";
          column1Description = isiData.column1Description || "";
          column2Eyebrow = isiData.column2Eyebrow || "";
          column2Description = isiData.column2Description || "";
        } else {
          console.error("Failed to fetch ISI HCP content:", response.status);
          return;
        }
      } catch (error) {
        console.error("Error fetching ISI HCP content:", error);
        return;
      }
    } else {
      return;
    }

    // Create left container
    const leftContainer = this.createSideContainer(
      "left",
      column1Eyebrow,
      column1Description,
    );

    // Create right container
    const rightContainer = this.createSideContainer(
      "right",
      column2Eyebrow,
      column2Description,
    );

    // Assemble the component
    wrapper.appendChild(leftContainer);
    wrapper.appendChild(rightContainer);
    container.appendChild(wrapper);

    // Save references to key elements for event handling
    this.elements.container = container;
    this.elements.wrapper = wrapper;
    this.elements.leftContainer = leftContainer;
    this.elements.rightContainer = rightContainer;

    return container;
  }

  // Helper function to update tracking attributes
  updateTrackingAttributes = (element, isExpanded) => {
    const eventName = isExpanded ? "Accordion Close" : "Accordion Open";
    element.setAttribute("data-track-component", "ISI");
    element.setAttribute("data-track-event", eventName);
  };

  /**
   * Create a side container (left or right)
   * @param {string} side - Which side ("left" or "right")
   * @param {string} title - Title HTML content
   * @param {string} description - Description HTML content
   * @returns {HTMLElement} The container element
   */
  createSideContainer(side, title, description) {
    const container = document.createElement("div");
    container.className = `${side}-container accordion-container`;

    // Create title box
    const titleBox = document.createElement("div");
    titleBox.className = `${side}-title-box accordion-header`;

    // Add initial tracking attributes to header
    this.updateTrackingAttributes(titleBox, false);

    // Create title - process and sanitize title content
    const titleElement = document.createElement("h2");
    titleElement.className = "isi-title";
    // Process underscores first
    const processedTitleWithUnderscores = processUnderscoreHighlights(
      title,
      "underscore-wrapper",
    );

    // Then process square brackets
    const processedTitle = processBracketContent(processedTitleWithUnderscores);

    // Sanitize the processed title using DOMPurify, loading it if needed
    async function setSanitizedTitle() {
      if (!window.DOMPurify) {
        // Load DOMPurify script if not already loaded
        if (!window.hlx || !window.hlx.codeBasePath) {
          console.warn(
            "window.hlx.codeBasePath is not defined; skipping sanitization",
          );
          titleElement.innerHTML = processedTitle;
          return;
        }
        await import("../scripts/aem.js").then(({ loadScript }) =>
          loadScript(`${window.hlx.codeBasePath}/scripts/dompurify.min.js`),
        );
      }
      if (window.DOMPurify) {
        titleElement.innerHTML = window.DOMPurify.sanitize(processedTitle, {
          USE_PROFILES: { html: true },
        });
      } else {
        titleElement.innerHTML = processedTitle;
      }

      // Add tracking attributes to anchor tags in title
      const anchorTags = titleElement.querySelectorAll("a");
      anchorTags.forEach((anchor) => {
        anchor.setAttribute("data-track-component", "ISI");
      });
    }
    // Call the sanitizer (async)
    setSanitizedTitle();

    // Create icon container
    const iconContainer = document.createElement("span");
    iconContainer.className = "plus-icon";

    // Make the icon interactive
    iconContainer.setAttribute("role", "button");
    iconContainer.setAttribute("tabindex", "0");
    iconContainer.setAttribute("aria-label", "Toggle section");
    iconContainer.setAttribute("aria-expanded", "false");

    // Set initial plus icon
    this.updateIconType(iconContainer, false);

    // Assemble title box
    titleBox.appendChild(titleElement);
    titleBox.appendChild(iconContainer);

    // Create description container - will hold processed content
    const descContainer = document.createElement("div");
    descContainer.className = "isi-description accordion-content";

    // Process underscores first
    const processedWithUnderscores = processUnderscoreHighlights(
      description.html,
      "underscore-wrapper",
      true,
    );

    // Then process square brackets
    const processedDescription = processBracketContent(
      processedWithUnderscores,
    );

    // Sanitize the processed content using DOMPurify, loading it if needed
    async function setSanitizedContent() {
      if (!window.DOMPurify) {
        // Load DOMPurify script if not already loaded
        if (!window.hlx || !window.hlx.codeBasePath) {
          console.warn(
            "window.hlx.codeBasePath is not defined; skipping sanitization",
          );
          descContainer.innerHTML = processedDescription;
          return;
        }
        await import("../scripts/aem.js").then(({ loadScript }) =>
          loadScript(`${window.hlx.codeBasePath}/scripts/dompurify.min.js`),
        );
      }
      if (window.DOMPurify) {
        descContainer.innerHTML = window.DOMPurify.sanitize(
          processedDescription,
          { USE_PROFILES: { html: true } },
        );
      } else {
        descContainer.innerHTML = processedDescription;
      }

      // Add tracking attributes to anchor tags in description
      const anchorTags = descContainer.querySelectorAll("a");
      anchorTags.forEach((anchor) => {
        anchor.setAttribute("data-track-component", "ISI");
      });
    }
    // Call the sanitizer (async)
    setSanitizedContent();

    // Assemble container
    container.appendChild(titleBox);
    container.appendChild(descContainer);

    // Store references to elements
    this.elements[`${side}TitleBox`] = titleBox;
    this.elements[`${side}PlusIcon`] = iconContainer;
    this.elements[`${side}Description`] = descContainer;

    return container;
  }

  /**
   * Initialize viewport state
   */
  initializeViewportState() {
    const { container } = this.elements;

    if (this.isMobileView()) {
      // Set mobile-specific initial styles
      container.classList.add("mobile-view");
      container.style.minHeight = this.config.mobileDefaultHeight;
    } else {
      // Desktop initial styles
      container.style.height = this.config.defaultHeight;
      container.style.overflow = "hidden";
    }
  }

  /**
   * Close all accordions
   */
  closeAllAccordions() {
    const { leftPlusIcon, rightPlusIcon, leftDescription, rightDescription } =
      this.elements;

    // Reset left accordion
    this.updateIconType(leftPlusIcon, false);
    leftDescription.classList.remove("expanded");
    leftPlusIcon.setAttribute("aria-expanded", "false");

    // Reset right accordion
    this.updateIconType(rightPlusIcon, false);
    rightDescription.classList.remove("expanded");
    rightPlusIcon.setAttribute("aria-expanded", "false");
  }

  /**
   * Updates icon type between plus and minus
   * @param {HTMLElement} iconElement - The icon element to update
   * @param {boolean} isExpanded - Whether the accordion is expanded
   */
  updateIconType(iconElement, isExpanded) {
    // First clear existing content
    iconElement.innerHTML = "";
    this.updateTrackingAttributes(iconElement, isExpanded);

    // Create new icon element
    const caretIcon = document.createElement("span");
    caretIcon.setAttribute("data-track-component", "ISI");
    if (isExpanded) {
      caretIcon.className = "icon-green-minus";
      caretIcon.setAttribute("aria-hidden", "true");
      caretIcon.setAttribute("data-track-event", "Accordion open");
      decorateIcon(caretIcon, "", "minus-icon");
    } else {
      caretIcon.className = "icon-green-plus";
      caretIcon.setAttribute("aria-hidden", "true");
      caretIcon.setAttribute("data-track-event", "Accordion close");
      decorateIcon(caretIcon, "", "plus-icon");
    }

    // Append the new icon
    iconElement.appendChild(caretIcon);

    // Toggle the expanded class based on state
    if (isExpanded) {
      iconElement.classList.add("expanded");
    } else {
      iconElement.classList.remove("expanded");
    }
  }

  /**
   * Handle icon click events
   * @param {Event} event - The click event
   * @param {HTMLElement} iconElement - The icon element clicked
   * @param {HTMLElement} descriptionElement - The description element to toggle
   */
  handleIconClick(event, iconElement, descriptionElement) {
    // Stop event bubbling to prevent double handling
    event.stopPropagation();

    const isExpanded = iconElement.classList.contains("expanded");

    if (this.isMobileView()) {
      // Mobile behavior
      if (isExpanded) {
        // If expanded, close it
        this.closeAllAccordions();
      } else {
        // If not expanded, close all others first then expand this one
        this.closeAllAccordions();

        // Update this icon to expanded state
        this.updateIconType(iconElement, true);
        iconElement.setAttribute("aria-expanded", "true");
        descriptionElement.classList.add("expanded");
      }
    } else {
      // Desktop behavior (for right icon only)
      if (iconElement === this.elements.rightPlusIcon) {
        const newExpandedState = !isExpanded;

        // Update icon state
        this.updateIconType(iconElement, newExpandedState);
        iconElement.setAttribute("aria-expanded", newExpandedState.toString());

        // Toggle the height of the container
        if (
          this.elements.container.style.height === this.config.expandedHeight
        ) {
          this.elements.container.style.height = this.config.collapsedHeight;
          this.elements.container.style.overflow = "hidden";
          this.elements.container.classList.add("collapsedContainer");
        } else {
          this.elements.container.style.height = this.config.expandedHeight;
          this.elements.container.style.overflow = "auto";
          this.elements.container.classList.remove("collapsedContainer");
        }
      }
    }
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    const {
      container,
      leftTitleBox,
      rightTitleBox,
      leftPlusIcon,
      rightPlusIcon,
      leftDescription,
      rightDescription,
    } = this.elements;

    // Left title box click for mobile view
    leftTitleBox.addEventListener("click", (event) => {
      if (this.isMobileView()) {
        const isExpanded = leftPlusIcon.classList.contains("expanded");

        // Close all accordions first
        this.closeAllAccordions();

        // If it wasn't expanded, now expand it (toggle behavior)
        if (!isExpanded) {
          this.updateIconType(leftPlusIcon, true);
          leftDescription.classList.add("expanded");
          this.updateTrackingAttributes(leftTitleBox, true);
        } else {
          this.updateTrackingAttributes(leftTitleBox, false);
        }
      }
    });

    // Right title box click for mobile view
    rightTitleBox.addEventListener("click", (event) => {
      if (this.isMobileView()) {
        const isExpanded = rightPlusIcon.classList.contains("expanded");

        // Close all accordions first
        this.closeAllAccordions();

        // If it wasn't expanded, now expand it (toggle behavior)
        if (!isExpanded) {
          this.updateIconType(rightPlusIcon, true);
          rightDescription.classList.add("expanded");
          this.updateTrackingAttributes(rightTitleBox, true);
        } else {
          this.updateTrackingAttributes(rightTitleBox, false);
        }
      }
    });

    // Icon click handlers - these will work in both mobile and desktop
    leftPlusIcon.addEventListener("click", (event) => {
      this.handleIconClick(event, leftPlusIcon, leftDescription);
    });

    rightPlusIcon.addEventListener("click", (event) => {
      this.handleIconClick(event, rightPlusIcon, rightDescription);
    });
    leftPlusIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        this.handleIconClick(event, leftPlusIcon, leftDescription);
      }
    });

    rightPlusIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        this.handleIconClick(event, rightPlusIcon, rightDescription);
      }
    });

    // Scroll event to handle fixed positioning when scrolling to ISI wrapper
    // Use throttling to improve performance
    let scrollTimeout;

    const handleScroll = () => {
      // Get the parent wrapper element
      const isiWrapper = container.closest(".isi-wrapper");
      // Also check for footer wrapper
      const footerWrapper = document.querySelector(".footer-wrapper");

      let shouldAddFixedClass = false;

      // Check if the ISI wrapper is in the viewport
      if (isiWrapper) {
        const isiWrapperRect = isiWrapper.getBoundingClientRect();
        if (
          isiWrapperRect.top <= window.innerHeight &&
          isiWrapperRect.bottom >= 0
        ) {
          shouldAddFixedClass = true;
        }
      }

      // Also check if the footer wrapper is in the viewport
      if (footerWrapper && !shouldAddFixedClass) {
        const footerWrapperRect = footerWrapper.getBoundingClientRect();
        if (
          footerWrapperRect.top <= window.innerHeight &&
          footerWrapperRect.bottom >= 0
        ) {
          shouldAddFixedClass = true;
        }
      }

      // Add or remove the fixed class based on the check
      if (shouldAddFixedClass) {
        if (!container.classList.contains("isi-box-fixed-container")) {
          container.classList.add("isi-box-fixed-container");
        }
      } else {
        if (container.classList.contains("isi-box-fixed-container")) {
          container.classList.remove("isi-box-fixed-container");
        }
      }

      scrollTimeout = null;
    };

    window.addEventListener("scroll", () => {
      if (!scrollTimeout) {
        // Only run the scroll handler every 100ms for better performance
        scrollTimeout = setTimeout(handleScroll, 100);
      }
    });

    // Resize event with debounce to prevent excessive updates
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = container.classList.contains("mobile-view");
        const isMobile = this.isMobileView();

        // Only perform full reinitialization if view type changed
        if (wasMobile !== isMobile) {
          // Clean up any inconsistent states when switching between views
          if (isMobile) {
            // Transitioning to mobile view
            container.classList.add("mobile-view");
            container.style.height = "auto";

            // Reset all accordions in mobile view
            this.closeAllAccordions();
          } else {
            // Transitioning to desktop view
            container.classList.remove("mobile-view");

            // Reset desktop height
            container.style.height = this.config.defaultHeight;
            container.style.overflow = "hidden";

            // Reset both left and right icon states for desktop view
            this.updateIconType(leftPlusIcon, false);
            this.updateIconType(rightPlusIcon, false);

            // Remove any expanded classes from description elements
            leftDescription.classList.remove("expanded");
            rightDescription.classList.remove("expanded");

            // Update ARIA attributes
            leftPlusIcon.setAttribute("aria-expanded", "false");
            rightPlusIcon.setAttribute("aria-expanded", "false");

            // Remove collapsedContainer class if it exists
            container.classList.remove("collapsedContainer");
          }
        } else {
          // Just update viewport state if no view type change
          this.initializeViewportState();

          // Also reset icon states to ensure consistency
          this.updateIconType(leftPlusIcon, false);
          this.updateIconType(rightPlusIcon, false);
        }
      }, 250); // Debounce delay
    });

    // DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeViewportState();
    });
  }

  /**
   * Initialize the component
   * @returns {Promise<HTMLElement>} The container element
   */
  async init() {
    // Create DOM structure - await the async function
    const container = await this.createStructure();

    // Initialize viewport state
    this.initializeViewportState();

    // Set up event listeners
    this.setupEventListeners();

    return container;
  }
}

export async function createISI() {
  try {
    // Prevent duplicate ISI rendering
    if (ISI.isISICreating) {
      return;
    }

    // Set creation flag
    ISI.isISICreating = true;

    // Look for the main element to insert ISI
    const main = document.querySelector("main");
    if (!main) {
      console.warn("Main element not found for ISI rendering");
      return;
    }

    // Prevent duplicate ISI rendering
    if (main.querySelector(".isi-wrapper")) {
      return;
    }

    // Create a wrapper for ISI in the main section
    const isiWrapper = document.createElement("div");
    isiWrapper.className = "isi-wrapper";

    // Initialize component
    const isi = new ISI();
    const container = await isi.init();

    // Add the ISI container to the wrapper
    isiWrapper.appendChild(container);

    // Append to the end of main content
    main.appendChild(isiWrapper);

    return container;
  } catch (error) {
    console.error("Error creating ISI component:", error);
    return null;
  } finally {
    // Reset creation flag
    ISI.isISICreating = false;
  }
}

export default async function createISIDecorate() {
  // Wait for DOMContentLoaded if the document is not already loaded
  if (document.readyState === "loading") {
    await new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve());
    });
  }

  // guard clause to exclude ISI on specific pages
  if (document.title.toLowerCase() === ISI_CONFIG.excludeISI) return;

  // Create and render ISI component
  await createISI();
}
