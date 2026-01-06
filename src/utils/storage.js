/**
 * LocalStorage utility functions for data persistence
 */

const STORAGE_KEYS = {
  PROJECTS: 'netflix_cbp_projects',
  LANGUAGES: 'netflix_cbp_languages',
  ACTIVE_TAB: 'netflix_cbp_active_tab',
};

/**
 * Safely get data from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Safely set data to localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setToStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Project-specific storage functions
export const getProjects = (defaultValue) =>
  getFromStorage(STORAGE_KEYS.PROJECTS, defaultValue);

export const saveProjects = (projects) => setToStorage(STORAGE_KEYS.PROJECTS, projects);

// Language-specific storage functions
export const getLanguages = (defaultValue) =>
  getFromStorage(STORAGE_KEYS.LANGUAGES, defaultValue);

export const saveLanguages = (languages) => setToStorage(STORAGE_KEYS.LANGUAGES, languages);

// Active tab storage functions
export const getActiveTab = (defaultValue) =>
  getFromStorage(STORAGE_KEYS.ACTIVE_TAB, defaultValue);

export const saveActiveTab = (tab) => setToStorage(STORAGE_KEYS.ACTIVE_TAB, tab);

export { STORAGE_KEYS };
