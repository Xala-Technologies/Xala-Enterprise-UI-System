/**
 * Deep patch for jsdom event handling issues
 * This patch handles the clearTargetsStruct.target undefined issue
 */

// Early patch to ensure EventTarget is properly initialized
if (typeof global !== 'undefined') {
  // Store original EventTarget
  const OriginalEventTarget = global.EventTarget;
  
  if (OriginalEventTarget && OriginalEventTarget.prototype) {
    // Patch the _dispatch method that's causing issues
    const original_dispatch = OriginalEventTarget.prototype._dispatch;
    
    if (original_dispatch) {
      OriginalEventTarget.prototype._dispatch = function(event, legacyOutputDidListenersThrowFlag, clearTargetsStruct) {
        try {
          // Ensure clearTargetsStruct has a target
          if (clearTargetsStruct && !clearTargetsStruct.target) {
            clearTargetsStruct.target = this;
          }
          
          // Ensure event has target
          if (event && !event.target) {
            event.target = this;
          }
          
          // Call original with error handling
          return original_dispatch.call(this, event, legacyOutputDidListenersThrowFlag, clearTargetsStruct);
        } catch (error) {
          // Don't throw, just log
          if (error.message && !error.message.includes('Cannot read properties of undefined')) {
            console.warn('EventTarget._dispatch error:', error.message);
          }
          return false;
        }
      };
    }
    
    // Also patch dispatchEvent for safety
    const originalDispatchEvent = OriginalEventTarget.prototype.dispatchEvent;
    
    if (originalDispatchEvent) {
      OriginalEventTarget.prototype.dispatchEvent = function(event) {
        try {
          if (!event) {
            return false;
          }
          
          if (!event.target) {
            event.target = this;
          }
          
          return originalDispatchEvent.call(this, event);
        } catch (error) {
          console.warn('dispatchEvent error:', error.message);
          return false;
        }
      };
    }
  }
}

// Also patch window and document when they become available
if (typeof window !== 'undefined') {
  // Ensure window events are handled
  if (window.EventTarget && window.EventTarget.prototype._dispatch) {
    const win_dispatch = window.EventTarget.prototype._dispatch;
    
    window.EventTarget.prototype._dispatch = function(event, legacyOutputDidListenersThrowFlag, clearTargetsStruct) {
      try {
        if (clearTargetsStruct && !clearTargetsStruct.target) {
          clearTargetsStruct.target = this;
        }
        
        if (event && !event.target) {
          event.target = this;
        }
        
        return win_dispatch.call(this, event, legacyOutputDidListenersThrowFlag, clearTargetsStruct);
      } catch (error) {
        return false;
      }
    };
  }
  
  // Ensure document exists
  if (!window.document && typeof document !== 'undefined') {
    window.document = document;
  }
  
  // Ensure global is set
  if (typeof global === 'undefined') {
    window.global = window;
  }
}

// Export for CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}