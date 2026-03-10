/**
 * Creates an accessible, toggleable transcript block for a video.
 * @param {string} label - The label for the transcript toggle.
 * @param {string} description - The transcript HTML/text.
 * @returns {HTMLElement} The transcript block element.
 */
export function createTranscriptBlock(label, description, componentName = "") {
  // Container
  const descContainer = document.createElement("div");
  descContainer.className = "transcript-container";

  // Label container (acts as button)
  const labelContainer = document.createElement("div");
  labelContainer.className = "transcript-label-container";
  labelContainer.setAttribute("role", "button");
  labelContainer.setAttribute("tabindex", "0");
  labelContainer.setAttribute("aria-expanded", "false");
  labelContainer.setAttribute("aria-label", "Toggle transcript description");
  labelContainer.setAttribute("data-track-component", "Video");
  labelContainer.setAttribute("data-track-event", "Accordion open");

  // Label text
  const labelDiv = document.createElement("div");
  labelDiv.className = "transcript-label";
  labelDiv.innerHTML = `<p class="richtext-field-wrapper">${label}</p>`;

  // Icon
  const iconSpan = document.createElement("span");
  iconSpan.className = "transcript-label-icon";
  iconSpan.setAttribute("aria-hidden", "true");
  iconSpan.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M12.5 21.75C14.4284 21.75 16.3134 21.1782 17.9168 20.1068C19.5202 19.0355 20.7699 17.5127 21.5078 15.7312C22.2458 13.9496 22.4389 11.9892 22.0627 10.0979C21.6864 8.20655 20.7579 6.46927 19.3943 5.10571C18.0307 3.74215 16.2934 2.81355 14.4021 2.43734C12.5108 2.06114 10.5504 2.25422 8.76883 2.99217C6.98725 3.73013 5.46451 4.97981 4.39317 6.58319C3.32182 8.18657 2.75 10.0716 2.75 12C2.75273 14.585 3.78083 17.0634 5.60872 18.8913C7.43661 20.7192 9.91497 21.7473 12.5 21.75ZM8.21937 9.96937C8.28903 9.89964 8.37174 9.84432 8.46279 9.80658C8.55384 9.76883 8.65143 9.74941 8.75 9.74941C8.84856 9.74941 8.94615 9.76883 9.0372 9.80658C9.12825 9.84432 9.21097 9.89964 9.28062 9.96937L12.5 13.1897L15.7194 9.96937C15.7891 9.89969 15.8718 9.84442 15.9628 9.8067C16.0539 9.76899 16.1515 9.74958 16.25 9.74958C16.3485 9.74958 16.4461 9.76899 16.5372 9.8067C16.6282 9.84442 16.7109 9.89969 16.7806 9.96937C16.8503 10.0391 16.9056 10.1218 16.9433 10.2128C16.981 10.3039 17.0004 10.4015 17.0004 10.5C17.0004 10.5985 16.981 10.6961 16.9433 10.7872C16.9056 10.8782 16.8503 10.9609 16.7806 11.0306L13.0306 14.7806C12.961 14.8504 12.8782 14.9057 12.7872 14.9434C12.6962 14.9812 12.5986 15.0006 12.5 15.0006C12.4014 15.0006 12.3038 14.9812 12.2128 14.9434C12.1217 14.9057 12.039 14.8504 11.9694 14.7806L8.21937 11.0306C8.14964 10.961 8.09432 10.8783 8.05658 10.7872C8.01883 10.6962 7.99941 10.5986 7.99941 10.5C7.99941 10.4014 8.01883 10.3038 8.05658 10.2128C8.09432 10.1217 8.14964 10.039 8.21937 9.96937Z"></path>
    </svg>
  `;

  // Description content
  const descContent = document.createElement("div");
  descContent.className = "transcript-description";
  descContent.style.display = "none";
  descContent.setAttribute("aria-hidden", "true");
  descContent.append(description);

  // Toggle logic
  function toggleDescription() {
    const expanded = labelContainer.getAttribute("aria-expanded") === "true";
    labelContainer.setAttribute("aria-expanded", String(!expanded));

    // Set data-track-event based on expanded state
    labelContainer.setAttribute(
      "data-track-event",
      expanded ? "Accordion open" : "Accordion close",
    );
    descContent.style.display = expanded ? "none" : "";
    descContent.setAttribute("aria-hidden", expanded ? "true" : "false");

    // Update icon class based on aria-expanded state
    iconSpan.className = expanded
      ? "transcript-label-icon hide"
      : "transcript-label-icon show";
  }

  labelContainer.addEventListener("click", toggleDescription);
  labelContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDescription();
    }
  });

  // Build structure
  labelContainer.appendChild(labelDiv);
  labelContainer.appendChild(iconSpan);
  descContainer.appendChild(labelContainer);
  descContainer.appendChild(descContent);

  return descContainer;
}
