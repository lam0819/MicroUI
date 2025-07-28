/**
 * Delegation System Tests
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import MicroUI from '../src/index.js';

// Setup JSDOM
import { JSDOM } from 'jsdom';

describe('Delegation System', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="container">
            <button class="btn" data-action="test">Button 1</button>
            <button class="btn" data-action="other">Button 2</button>
            <div class="content">
              <span class="text">Text content</span>
            </div>
          </div>
        </body>
      </html>
    `);
    document = dom.window.document;
    window = dom.window;
    
    // Mock global objects
    global.document = document;
    global.window = window;
    global.Element = window.Element;
    global.HTMLElement = window.HTMLElement;
    global.CustomEvent = window.CustomEvent;
  });

  afterEach(() => {
    // Clean up all namespaces
    MicroUI.destroyAll();
    
    // Clean up globals
    delete global.document;
    delete global.window;
    delete global.Element;
    delete global.HTMLElement;
    delete global.CustomEvent;
  });

  describe('delegate()', () => {
    it('should create delegation namespace', () => {
      const ns = MicroUI.delegate('test');
      
      expect(ns).toBeDefined();
      expect(ns.name).toBe('test');
      expect(MicroUI.listNamespaces()).toContain('test');
    });

    it('should create namespace with initial handlers', () => {
      const handler = jest.fn();
      MicroUI.delegate('test', {
        'click .btn': handler
      });
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(handler).toHaveBeenCalled();
    });

    it('should return existing namespace if name already exists', () => {
      const ns1 = MicroUI.delegate('same-name');
      const ns2 = MicroUI.delegate('same-name');
      
      expect(ns1).toBe(ns2);
    });
  });

  describe('Namespace methods', () => {
    let namespace;
    let handler;

    beforeEach(() => {
      handler = jest.fn();
      namespace = MicroUI.delegate('test');
    });

    it('should add event handlers with on()', () => {
      namespace.on('click', '.btn', handler);
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(handler).toHaveBeenCalled();
    });

    it('should remove specific handlers with off()', () => {
      const handler2 = jest.fn();
      
      namespace.on('click', '.btn', handler);
      namespace.on('click', '.btn', handler2);
      
      // Remove specific handler
      namespace.off('click', '.btn', handler);
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(handler).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });

    it('should remove all handlers for event/selector with off()', () => {
      const handler2 = jest.fn();
      
      namespace.on('click', '.btn', handler);
      namespace.on('click', '.btn', handler2);
      
      // Remove all handlers
      namespace.off('click', '.btn');
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(handler).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });

    it('should handle one-time events with once()', () => {
      namespace.once('click', '.btn', handler);
      
      const button = document.querySelector('.btn');
      button.click();
      button.click(); // Second click
      
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should trigger custom events', () => {
      namespace.on('customEvent', '.btn', handler);
      namespace.trigger('.btn', 'customEvent', { test: 'data' });
      
      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.detail).toEqual({ test: 'data' });
    });
  });

  describe('Namespace control', () => {
    let namespace;
    let handler;

    beforeEach(() => {
      handler = jest.fn();
      namespace = MicroUI.delegate('test');
      namespace.on('click', '.btn', handler);
    });

    it('should pause and resume namespace', () => {
      const button = document.querySelector('.btn');
      
      // Normal operation
      button.click();
      expect(handler).toHaveBeenCalledTimes(1);
      
      // Pause
      namespace.pause();
      expect(namespace.isActive()).toBe(false);
      
      button.click();
      expect(handler).toHaveBeenCalledTimes(1); // Still 1, not called again
      
      // Resume
      namespace.resume();
      expect(namespace.isActive()).toBe(true);
      
      button.click();
      expect(handler).toHaveBeenCalledTimes(2); // Called again
    });

    it('should destroy namespace', () => {
      expect(MicroUI.listNamespaces()).toContain('test');
      
      namespace.destroy();
      
      expect(MicroUI.listNamespaces()).not.toContain('test');
      expect(namespace.isActive()).toBe(false);
      
      // Events should not fire
      const button = document.querySelector('.btn');
      button.click();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Global namespace management', () => {
    beforeEach(() => {
      MicroUI.delegate('ns1');
      MicroUI.delegate('ns2');
      MicroUI.delegate('ns3');
    });

    it('should list all namespaces', () => {
      const namespaces = MicroUI.listNamespaces();
      expect(namespaces).toContain('ns1');
      expect(namespaces).toContain('ns2');
      expect(namespaces).toContain('ns3');
    });

    it('should get existing namespace', () => {
      const ns = MicroUI.getNamespace('ns1');
      expect(ns).toBeDefined();
      expect(ns.name).toBe('ns1');
    });

    it('should destroy specific namespace', () => {
      expect(MicroUI.destroyNamespace('ns2')).toBe(true);
      expect(MicroUI.listNamespaces()).not.toContain('ns2');
      expect(MicroUI.listNamespaces()).toContain('ns1');
      expect(MicroUI.listNamespaces()).toContain('ns3');
    });

    it('should pause and resume all namespaces', () => {
      MicroUI.pauseAll();
      
      MicroUI.listNamespaces().forEach(name => {
        const ns = MicroUI.getNamespace(name);
        expect(ns.isActive()).toBe(false);
      });
      
      MicroUI.resumeAll();
      
      MicroUI.listNamespaces().forEach(name => {
        const ns = MicroUI.getNamespace(name);
        expect(ns.isActive()).toBe(true);
      });
    });

    it('should destroy all namespaces', () => {
      expect(MicroUI.listNamespaces().length).toBeGreaterThan(0);
      
      MicroUI.destroyAll();
      
      expect(MicroUI.listNamespaces().length).toBe(0);
    });
  });

  describe('Scoped delegation', () => {
    it('should create scoped delegation for container', () => {
      const scope = MicroUI.scope('#container', 'scoped-test');
      expect(scope.name).toBe('scoped-test');
      expect(scope.container).toBe(document.getElementById('container'));
    });

    it('should only handle events within scope', () => {
      // Add button outside container
      document.body.innerHTML += '<button class="btn outside">Outside</button>';
      
      const handler = jest.fn();
      const scope = MicroUI.scope('#container');
      scope.on('click', '.btn', handler);
      
      // Click inside container
      document.querySelector('#container .btn').click();
      expect(handler).toHaveBeenCalledTimes(1);
      
      // Click outside container
      document.querySelector('.outside').click();
      expect(handler).toHaveBeenCalledTimes(1); // Still 1, not called for outside
    });
  });

  describe('Advanced delegation with middleware', () => {
    it('should support middleware chain', () => {
      const middleware1 = jest.fn((e, next) => next());
      const middleware2 = jest.fn((e, next) => next());
      const handler = jest.fn();
      
      const ns = MicroUI.advanced('advanced-test', {
        middleware: [middleware1, middleware2]
      });
      
      ns.on('click', '.btn', handler);
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(middleware1).toHaveBeenCalled();
      expect(middleware2).toHaveBeenCalled();
      expect(handler).toHaveBeenCalled();
    });

    it('should handle middleware errors with custom error handler', () => {
      const errorHandler = jest.fn();
      const failingMiddleware = jest.fn(() => {
        throw new Error('Middleware error');
      });
      const handler = jest.fn();
      
      const ns = MicroUI.advanced('error-test', {
        middleware: [failingMiddleware],
        errorHandler
      });
      
      ns.on('click', '.btn', handler);
      
      const button = document.querySelector('.btn');
      button.click();
      
      expect(failingMiddleware).toHaveBeenCalled();
      expect(errorHandler).toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalled(); // Should not reach handler
    });
  });
});
