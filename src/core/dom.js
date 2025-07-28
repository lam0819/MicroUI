/**
 * DOM Utilities
 * Provides core DOM manipulation functions
 */

// Element cache for performance
const elementCache = new Map();

/**
 * Query single element with caching
 * @param {string} selector - CSS selector
 * @returns {Element|null} - Found element or null
 */
export function $(selector) {
  if (elementCache.has(selector)) {
    const cached = elementCache.get(selector);
    if (document.contains(cached)) {
      return cached;
    }
    elementCache.delete(selector);
  }
  
  const element = document.querySelector(selector);
  if (element) {
    elementCache.set(selector, element);
  }
  return element;
}

/**
 * Query multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList} - List of found elements
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Add classes to element
 * @param {Element|string} element - Element or selector
 * @param {string} classes - Space-separated class names
 */
export function addClass(element, classes) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  const classArray = classes.split(' ').filter(cls => cls.trim());
  el.classList.add(...classArray);
}

/**
 * Remove classes from element
 * @param {Element|string} element - Element or selector
 * @param {string} classes - Space-separated class names
 */
export function removeClass(element, classes) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  const classArray = classes.split(' ').filter(cls => cls.trim());
  el.classList.remove(...classArray);
}

/**
 * Toggle class on element
 * @param {Element|string} element - Element or selector
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add/remove
 */
export function toggleClass(element, className, force) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  return el.classList.toggle(className, force);
}

/**
 * Check if element has class
 * @param {Element|string} element - Element or selector
 * @param {string} className - Class name to check
 * @returns {boolean} - True if element has class
 */
export function hasClass(element, className) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return false;
  
  return el.classList.contains(className);
}

/**
 * Set or get attribute
 * @param {Element|string} element - Element or selector
 * @param {string} name - Attribute name
 * @param {string} value - Attribute value (optional)
 * @returns {string|void} - Attribute value if getting
 */
export function attr(element, name, value) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  if (value === undefined) {
    return el.getAttribute(name);
  }
  
  if (value === null) {
    el.removeAttribute(name);
  } else {
    el.setAttribute(name, value);
  }
}

/**
 * Set or get data attribute
 * @param {Element|string} element - Element or selector
 * @param {string} key - Data key
 * @param {any} value - Data value (optional)
 * @returns {any} - Data value if getting
 */
export function data(element, key, value) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  if (value === undefined) {
    const dataValue = el.dataset[key];
    try {
      return JSON.parse(dataValue);
    } catch {
      return dataValue;
    }
  }
  
  el.dataset[key] = typeof value === 'object' ? JSON.stringify(value) : value;
}

/**
 * Set HTML content
 * @param {Element|string} element - Element or selector
 * @param {string} html - HTML content
 */
export function html(element, html) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  el.innerHTML = html;
}

/**
 * Append HTML content
 * @param {Element|string} element - Element or selector
 * @param {string} html - HTML content to append
 */
export function append(element, html) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  el.insertAdjacentHTML('beforeend', html);
}

/**
 * Prepend HTML content
 * @param {Element|string} element - Element or selector
 * @param {string} html - HTML content to prepend
 */
export function prepend(element, html) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  el.insertAdjacentHTML('afterbegin', html);
}

/**
 * Remove element
 * @param {Element|string} element - Element or selector
 */
export function remove(element) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return;
  
  el.remove();
}

/**
 * Find closest ancestor matching selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector
 * @returns {Element|null} - Closest matching element
 */
export function closest(element, selector) {
  return element.closest(selector);
}
