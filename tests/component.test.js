/**
 * Component System Tests
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import MicroUI from '../src/index.js';
import { JSDOM } from 'jsdom';

describe('Component System', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>');
    document = dom.window.document;
    window = dom.window;
    
    global.document = document;
    global.window = window;
    global.Element = window.Element;
    global.HTMLElement = window.HTMLElement;
    global.CustomEvent = window.CustomEvent;
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.Element;
    delete global.HTMLElement;
    delete global.CustomEvent;
  });

  describe('component registration', () => {
    it('should register a component', () => {
      const definition = {
        template: '<div>Hello World</div>',
        state: { count: 0 }
      };

      MicroUI.component('test-component', definition);
      const retrieved = MicroUI.getComponent('test-component');
      
      expect(retrieved).toBeDefined();
      expect(retrieved.template).toBe('<div>Hello World</div>');
    });

    it('should list registered components', () => {
      MicroUI.component('comp1', { template: '<div>1</div>' });
      MicroUI.component('comp2', { template: '<div>2</div>' });
      
      const components = MicroUI.listComponents();
      expect(components).toContain('comp1');
      expect(components).toContain('comp2');
    });
  });

  describe('component mounting', () => {
    it('should mount component to container', () => {
      MicroUI.component('simple', {
        template: '<div class="simple">Simple Component</div>',
        state: { message: 'Hello' }
      });

      const container = document.getElementById('app');
      const instance = MicroUI.mount('#app', 'simple');
      
      expect(container.children.length).toBe(1);
      expect(container.querySelector('.simple')).toBeTruthy();
      expect(instance.mounted).toBe(true);
    });

    it('should mount with initial props', () => {
      MicroUI.component('greeting', {
        template: '<div>Hello {{name}}!</div>',
        props: { name: 'World' }
      });

      MicroUI.mount('#app', 'greeting', { name: 'MicroUI' });
      
      const container = document.getElementById('app');
      expect(container.textContent).toContain('Hello MicroUI!');
    });
  });

  describe('component instance', () => {
    let instance;

    beforeEach(() => {
      MicroUI.component('test', {
        template: '<div>Count: {{count}}, Name: {{name}}</div>',
        state: { count: 0 },
        props: { name: 'Test' }
      });

      instance = MicroUI.mount('#app', 'test');
    });

    it('should update state and re-render', () => {
      expect(document.querySelector('div').textContent).toBe('Count: 0, Name: Test');
      
      instance.setState({ count: 5 });
      
      expect(document.querySelector('div').textContent).toBe('Count: 5, Name: Test');
    });

    it('should update props and re-render', () => {
      expect(document.querySelector('div').textContent).toBe('Count: 0, Name: Test');
      
      instance.setProps({ name: 'Updated' });
      
      expect(document.querySelector('div').textContent).toBe('Count: 0, Name: Updated');
    });

    it('should unmount properly', () => {
      const container = document.getElementById('app');
      expect(container.children.length).toBe(1);
      
      instance.unmount();
      
      expect(container.children.length).toBe(0);
      expect(instance.mounted).toBe(false);
    });
  });
});
