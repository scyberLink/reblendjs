import * as lodash from "lodash";

export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = T | ((previous: T) => T);
export type StateEffectiveFunction = () => (() => {}) | void | any;
export type StateReducerFunction<T> = (previous: T, current: T) => any;

export function useState<T>(initial: T): [T, StateFunction<T>] {
  const variable: T = initial;

  const variableSetter: StateFunction<T> = (value: StateFunctionValue<T>) => {
    const labelPlaceholder = "[LABEL]";
    if (typeof value === "function") {
      // @ts-ignore
      value = (value as Function)(this[labelPlaceholder]);
    }
    // @ts-ignore
    if (!isEqual(this[labelPlaceholder], value)) {
      // @ts-ignore
      this[labelPlaceholder] = value as T;
      // @ts-ignore
      this?.effectsFn.forEach(async (effectFn) => await effectFn());
      // @ts-ignore
      this?.refresh();
    }
  };

  return [variable, variableSetter];
}

export function useEffect(fn: StateEffectiveFunction, dependencies: any[]) {
  const cacher = () => lodash.cloneDeep(dependencies);
  let caches = cacher();
  const internalFn = () => {
    if (!lodash.isEqual(dependencies, caches)) {
      caches = cacher();
      fn();
    }
  };
  fn();
  // @ts-ignore
  this?.effectsFn.push(internalFn);
}

export function useReducer<T>(reducer: StateReducerFunction<T>, initial: T) {
  const [state, setState] = useState<T>(initial);

  const fn: StateFunction<T> = (newValue: StateFunctionValue<T>) => {
    let reducedVal: StateFunctionValue<T>;
    if (typeof newValue === "function") {
      reducedVal = reducer(state, (newValue as Function)(state));
    } else {
      reducedVal = reducer(state, newValue as T);
    }
    setState(reducedVal);
  };

  return [state, fn];
}

export function useMemo<T>(fn: StateEffectiveFunction, dependencies: any[]) {
  const [state, setState] = useState<T>(fn());
  const cacher = () => lodash.cloneDeep(dependencies);
  let caches = cacher();
  const internalFn = () => {
    for (let i = 0; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      const cache = caches[i];

      if (dependency !== cache) {
        caches = cacher();
        setState(fn());
        break;
      }
    }
  };
  // @ts-ignore
  this?.effectsFn.push(internalFn);
  return state;
}
