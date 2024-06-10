import { cloneDeep, isEqual } from "lodash";

export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = T | ((previous: T) => T);
export type StateEffectiveFunction = () => (() => {}) | void | any;
export type StateReducerFunction<T> = (previous: T, current: T) => any;

export const useState = <T>(initial: T): [T, StateFunction<T>] => {
  let variable: T = initial;

  const variableSetter: StateFunction<T> = (value: StateFunctionValue<T>) => {
    if (typeof value === "function") {
      value = (value as Function)(variable);
    }
    if (!isEqual(variable, value)) {
      variable = value as T;
      (this as any)?.effectsFn.forEach(async (effectFn) => await effectFn());
      (this as any)?.refresh();
    }
  };

  return [variable, variableSetter];
};

export const useEffect = (fn: StateEffectiveFunction, dependencies: any[]) => {
  const cacher = () => cloneDeep(dependencies);
  let caches = cacher();
  const internalFn = () => {
    if (!isEqual(dependencies, caches)) {
      caches = cacher();
      fn();
    }
  };
  (this as any)?.effectsFn.push(internalFn);
};

export const useReducer = <T>(reducer: StateReducerFunction<T>, initial: T) => {
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
};

export const useMemo = <T>(fn: StateEffectiveFunction, dependencies: any[]) => {
  const [state, setState] = useState<T>(fn());
  const cacher = () =>
    dependencies.map((state) => {
      const [_0] = [...[state]];
      return _0;
    });
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
  (this as any)?.effectsFn.push(internalFn);
  return state;
};
