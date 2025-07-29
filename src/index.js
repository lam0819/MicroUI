/**
 * MicroUI - Main Entry Point
 * Exports all library functionality
 */

// Core modules
import { $, $$, addClass, removeClass, toggleClass, hasClass, attr, data, html, append, prepend, remove, closest } from './core/dom.js';
import { on, off, once, trigger, ready } from './core/events.js';
import { ajax, get, post, put, del, load } from './core/ajax.js';
import { debounce, throttle, extend, uniqueId, isVisible, offset } from './core/utils.js';

// Feature modules
import { fadeIn, fadeOut, slideDown, slideUp, animate } from './modules/animation.js';
import { store, session } from './modules/storage.js';
import { component, mount, create, getComponent, listComponents } from './modules/component.js';
import { delegate, getNamespace, destroyNamespace, listNamespaces, pauseAll, resumeAll, destroyAll, scope, advanced } from './modules/delegate.js';

/**
 * MicroUI Library
 * Main library object containing all functionality
 */
const MicroUI = {
    // DOM utilities
    $,
    $$,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    attr,
    data,
    html,
    append,
    prepend,
    remove,
    closest,

    // Event system
    on,
    off,
    once,
    trigger,
    ready,

    // AJAX utilities
    ajax,
    get,
    post,
    put,
    delete: del, // 'delete' is a reserved word
    load,

    // Animation
    fadeIn,
    fadeOut,
    slideDown,
    slideUp,
    animate,

    // Storage
    store,
    session,

    // Component system
    component,
    mount,
    create: create,
    getComponent,
    listComponents,

    // Delegation system
    delegate,
    getNamespace,
    destroyNamespace,
    listNamespaces,
    pauseAll,
    resumeAll,
    destroyAll,
    scope,
    advanced,

    // Utilities
    debounce,
    throttle,
    extend,
    uniqueId,
    isVisible,
    offset,

    // Version
    version: '__VERSION__'
};

// For UMD build
if (typeof window !== 'undefined') {
    window.MicroUI = MicroUI;
}

export default MicroUI;