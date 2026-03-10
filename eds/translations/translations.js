const translations = {
  en: {
    PRFC_LABEL: "Read the article",
    VIDEO_LABEL: "Watch the video",
    PRFB_POSTED_TEXT: "Posted by",
    SEARCH_RESULTS_TITLE: "Search Results",
    SEARCH_LILLY: "Search Lilly",
    LOADING: "Loading...",
    NO_RESULTS: "Sorry, we couldn't find any results for",
    RESULTS_FOR: "results for",
    SHOWING_RESULTS: "Showing",
    OF: "of",
    RESULTS: "results",
    SEARCH_PLACEHOLDER: "Search...",
    VIDEO_TRANSCRIPT: "Video Transcript",
    HOME: "Home",
    ALL: "All",
    LOAD_MORE_MEDICINES: "Load more medicines",
    ERROR_404_TITLE: "Error 404",
    ERROR_404_DESCRIPTION:
      "The page you are looking for is no longer available. Click the button below to return to Home.",
    ERROR_404_BUTTON: "Return to Home",
  },
  it: {
    PRFC_LABEL: "Leggi l'articolo",
    VIDEO_LABEL: "Guarda il video",
    PRFB_POSTED_TEXT: "Pubblicato da",
    SEARCH_RESULTS_TITLE: "Risultati di ricerca",
    SEARCH_LILLY: "Cerca nel sito",
    LOADING: "Caricamento...",
    NO_RESULTS: "Spiacenti, non abbiamo trovato alcun risultato per",
    RESULTS_FOR: "risultati per",
    SHOWING_RESULTS: "Visualizzazione risultati",
    OF: "di",
    RESULTS: "risultati",
    SEARCH_PLACEHOLDER: "Cerca...",
    VIDEO_TRANSCRIPT: "Video Transcript",
    HOME: "Home",
    ALL: "Tutti",
    LOAD_MORE_MEDICINES: "Carga más medicamentos",
    ERROR_404_TITLE: "Errore 404",
    ERROR_404_DESCRIPTION:
      "La pagina che stai cercando non è più disponibile, clicca sul pulsante qui sotto per tornare alla Home",
    ERROR_404_BUTTON: "Ritorna alla Home",
  },
  es: {
    ARCHIVE: "historico",
    PRFC_LABEL: "Leer Más",
    VIDEO_LABEL: "Ver historia del paciente",
    PRFB_POSTED_TEXT: "Publicado por",
    SEARCH_RESULTS_TITLE: "Buscar resultados",
    SEARCH_LILLY: "Buscar en sitio",
    LOADING: "Cargando...",
    NO_RESULTS: "Lo sentimos, no pudimos encontrar ningún resultado para",
    RESULTS_FOR: "resultados de",
    SHOWING_RESULTS: "Mostrando",
    OF: "de",
    RESULTS: "resultados",
    SEARCH_PLACEHOLDER: "Buscar...",
    VIDEO_TRANSCRIPT: "Transcripción del video",
    HOME: "Inicio",
    ALL: "Todo",
    LOAD_MORE_MEDICINES: "Carga más medicamentos",
    ERROR_404_TITLE: "Error 404",
    ERROR_404_DESCRIPTION:
      "Desafortunadamente, la página que está buscando no pudo encontrarse. \n Es posible que la página que buscabas haya cambiado de nombre, haya sido removida o no esté disponible temporalmente.",
    ERROR_404_BUTTON: "Volver al Inicio",
  },
};

/**
 * Get translations for a specific language
 * @param {string} lang - Language code (e.g., 'en', 'it')
 * @returns {object} Translation object for the specified language
 */
export function getTranslations(lang = "en") {
  const language = lang;
  return translations[language] || translations.en;
}

/**
 * Get a specific translation string
 * @param {string} key - Translation key
 * @param {string} lang - Language code (e.g., 'en', 'it')
 * @returns {string} Translated string
 */
export function getTranslation(key, lang = "en") {
  const language = lang;
  const langTranslations = getTranslations(language);
  return langTranslations[key] || translations.en[key] || key;
}

// Default export for backward compatibility
export default translations;
