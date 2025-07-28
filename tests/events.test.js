import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { on, off, once, trigger, ready } from '../src/core/events.js';

describe('Event System', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Clear any existing event handlers
    document.removeEventListener('click', () => {});
  });

  describe('Event delegation', () => {
    it('should handle delegated click events', (done) => {
      document.body.innerHTML = '<button class="test-btn">Click me</button>';
      
      on('click', '.test-btn', function(e) {
        expect(this.textContent).toBe('Click me');
        expect(e.type).toBe('click');
        done();
      });
      
      const button = document.querySelector('.test-btn');
      button.click();
    });

    it('should handle multiple event types', (done) => {
      document.body.innerHTML = '<div class="test-div">Hover me</div>';
      let eventCount = 0;
      
      on('mouseenter mouseleave', '.test-div', function(e) {
        eventCount++;
        if (eventCount === 2) {
          done();
        }
      });
      
      const div = document.querySelector('.test-div');
      div.dispatchEvent(new Event('mouseenter', { bubbles: true }));
      div.dispatchEvent(new Event('mouseleave', { bubbles: true }));
    });

    it('should not trigger for non-matching selectors', () => {
      document.body.innerHTML = '<button class="other-btn">Other</button>';
      let called = false;
      
      on('click', '.test-btn', () => {
        called = true;
      });
      
      const button = document.querySelector('.other-btn');
      button.click();
      
      expect(called).toBe(false);
    });
  });

  describe('Event removal', () => {
    it('should remove specific event handler', () => {
      document.body.innerHTML = '<button class="test-btn">Click me</button>';
      let callCount = 0;
      
      const handler = () => {
        callCount++;
      };
      
      on('click', '.test-btn', handler);
      
      const button = document.querySelector('.test-btn');
      button.click();
      expect(callCount).toBe(1);
      
      off('click', '.test-btn', handler);
      button.click();
      expect(callCount).toBe(1); // Should not increase
    });

    it('should remove all handlers for event/selector', () => {
      document.body.innerHTML = '<button class="test-btn">Click me</button>';
      let callCount = 0;
      
      on('click', '.test-btn', () => callCount++);
      on('click', '.test-btn', () => callCount++);
      
      const button = document.querySelector('.test-btn');
      button.click();
      expect(callCount).toBe(2);
      
      off('click', '.test-btn');
      button.click();
      expect(callCount).toBe(2); // Should not increase
    });
  });

  describe('One-time events', () => {
    it('should trigger once only', () => {
      document.body.innerHTML = '<button class="test-btn">Click me</button>';
      let callCount = 0;
      
      once('click', '.test-btn', () => {
        callCount++;
      });
      
      const button = document.querySelector('.test-btn');
      button.click();
      button.click();
      button.click();
      
      expect(callCount).toBe(1);
    });
  });

  describe('Custom events', () => {
    it('should trigger custom events', (done) => {
      document.body.innerHTML = '<div class="test-div"></div>';
      
      on('customEvent', '.test-div', function(e) {
        expect(e.type).toBe('customEvent');
        expect(e.detail).toEqual({ message: 'Hello' });
        done();
      });
      
      trigger('.test-div', 'customEvent', { message: 'Hello' });
    });
  });

  describe('DOM ready', () => {
    it('should call callback immediately if DOM is ready', (done) => {
      // Mock document.readyState as 'complete'
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        writable: true
      });
      
      ready(() => {
        done();
      });
    });

    it('should wait for DOMContentLoaded if DOM is loading', () => {
      Object.defineProperty(document, 'readyState', {
        value: 'loading',
        writable: true
      });
      
      let called = false;
      ready(() => {
        called = true;
      });
      
      // Should not be called immediately
      expect(called).toBe(false);
    });
  });
});
