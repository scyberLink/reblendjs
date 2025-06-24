import { describe, expect, it } from '@jest/globals';
import { getChildRef } from '../src/utils';

describe('utils', () => {
  describe('getChildRef', () => {
    it('should return null if ref is null', () => {
      expect(getChildRef(null)).toEqual(null);
    });

    it('should return null if ref is undefined', () => {
      expect(getChildRef(undefined)).toEqual(null);
    });

    it('should return null if ref is a function', () => {
      expect(getChildRef(() => null)).toEqual(null);
    });
  });
});
