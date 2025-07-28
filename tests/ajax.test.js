import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ajax, get, post, put, del, load } from '../src/core/ajax.js';

// Mock XMLHttpRequest
class MockXMLHttpRequest {
  constructor() {
    this.readyState = 0;
    this.responseText = '';
    this.status = 200;
    this.statusText = 'OK';
    this.onload = null;
    this.onerror = null;
    this.onabort = null;
    this.headers = {};
  }

  open(method, url) {
    this.method = method;
    this.url = url;
    this.readyState = 1;
  }

  setRequestHeader(key, value) {
    this.headers[key] = value;
  }

  getResponseHeader(key) {
    if (key === 'Content-Type') {
      return 'application/json';
    }
    return null;
  }

  send(data) {
    this.data = data;
    this.readyState = 4;
    
    // Simulate async response
    setTimeout(() => {
      if (this.onload) {
        this.onload();
      }
    }, 0);
  }

  abort() {
    if (this.onabort) {
      this.onabort();
    }
  }
}

describe('AJAX Utilities', () => {
  let originalXMLHttpRequest;

  beforeEach(() => {
    originalXMLHttpRequest = global.XMLHttpRequest;
    global.XMLHttpRequest = MockXMLHttpRequest;
  });

  afterEach(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  describe('Basic AJAX functionality', () => {
    it('should make successful GET request', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send() {
          this.responseText = JSON.stringify({ success: true });
          super.send();
        }
      };

      const response = await get('/api/test');
      expect(response).toEqual({ success: true });
    });

    it('should make successful POST request', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send(data) {
          this.responseText = JSON.stringify({ received: JSON.parse(data) });
          super.send(data);
        }
      };

      const testData = { name: 'John', age: 30 };
      const response = await post('/api/users', testData);
      expect(response.received).toEqual(testData);
    });

    it('should handle PUT requests', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send(data) {
          this.responseText = JSON.stringify({ updated: true });
          super.send(data);
        }
      };

      const response = await put('/api/users/1', { name: 'Updated' });
      expect(response).toEqual({ updated: true });
    });

    it('should handle DELETE requests', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send() {
          this.responseText = JSON.stringify({ deleted: true });
          super.send();
        }
      };

      const response = await del('/api/users/1');
      expect(response).toEqual({ deleted: true });
    });
  });

  describe('Error handling', () => {
    it('should reject on HTTP error status', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send() {
          this.status = 404;
          this.statusText = 'Not Found';
          super.send();
        }
      };

      await expect(get('/api/not-found')).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should reject on network error', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send() {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror();
            }
          }, 0);
        }
      };

      await expect(get('/api/test')).rejects.toThrow('Network error');
    });

    it('should reject on timeout', async () => {
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        send() {
          // Simulate timeout by not calling onload and letting timeout fire
          // Don't call any callbacks to simulate a hanging request
        }
      };

      await expect(ajax({ url: '/api/test', timeout: 10 })).rejects.toThrow('Request timeout');
    });
  });

  describe('Custom options', () => {
    it('should set custom headers', async () => {
      let requestHeaders = {};
      
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        setRequestHeader(key, value) {
          requestHeaders[key] = value;
          super.setRequestHeader(key, value);
        }

        send() {
          this.responseText = JSON.stringify({ success: true });
          super.send();
        }
      };

      await get('/api/test', {
        headers: {
          'Authorization': 'Bearer token123',
          'X-Custom': 'value'
        }
      });

      expect(requestHeaders['Authorization']).toBe('Bearer token123');
      expect(requestHeaders['X-Custom']).toBe('value');
    });
  });

  describe('Load HTML content', () => {
    it('should load HTML into element', async () => {
      document.body.innerHTML = '<div class="target"></div>';
      
      global.XMLHttpRequest = class extends MockXMLHttpRequest {
        getResponseHeader(key) {
          if (key === 'Content-Type') {
            return 'text/html';
          }
          return null;
        }

        send() {
          this.responseText = '<p>Loaded content</p>';
          super.send();
        }
      };

      await load('.target', '/api/content');
      
      const target = document.querySelector('.target');
      expect(target.innerHTML).toBe('<p>Loaded content</p>');
    });
  });
});
