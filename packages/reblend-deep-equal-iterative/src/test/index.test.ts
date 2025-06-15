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

  it('should treat instances of specified classes as equal if both are instances', () => {
    class MyClass {}
    class OtherClass {}
    const a = new MyClass();
    const b = new MyClass();
    const c = new OtherClass();
    expect(deepEqual(a, b, { treatInstancesAsEqual: [MyClass] })).toBe(true);
    expect(deepEqual(a, c, { treatInstancesAsEqual: [MyClass] })).toBe(false);
  });

  it('should treat instances of multiple classes as equal if both are instances', () => {
    class A {}
    class B {}
    const a1 = new A();
    const a2 = new A();
    const b1 = new B();
    const b2 = new B();
    expect(deepEqual(a1, a2, { treatInstancesAsEqual: [A, B] })).toBe(true);
    expect(deepEqual(b1, b2, { treatInstancesAsEqual: [A, B] })).toBe(true);
    expect(deepEqual(a1, b1, { treatInstancesAsEqual: [A, B] })).toBe(false);
  });

  it('should treat Node/HTMLElement/Element as equal if both are instances and configured', () => {
    // These will only run in environments where Node/HTMLElement/Element exist
    if (typeof Node !== 'undefined' && typeof HTMLElement !== 'undefined' && typeof Element !== 'undefined') {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      expect(deepEqual(div1, div2, { treatInstancesAsEqual: [Node, HTMLElement, Element] })).toBe(true);
    }
  });

  it('should use excludeKeys to ignore keys', () => {
    const a = { foo: 1, bar: 2, ignore: 3 };
    const b = { foo: 1, bar: 2, ignore: 4 };
    expect(deepEqual(a, b, { excludeKeys: ['ignore'] })).toBe(true);
  });

  it('should use includeKeys to only compare specified keys', () => {
    const a = { foo: 1, bar: 2, extra: 3 };
    const b = { foo: 1, bar: 2, extra: 4 };
    expect(deepEqual(a, b, { includeKeys: ['foo', 'bar'] })).toBe(true);
    expect(deepEqual(a, b, { includeKeys: ['foo', 'bar', 'extra'] })).toBe(false);
  });

  it('should treat multiple advanced config scenarios correctly', () => {
    // 1. treatInstancesAsEqual with custom class and DOM
    class Custom {}
    const a1 = new Custom();
    const a2 = new Custom();
    expect(deepEqual(a1, a2, { treatInstancesAsEqual: [Custom] })).toBe(true);

    // 2. shouldTreatAsEqual for custom logic
    const objA = { foo: 1 };
    const objB = { foo: 2 };
    expect(
      deepEqual(objA, objB, {
        shouldTreatAsEqual: (a, b) => a && b && a.foo === 1 && b.foo === 2,
      })
    ).toBe(true);

    // 3. shouldIgnoreObject for skipping subtrees
    const skip = { skip: true };
    expect(
      deepEqual({ a: skip }, { a: skip }, { shouldIgnoreObject: obj => obj && obj.skip })
    ).toBe(true);
    expect(
      deepEqual({ a: skip }, { a: { skip: true } }, { shouldIgnoreObject: obj => obj && obj.skip })
    ).toBe(true);

    // 4. includeKeys and excludeKeys together
    const obj1 = { a: 1, b: 2, c: 3, d: 4 };
    const obj2 = { a: 1, b: 2, c: 99, d: 4 };
    expect(
      deepEqual(obj1, obj2, { includeKeys: ['a', 'b', 'd'], excludeKeys: ['d'] })
    ).toBe(true); // only 'a' and 'b' compared
    expect(
      deepEqual(obj1, obj2, { includeKeys: ['a', 'b', 'c', 'd'], excludeKeys: ['d'] })
    ).toBe(false); // 'c' is compared and differs

    // 5. keyThreshold and depthThreshold with fallback
    const wideA = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const wideB = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    expect(deepEqual(wideA, wideB, { keyThreshold: 3 })).toBe(false);
    const deepA = { a: { b: { c: { d: 1 } } } };
    const deepB = { a: { b: { c: { d: 1 } } } };
    expect(deepEqual(deepA, deepB, { depthThreshold: 2 })).toBe(false);
  });

  it('should return false if constructors differ', () => {
    class A { x = 1 }
    class B { x = 1 }
    expect(deepEqual(new A(), new B())).toBe(false);
  });

  it('should return true if shouldIgnoreObject returns true for only one side', () => {
    const a = { foo: 1 };
    const b = { foo: 2 };
    expect(deepEqual(a, b, { shouldIgnoreObject: obj => obj && obj.foo === 1 })).toBe(true);
    expect(deepEqual(a, b, { shouldIgnoreObject: obj => obj && obj.foo === 2 })).toBe(true);
  });

  it('should return false if shouldTreatAsEqual returns false', () => {
    const a = { foo: 1 };
    const b = { foo: 1 };
    expect(deepEqual(a, b, { shouldTreatAsEqual: () => false })).toBe(false);
  });

  it('should return true if includeKeys/excludeKeys/shouldIgnoreKey filter out all keys', () => {
    const a = { foo: 1, bar: 2 };
    const b = { foo: 2, bar: 3 };
    expect(deepEqual(a, b, { includeKeys: [] })).toBe(true);
    expect(deepEqual(a, b, { excludeKeys: ['foo', 'bar'] })).toBe(true);
    expect(deepEqual(a, b, { shouldIgnoreKey: () => true })).toBe(true);
  });

  it('should return false if objects have different sets of keys', () => {
    const a = { foo: 1, bar: 2 };
    const b = { foo: 1, baz: 2 };
    expect(deepEqual(a, b)).toBe(false);
  });

  it('should return false for objects with different prototypes', () => {
    const protoA = { foo: 1 };
    const protoB = { foo: 1 };
    const a = Object.create(protoA);
    a.bar = 2;
    const b = Object.create(protoB);
    b.bar = 2;
    // Prototypes are different objects, so should be false
    expect(deepEqual(a, b)).toBe(false);
  });

  it('should return false for objects with same keys but different property descriptors', () => {
    const a = {};
    Object.defineProperty(a, 'foo', { value: 1, enumerable: true });
    const b = {};
    Object.defineProperty(b, 'foo', { value: 1, enumerable: false });
    // Property descriptors differ, so should be false
    expect(deepEqual(a, b)).toBe(false);
  });

  it('should return false for objects with same keys but one missing a key', () => {
    const a = { foo: 1, bar: 2 };
    const b = { foo: 1 };
    expect(deepEqual(a, b)).toBe(false);
    expect(deepEqual(b, a)).toBe(false);
  });

  it('should return false for objects with same keys but different values (deep)', () => {
    const a = { foo: { bar: 1 } };
    const b = { foo: { bar: 2 } };
    expect(deepEqual(a, b)).toBe(false);
  });

  it('should return false for objects with same keys but one missing a nested key', () => {
    const a = { foo: { bar: 1, baz: 2 } };
    const b = { foo: { bar: 1 } };
    expect(deepEqual(a, b)).toBe(false);
    expect(deepEqual(b, a)).toBe(false);
  });

  it('should return false for objects with same keys but different types for a value', () => {
    const a = { foo: 1 };
    const b = { foo: '1' };
    expect(deepEqual(a, b)).toBe(false);
  });
});
