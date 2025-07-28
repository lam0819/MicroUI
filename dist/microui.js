/*! MicroUI v1.0.0 | MIT License | https://github.com/lam0819/microui */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MicroUI = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * DOM Utilities
   * Provides core DOM manipulation functions
   */

  // Element cache for performance
  var elementCache = new Map();

  /**
   * Query single element with caching
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Found element or null
   */
  function $(selector) {
    if (elementCache.has(selector)) {
      var cached = elementCache.get(selector);
      if (document.contains(cached)) {
        return cached;
      }
      elementCache.delete(selector);
    }
    var element = document.querySelector(selector);
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
  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Add classes to element
   * @param {Element|string} element - Element or selector
   * @param {string} classes - Space-separated class names
   */
  function addClass(element, classes) {
    var _el$classList;
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    var classArray = classes.split(' ').filter(function (cls) {
      return cls.trim();
    });
    (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classArray));
  }

  /**
   * Remove classes from element
   * @param {Element|string} element - Element or selector
   * @param {string} classes - Space-separated class names
   */
  function removeClass(element, classes) {
    var _el$classList2;
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    var classArray = classes.split(' ').filter(function (cls) {
      return cls.trim();
    });
    (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(classArray));
  }

  /**
   * Toggle class on element
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to toggle
   * @param {boolean} force - Force add/remove
   */
  function toggleClass(element, className, force) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    return el.classList.toggle(className, force);
  }

  /**
   * Check if element has class
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to check
   * @returns {boolean} - True if element has class
   */
  function hasClass(element, className) {
    var el = typeof element === 'string' ? $(element) : element;
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
  function attr(element, name, value) {
    var el = typeof element === 'string' ? $(element) : element;
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
  function data(element, key, value) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    if (value === undefined) {
      var dataValue = el.dataset[key];
      try {
        return JSON.parse(dataValue);
      } catch (_unused) {
        return dataValue;
      }
    }
    el.dataset[key] = _typeof(value) === 'object' ? JSON.stringify(value) : value;
  }

  /**
   * Set HTML content
   * @param {Element|string} element - Element or selector
   * @param {string} html - HTML content
   */
  function html(element, html) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    el.innerHTML = html;
  }

  /**
   * Append HTML content
   * @param {Element|string} element - Element or selector
   * @param {string} html - HTML content to append
   */
  function append(element, html) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    el.insertAdjacentHTML('beforeend', html);
  }

  /**
   * Prepend HTML content
   * @param {Element|string} element - Element or selector
   * @param {string} html - HTML content to prepend
   */
  function prepend(element, html) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    el.insertAdjacentHTML('afterbegin', html);
  }

  /**
   * Remove element
   * @param {Element|string} element - Element or selector
   */
  function remove(element) {
    var el = typeof element === 'string' ? $(element) : element;
    if (!el) return;
    el.remove();
  }

  /**
   * Find closest ancestor matching selector
   * @param {Element} element - Starting element
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Closest matching element
   */
  function closest(element, selector) {
    return element.closest(selector);
  }

  /**
   * Event System
   * Provides event delegation and handling
   */

  // Store delegated event handlers
  var eventHandlers = new Map();

  /**
   * Add event listener with delegation
   * @param {string} event - Event type
   * @param {string} selector - CSS selector for delegation
   * @param {Function} handler - Event handler function
   */
  function on(event, selector, handler) {
    var events = event.split(' ');
    events.forEach(function (eventType) {
      var key = "".concat(eventType, ":").concat(selector);
      if (!eventHandlers.has(key)) {
        eventHandlers.set(key, new Set());

        // Add delegated event listener to document
        document.addEventListener(eventType, function (e) {
          var target = e.target.closest(selector);
          if (target) {
            var handlers = eventHandlers.get(key);
            if (handlers) {
              handlers.forEach(function (h) {
                return h.call(target, e);
              });
            }
          }
        });
      }
      eventHandlers.get(key).add(handler);
    });
  }

  /**
   * Remove event listeners
   * @param {string} event - Event type
   * @param {string} selector - CSS selector
   * @param {Function} handler - Specific handler to remove (optional)
   */
  function off(event, selector, handler) {
    var events = event.split(' ');
    events.forEach(function (eventType) {
      var key = "".concat(eventType, ":").concat(selector);
      var handlers = eventHandlers.get(key);
      if (handlers) {
        if (handler) {
          handlers.delete(handler);
        } else {
          handlers.clear();
        }
        if (handlers.size === 0) {
          eventHandlers.delete(key);
        }
      }
    });
  }

  /**
   * Add one-time event listener
   * @param {string} event - Event type
   * @param {string} selector - CSS selector
   * @param {Function} handler - Event handler function
   */
  function once(event, selector, handler) {
    var _onceHandler = function onceHandler(e) {
      handler.call(this, e);
      off(event, selector, _onceHandler);
    };
    on(event, selector, _onceHandler);
  }

  /**
   * Trigger custom event
   * @param {Element|string} element - Element or selector
   * @param {string} eventType - Event type
   * @param {any} data - Event data
   */
  function trigger(element, eventType, data) {
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    var event = new CustomEvent(eventType, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
    el.dispatchEvent(event);
  }

  /**
   * DOM ready handler
   * @param {Function} callback - Callback function
   */
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * AJAX Utilities
   * Provides Promise-based HTTP requests
   */

  /**
   * Default options for AJAX requests
   */
  var defaultOptions = {
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
  function ajax(options) {
    var config = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      var isTimedOut = false;
      var timeoutId = setTimeout(function () {
        isTimedOut = true;
        xhr.abort();
        reject(new Error('Request timeout'));
      }, config.timeout);
      xhr.open(config.method, config.url);

      // Set headers
      if (config.headers) {
        Object.entries(config.headers).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          xhr.setRequestHeader(key, value);
        });
      }
      xhr.onload = function () {
        clearTimeout(timeoutId);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            var response = xhr.responseText;
            if (contentType && contentType.includes('application/json')) {
              response = JSON.parse(xhr.responseText);
            }
            resolve(response);
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          reject(new Error("HTTP ".concat(xhr.status, ": ").concat(xhr.statusText)));
        }
      };
      xhr.onerror = function () {
        clearTimeout(timeoutId);
        reject(new Error('Network error'));
      };
      xhr.onabort = function () {
        clearTimeout(timeoutId);
        if (!isTimedOut) {
          reject(new Error('Request aborted'));
        }
      };

      // Send request
      if (config.data) {
        if (config.method === 'GET') {
          // Append data as query string for GET requests
          var params = new URLSearchParams(config.data).toString();
          xhr.open(config.method, "".concat(config.url, "?").concat(params));
          xhr.send();
        } else {
          // Send data as JSON for other methods
          var payload = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
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
  function get(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return ajax(_objectSpread2(_objectSpread2({}, options), {}, {
      method: 'GET',
      url: url
    }));
  }

  /**
   * POST request
   * @param {string} url - Request URL
   * @param {any} data - Request data
   * @param {Object} options - Additional options
   * @returns {Promise} - Promise resolving to response data
   */
  function post(url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return ajax(_objectSpread2(_objectSpread2({}, options), {}, {
      method: 'POST',
      url: url,
      data: data
    }));
  }

  /**
   * PUT request
   * @param {string} url - Request URL
   * @param {any} data - Request data
   * @param {Object} options - Additional options
   * @returns {Promise} - Promise resolving to response data
   */
  function put(url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return ajax(_objectSpread2(_objectSpread2({}, options), {}, {
      method: 'PUT',
      url: url,
      data: data
    }));
  }

  /**
   * DELETE request
   * @param {string} url - Request URL
   * @param {Object} options - Additional options
   * @returns {Promise} - Promise resolving to response data
   */
  function del(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return ajax(_objectSpread2(_objectSpread2({}, options), {}, {
      method: 'DELETE',
      url: url
    }));
  }

  /**
   * Load HTML content into element
   * @param {Element|string} element - Target element or selector
   * @param {string} url - URL to load content from
   * @returns {Promise} - Promise resolving when content is loaded
   */
  function load(element, url) {
    return get(url).then(function (html) {
      var el = typeof element === 'string' ? document.querySelector(element) : element;
      if (el) {
        el.innerHTML = html;
      }
      return html;
    });
  }

  /**
   * Utility Functions
   * Provides helper functions for common tasks
   */

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var later = function later() {
        clearTimeout(timeout);
        func.apply(_this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  function throttle(func, limit) {
    var inThrottle;
    return function executedFunction() {
      if (!inThrottle) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        func.apply(this, args);
        inThrottle = true;
        setTimeout(function () {
          return inThrottle = false;
        }, limit);
      }
    };
  }

  /**
   * Merge objects
   * @param {Object} target - Target object
   * @param {...Object} sources - Source objects
   * @returns {Object} - Merged object
   */
  function extend(target) {
    for (var _len3 = arguments.length, sources = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      sources[_key3 - 1] = arguments[_key3];
    }
    if (!sources.length) return target;
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (var key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
          extend(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return extend.apply(void 0, [target].concat(sources));
  }

  /**
   * Check if value is an object
   * @param {any} item - Value to check
   * @returns {boolean} - True if value is an object
   */
  function isObject(item) {
    return item && _typeof(item) === 'object' && !Array.isArray(item);
  }

  /**
   * Generate unique ID
   * @param {string} prefix - ID prefix
   * @returns {string} - Unique ID
   */
  function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';
    return "".concat(prefix, "_").concat(Math.random().toString(36).substr(2, 9));
  }

  /**
   * Check if element is visible
   * @param {Element} element - Element to check
   * @returns {boolean} - True if element is visible
   */
  function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  /**
   * Get element offset
   * @param {Element} element - Element to get offset for
   * @returns {Object} - Object with top and left properties
   */
  function offset(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }

  /**
   * Animation Module
   * Provides animation utilities using Web Animations API
   */

  /**
   * Fade in animation
   * @param {Element|string} element - Element or selector
   * @param {number} duration - Animation duration in milliseconds
   * @param {Function} callback - Callback function when animation completes
   */
  function fadeIn(element) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var callback = arguments.length > 2 ? arguments[2] : undefined;
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    el.style.display = el.style.display === 'none' ? '' : el.style.display;
    var animation = el.animate([{
      opacity: 0
    }, {
      opacity: 1
    }], {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    if (callback) {
      animation.addEventListener('finish', callback);
    }
    return animation;
  }

  /**
   * Fade out animation
   * @param {Element|string} element - Element or selector
   * @param {number} duration - Animation duration in milliseconds
   * @param {Function} callback - Callback function when animation completes
   */
  function fadeOut(element) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var callback = arguments.length > 2 ? arguments[2] : undefined;
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    var animation = el.animate([{
      opacity: 1
    }, {
      opacity: 0
    }], {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    animation.addEventListener('finish', function () {
      el.style.display = 'none';
      if (callback) callback();
    });
    return animation;
  }

  /**
   * Slide down animation
   * @param {Element|string} element - Element or selector
   * @param {number} duration - Animation duration in milliseconds
   * @param {Function} callback - Callback function when animation completes
   */
  function slideDown(element) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    var callback = arguments.length > 2 ? arguments[2] : undefined;
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    var startHeight = el.offsetHeight;
    el.style.overflow = 'hidden';
    el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
    var endHeight = el.scrollHeight;
    var animation = el.animate([{
      height: "".concat(startHeight, "px")
    }, {
      height: "".concat(endHeight, "px")
    }], {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    animation.addEventListener('finish', function () {
      el.style.height = '';
      el.style.overflow = '';
      if (callback) callback();
    });
    return animation;
  }

  /**
   * Slide up animation
   * @param {Element|string} element - Element or selector
   * @param {number} duration - Animation duration in milliseconds
   * @param {Function} callback - Callback function when animation completes
   */
  function slideUp(element) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    var callback = arguments.length > 2 ? arguments[2] : undefined;
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    var startHeight = el.offsetHeight;
    el.style.overflow = 'hidden';
    var animation = el.animate([{
      height: "".concat(startHeight, "px")
    }, {
      height: '0px'
    }], {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    animation.addEventListener('finish', function () {
      el.style.display = 'none';
      el.style.height = '';
      el.style.overflow = '';
      if (callback) callback();
    });
    return animation;
  }

  /**
   * Custom animation using Web Animations API
   * @param {Element|string} element - Element or selector
   * @param {Object|Array} keyframes - Animation keyframes
   * @param {Object} options - Animation options
   */
  function animate(element, keyframes) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    var defaultOptions = {
      duration: 1000,
      easing: 'ease',
      fill: 'both'
    };
    var config = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    return el.animate(keyframes, config);
  }

  /**
   * Storage Module
   * Provides localStorage and sessionStorage wrappers
   */

  /**
   * LocalStorage wrapper
   */
  var store = {
    /**
     * Set item in localStorage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    set: function set(key, value) {
      try {
        var serializedValue = JSON.stringify(value);
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
    get: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      try {
        var item = localStorage.getItem(key);
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
    remove: function remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('Failed to remove from localStorage:', e);
      }
    },
    /**
     * Clear all items from localStorage
     */
    clear: function clear() {
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
    keys: function keys() {
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
  var session = {
    /**
     * Set item in sessionStorage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    set: function set(key, value) {
      try {
        var serializedValue = JSON.stringify(value);
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
    get: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      try {
        var item = sessionStorage.getItem(key);
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
    remove: function remove(key) {
      try {
        sessionStorage.removeItem(key);
      } catch (e) {
        console.warn('Failed to remove from sessionStorage:', e);
      }
    },
    /**
     * Clear all items from sessionStorage
     */
    clear: function clear() {
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
    keys: function keys() {
      try {
        return Object.keys(sessionStorage);
      } catch (e) {
        console.warn('Failed to get sessionStorage keys:', e);
        return [];
      }
    }
  };

  /**
   * Component System
   * Simple component-based architecture for reusable UI elements
   */
  var Component = /*#__PURE__*/function () {
    function Component(name, definition) {
      var _this = this;
      _classCallCheck(this, Component);
      this.name = name;
      this.template = definition.template || '';
      this.props = definition.props || {};
      this.state = _objectSpread2({}, definition.state) || {};
      this.methods = definition.methods || {};
      this.events = definition.events || {};
      this.lifecycle = definition.lifecycle || {};
      this.element = null;
      this.mounted = false;

      // Bind methods to component instance
      Object.keys(this.methods).forEach(function (methodName) {
        _this.methods[methodName] = _this.methods[methodName].bind(_this);
      });
    }

    /**
     * Render template with state and props
     */
    return _createClass(Component, [{
      key: "render",
      value: function render() {
        var html = this.template;

        // Replace template variables with state/props
        var data = _objectSpread2(_objectSpread2({}, this.props), this.state);
        Object.keys(data).forEach(function (key) {
          var regex = new RegExp("{{".concat(key, "}}"), 'g');
          html = html.replace(regex, data[key]);
        });
        return html;
      }

      /**
       * Update component DOM
       */
    }, {
      key: "update",
      value: function update() {
        var _this2 = this;
        if (!this.element) return;

        // Clean up existing event handlers
        if (this._eventHandlers) {
          this._eventHandlers.forEach(function (_ref) {
            var eventType = _ref.eventType,
              handler = _ref.handler;
            _this2.element.removeEventListener(eventType, handler, true);
          });
          this._eventHandlers = [];
        }
        var newHTML = this.render();
        this.element.innerHTML = newHTML;
        this.bindEvents();
      }

      /**
       * Bind component events
       */
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this3 = this;
        if (!this.element) return;
        Object.keys(this.events).forEach(function (eventKey) {
          var parts = eventKey.trim().split(/\s+/);
          var eventType = parts[0];
          var selector = parts.slice(1).join(' ');
          var methodName = _this3.events[eventKey];
          var method = _this3.methods[methodName];
          if (method && selector && eventType) {
            // Create bound handler for this specific event
            var boundHandler = function boundHandler(e) {
              var target = e.target.closest(selector);
              if (target && _this3.element.contains(target)) {
                method.call(_this3, e);
              }
            };

            // Store handler for potential cleanup
            _this3._eventHandlers = _this3._eventHandlers || [];
            _this3._eventHandlers.push({
              eventType: eventType,
              handler: boundHandler
            });

            // Add event listener to the component element
            _this3.element.addEventListener(eventType, boundHandler, true);
          }
        });
      }

      /**
       * Mount component to DOM element
       */
    }, {
      key: "mount",
      value: function mount(container) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        // Merge props
        this.props = _objectSpread2(_objectSpread2({}, this.props), props);

        // Call lifecycle hook
        if (this.lifecycle.created) {
          this.lifecycle.created.call(this);
        }

        // Create element
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.render();
        this.element = wrapper.firstElementChild;

        // Append to container
        if (typeof container === 'string') {
          container = document.querySelector(container);
        }
        container.appendChild(this.element);

        // Bind events
        this.bindEvents();
        this.mounted = true;

        // Call lifecycle hook
        if (this.lifecycle.mounted) {
          this.lifecycle.mounted.call(this);
        }
        return this;
      }

      /**
       * Unmount component
       */
    }, {
      key: "unmount",
      value: function unmount() {
        var _this4 = this;
        if (this.lifecycle.beforeDestroy) {
          this.lifecycle.beforeDestroy.call(this);
        }

        // Clean up event listeners
        if (this._eventHandlers && this.element) {
          this._eventHandlers.forEach(function (_ref2) {
            var eventType = _ref2.eventType,
              handler = _ref2.handler;
            _this4.element.removeEventListener(eventType, handler, true);
          });
          this._eventHandlers = [];
        }
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.mounted = false;
        if (this.lifecycle.destroyed) {
          this.lifecycle.destroyed.call(this);
        }
      }

      /**
       * Set state and trigger update
       */
    }, {
      key: "setState",
      value: function setState(newState) {
        this.state = _objectSpread2(_objectSpread2({}, this.state), newState);
        this.update();
      }

      /**
       * Set props and trigger update
       */
    }, {
      key: "setProps",
      value: function setProps(newProps) {
        this.props = _objectSpread2(_objectSpread2({}, this.props), newProps);
        this.update();
      }
    }]);
  }(); // Global component registry
  var components = new Map();

  /**
   * Register a component
   */
  function component(name, definition) {
    components.set(name, definition);
    return definition;
  }

  /**
   * Mount a component instance
   */
  function mount(container, componentName) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var definition = components.get(componentName);
    if (!definition) {
      throw new Error("Component \"".concat(componentName, "\" not found"));
    }
    var instance = new Component(componentName, definition);
    return instance.mount(container, props);
  }

  /**
   * Create component instance without mounting
   */
  function create(componentName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var definition = components.get(componentName);
    if (!definition) {
      throw new Error("Component \"".concat(componentName, "\" not found"));
    }
    var instance = new Component(componentName, definition);
    // Set initial props
    instance.props = _objectSpread2(_objectSpread2({}, instance.props), props);
    return instance;
  }

  /**
   * Get registered component
   */
  function getComponent(name) {
    return components.get(name);
  }

  /**
   * List all registered components
   */
  function listComponents() {
    return Array.from(components.keys());
  }

  /**
   * Event Delegation System
   * Advanced event delegation with namespaces and scoped handlers
   */
  var DelegationNamespace = /*#__PURE__*/function () {
    function DelegationNamespace(name) {
      var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      _classCallCheck(this, DelegationNamespace);
      this.name = name;
      this.container = container;
      this.handlers = new Map();
      this.active = true;
    }

    /**
     * Add event handler to namespace
     */
    return _createClass(DelegationNamespace, [{
      key: "on",
      value: function on(event, selector, handler) {
        var key = "".concat(event, ":").concat(selector);
        if (!this.handlers.has(key)) {
          this.handlers.set(key, new Set());
        }
        this.handlers.get(key).add(handler);

        // Add actual event listener if this is the first handler for this event/selector combo
        if (this.handlers.get(key).size === 1) {
          this.attachListener(event, selector);
        }
        return this;
      }

      /**
       * Remove event handler from namespace
       */
    }, {
      key: "off",
      value: function off(event, selector) {
        var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var key = "".concat(event, ":").concat(selector);
        if (!this.handlers.has(key)) {
          return this;
        }
        if (handler) {
          // Remove specific handler
          this.handlers.get(key).delete(handler);

          // If no handlers left, remove the event listener
          if (this.handlers.get(key).size === 0) {
            this.detachListener(event, selector);
            this.handlers.delete(key);
          }
        } else {
          // Remove all handlers for this event/selector
          this.detachListener(event, selector);
          this.handlers.delete(key);
        }
        return this;
      }

      /**
       * Add one-time event handler
       */
    }, {
      key: "once",
      value: function once(event, selector, handler) {
        var _this = this;
        var _onceHandler = function onceHandler(e) {
          handler.call(e.target, e);
          _this.off(event, selector, _onceHandler);
        };
        return this.on(event, selector, _onceHandler);
      }

      /**
       * Trigger custom event on matching elements
       */
    }, {
      key: "trigger",
      value: function trigger(selector, eventType) {
        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var elements = this.container.querySelectorAll(selector);
        elements.forEach(function (element) {
          var event = new CustomEvent(eventType, {
            detail: data,
            bubbles: true,
            cancelable: true
          });
          element.dispatchEvent(event);
        });
        return this;
      }

      /**
       * Attach actual DOM event listener
       */
    }, {
      key: "attachListener",
      value: function attachListener(event, selector) {
        var _this2 = this;
        var key = "".concat(event, ":").concat(selector);
        var delegatedHandler = function delegatedHandler(e) {
          if (!_this2.active) return;
          var target = e.target.closest(selector);
          if (target && _this2.container.contains(target)) {
            var handlers = _this2.handlers.get(key);
            if (handlers) {
              handlers.forEach(function (handler) {
                try {
                  handler.call(target, e);
                } catch (error) {
                  // Re-throw error to be handled by global error handlers
                  setTimeout(function () {
                    throw new Error("Delegation handler error in ".concat(_this2.name, ": ").concat(error.message));
                  }, 0);
                }
              });
            }
          }
        };

        // Store the actual handler for later removal
        this._actualHandlers = this._actualHandlers || new Map();
        this._actualHandlers.set(key, delegatedHandler);
        this.container.addEventListener(event, delegatedHandler, true);
      }

      /**
       * Detach DOM event listener
       */
    }, {
      key: "detachListener",
      value: function detachListener(event, selector) {
        var key = "".concat(event, ":").concat(selector);
        if (this._actualHandlers && this._actualHandlers.has(key)) {
          var handler = this._actualHandlers.get(key);
          this.container.removeEventListener(event, handler, true);
          this._actualHandlers.delete(key);
        }
      }

      /**
       * Pause all event handling for this namespace
       */
    }, {
      key: "pause",
      value: function pause() {
        this.active = false;
        return this;
      }

      /**
       * Resume event handling for this namespace
       */
    }, {
      key: "resume",
      value: function resume() {
        this.active = true;
        return this;
      }

      /**
       * Check if namespace is active
       */
    }, {
      key: "isActive",
      value: function isActive() {
        return this.active;
      }

      /**
       * Get all handlers for debugging
       */
    }, {
      key: "getHandlers",
      value: function getHandlers() {
        var result = {};
        this.handlers.forEach(function (handlers, key) {
          result[key] = Array.from(handlers);
        });
        return result;
      }

      /**
       * Destroy namespace and remove all handlers
       */
    }, {
      key: "destroy",
      value: function destroy() {
        var _this3 = this;
        // Remove all event listeners
        this.handlers.forEach(function (handlers, key) {
          var _key$split = key.split(':'),
            _key$split2 = _slicedToArray(_key$split, 2),
            event = _key$split2[0],
            selector = _key$split2[1];
          _this3.detachListener(event, selector);
        });

        // Clear maps
        this.handlers.clear();
        if (this._actualHandlers) {
          this._actualHandlers.clear();
        }
        this.active = false;

        // Remove from global registry
        if (namespaces.has(this.name)) {
          namespaces.delete(this.name);
        }
      }
    }]);
  }(); // Global namespace registry
  var namespaces = new Map();

  /**
   * Create or get event delegation namespace
   */
  function delegate(name) {
    var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
    var namespace;
    if (namespaces.has(name)) {
      namespace = namespaces.get(name);
    } else {
      namespace = new DelegationNamespace(name, container);
      namespaces.set(name, namespace);
    }

    // Add handlers if provided
    Object.keys(handlers).forEach(function (eventSelector) {
      var _eventSelector$split = eventSelector.split(' '),
        _eventSelector$split2 = _slicedToArray(_eventSelector$split, 2),
        event = _eventSelector$split2[0],
        selector = _eventSelector$split2[1];
      var handler = handlers[eventSelector];
      if (event && selector && typeof handler === 'function') {
        namespace.on(event, selector, handler);
      }
    });
    return namespace;
  }

  /**
   * Get existing namespace
   */
  function getNamespace(name) {
    return namespaces.get(name);
  }

  /**
   * Destroy namespace
   */
  function destroyNamespace(name) {
    var namespace = namespaces.get(name);
    if (namespace) {
      namespace.destroy();
    }
    return !namespaces.has(name);
  }

  /**
   * List all active namespaces
   */
  function listNamespaces() {
    return Array.from(namespaces.keys());
  }

  /**
   * Pause all namespaces
   */
  function pauseAll() {
    namespaces.forEach(function (namespace) {
      return namespace.pause();
    });
  }

  /**
   * Resume all namespaces
   */
  function resumeAll() {
    namespaces.forEach(function (namespace) {
      return namespace.resume();
    });
  }

  /**
   * Destroy all namespaces
   */
  function destroyAll() {
    var names = Array.from(namespaces.keys());
    names.forEach(function (name) {
      return destroyNamespace(name);
    });
    namespaces.clear();
  }

  /**
   * Create scoped delegation for a specific container
   */
  function scope(container) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "scope_".concat(Date.now());
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!container) {
      throw new Error('Container element not found');
    }
    return delegate(name, {}, container);
  }

  /**
   * Advanced delegation with middleware support
   */
  function advanced(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$container = options.container,
      container = _options$container === void 0 ? document : _options$container,
      _options$middleware = options.middleware,
      middleware = _options$middleware === void 0 ? [] : _options$middleware,
      _options$errorHandler = options.errorHandler,
      errorHandler = _options$errorHandler === void 0 ? null : _options$errorHandler;
    var namespace = delegate(name, {}, container);

    // Override the on method to support middleware
    var originalOn = namespace.on;
    namespace.on = function (event, selector, handler) {
      var _this4 = this;
      var wrappedHandler = function wrappedHandler(e) {
        // Run middleware chain
        var index = 0;
        var _next = function next() {
          if (index < middleware.length) {
            var middleware_fn = middleware[index++];
            try {
              middleware_fn(e, _next);
            } catch (error) {
              if (errorHandler) {
                errorHandler(error, e);
              } else {
                // Re-throw error to be handled by global error handlers
                setTimeout(function () {
                  throw new Error("Middleware error: ".concat(error.message));
                }, 0);
              }
            }
          } else {
            // All middleware passed, run original handler
            try {
              handler.call(_this4, e);
            } catch (error) {
              if (errorHandler) {
                errorHandler(error, e);
              } else {
                // Re-throw error to be handled by global error handlers
                setTimeout(function () {
                  throw new Error("Handler error: ".concat(error.message));
                }, 0);
              }
            }
          }
        };
        _next();
      };
      return originalOn.call(this, event, selector, wrappedHandler);
    };
    return namespace;
  }

  /**
   * MicroUI - Main Entry Point
   * Exports all library functionality
   */


  /**
   * MicroUI Library
   * Main library object containing all functionality
   */
  var MicroUI = {
    // DOM utilities
    $: $,
    $$: $$,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    hasClass: hasClass,
    attr: attr,
    data: data,
    html: html,
    append: append,
    prepend: prepend,
    remove: remove,
    closest: closest,
    // Event system
    on: on,
    off: off,
    once: once,
    trigger: trigger,
    ready: ready,
    // AJAX utilities
    ajax: ajax,
    get: get,
    post: post,
    put: put,
    delete: del,
    // 'delete' is a reserved word
    load: load,
    // Animation
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    slideDown: slideDown,
    slideUp: slideUp,
    animate: animate,
    // Storage
    store: store,
    session: session,
    // Component system
    component: component,
    mount: mount,
    create: create,
    getComponent: getComponent,
    listComponents: listComponents,
    // Delegation system
    delegate: delegate,
    getNamespace: getNamespace,
    destroyNamespace: destroyNamespace,
    listNamespaces: listNamespaces,
    pauseAll: pauseAll,
    resumeAll: resumeAll,
    destroyAll: destroyAll,
    scope: scope,
    advanced: advanced,
    // Utilities
    debounce: debounce,
    throttle: throttle,
    extend: extend,
    uniqueId: uniqueId,
    isVisible: isVisible,
    offset: offset,
    // Version
    version: '1.0.0'
  };

  // For UMD build
  if (typeof window !== 'undefined') {
    window.MicroUI = MicroUI;
  }

  return MicroUI;

}));
