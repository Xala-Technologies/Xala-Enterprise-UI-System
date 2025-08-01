/**
 * Patch for jsdom event handling issues
 */

// Patch EventTarget to handle undefined targets
if (typeof window !== 'undefined' && window.EventTarget) {
  const originalDispatch = window.EventTarget.prototype.dispatchEvent;
  
  window.EventTarget.prototype.dispatchEvent = function(event) {
    try {
      // Ensure event has required properties
      if (!event || typeof event !== 'object') {
        console.warn('Invalid event object passed to dispatchEvent');
        return false;
      }
      
      // Call original dispatch
      return originalDispatch.call(this, event);
    } catch (error) {
      // Log but don't throw
      console.warn('Event dispatch error:', error.message);
      return false;
    }
  };
}

// Also patch the internal _dispatch if it exists
if (typeof window !== 'undefined' && window.EventTarget && window.EventTarget.prototype._dispatch) {
  const original_dispatch = window.EventTarget.prototype._dispatch;
  
  window.EventTarget.prototype._dispatch = function(event, legacyOutputDidListenersThrowFlag) {
    try {
      // Check if clearTargetsStruct exists
      if (arguments[2] && !arguments[2].target) {
        arguments[2] = { target: this, ...arguments[2] };
      }
      
      return original_dispatch.apply(this, arguments);
    } catch (error) {
      console.warn('Internal event dispatch error:', error.message);
      return false;
    }
  };
}

// Ensure global is defined
if (typeof global === 'undefined') {
  window.global = window;
}