/**
 * Loads external scripts in order, only if not already loaded.
 * @param {string[]} scripts - Array of script URLs to load.
 * @returns {Promise<void>}
 */
export async function loadScriptsInOrder(scripts) {
  for (const src of scripts) {
    if (!document.querySelector(`script[src="${src}"]`)) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  }
}
