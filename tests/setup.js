// Jest setup file
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Web Animations API for older environments
if (!Element.prototype.animate) {
  Element.prototype.animate = function(keyframes, options) {
    return {
      addEventListener: jest.fn(),
      finish: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      cancel: jest.fn()
    };
  };
}
