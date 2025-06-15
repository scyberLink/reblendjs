export type StackFrame = { a: any; b: any; depth: number };
export type Config = {
  /** Max number of keys to compare before falling back to referencial comparison */
  keyThreshold?: number;
  /** Max depth to recurse into before fallback to referencial comparison */
  depthThreshold?: number;
  /** Array of keys to include in comparison (if set, only these keys are compared) */
  includeKeys?: (string | symbol)[];
  /** Array of keys to exclude from comparison */
  excludeKeys?: (string | symbol)[];
  /** Callback to ignore certain keys during comparison */
  shouldIgnoreKey?: (key: string | symbol, a: any, b: any) => boolean;
  /** Callback to ignore certain objects during comparison */
  shouldIgnoreObject?: (a: any) => boolean;
  /** Callback to treat certain objects as always equal (e.g., DOM nodes, platform-specific) */
  shouldTreatAsEqual?: (a: any, b: any) => boolean | undefined;
  /** List of constructors whose instances should always be treated as equal if both are instances */
  treatInstancesAsEqual?: Array<Function>;
};

function isNonObject(x: any): boolean {
  return x === null || (typeof x !== 'object' && typeof x !== 'function');
}

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

export function deepEqualIterative(
  a: any,
  b: any,
  config: Config = {}
): boolean {
  if (a === b) return true;
  if (isNonObject(a) || isNonObject(b)) return a === b;
  if (typeof a === 'function' && typeof b === 'function') {
    return deepCompareFunctions(a, b, (x, y) => deepEqualIterative(x, y, config));
  }
  if (a?.constructor !== b?.constructor) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

  // Definitive custom equality check
  if (config.shouldTreatAsEqual) {
    const result = config.shouldTreatAsEqual(a, b);
    if (result === true) return true;
    if (result === false) return false;
  }

  // Instance equality via config
  if (config.treatInstancesAsEqual && config.treatInstancesAsEqual.length) {
    for (const ctor of config.treatInstancesAsEqual) {
      if (a instanceof ctor && b instanceof ctor) return true;
    }
  }

  // Ignore object check (skip comparison for this object if either is ignored)
  if (config.shouldIgnoreObject?.(a) || config.shouldIgnoreObject?.(b)) return true;

  const stack: StackFrame[] = [{ a, b, depth: 0 }];
  const seen = new WeakMap();

  while (stack.length) {
    const { a, b, depth } = stack.pop()!;
    if (a === b) continue;
    if (isNonObject(a) || isNonObject(b) || a?.constructor !== b?.constructor) return false;
    if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

    // Definitive custom equality check inside loop
    if (config.shouldTreatAsEqual) {
      const result = config.shouldTreatAsEqual(a, b);
      if (result === true) continue;
      if (result === false) return false;
    }
    if (config.treatInstancesAsEqual && config.treatInstancesAsEqual.length) {
      let matched = false;
      for (const ctor of config.treatInstancesAsEqual) {
        if (a instanceof ctor && b instanceof ctor) {
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    if (config.shouldIgnoreObject?.(a) || config.shouldIgnoreObject?.(b)) continue;
    if (seen.has(a)) {
      if (seen.get(a) !== b) return false;
      continue;
    }
    seen.set(a, b);

    // Filter keys
    const keysA = Object.keys(a).filter(
      key =>
        (!config.includeKeys || config.includeKeys.includes(key)) &&
        (!config.excludeKeys || !config.excludeKeys.includes(key)) &&
        !config.shouldIgnoreKey?.(key, a, b)
    );
    const keysB = Object.keys(b).filter(
      key =>
        (!config.includeKeys || config.includeKeys.includes(key)) &&
        (!config.excludeKeys || !config.excludeKeys.includes(key)) &&
        !config.shouldIgnoreKey?.(key, a, b)
    );

    if (keysA.length !== keysB.length) return false;
    if (
      (config.keyThreshold && keysA.length > config.keyThreshold) ||
      (config.keyThreshold && keysB.length > config.keyThreshold) ||
      (config.depthThreshold && depth > config.depthThreshold)
    ) {
      if (a !== b) return false;
      continue;
    }
    const setA = new Set(keysA);
    for (const key of keysB) {
      if (!setA.has(key)) return false;
    }
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      const valA = a[key], valB = b[key];
      if (valA === valB) continue;
      stack.push({ a: valA, b: valB, depth: depth + 1 });
    }
  }
  return true;
}

export default deepEqualIterative;
