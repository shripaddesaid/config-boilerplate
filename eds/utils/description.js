export default function createDescriptionBlock(label, description) {
  const descContainer = document.createElement("div");
  descContainer.className = "description-container";

  const labelContainer = document.createElement("div");
  labelContainer.className = "description-label-container";
  labelContainer.setAttribute("role", "button");
  labelContainer.setAttribute("tabindex", "0");
  labelContainer.setAttribute("aria-expanded", "false");
  labelContainer.setAttribute("data-track-component", "Table");

  const labelDiv = document.createElement("div");
  labelDiv.className = "description-label";
  labelDiv.innerHTML = `<p class="richtext-field-wrapper">${label}</p>`;

  const iconSpan = document.createElement("span");
  iconSpan.className = "description-label-icon";
  iconSpan.setAttribute("aria-hidden", "true");
  iconSpan.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <circle cx="12.5" cy="12" r="9.25" stroke="#000" stroke-width="1" fill="none"/>
      <path d="M8.21937 9.96937C8.28903 9.89964 8.37174 9.84432 8.46279 9.80658C8.55384 9.76883 8.65143 9.74941 8.75 9.74941C8.84856 9.74941 8.94615 9.76883 9.0372 9.80658C9.12825 9.84432 9.21097 9.89964 9.28062 9.96937L12.5 13.1897L15.7194 9.96937C15.7891 9.89969 15.8718 9.84442 15.9628 9.8067C16.0539 9.76899 16.1515 9.74958 16.25 9.74958C16.3485 9.74958 16.4461 9.76899 16.5372 9.8067C16.6282 9.84442 16.7109 9.89969 16.7806 9.96937C16.8503 10.0391 16.9056 10.1218 16.9433 10.2128C16.981 10.3039 17.0004 10.4015 17.0004 10.5C17.0004 10.5985 16.981 10.6961 16.9433 10.7872C16.9056 10.8782 16.8503 10.9609 16.7806 11.0306L13.0306 14.7806C12.961 14.8504 12.8782 14.9057 12.7872 14.9434C12.6962 14.9812 12.5986 15.0006 12.5 15.0006C12.4014 15.0006 12.3038 14.9812 12.2128 14.9434C12.1217 14.9057 12.039 14.8504 11.9694 14.7806L8.21937 11.0306C8.14964 10.961 8.09432 10.8783 8.05658 10.7872C8.01883 10.6962 7.99941 10.5986 7.99941 10.5C7.99941 10.4014 8.01883 10.3038 8.05658 10.2128C8.09432 10.1217 8.14964 10.039 8.21937 9.96937Z" fill="#000" stroke="none"/>
    </svg>
  `;

  const descContent = document.createElement("div");
  descContent.className = "description";
  descContent.style.display = "none";
  descContent.setAttribute("aria-hidden", "true");
  descContent.innerHTML = description;

  function toggleDescription() {
    const expanded = labelContainer.getAttribute("aria-expanded") === "true";
    labelContainer.setAttribute("aria-expanded", String(!expanded));
    descContent.style.display = expanded ? "none" : "";
    descContent.setAttribute("aria-hidden", expanded ? "true" : "false");
    iconSpan.className = expanded
      ? "description-label-icon hide"
      : "description-label-icon show";
    const svg = iconSpan.querySelector("svg");
    if (svg) {
      svg.style.transform = expanded ? "" : "rotate(-180deg)";
      svg.style.transition = "transform 0.2s";
    }
    if (expanded) document.querySelector(".custom-scrollbar")?.remove();
  }

  labelContainer.addEventListener("click", toggleDescription);
  labelContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDescription();
    }
  });

  labelContainer.append(labelDiv, iconSpan);
  descContainer.append(labelContainer, descContent);

  return descContainer;
}
