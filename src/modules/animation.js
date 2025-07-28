/**
 * Animation Module
 * Provides animation utilities using Web Animations API
 */

/**
 * Fade in animation
 * @param {Element|string} element - Element or selector
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Callback function when animation completes
 */
export function fadeIn(element, duration = 300, callback) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  el.style.display = el.style.display === 'none' ? '' : el.style.display;
  
  const animation = el.animate([
    { opacity: 0 },
    { opacity: 1 }
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
  
  if (callback) {
    animation.addEventListener('finish', callback);
  }
  
  return animation;
}

/**
 * Fade out animation
 * @param {Element|string} element - Element or selector
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Callback function when animation completes
 */
export function fadeOut(element, duration = 300, callback) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const animation = el.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
  
  animation.addEventListener('finish', () => {
    el.style.display = 'none';
    if (callback) callback();
  });
  
  return animation;
}

/**
 * Slide down animation
 * @param {Element|string} element - Element or selector
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Callback function when animation completes
 */
export function slideDown(element, duration = 400, callback) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const startHeight = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
  
  const endHeight = el.scrollHeight;
  
  const animation = el.animate([
    { height: `${startHeight}px` },
    { height: `${endHeight}px` }
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
  
  animation.addEventListener('finish', () => {
    el.style.height = '';
    el.style.overflow = '';
    if (callback) callback();
  });
  
  return animation;
}

/**
 * Slide up animation
 * @param {Element|string} element - Element or selector
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Callback function when animation completes
 */
export function slideUp(element, duration = 400, callback) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const startHeight = el.offsetHeight;
  el.style.overflow = 'hidden';
  
  const animation = el.animate([
    { height: `${startHeight}px` },
    { height: '0px' }
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
  
  animation.addEventListener('finish', () => {
    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = '';
    if (callback) callback();
  });
  
  return animation;
}

/**
 * Custom animation using Web Animations API
 * @param {Element|string} element - Element or selector
 * @param {Object|Array} keyframes - Animation keyframes
 * @param {Object} options - Animation options
 */
export function animate(element, keyframes, options = {}) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const defaultOptions = {
    duration: 1000,
    easing: 'ease',
    fill: 'both'
  };
  
  const config = { ...defaultOptions, ...options };
  
  return el.animate(keyframes, config);
}
