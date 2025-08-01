const { TestEnvironment } = require('jest-environment-jsdom');

class JSDOMFixEnvironment extends TestEnvironment {
  constructor(...args) {
    super(...args);
    
    // Fix for jsdom event handling
    this.global.EventTarget.prototype._dispatch = new Proxy(
      this.global.EventTarget.prototype._dispatch || function() {},
      {
        apply(target, thisArg, argumentsList) {
          try {
            // Ensure the third argument has a target property
            if (argumentsList[2] && !argumentsList[2].target) {
              argumentsList[2] = { target: thisArg, ...argumentsList[2] };
            }
            return Reflect.apply(target, thisArg, argumentsList);
          } catch (error) {
            console.warn('Event dispatch error handled:', error.message);
            return false;
          }
        }
      }
    );
    
    // Additional fixes
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
    
    // Fix for CSS
    this.global.CSS = {
      supports: () => false,
      escape: (str) => str,
    };
  }

  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = JSDOMFixEnvironment;