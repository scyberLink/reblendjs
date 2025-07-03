import { cleanup } from 'reblend-testing-library';
import { afterEach } from '@jest/globals';

declare global {
  interface Event {
    _stopped?: boolean;
  }
}

Object.defineProperty(Event.prototype, 'isPropagationStopped', {
  value: function() {
    return !!this._stopped;
  },
  writable: true,
});

const originalStopPropagation = Event.prototype.stopPropagation;
Event.prototype.stopPropagation = function() {
  this._stopped = true;
  originalStopPropagation.call(this);
};

afterEach(cleanup);
