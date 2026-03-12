// For Chatbot:
// - Two env variables in site-config/configuration.json:
//  - CHATBOT_API_URL: The URL for the chatbot API
//  - API_DOMAIN: The domain for the API
// - Exclude paths in site-config/chatbot-exclude.json

import pushAdobeAnalyticsEvent from "../utils/analytics/launch-util.js";
import { getAemConfig } from "../scripts/scripts.js";

/**
 * Fetches chatbot exclusion paths from site-config/chatbot-exclude.json
 * @returns {Promise<Array<string>>} Array of path patterns to exclude
 */
async function getChatbotExcludePaths() {
  try {
    const configUrl = `${window.hlx.codeBasePath}/site-config/chatbot-exclude.json`;
    const response = await fetch(configUrl);

    if (!response.ok) {
      // If file doesn't exist or can't be fetched, return empty array
      return [];
    }

    const data = await response.json();
    // Extract path values from the data array
    if (data && Array.isArray(data.data)) {
      return data.data.map((item) => item.path).filter((path) => path);
    }
    return [];
  } catch (error) {
    // If there's any error, return empty array (no exclusions)
    console.log("exclude chatbot error", error);
    return [];
  }
}

/**
 * Checks if the current path should be excluded from chatbot loading
 * @param {string} currentPath - The current pathname to check
 * @returns {Promise<boolean>} True if chatbot should be excluded, false otherwise
 */
async function checkChatbotExclusion(currentPath) {
  const excludePaths = await getChatbotExcludePaths();
  console.log("excludePaths", excludePaths);

  // Check if current path contains any of the exclusion patterns
  return excludePaths.some((excludePath) => currentPath.includes(excludePath));
}

// Chatbot configuration
const chatNowText = "Need help?";

// Global variables
let chatElement = null;
let isInAttentionState = false;
let isChatbotReady = false;
let isChatbotCreated = false;

/**
 * Creates a DOM element with attributes and content
 * @param {string} tag - The HTML tag name
 * @param {object} attributes - Object of attributes to set
 * @param {string} content - Text content to add
 * @returns {HTMLElement} The created element
 */
function createTag(tag, attributes = {}, content = "") {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "class") {
      element.className = value;
    } else if (key === "aria-hidden") {
      element.setAttribute("aria-hidden", value);
    } else if (key === "innerHTML") {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  if (content && !attributes.innerHTML) {
    element.textContent = content;
  }

  return element;
}

/**
 * Loads a script dynamically
 * @param {string} src - The script source URL
 * @returns {Promise} Promise that resolves when script loads
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Creates the chatbot button and text bubble
 */
