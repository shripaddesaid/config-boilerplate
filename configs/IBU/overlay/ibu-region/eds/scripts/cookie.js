// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export function loadCookieBanner(cfCSSUrl, cfJSUrl, callback) {
    // Function to initialize the external resources
    function initialize() {
      // Add external CSS
      const link = document.createElement('link');
      link.href = cfCSSUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

  
      // Add external JavaScript 1
      const script = document.createElement('script');
      script.src = cfJSUrl;
      script.async = true;
      document.head.appendChild(script);
      const scriptLoaded = new Promise((resolve) => {
        script.onload = () => resolve();
      });
  
      // Callback function to execute after the resources are loaded
      Promise.all([scriptLoaded]).then(() => {
        if (callback && typeof callback === 'function') {
          callback();
        }
      }).catch((error) => {
        console.error('Error loading external resources:', error);
      });
  
      // Cleanup function to remove the elements when needed
      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);

      };
    }
    initialize();
  }