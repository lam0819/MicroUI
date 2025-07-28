/**
 * Event System
 * Provides event delegation and handling
 */

// Store delegated event handlers
const eventHandlers = new Map();

/**
 * Add event listener with delegation
 * @param {string} event - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} handler - Event handler function
 */
export function on(event, selector, handler) {
  const events = event.split(' ');
  
  events.forEach(eventType => {
    const key = `${eventType}:${selector}`;
    
    if (!eventHandlers.has(key)) {
      eventHandlers.set(key, new Set());
      
      // Add delegated event listener to document
      document.addEventListener(eventType, (e) => {
        const target = e.target.closest(selector);
        if (target) {
          const handlers = eventHandlers.get(key);
          if (handlers) {
            handlers.forEach(h => h.call(target, e));
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
export function off(event, selector, handler) {
  const events = event.split(' ');
  
  events.forEach(eventType => {
    const key = `${eventType}:${selector}`;
    const handlers = eventHandlers.get(key);
    
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
export function once(event, selector, handler) {
  const onceHandler = function(e) {
    handler.call(this, e);
    off(event, selector, onceHandler);
  };
  
  on(event, selector, onceHandler);
}

/**
 * Trigger custom event
 * @param {Element|string} element - Element or selector
 * @param {string} eventType - Event type
 * @param {any} data - Event data
 */
export function trigger(element, eventType, data) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const event = new CustomEvent(eventType, {
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
export function ready(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}
