import { getAemConfig } from './scripts.js'; 

let auth0Client = null;

const EVENTS = {
  SIGN_IN: 'unex:sign-in',
  SIGN_UP: 'unex:sign-up',
  SIGN_OUT: 'unex:sign-out',
  TOKEN_REQUEST: 'token-request',
};

const getAuthConfig = async () => ({
  domain: await getAemConfig('AUTH0_DOMAIN'),
  clientId: await getAemConfig('AUTH0_CLIENTID'),
  redirectUri: `${window.location.origin}/`,
});

const handleRedirect = async () => {
  const query = window.location.search;
  if (query.includes('code=') && query.includes('state=')) {
    await auth0Client.handleRedirectCallback();
    const redirectUrl = sessionStorage.getItem("redirectUrl") || "/";
    sessionStorage.removeItem("redirectUrl");
    window.location.href = redirectUrl;
  }
};

const handleLogoutRedirect = () => {
  const logoutUri = sessionStorage.getItem("logoutUri");
  sessionStorage.removeItem("logoutUri");
  if (logoutUri) {
    window.location.href = logoutUri;
  }
};

export const handleAuth = async () => {
  try {
    await handleRedirect();
    handleLogoutRedirect();
  } catch (error) {
    console.error('Error handling authentication:', error);
  }
};

const setupAuthEvents = () => {
  // const pushAdobeDataLayerEvent = (eventType, linkText) => {
  //   pushAdobeAnalyticsEvent({
  //     event: "cta_click",
  //     eventinfo: {
  //       eventName: "Login",
  //       linkText,
  //       linkType: "external",
  //       linkUrl: "",
  //       linkLocation: "Header Section",
  //       linkLabel: "",
  //       userSelections: ""
  //     },
  //     componentInfo: {
  //       componentName: "Header"
  //     }
  //   });
  // };

  const handleAuthEvent = async (event) => {
    const { type } = event;

    if (type === EVENTS.SIGN_IN || type === EVENTS.SIGN_UP) {
      const linkText = type === EVENTS.SIGN_IN ? "Sign In" : "Sign Up";
      // pushAdobeDataLayerEvent(type, linkText);

      if (type === EVENTS.SIGN_UP) {
        await signUp();
      } else if (type === EVENTS.SIGN_IN) {
        await login();
      }
    }
  };

  const handleSignOutEvent = async () => {
    await logout();
  };

  // Attach event listeners
  window.addEventListener(EVENTS.SIGN_IN, handleAuthEvent);
  window.addEventListener(EVENTS.SIGN_UP, handleAuthEvent);
  window.addEventListener(EVENTS.SIGN_OUT, handleSignOutEvent);
  document.addEventListener(EVENTS.TOKEN_REQUEST, handleTokenRequest);
};

export const initAuth0 = async () => {
  try {
    const config = await getAuthConfig();
    if (typeof auth0 === 'undefined') {
      throw new Error('Auth0 SDK not loaded');
    }
    
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
      redirect_uri: config.redirectUri,
      },
    });
    setupAuthEvents();
    await handleAuth();
  } catch (error) {
    console.error('Error initializing Auth0:', error);
  }
};

export const authCheck = async () => {
  try {
    return await auth0Client.isAuthenticated();
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getUserDetails = async () => {
  try {
    return await auth0Client.getUser();
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

export const handleTokenRequest = async (event) => {
  if (!event.detail.component?.startsWith("unex-")) {
    return;
  }
  try {
    const { token, expiresIn } = await auth0Client.getTokenSilently();
    event.detail.callback(token, expiresIn);
  } catch (error) {
    event.detail.errorCallback(error.message);
  }
};

export const login = async () => {
  try {
    sessionStorage.setItem('redirectUrl', window.location.href);
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/`,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const signUp = async () => {
  try {
    sessionStorage.setItem('redirectUrl', window.location.href);
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        redirect_uri: `${window.location.origin}/`,
      },
    });
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};

export const logout = async () => {
  try {
    sessionStorage.setItem('logoutUri', window.location.href);
    await auth0Client.logout({
      logoutParams: {
        returnTo: `${window.location.origin}/`,
        federated: true,
        localOnly: false,
      },
    });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
