import deepEqual from '..';

function foo() {
  return 42;
}
function bar() {
  return 42;
}
function baz() {
  return 43;
}

foo.prop = 'foo';

bar.prop = 'foo';
baz.prop = 'foo';

describe('deepEqual', () => {
  it('should consider two identical arrow functions equal', () => {
    expect(
      deepEqual(
        () => 42,
        () => 42
      )
    ).toBe(true);
  });

  it('should consider two identical anonymous named functions equal', () => {
    expect(
      deepEqual(
        (function name(this: any) {})(),
        (function name(this: any) {})()
      )
    ).toBe(true);
  });

  it('should consider two identical functions equal with different name not equal', () => {
    expect(deepEqual(foo, bar)).toBe(false);
  });

  it('should consider different functions different', () => {
    expect(deepEqual(foo, baz)).toBe(false);
  });

  it('should handle primitives and deep structures', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('should handle circular references gracefully', () => {
    const a: any = { foo: 'bar' };
    a.self = a;

    const b: any = { foo: 'bar' };
    b.self = b;

    expect(deepEqual(a, b)).toBe(true);
  });

  it('should fallback when keyThreshold is exceeded', () => {
    const a = { a: 1, b: 2, c: 3, d: 4 };
    const b = { a: 1, b: 2, c: 3, d: 4 };

    // If we set keyThreshold to 2, it should fallback to reference
    // So deepEqual should return false here, despite the structures matching
    expect(deepEqual(a, b, { keyThreshold: 2 })).toBe(false);
  });

  it('should fallback when depthThreshold is exceeded', () => {
    const a = { foo: { bar: { baz: { qux: 42 } } } };
    const b = { foo: { bar: { baz: { qux: 42 } } } };

    // If we set depthThreshold to 2, it should fallback
    // So deepEqual should return false here, despite the structures matching
    expect(deepEqual(a, b, { depthThreshold: 2 })).toBe(false);
  });

  it('should return false when types do not match', () => {
    expect(deepEqual(42, {})).toBe(false);
  });

  it('should return false for different circular structures', () => {
    const a: any = { foo: 'bar' };
    a.self = a;

    const b: any = { foo: 'bar' };
    b.self = { foo: 'bar' }; // not the same

    expect(deepEqual(a, b)).toBe(false);
  });

  it('should ignore specified keys during comparison', () => {
    const a = { foo: 42, ignoreMe: 100 };
    const b = { foo: 42, ignoreMe: 200 };

    expect(
      deepEqual(a, b, { shouldIgnoreKey: key => key === 'ignoreMe' })
    ).toBe(true);
  });
});
