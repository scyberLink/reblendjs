export type StackFrame = { a: any; b: any; depth: number };
export type Config = {
  /** Max number of keys to compare before falling back to referencial comparison */
  keyThreshold?: number;
  /** Max depth to recurse into before fallback to referencial comparison */
  depthThreshold?: number;
  /** Callback to ignore certain keys during comparison */
  shouldIgnoreKey?: (key: string | symbol, a: any, b: any) => boolean;
  /** Callback to ignore certain objects during comparison */
  shouldIgnoreObject?: (a: any) => boolean;
};

function isNonObject(x: any): boolean {
  return x === null || (typeof x !== 'object' && typeof x !== 'function');
}

/**
 * Performs a deep comparison of two functions, checking:
 * - If their names match
 * - If their `toString()` output is the same
 * - If their prototypes are deeply equal
 * - If their custom properties match
 *
 * @param first - first function to compare
 * @param second - second function to compare
 * @param deepEqual - deep comparison fallback for custom properties
 * @returns true if the two functions are considered equal
 */
function deepCompareFunctions(
  first: Function,
  second: Function,
  deepEqual: (a: any, b: any) => boolean
): boolean {
  if (first === second) return true;

  if (first.name && second.name && first.name !== second.name) return false;

  if (first.toString() !== second.toString()) return false;

  if (!deepEqual(Object.getPrototypeOf(first), Object.getPrototypeOf(second)))
    return false;

  const firstKeys = [
    ...Object.getOwnPropertyNames(first),
    ...Object.getOwnPropertySymbols(first),
  ];

  const secondKeys = [
    ...Object.getOwnPropertyNames(second),
    ...Object.getOwnPropertySymbols(second),
  ];

  if (!deepEqual(firstKeys, secondKeys)) return false;

  for (const key of firstKeys) {
    if (!deepEqual((first as any)[key], (second as any)[key])) return false;
  }
  return true;
}

/**
 * Performs a deep comparison of two values in a non-recursive, stack-safe way.
 * It supports:
 * - Primitive comparison
 * - Object deep comparison
 * - Function deep comparison
 * - Custom ignoring of keys and depth
 * - Handle of circular references gracefully
 *
 * @param a - first value
 * @param b - second value
 * @param config - optional configuration to control depth, key ignoring, etc.
 * @returns true if values are deeply equal
 */
export function deepEqualIterative(
  a: any,
  b: any,
  config: Config = {}
): boolean {
  if (isNonObject(a) && isNonObject(b)) {
    return a === b;
  }

  if (typeof a === 'function' && typeof b === 'function') {
    return deepCompareFunctions(a, b, deepEqualIterative);
  }

  if (a === b) return true;

  if (isNonObject(a) || isNonObject(b) || a?.constructor !== b?.constructor) {
    return false;
  }

  if (typeof Node !== 'undefined' && a instanceof Node && b instanceof Node) {
    return true;
  }

  if (config.shouldIgnoreObject?.(a)) return true;

  const stack: StackFrame[] = [{ a, b, depth: 0 }];
  const seen = new WeakMap();

  while (stack.length) {
    const { a, b, depth } = stack.pop()!;
    if (a === b) continue;

    if (isNonObject(a) || isNonObject(b) || a?.constructor !== b?.constructor) {
      return false;
    }

    if (typeof Node !== 'undefined' && a instanceof Node && b instanceof Node)
      continue;

    if (seen.has(a)) {
      if (seen.get(a) !== b) return false;
      continue;
    }
    seen.set(a, b);

    const keysA = Object.keys(a).filter(
      key => key !== 'ref' && !config.shouldIgnoreKey?.(key, a, b)
    );
    const keysB = Object.keys(b).filter(
      key => key !== 'ref' && !config.shouldIgnoreKey?.(key, a, b)
    );

    if (
      config.keyThreshold &&
      (keysA.length > config.keyThreshold || keysB.length > config.keyThreshold)
    ) {
      if (a !== b) return false;
      continue;
    }
    if (config.depthThreshold && depth > config.depthThreshold) {
      if (a !== b) return false;
      continue;
    }
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      stack.push({ a: a[key], b: b[key], depth: depth + 1 });
    }
  }
  return true;
}

export default deepEqualIterative;
