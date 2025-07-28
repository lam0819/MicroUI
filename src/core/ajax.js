/**
 * AJAX Utilities
 * Provides Promise-based HTTP requests
 */

/**
 * Default options for AJAX requests
 */
const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
};

/**
 * Generic AJAX request
 * @param {Object} options - Request options
 * @returns {Promise} - Promise resolving to response data
 */
export function ajax(options) {
  const config = { ...defaultOptions, ...options };
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let isTimedOut = false;
    
    const timeoutId = setTimeout(() => {
      isTimedOut = true;
      xhr.abort();
      reject(new Error('Request timeout'));
    }, config.timeout);
    
    xhr.open(config.method, config.url);
    
    // Set headers
    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
    }
    
    xhr.onload = () => {
      clearTimeout(timeoutId);
      
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const contentType = xhr.getResponseHeader('Content-Type');
          let response = xhr.responseText;
          
          if (contentType && contentType.includes('application/json')) {
            response = JSON.parse(xhr.responseText);
          }
          
          resolve(response);
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };
    
    xhr.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error('Network error'));
    };
    
    xhr.onabort = () => {
      clearTimeout(timeoutId);
      if (!isTimedOut) {
        reject(new Error('Request aborted'));
      }
    };
    
    // Send request
    if (config.data) {
      if (config.method === 'GET') {
        // Append data as query string for GET requests
        const params = new URLSearchParams(config.data).toString();
        xhr.open(config.method, `${config.url}?${params}`);
        xhr.send();
      } else {
        // Send data as JSON for other methods
        const payload = typeof config.data === 'string' 
          ? config.data 
          : JSON.stringify(config.data);
        xhr.send(payload);
      }
    } else {
      xhr.send();
    }
  });
}

/**
 * GET request
 * @param {string} url - Request URL
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise resolving to response data
 */
export function get(url, options = {}) {
  return ajax({ ...options, method: 'GET', url });
}

/**
 * POST request
 * @param {string} url - Request URL
 * @param {any} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise resolving to response data
 */
export function post(url, data, options = {}) {
  return ajax({ ...options, method: 'POST', url, data });
}

/**
 * PUT request
 * @param {string} url - Request URL
 * @param {any} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise resolving to response data
 */
export function put(url, data, options = {}) {
  return ajax({ ...options, method: 'PUT', url, data });
}

/**
 * DELETE request
 * @param {string} url - Request URL
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise resolving to response data
 */
export function del(url, options = {}) {
  return ajax({ ...options, method: 'DELETE', url });
}

/**
 * Load HTML content into element
 * @param {Element|string} element - Target element or selector
 * @param {string} url - URL to load content from
 * @returns {Promise} - Promise resolving when content is loaded
 */
export function load(element, url) {
  return get(url).then(html => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
      el.innerHTML = html;
    }
    return html;
  });
}
