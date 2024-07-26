import BaseComponent from './BaseComponent';
export type Ref<T> = {
  current?: T | HTMLElement;
};
export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = ((previous: T) => T) | T;
export type StateEffectiveMemoFunction<T> = () => T;
export type StateEffectiveFunction = () => (() => any) | void;
export type StateReducerFunction<T> = (previous: T, current: T) => any;
export type ContextSubscriber = {
  component: BaseComponent;
  stateKey: string;
};
declare const contextValue: unique symbol;
declare const contextUpdater: unique symbol;
declare const contextSubscrbers: unique symbol;
declare const contextSubscrbe: unique symbol;
export type Context<T> = {
  [contextSubscrbers]: ContextSubscriber[];
  [contextValue]: T;
  [contextUpdater](update: StateFunctionValue<T>): void;
  [contextSubscrbe](component: BaseComponent, stateKey: string): void;
};
export declare function useState<T>(
  initial: T,
  ...dependencyStringAndOrStateKey: string[]
): [T, StateFunction<T>];
export declare function useEffect(
  fn: StateEffectiveFunction,
  dependencies?: any[],
  ...dependencyStringAndOrStateKey: string[]
): void;
export declare function useReducer<T>(
  reducer: StateReducerFunction<T>,
  initial: T,
  ...dependencyStringAndOrStateKey: string[]
): [T, StateFunction<T>];
export declare function useMemo<T>(
  fn: StateEffectiveMemoFunction<T>,
  dependencies?: any[],
  ...dependencyStringAndOrStateKey: string[]
): T;
export declare function useRef<T>(
  initial?: T,
  ...dependencyStringAndOrStateKey: string[]
): Ref<T>;
export declare function useCallback(
  fn: Function,
  ...dependencyStringAndOrStateKey: string[]
): Function;
export declare function useContext<T>(
  context: Context<T>,
  ...dependencyStringAndOrStateKey: string[]
): T;
export declare function useContextDispatch<T>(
  context: Context<T>,
  ...dependencyStringAndOrStateKey: string[]
): StateFunction<T>;
export declare function createContext<T>(initial: T): Context<T>;
export {};
