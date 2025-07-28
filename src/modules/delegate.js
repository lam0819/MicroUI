/**
 * Event Delegation System
 * Advanced event delegation with namespaces and scoped handlers
 */

class DelegationNamespace {
  constructor(name, container = document) {
    this.name = name;
    this.container = container;
    this.handlers = new Map();
    this.active = true;
  }
  
  /**
   * Add event handler to namespace
   */
  on(event, selector, handler) {
    const key = `${event}:${selector}`;
    
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
  off(event, selector, handler = null) {
    const key = `${event}:${selector}`;
    
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
  once(event, selector, handler) {
    const onceHandler = (e) => {
      handler.call(e.target, e);
      this.off(event, selector, onceHandler);
    };
    
    return this.on(event, selector, onceHandler);
  }
  
  /**
   * Trigger custom event on matching elements
   */
  trigger(selector, eventType, data = {}) {
    const elements = this.container.querySelectorAll(selector);
    
    elements.forEach(element => {
      const event = new CustomEvent(eventType, {
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
  attachListener(event, selector) {
    const key = `${event}:${selector}`;
    
    const delegatedHandler = (e) => {
      if (!this.active) return;
      
      const target = e.target.closest(selector);
      if (target && this.container.contains(target)) {
        const handlers = this.handlers.get(key);
        if (handlers) {
          handlers.forEach(handler => {
            try {
              handler.call(target, e);
            } catch (error) {
              // Re-throw error to be handled by global error handlers
              setTimeout(() => {
                throw new Error(`Delegation handler error in ${this.name}: ${error.message}`);
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
  detachListener(event, selector) {
    const key = `${event}:${selector}`;
    
    if (this._actualHandlers && this._actualHandlers.has(key)) {
      const handler = this._actualHandlers.get(key);
      this.container.removeEventListener(event, handler, true);
      this._actualHandlers.delete(key);
    }
  }
  
  /**
   * Pause all event handling for this namespace
   */
  pause() {
    this.active = false;
    return this;
  }
  
  /**
   * Resume event handling for this namespace
   */
  resume() {
    this.active = true;
    return this;
  }
  
  /**
   * Check if namespace is active
   */
  isActive() {
    return this.active;
  }
  
  /**
   * Get all handlers for debugging
   */
  getHandlers() {
    const result = {};
    this.handlers.forEach((handlers, key) => {
      result[key] = Array.from(handlers);
    });
    return result;
  }
  
  /**
   * Destroy namespace and remove all handlers
   */
  destroy() {
    // Remove all event listeners
    this.handlers.forEach((handlers, key) => {
      const [event, selector] = key.split(':');
      this.detachListener(event, selector);
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
}

// Global namespace registry
const namespaces = new Map();

/**
 * Create or get event delegation namespace
 */
function delegate(name, handlers = {}, container = document) {
  let namespace;
  
  if (namespaces.has(name)) {
    namespace = namespaces.get(name);
  } else {
    namespace = new DelegationNamespace(name, container);
    namespaces.set(name, namespace);
  }
  
  // Add handlers if provided
  Object.keys(handlers).forEach(eventSelector => {
    const [event, selector] = eventSelector.split(' ');
    const handler = handlers[eventSelector];
    
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
  const namespace = namespaces.get(name);
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
  namespaces.forEach(namespace => namespace.pause());
}

/**
 * Resume all namespaces
 */
function resumeAll() {
  namespaces.forEach(namespace => namespace.resume());
}

/**
 * Destroy all namespaces
 */
function destroyAll() {
  const names = Array.from(namespaces.keys());
  names.forEach(name => destroyNamespace(name));
  namespaces.clear();
}

/**
 * Create scoped delegation for a specific container
 */
function scope(container, name = `scope_${Date.now()}`) {
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
function advanced(name, options = {}) {
  const {
    container = document,
    middleware = [],
    errorHandler = null
  } = options;
  
  const namespace = delegate(name, {}, container);
  
  // Override the on method to support middleware
  const originalOn = namespace.on;
  namespace.on = function(event, selector, handler) {
    const wrappedHandler = (e) => {
      // Run middleware chain
      let index = 0;
      
      const next = () => {
        if (index < middleware.length) {
          const middleware_fn = middleware[index++];
          try {
            middleware_fn(e, next);
          } catch (error) {
            if (errorHandler) {
              errorHandler(error, e);
            } else {
              // Re-throw error to be handled by global error handlers
              setTimeout(() => {
                throw new Error(`Middleware error: ${error.message}`);
              }, 0);
            }
          }
        } else {
          // All middleware passed, run original handler
          try {
            handler.call(this, e);
          } catch (error) {
            if (errorHandler) {
              errorHandler(error, e);
            } else {
              // Re-throw error to be handled by global error handlers
              setTimeout(() => {
                throw new Error(`Handler error: ${error.message}`);
              }, 0);
            }
          }
        }
      };
      
      next();
    };
    
    return originalOn.call(this, event, selector, wrappedHandler);
  };
  
  return namespace;
}

export {
  DelegationNamespace,
  delegate,
  getNamespace,
  destroyNamespace,
  listNamespaces,
  pauseAll,
  resumeAll,
  destroyAll,
  scope,
  advanced
};
