/**
 * Component System
 * Simple component-based architecture for reusable UI elements
 */

class Component {
  constructor(name, definition) {
    this.name = name;
    this.template = definition.template || '';
    this.props = definition.props || {};
    this.state = { ...definition.state } || {};
    this.methods = definition.methods || {};
    this.events = definition.events || {};
    this.lifecycle = definition.lifecycle || {};
    this.element = null;
    this.mounted = false;
    
    // Bind methods to component instance
    Object.keys(this.methods).forEach(methodName => {
      this.methods[methodName] = this.methods[methodName].bind(this);
    });
  }
  
  /**
   * Render template with state and props
   */
  render() {
    let html = this.template;
    
    // Replace template variables with state/props
    const data = { ...this.props, ...this.state };
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, data[key]);
    });
    
    return html;
  }
  
  /**
   * Update component DOM
   */
  update() {
    if (!this.element) return;
    
    // Clean up existing event handlers
    if (this._eventHandlers) {
      this._eventHandlers.forEach(({ eventType, handler }) => {
        this.element.removeEventListener(eventType, handler, true);
      });
      this._eventHandlers = [];
    }
    
    const newHTML = this.render();
    this.element.innerHTML = newHTML;
    this.bindEvents();
  }
  
  /**
   * Bind component events
   */
  bindEvents() {
    if (!this.element) return;
    
    Object.keys(this.events).forEach(eventKey => {
      const parts = eventKey.trim().split(/\s+/);
      const eventType = parts[0];
      const selector = parts.slice(1).join(' ');
      const methodName = this.events[eventKey];
      const method = this.methods[methodName];
      
      if (method && selector && eventType) {
        // Create bound handler for this specific event
        const boundHandler = (e) => {
          const target = e.target.closest(selector);
          if (target && this.element.contains(target)) {
            method.call(this, e);
          }
        };
        
        // Store handler for potential cleanup
        this._eventHandlers = this._eventHandlers || [];
        this._eventHandlers.push({ eventType, handler: boundHandler });
        
        // Add event listener to the component element
        this.element.addEventListener(eventType, boundHandler, true);
      }
    });
  }
  
  /**
   * Mount component to DOM element
   */
  mount(container, props = {}) {
    // Merge props
    this.props = { ...this.props, ...props };
    
    // Call lifecycle hook
    if (this.lifecycle.created) {
      this.lifecycle.created.call(this);
    }
    
    // Create element
    const wrapper = document.createElement('div');
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
  unmount() {
    if (this.lifecycle.beforeDestroy) {
      this.lifecycle.beforeDestroy.call(this);
    }
    
    // Clean up event listeners
    if (this._eventHandlers && this.element) {
      this._eventHandlers.forEach(({ eventType, handler }) => {
        this.element.removeEventListener(eventType, handler, true);
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
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }
  
  /**
   * Set props and trigger update
   */
  setProps(newProps) {
    this.props = { ...this.props, ...newProps };
    this.update();
  }
}

// Global component registry
const components = new Map();

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
function mount(container, componentName, props = {}) {
  const definition = components.get(componentName);
  if (!definition) {
    throw new Error(`Component "${componentName}" not found`);
  }
  
  const instance = new Component(componentName, definition);
  return instance.mount(container, props);
}

/**
 * Create component instance without mounting
 */
function create(componentName, props = {}) {
  const definition = components.get(componentName);
  if (!definition) {
    throw new Error(`Component "${componentName}" not found`);
  }
  
  const instance = new Component(componentName, definition);
  // Set initial props
  instance.props = { ...instance.props, ...props };
  
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

export {
  Component,
  component,
  mount,
  create,
  getComponent,
  listComponents
};
