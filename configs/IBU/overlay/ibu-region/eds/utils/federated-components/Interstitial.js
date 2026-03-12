export function handleShowInterstitial(data) {
  // Map type to vendorName if needed
  let vendorName;
  switch (data?.type) {
    case "telehealth":
      vendorName = "TeleHealth Pro";
      break;
    case "embedded-tools-healthgrades":
      vendorName = "Healthgrades";
      break;
    case "embedded-tools-nourish":
      vendorName = "Nourish";
      break;
    default:
      vendorName = undefined;
  }
  if (data?.type === "general-third-parties") {
    data.type = "zepbound-general-third-parties-english";
  }
  // Dispatch the interstitial show event
  document.dispatchEvent(
    new CustomEvent("unex-interstitial:show", {
      detail: {
        type: `interstitial:${data.type}`,
        data: {
          actions: {
            primaryCTA: {
              url: data.url || "",
              target: "_blank",
              ariaLabel: data.ariaLabel || "",
            },
          },
          ...(vendorName && { metadata: { vendorName } }),
        },
        callbacks: {
          onConfirm: () => {
            // Allow the doctor finder search to proceed
            data.callbackFunction?.();
          },
          onCancel: () => {
            // Prevent the search from happening
          },
        },
      },
    }),
  );
}
