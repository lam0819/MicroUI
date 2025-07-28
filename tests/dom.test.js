import { describe, it, expect, beforeEach } from '@jest/globals';
import { $, $$, addClass, removeClass, toggleClass, hasClass, attr, data, html, append, prepend, remove, closest } from '../src/core/dom.js';

describe('DOM Utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Element querying', () => {
    it('should query single element with $', () => {
      document.body.innerHTML = '<div class="test">Hello</div>';
      const element = $('.test');
      
      expect(element).toBeTruthy();
      expect(element.className).toBe('test');
      expect(element.textContent).toBe('Hello');
    });

    it('should return null for non-existent element', () => {
      const element = $('.non-existent');
      expect(element).toBeNull();
    });

    it('should query multiple elements with $$', () => {
      document.body.innerHTML = `
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
      `;
      
      const elements = $$('.item');
      expect(elements.length).toBe(3);
      expect(elements[0].textContent).toBe('1');
      expect(elements[2].textContent).toBe('3');
    });
  });

  describe('Class manipulation', () => {
    it('should add classes to element', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      
      addClass(element, 'active highlight');
      
      expect(element.classList.contains('active')).toBe(true);
      expect(element.classList.contains('highlight')).toBe(true);
    });

    it('should add classes using selector', () => {
      document.body.innerHTML = '<div class="test"></div>';
      
      addClass('.test', 'active');
      
      const element = $('.test');
      expect(element.classList.contains('active')).toBe(true);
    });

    it('should remove classes from element', () => {
      const element = document.createElement('div');
      element.className = 'active highlight test';
      document.body.appendChild(element);
      
      removeClass(element, 'active highlight');
      
      expect(element.classList.contains('active')).toBe(false);
      expect(element.classList.contains('highlight')).toBe(false);
      expect(element.classList.contains('test')).toBe(true);
    });

    it('should toggle classes', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      
      toggleClass(element, 'active');
      expect(element.classList.contains('active')).toBe(true);
      
      toggleClass(element, 'active');
      expect(element.classList.contains('active')).toBe(false);
    });

    it('should check if element has class', () => {
      const element = document.createElement('div');
      element.className = 'active test';
      
      expect(hasClass(element, 'active')).toBe(true);
      expect(hasClass(element, 'inactive')).toBe(false);
    });
  });

  describe('Attribute manipulation', () => {
    it('should set and get attributes', () => {
      const element = document.createElement('div');
      
      attr(element, 'id', 'test-id');
      expect(attr(element, 'id')).toBe('test-id');
      expect(element.getAttribute('id')).toBe('test-id');
    });

    it('should remove attributes', () => {
      const element = document.createElement('div');
      element.setAttribute('data-test', 'value');
      
      attr(element, 'data-test', null);
      expect(element.hasAttribute('data-test')).toBe(false);
    });
  });

  describe('Data attributes', () => {
    it('should set and get data attributes', () => {
      const element = document.createElement('div');
      
      data(element, 'user', { name: 'John', age: 30 });
      const userData = data(element, 'user');
      
      expect(userData).toEqual({ name: 'John', age: 30 });
    });

    it('should handle string data', () => {
      const element = document.createElement('div');
      
      data(element, 'message', 'Hello World');
      expect(data(element, 'message')).toBe('Hello World');
    });
  });

  describe('Content manipulation', () => {
    it('should set HTML content', () => {
      const element = document.createElement('div');
      
      html(element, '<p>Hello <strong>World</strong></p>');
      expect(element.innerHTML).toBe('<p>Hello <strong>World</strong></p>');
    });

    it('should append HTML content', () => {
      const element = document.createElement('div');
      element.innerHTML = '<p>Existing</p>';
      
      append(element, '<p>New</p>');
      expect(element.children.length).toBe(2);
      expect(element.children[1].textContent).toBe('New');
    });

    it('should prepend HTML content', () => {
      const element = document.createElement('div');
      element.innerHTML = '<p>Existing</p>';
      
      prepend(element, '<p>New</p>');
      expect(element.children.length).toBe(2);
      expect(element.children[0].textContent).toBe('New');
    });
  });

  describe('Element removal', () => {
    it('should remove element', () => {
      document.body.innerHTML = '<div class="test">Remove me</div>';
      const element = $('.test');
      
      remove(element);
      expect($('.test')).toBeNull();
    });
  });

  describe('Closest ancestor', () => {
    it('should find closest ancestor', () => {
      document.body.innerHTML = `
        <div class="container">
          <div class="item">
            <span class="text">Text</span>
          </div>
        </div>
      `;
      
      const span = $('.text');
      const item = closest(span, '.item');
      const container = closest(span, '.container');
      
      expect(item.className).toBe('item');
      expect(container.className).toBe('container');
    });
  });
});