function createChatbot() {
  // Prevent duplicate creation
  if (isChatbotCreated) {
    return;
  }

  isChatbotCreated = true;

  const chatNow = createTag("div", {
    id: "chat-now",
    class: "button-container-chatnow",
  });

  const chatIcon = createTag("div", {
    class: "lilly-chatbot-icon",
    innerHTML: `
    <svg id="chatbot-icon" data-name="chatbot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 18.75">
      <defs>
        <style>
          .cls-1 {
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 1.5px;
          }
        </style>
      </defs>
      <path class="cls-1" d="M4.46,10.5l-3.71,3V1.5c0-.2.08-.39.22-.53s.33-.22.53-.22h12c.2,0,.39.08.53.22.14.14.22.33.22.53v8.25c0,.2-.08.39-.22.53-.14.14-.33.22-.53.22H4.46Z"/>
      <path class="cls-1" d="M5.25,10.5v3.75c0,.2.08.39.22.53.14.14.33.22.53.22h9.04l3.71,3V6c0-.2-.08-.39-.22-.53-.14-.14-.33-.22-.53-.22h-3.75"/>
    </svg>
    `,
  });

  chatNow.appendChild(chatIcon);
  document.body.appendChild(chatNow);

  // Store reference for inactivity tracking
  chatElement = chatNow;
  initInactivityTracking();

  // Open chatbot on URL query param
  const urlParams = new URLSearchParams(window.location.search);
  const chatbotParam = urlParams.get("chatbot");
  if (chatbotParam === "open") {
    try {
      if (window.lmChatbot) {
        window.lmChatbot.open();
      }
    } catch (error) {
      // Error opening chatbot via URL parameter
    }
  }

  // ChatNow on click event
  chatNow.addEventListener("click", async () => {
    // Dismiss attention state
    if (isInAttentionState) {
      hideAttentionState();
    }

    try {
      // Check if chatbot is available and ready
      if (!window.lmChatbot) {
        throw new Error("Chatbot not available");
      }

      if (!isChatbotReady) {
        // Wait for chatbot to be ready
        let attempts = 0;
        while (!isChatbotReady && attempts < 50) {
          // Wait up to 5 seconds
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }

        if (!isChatbotReady) {
          throw new Error("Chatbot not ready after waiting");
        }
      }

      await window.lmChatbot.open();
    } catch (error) {
      // Show a fallback message or retry
      setTimeout(async () => {
        try {
          if (window.lmChatbot) {
            await window.lmChatbot.open();
          }
        } catch (retryError) {
          // Chatbot still not working
        }
      }, 1000);
    }

    // Track analytics event
    pushAdobeAnalyticsEvent({
      event: "link_click",
      aa_link_click: 1,
      aa_link_type: "other",
      link_click: 1,
      link_type: "ContactUs",
      link_text: chatNowText,
      link_url: "#chatnow",
      isContactUs: 1,
    });

    // Set up close button analytics
    setTimeout(() => {
      const chatCloseButton = document.querySelector(
        "#LMChatbotContainer .cb-widget-close-btn",
      );
      if (chatCloseButton && chatCloseButton?.dataset.listening !== "true") {
        chatCloseButton.dataset.listening = "true";
        chatCloseButton.addEventListener("click", () => {
          pushAdobeAnalyticsEvent({
            event: "link_click",
            aa_link_click: 1,
            aa_link_type: "other",
            link_click: 1,
            link_type: "ContactUs",
            link_text: chatCloseButton?.title || "Close Chat Bot",
            link_url: "",
            isContactUs: 1,
          });
        });
      }

      // Set up accordion analytics
      const chatContainer = document.querySelector("#LMChatbotContainer");
      if (chatContainer && chatContainer?.dataset.listening !== "true") {
        chatContainer.dataset.listening = "true";
        chatContainer.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("cb-warning-header") ||
            e.target.closest(".cb-warning-header")
          ) {
            pushAdobeAnalyticsEvent({
              event: "link_click",
              aa_link_click: 1,
              aa_link_type: "other",
              link_click: 1,
              link_type: "Accordion",
              link_text:
                e.target?.textContent ||
                e.target.closest(".cb-warning-header")?.textContent ||
                "",
              link_url: "",
              isAccordion: 1,
            });
          }
        });
      }
    }, 500);
  });
}

/**
 * Initializes inactivity tracking for the chatbot
 */
function initInactivityTracking() {
  let inactivityTimer;
  const inactivityDelay = 30000; // 30 seconds

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (chatElement && !isInAttentionState) {
        showAttentionState();
      }
    }, inactivityDelay);
  };

  // Track user activity
  ["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach(
    (event) => {
      document.addEventListener(event, resetTimer, true);
    },
  );

  resetTimer();
}

/**
 * Shows attention state for the chatbot
 */
function showAttentionState() {
  if (chatElement && !isInAttentionState) {
    isInAttentionState = true;
    chatElement.classList.add("attention-state");
  }
}

/**
 * Hides attention state for the chatbot
 */
function hideAttentionState() {
  if (chatElement && isInAttentionState) {
    isInAttentionState = false;
    chatElement.classList.remove("attention-state");
  }
}

