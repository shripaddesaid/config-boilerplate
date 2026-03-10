/**
 * Process content wrapped in square brackets [content]
 * Wraps the identified content with a div having class 'borderLeftWrapper'
 * @param {string} html - HTML content to process
 * @returns {string} - Processed HTML with wrapped content
 */
export function processBracketContent(html) {
  if (!html) return html;

  // Create a temporary container for our operations
  const container = document.createElement("div");
  // Set the input HTML directly (no async, no intermediate sanitization)
  if (window.DOMPurify) {
    container.innerHTML = window.DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    });
  } else {
    container.innerHTML = html;
  }

  // First, look for simple bracket patterns in text that can be easily identified
  const processSingleParagraph = (element) => {
    // Check if the entire text content starts with [ and ends with ]
    const text = element.innerHTML;
    const bracketMatch = text.match(/^\s*\[([\s\S]*)\]\s*$/);

    if (bracketMatch) {
      // Remove brackets from the content
      // Sanitize bracketMatch[1] before setting
      if (window.DOMPurify) {
        element.innerHTML = window.DOMPurify.sanitize(bracketMatch[1], {
          USE_PROFILES: { html: true },
        });
      } else {
        element.innerHTML = bracketMatch[1];
      }
      return true;
    }
    return false;
  };

  // Check if a paragraph starts with a bracket
  const startsWithBracket = (element) => {
    const text = element.textContent;
    return text.trim().indexOf("[") === 0;
  };

  // Check if a paragraph contains a closing bracket and handle mid-text brackets
  const endsWithBracket = (element) => {
    const text = element.textContent;
    const trimmedText = text.trim();

    // Traditional check for ending with bracket
    const endsWithBracketCheck =
      trimmedText.lastIndexOf("]") === trimmedText.length - 1;

    // Check for mid-text bracket
    const hasMidTextBracket = trimmedText.lastIndexOf("]") !== -1;

    if (endsWithBracketCheck) {
      return true;
    }

    // If there's a bracket in the middle, we need to modify the element to extract the content
    if (hasMidTextBracket) {
      // Extract all content up to and including the last closing bracket
      const bracketIndex = element.innerHTML.lastIndexOf("]");
      if (bracketIndex !== -1) {
        // Split the content at the bracket
        const bracketContent = element.innerHTML.substring(0, bracketIndex + 1);
        const remainingContent = element.innerHTML.substring(bracketIndex + 1);

        // Update the current element with just the bracketed content
        // Sanitize bracketContent before setting
        if (window.DOMPurify) {
          element.innerHTML = window.DOMPurify.sanitize(bracketContent, {
            USE_PROFILES: { html: true },
          });
        } else {
          element.innerHTML = bracketContent;
        }

        // If there's remaining content, create a new paragraph after this one
        if (remainingContent.trim()) {
          const newPara = document.createElement("p");
          // Sanitize remainingContent before setting
          if (window.DOMPurify) {
            newPara.innerHTML = window.DOMPurify.sanitize(remainingContent, {
              USE_PROFILES: { html: true },
            });
          } else {
            newPara.innerHTML = remainingContent;
          }
          if (element.parentNode) {
            const nextSibling = element.nextSibling;
            element.parentNode.insertBefore(newPara, nextSibling);
          }
        }

        return true;
      }
    }

    return false;
  }; // Process each paragraph
  const paragraphs = Array.from(container.querySelectorAll("p"));

  if (paragraphs.length > 0) {
    // First, try to identify multi-paragraph bracket sequences
    let startIdx = -1;
    let endIdx = -1;

    // Find potential multi-paragraph bracket sequence
    for (let i = 0; i < paragraphs.length; i++) {
      if (startsWithBracket(paragraphs[i]) && startIdx === -1) {
        startIdx = i;
      }
      if (endsWithBracket(paragraphs[i])) {
        endIdx = i;
        // If we found a start and end, process this sequence
        if (startIdx !== -1 && startIdx <= endIdx) {
          break;
        }
      }
    }

    // If we found a valid bracket sequence
    if (startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx) {
      // Create our wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "borderLeftWrapper";

      // For single paragraph bracket content, combine into a single paragraph
      if (startIdx === endIdx) {
        const p = paragraphs[startIdx];
        let content = p.innerHTML;

        // Find indices of brackets in the HTML content
        const openBracketIndex = content.indexOf("[");
        const closeBracketIndex = content.lastIndexOf("]");

        if (
          openBracketIndex !== -1 &&
          closeBracketIndex !== -1 &&
          openBracketIndex < closeBracketIndex
        ) {
          // Extract just the content between brackets
          content = content.substring(openBracketIndex + 1, closeBracketIndex);

          // Create a single paragraph with the extracted content
          const newP = document.createElement("p");
          // Sanitize content before setting
          if (window.DOMPurify) {
            newP.innerHTML = window.DOMPurify.sanitize(content, {
              USE_PROFILES: { html: true },
            });
          } else {
            newP.innerHTML = content;
          }
          wrapper.appendChild(newP);
        } else {
          // Fall back to simple bracket removal if indices are invalid
          //content = content.replace(/\[/, "").replace(/\](?=[^]*$)/, "");
          content = content.replace(/\[/, "").replace(/\](?=.*$)/s, "");
          const newP = document.createElement("p");
          // Sanitize content before setting
          newP.innerHTML = content;
          wrapper.appendChild(newP);
        }
      } else {
        // Process the paragraphs in the sequence for multi-paragraph content
        for (let i = startIdx; i <= endIdx; i++) {
          const p = paragraphs[i];
          let content = p.innerHTML;

          // Remove bracket from first paragraph
          if (i === startIdx) {
            content = content.replace(/\[/, "");
          }

          // Remove bracket from last paragraph
          if (i === endIdx) {
            // biome-ignore lint: The regular expression includes this negated empty character class.
            content = content.replace(/\](?=[^]*$)/, ""); // Replace only the last occurrence
          }

          // Create a new paragraph with the cleaned content
          const newP = document.createElement("p");
          // Sanitize content before setting
          newP.innerHTML = content;
          wrapper.appendChild(newP);
        }
      }

      // Insert the wrapper before the first paragraph in the sequence
      const firstPara = paragraphs[startIdx];
      if (firstPara.parentNode) {
        firstPara.parentNode.insertBefore(wrapper, firstPara);

        // Remove the original paragraphs that we've processed
        for (let i = startIdx; i <= endIdx; i++) {
          if (paragraphs[i].parentNode) {
            paragraphs[i].parentNode.removeChild(paragraphs[i]);
          }
        }
      }
    } else {
      // Process each paragraph individually if no multi-paragraph sequence was found
      paragraphs.forEach((p) => {
        if (processSingleParagraph(p)) {
          // Create a wrapper div
          const wrapper = document.createElement("div");
          wrapper.className = "borderLeftWrapper";

          // Clone the paragraph to preserve its content
          const clonedP = p.cloneNode(true);

          // Add the paragraph to the wrapper
          wrapper.appendChild(clonedP);

          // Replace the original paragraph with the wrapper
          if (p.parentNode) {
            p.parentNode.replaceChild(wrapper, p);
          }
        }
      });
    }
  }

  // Return the processed HTML
  // Sanitize output before returning
  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(container.innerHTML, {
      USE_PROFILES: { html: true },
    });
  }
  return container.innerHTML;
}

// ISI Component configuration constants
export const ISI_CONFIG = {
  mobileBreakpoint: 768,
  defaultHeight: "148px",
  mobileDefaultHeight: "172px",
  collapsedHeight: "148px",
  expandedHeight: "79vh",
  origins: {
    devOrigin: "https://dev.zepbound.lilly.com",
    qaOrigin: "https://qa.zepbound.lilly.com",
    defaultOrigin: "https://dev.zepbound.lilly.com",
  },
  iconTypes: {
    plus: "plus",
    minus: "minus",
  },
  excludeISI: "page not found",
};
