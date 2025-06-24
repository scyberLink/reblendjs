import { describe, expect, it } from '@jest/globals';
import { getOverlayDirection } from '../src/helpers';

describe('Helpers', () => {
  describe('getOverlayDirection', () => {
    it('should return start for left', async () => {
      expect(getOverlayDirection('left', false)).toEqual('start');
    });

    it('should return end for left in RTL', async () => {
      expect(getOverlayDirection('left', true)).toEqual('end');
    });

    it('should return end for right', async () => {
      expect(getOverlayDirection('right', false)).toEqual('end');
    });

    it('should return start for right in RTL', async () => {
      expect(getOverlayDirection('right', true)).toEqual('start');
    });
  });
});
