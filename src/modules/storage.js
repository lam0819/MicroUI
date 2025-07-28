/**
 * Storage Module
 * Provides localStorage and sessionStorage wrappers
 */

/**
 * LocalStorage wrapper
 */
export const store = {
  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - Retrieved value
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Failed to retrieve from localStorage:', e);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to remove from localStorage:', e);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
  },

  /**
   * Get all keys from localStorage
   * @returns {string[]} - Array of storage keys
   */
  keys() {
    try {
      return Object.keys(localStorage);
    } catch (e) {
      console.warn('Failed to get localStorage keys:', e);
      return [];
    }
  }
};

/**
 * SessionStorage wrapper
 */
export const session = {
  /**
   * Set item in sessionStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (e) {
      console.warn('Failed to save to sessionStorage:', e);
    }
  },

  /**
   * Get item from sessionStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - Retrieved value
   */
  get(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Failed to retrieve from sessionStorage:', e);
      return defaultValue;
    }
  },

  /**
   * Remove item from sessionStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to remove from sessionStorage:', e);
    }
  },

  /**
   * Clear all items from sessionStorage
   */
  clear() {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.warn('Failed to clear sessionStorage:', e);
    }
  },

  /**
   * Get all keys from sessionStorage
   * @returns {string[]} - Array of storage keys
   */
  keys() {
    try {
      return Object.keys(sessionStorage);
    } catch (e) {
      console.warn('Failed to get sessionStorage keys:', e);
      return [];
    }
  }
};