/**
 * Initializes the chatbot functionality
 */
async function useChatbot() {
  try {
    // Get the chatbot URL from configuration
    const chatbotUrl = await getAemConfig("CHATBOT_API_URL");

    if (!chatbotUrl) {
      throw new Error("Chatbot URL not configured");
    }

    // Load the chatbot script
    await loadScript(chatbotUrl);

    // Wait a bit for the script to fully initialize
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check if lmChatbot is available
    if (!window.lmChatbot) {
      throw new Error("lmChatbot not available after script load");
    }

    // Note: Using predefined CHATBOT_URL constant instead of AEM config

    // Fetch chatbot token from the direct API
    const apiDomain = await getAemConfig("API_DOMAIN"); // In /eds/site-config/configuration.json
    const tokenUrl = `${apiDomain}/v1/chatbotToken`;
    const requestBody = { product: "zepbound" };

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Extract the token from the nested structure - it's in downstreamResponse.body
    const chatbotTokenId =
      data?.downstreamResponse?.body ||
      data?.getToken ||
      data?.token ||
      data?.downstreamResponse?.getToken ||
      data?.downstreamResponse?.token ||
      data?.downstreamResponse?.accessToken ||
      data?.downstreamResponse?.access_token;

    // Check if token looks valid
    if (chatbotTokenId && typeof chatbotTokenId === "string") {
      // Token appears to be a valid string
    }

    if (chatbotTokenId && window.lmChatbot) {
      // Try the simpler initialization approach from the working example
      try {
        // Try different initialization approaches based on the working example
        // The working example might be using a different method or parameters
        try {
          // First try the simple approach
          window.lmChatbot.init(chatbotTokenId);
        } catch (initError) {
          // Try with additional parameters that might be needed
          try {
            window.lmChatbot.init(chatbotTokenId, {
              debug: false,
              // Add any other parameters that might be needed
            });
          } catch (paramError) {
            throw paramError;
          }
        }

        // Set up event listeners BEFORE calling init (in case events fire immediately)

        window.lmChatbot.on("LMChatbotInitiated", () => {
          isChatbotReady = true;
          createChatbot();
        });

        // Add error handling for chatbot events
        window.lmChatbot.on("error", (error) => {
          // Chatbot error event fired
        });

        // Add additional event listeners that might be needed
        window.lmChatbot.on("configLoaded", () => {
          // Chatbot configLoaded event fired
        });

        // Add more event listeners to track what's happening
        window.lmChatbot.on("ready", () => {
          // Chatbot ready event fired
        });

        window.lmChatbot.on("loaded", () => {
          // Chatbot loaded event fired
        });

        // Add a timeout to check if LMChatbotInitiated ever fires
        setTimeout(() => {
          if (!isChatbotReady) {
            // LMChatbotInitiated event never fired after 5 seconds
          }
        }, 5000);

        // Also try to create the chatbot immediately as a fallback
        // (in case the event doesn't fire)
        setTimeout(() => {
          if (!chatElement) {
            isChatbotReady = true; // Assume it's ready for fallback
            createChatbot();
          }
        }, 2000);
      } catch (initError) {
        // Try to create chatbot anyway as fallback
        isChatbotReady = true; // Set ready for fallback
        createChatbot();
      }
    }
  } catch (error) {
    // Error initializing chatbot
  }
}

/**
 * Main initialization function
 */
async function initializeChatbot() {
  // Only initialize chatbot on consumer-facing pages (not HCP or Spanish)
  const pathname = window.location.pathname;
  console.log("pathname", pathname);

  // Check if current path is in the exclusion list
  const isExcluded = await checkChatbotExclusion(pathname);
  console.log("isExcluded", isExcluded);

  if (!isExcluded) {
    console.log("Loading chatbot...");
    await useChatbot();
  } else {
    console.log("Excluded from chatbot");
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeChatbot);
} else {
  initializeChatbot();
}
