export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = T | ((previous: T) => T);
export type StateEffectiveFunction = () => (() => {}) | void | any;
export type StateReducerFunction<T> = (previous: T, current: T) => any;

export const useState = <T>(initial: T): [T, StateFunction<T>] => {
  let variable: T = initial;
  const effectsFn: StateEffectiveFunction[] = [];

  const variableSetter: StateFunction<T> = (value: StateFunctionValue<T>) => {
    let updated = false;
    if (typeof value == "function") {
      value = (value as Function)(variable);
      if (variable != value) {
        variable = value as T;
        updated = true;
      }
    } else {
      if (variable != value) {
        variable = value;
        updated = true;
      }
    }
    if (updated) {
      (this as any)?.refresh();
      effectsFn.forEach(async (effectFn) => await effectFn());
    }
  };

  const proxyHandler = {
    get(target: any, prop: string) {
      if (prop === "value") {
        return variable;
      }
      return target[prop];
    },
    set(_target: any, prop: string, value: StateEffectiveFunction) {
      if (prop === "value") {
        effectsFn.push(value);
        return true;
      }
      return false;
    },
  };

  const proxy = new Proxy({ value: variable }, proxyHandler);

  return [proxy, variableSetter];
};

export const useEffect = (fn: StateEffectiveFunction, dependencies: any[]) =>
  dependencies.forEach((dependency) => (dependency = fn));

export const useReducer = <T>(reducer: StateReducerFunction<T>, initial: T) => {
  const [val, setter] = useState<T>(initial);

  const fn: StateFunction<T> = (newValue: StateFunctionValue<T>) => {
    let reducedVal: StateFunctionValue<T>;
    if (typeof newValue === "function") {
      reducedVal = reducer(val, (newValue as Function)(val));
    } else {
      reducedVal = reducer(val, newValue as T);
    }
    setter(reducedVal);
  };

  return [val, fn];
};

export const useMemo = <T>(fn: StateEffectiveFunction, dependencies: any[]) => {
  const [val, setter] = useState<T>(fn());
  dependencies.forEach((dependency) => (dependency = () => setter(fn())));
  return val;
};
