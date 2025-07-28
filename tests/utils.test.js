import { describe, it, expect, jest } from '@jest/globals';
import { debounce, throttle, extend, uniqueId, isVisible, offset } from '../src/core/utils.js';

describe('Utility Functions', () => {
  describe('Debounce', () => {
    it('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      // Call multiple times rapidly
      debouncedFn();
      debouncedFn();
      debouncedFn();

      // Should not be called yet
      expect(callCount).toBe(0);

      // Wait for debounce delay
      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });

    it('should pass arguments to debounced function', (done) => {
      const debouncedFn = debounce((a, b) => {
        expect(a).toBe('hello');
        expect(b).toBe('world');
        done();
      }, 50);

      debouncedFn('hello', 'world');
    });
  });

  describe('Throttle', () => {
    it('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      // Call multiple times rapidly
      throttledFn(); // Should execute immediately
      throttledFn(); // Should be throttled
      throttledFn(); // Should be throttled

      expect(callCount).toBe(1);

      // Wait for throttle limit
      setTimeout(() => {
        throttledFn(); // Should execute again
        expect(callCount).toBe(2);
        done();
      }, 150);
    });
  });

  describe('Extend', () => {
    it('should merge objects', () => {
      const target = { a: 1, b: 2 };
      const source1 = { b: 3, c: 4 };
      const source2 = { c: 5, d: 6 };

      const result = extend(target, source1, source2);

      expect(result).toEqual({ a: 1, b: 3, c: 5, d: 6 });
      expect(result).toBe(target); // Should modify target
    });

    it('should handle nested objects', () => {
      const target = { 
        user: { name: 'John', age: 30 },
        settings: { theme: 'dark' }
      };
      const source = { 
        user: { age: 31, email: 'john@example.com' },
        settings: { notifications: true }
      };

      const result = extend(target, source);

      expect(result.user).toEqual({ 
        name: 'John', 
        age: 31, 
        email: 'john@example.com' 
      });
      expect(result.settings).toEqual({ 
        theme: 'dark', 
        notifications: true 
      });
    });

    it('should handle empty sources', () => {
      const target = { a: 1 };
      const result = extend(target);

      expect(result).toEqual({ a: 1 });
      expect(result).toBe(target);
    });
  });

  describe('Unique ID generation', () => {
    it('should generate unique IDs', () => {
      const id1 = uniqueId();
      const id2 = uniqueId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^id_[a-z0-9]+$/);
      expect(id2).toMatch(/^id_[a-z0-9]+$/);
    });

    it('should use custom prefix', () => {
      const id = uniqueId('custom');
      expect(id).toMatch(/^custom_[a-z0-9]+$/);
    });
  });

  describe('Visibility check', () => {
    it('should detect visible elements', () => {
      const element = document.createElement('div');
      // Mock offsetWidth/offsetHeight to simulate visible element
      Object.defineProperty(element, 'offsetWidth', { value: 100, writable: true });
      Object.defineProperty(element, 'offsetHeight', { value: 100, writable: true });
      document.body.appendChild(element);

      expect(isVisible(element)).toBe(true);

      document.body.removeChild(element);
    });

    it('should detect hidden elements', () => {
      const element = document.createElement('div');
      element.style.display = 'none';
      // Mock offsetWidth/offsetHeight to simulate hidden element
      Object.defineProperty(element, 'offsetWidth', { value: 0, writable: true });
      Object.defineProperty(element, 'offsetHeight', { value: 0, writable: true });
      Object.defineProperty(element, 'getClientRects', { 
        value: () => ({ length: 0 }), 
        writable: true 
      });
      document.body.appendChild(element);

      expect(isVisible(element)).toBe(false);

      document.body.removeChild(element);
    });
  });

  describe('Element offset', () => {
    it('should calculate element offset', () => {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.top = '100px';
      element.style.left = '50px';
      element.style.width = '200px';
      element.style.height = '150px';
      document.body.appendChild(element);

      // Mock getBoundingClientRect
      element.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        left: 50,
        width: 200,
        height: 150
      }));

      // Mock window scroll position
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
      Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });

      const offsetData = offset(element);

      expect(offsetData).toEqual({
        top: 100,
        left: 50
      });

      document.body.removeChild(element);
    });
  });
});
