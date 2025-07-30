/**
 * SSR detection and safe utilities for server-side rendering
 * Provides utilities to safely access browser APIs and detect SSR environments
 */

/**
 * Check if the current environment is server-side
 * @returns True if running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if the current environment is client-side
 * @returns True if running in the browser
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safe access to window object
 * @returns Window object or null if server-side
 */
export function safeWindow(): Window | null {
  return isClient() ? window : null;
}

/**
 * Safe access to document object
 * @returns Document object or null if server-side
 */
export function safeDocument(): Document | null {
  return isClient() ? document : null;
}

/**
 * Safe access to navigator object
 * @returns Navigator object or null if server-side
 */
export function safeNavigator(): Navigator | null {
  return isClient() ? window.navigator : null;
}

/**
 * Safe access to localStorage
 * @returns localStorage object or null if unavailable
 */
export function safeLocalStorage(): Storage | null {
  if (!isClient()) return null;
  
  try {
    const testKey = '__ui_system_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to sessionStorage
 * @returns sessionStorage object or null if unavailable
 */
export function safeSessionStorage(): Storage | null {
  if (!isClient()) return null;
  
  try {
    const testKey = '__ui_system_test__';
    sessionStorage.setItem(testKey, 'test');
    sessionStorage.removeItem(testKey);
    return sessionStorage;
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to cookies
 * @returns Cookies string or empty string if unavailable
 */
export function safeCookies(): string {
  if (!isClient()) return '';
  
  try {
    return document.cookie;
  } catch (e) {
    return '';
  }
}

/**
 * Safe access to URL parameters
 * @returns URLSearchParams object or null if unavailable
 */
export function safeURLSearchParams(): URLSearchParams | null {
  if (!isClient()) return null;
  
  try {
    return new URLSearchParams(window.location.search);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to user agent
 * @returns User agent string or empty string if unavailable
 */
export function safeUserAgent(): string {
  if (!isClient()) return '';
  
  try {
    return window.navigator.userAgent;
  } catch (e) {
    return '';
  }
}

/**
 * Safe access to screen dimensions
 * @returns Screen dimensions or default values
 */
export function safeScreenDimensions(): {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
} {
  if (!isClient()) {
    return {
      width: 1024,
      height: 768,
      availWidth: 1024,
      availHeight: 768,
    };
  }

  try {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    };
  } catch (e) {
    return {
      width: 1024,
      height: 768,
      availWidth: 1024,
      availHeight: 768,
    };
  }
}

/**
 * Safe access to device pixel ratio
 * @returns Device pixel ratio or default value
 */
export function safeDevicePixelRatio(): number {
  if (!isClient()) return 1;
  
  try {
    return window.devicePixelRatio || 1;
  } catch (e) {
    return 1;
  }
}

/**
 * Safe access to matchMedia
 * @param query - Media query string
 * @returns MediaQueryList or null if unavailable
 */
export function safeMatchMedia(query: string): MediaQueryList | null {
  if (!isClient()) return null;
  
  try {
    return window.matchMedia(query);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to requestAnimationFrame
 * @param callback - Animation frame callback
 * @returns Animation frame ID or null if unavailable
 */
export function safeRequestAnimationFrame(
  callback: FrameRequestCallback
): number | null {
  if (!isClient()) return null;
  
  try {
    return window.requestAnimationFrame(callback);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to cancelAnimationFrame
 * @param id - Animation frame ID
 */
export function safeCancelAnimationFrame(id: number): void {
  if (!isClient()) return;
  
  try {
    window.cancelAnimationFrame(id);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Safe access to setTimeout
 * @param callback - Timeout callback
 * @param delay - Delay in milliseconds
 * @returns Timeout ID or null if unavailable
 */
export function safeSetTimeout(
  callback: () => void,
  delay: number
): NodeJS.Timeout | null {
  if (!isClient()) return null;
  
  try {
    return setTimeout(callback, delay);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to clearTimeout
 * @param id - Timeout ID
 */
export function safeClearTimeout(id: NodeJS.Timeout): void {
  if (!isClient()) return;
  
  try {
    clearTimeout(id);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Safe access to addEventListener
 * @param element - Element to add listener to
 * @param event - Event name
 * @param handler - Event handler
 * @param options - Event options
 * @returns True if successful, false otherwise
 */
export function safeAddEventListener(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions | boolean
): boolean {
  if (!isClient()) return false;
  
  try {
    element.addEventListener(event, handler, options);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safe access to removeEventListener
 * @param element - Element to remove listener from
 * @param event - Event name
 * @param handler - Event handler
 * @param options - Event options
 * @returns True if successful, false otherwise
 */
export function safeRemoveEventListener(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: EventListenerOptions | boolean
): boolean {
  if (!isClient()) return false;
  
  try {
    element.removeEventListener(event, handler, options);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safe access to createElement
 * @param tagName - HTML tag name
 * @returns Element or null if unavailable
 */
export function safeCreateElement(tagName: string): HTMLElement | null {
  if (!isClient()) return null;
  
  try {
    return document.createElement(tagName);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to querySelector
 * @param selector - CSS selector
 * @returns Element or null if unavailable
 */
export function safeQuerySelector(selector: string): Element | null {
  if (!isClient()) return null;
  
  try {
    return document.querySelector(selector);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to querySelectorAll
 * @param selector - CSS selector
 * @returns NodeList or empty NodeList if unavailable
 */
export function safeQuerySelectorAll(selector: string): NodeListOf<Element> {
  if (!isClient()) {
    return document.createDocumentFragment().childNodes as NodeListOf<Element>;
  }
  
  try {
    return document.querySelectorAll(selector);
  } catch (e) {
    return document.createDocumentFragment().childNodes as NodeListOf<Element>;
  }
}
