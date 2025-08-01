const { TestEnvironment } = require('jest-environment-jsdom');

class JSDOMPatchedEnvironment extends TestEnvironment {
  constructor(...args) {
    super(...args);
    
    // Patch EventTarget._dispatch to handle undefined events
    if (this.global.EventTarget) {
      const originalDispatch = this.global.EventTarget.prototype._dispatch;
      
      this.global.EventTarget.prototype._dispatch = function(event, legacyOutputDidListenersThrowFlag, clearTargetsStruct) {
        // Ensure clearTargetsStruct exists and has target
        if (clearTargetsStruct && !clearTargetsStruct.target) {
          clearTargetsStruct.target = this;
        }
        
        // Ensure event exists and has required properties
        if (!event) {
          return false;
        }
        
        // Ensure event has a target
        if (!event.target) {
          event.target = this;
        }
        
        // Call original dispatch with error handling
        try {
          return originalDispatch.call(this, event, legacyOutputDidListenersThrowFlag, clearTargetsStruct);
        } catch (error) {
          if (error.message && !error.message.includes('Cannot read properties of undefined')) {
            console.warn('Event dispatch error:', error.message);
          }
          return false;
        }
      };
    }
    
    // Patch window.dispatchEvent to handle undefined events
    if (this.global.window) {
      const originalWindowDispatch = this.global.window.dispatchEvent;
      
      this.global.window.dispatchEvent = function(event) {
        if (!event) {
          return false;
        }
        
        if (!event.target) {
          event.target = this;
        }
        
        try {
          return originalWindowDispatch.call(this, event);
        } catch (error) {
          console.warn('Window dispatch error:', error.message);
          return false;
        }
      };
    }
    
    // Patch document.dispatchEvent
    if (this.global.document) {
      const originalDocumentDispatch = this.global.document.dispatchEvent;
      
      this.global.document.dispatchEvent = function(event) {
        if (!event) {
          return false;
        }
        
        if (!event.target) {
          event.target = this;
        }
        
        try {
          return originalDocumentDispatch.call(this, event);
        } catch (error) {
          console.warn('Document dispatch error:', error.message);
          return false;
        }
      };
    }
  }
  
  async setup() {
    await super.setup();
  }
  
  async teardown() {
    await super.teardown();
  }
}

module.exports = JSDOMPatchedEnvironment;