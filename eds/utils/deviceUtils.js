// Utility functions for environment, device, and browser detection
function matchPattern(str, patterns, defaultValue) {
  for (const { pattern, value } of patterns) {
    if (pattern.test(str)) {
      return value;
    }
  }
  return defaultValue;
}

function getDeviceType(userAgent) {
  return matchPattern(
    userAgent,
    [
      { pattern: /android/i, value: "Android" },
      { pattern: /iPad|iPhone|iPod/, value: "iOS" },
      { pattern: /Macintosh/i, value: "Mac" },
      { pattern: /Windows/i, value: "Windows" },
      { pattern: /Linux/i, value: "Linux" },
    ],
    "Unknown Device",
  );
}
function getBrowserType(userAgent) {
  if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) {
    return "Chrome";
  }
  return matchPattern(
    userAgent,
    [
      { pattern: /Safari/i, value: "Safari" },
      { pattern: /Edge|Edg/i, value: "Edge" },
    ],
    "Unknown Browser",
  );
}

const { userAgent } = navigator;

window.getBrowserType = getBrowserType(userAgent);
window.getDeviceType = getDeviceType(userAgent);

export { getDeviceType, getBrowserType, matchPattern };
