const modalStack = [];

/**
 * DRY function to process and manipulate Adobe Data Layer events
 * @param {object} eventData - The event data object to process
 */
function processAdobeDataLayerEvent(eventData) {
  if (!eventData || !eventData.event) return;

  if (eventData.event === "modal_view") {
    let extractedModalId = null;

    // Check different possible locations for modalId
    if (eventData.modalId) {
      extractedModalId = eventData.modalId;
    } else if (eventData.eventinfo?.modalId) {
      extractedModalId = eventData.eventinfo.modalId;
    } else if (eventData.componentInfo?.modalId) {
      extractedModalId = eventData.componentInfo.modalId;
    }

    if (extractedModalId) {
      modalStack.push(extractedModalId); // Add modalId to the stack
    }
  }

  if (eventData.event === "modal_button_click") {
    const activeModalId = modalStack[modalStack.length - 1]; // Get the most recent modalId
    if (activeModalId) {
      if (!eventData.eventinfo) {
        eventData.eventinfo = {};
      }

      if (!eventData.eventinfo.modalId) {
        eventData.eventinfo.modalId = activeModalId;
      }
    }
  }
}

/**
 * Pushes an event into Adobe Analytics via adobeDataLayer.
 * @param {object} eventData - Additional data to include with the event.
 */
export default function pushAdobeAnalyticsEvent(eventData = {}) {
  if (!window.adobeDataLayer) {
    return;
  }

  if (window.adobeDataLayer._modalProcessorInitialized) {
    processAdobeDataLayerEvent(eventData);
  }
  window.adobeDataLayer.push(eventData);
}

const INITIAL_DELAY = 100;
const MAX_DELAY = 2000;
const MAX_RETRIES = 10;

/**
 * Initialize Adobe Data Layer monitoring and event processing
 */
function initializeAdobeDataLayerProcessor(
  retryCount = 0,
  delay = INITIAL_DELAY,
) {
  if (!window.adobeDataLayer) {
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        initializeAdobeDataLayerProcessor(
          retryCount + 1,
          Math.min(delay * 2, MAX_DELAY),
        );
      }, delay);
    } else {
      if (window?.console && typeof window.console.warn === "function") {
        window.console.warn(
          "Adobe Data Layer failed to initialize after maximum retries.",
        );
      }
    }
    return;
  }

  // Check if already initialized to prevent double initialization
  if (window.adobeDataLayer._modalProcessorInitialized) {
    return;
  }

  // Store original push method
  const originalPush = window.adobeDataLayer.push;

  window.adobeDataLayer.push = function (eventData) {
    processAdobeDataLayerEvent(eventData);
    return originalPush.call(this, eventData);
  };

  if (Array.isArray(window.adobeDataLayer)) {
    window.adobeDataLayer.forEach((eventData) => {
      processAdobeDataLayerEvent(eventData);
    });
  }
}

if (typeof window !== "undefined") {
  initializeAdobeDataLayerProcessor();
}
