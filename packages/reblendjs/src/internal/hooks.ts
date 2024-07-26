import { isEqual } from 'lodash';
import BaseComponent from './BaseComponent';

export type Ref<T> = { current?: T | HTMLElement };
export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = ((previous: T) => T) | T;
export type StateEffectiveMemoFunction<T> = () => T;
export type StateEffectiveFunction = () => (() => any) | void;
export type StateReducerFunction<T> = (previous: T, current: T) => any;
export type ContextSubscriber = {
  component: BaseComponent;
  stateKey: string;
};

const contextValue = Symbol('Reblend.contextValue');
const contextUpdater = Symbol('Reblend.contextUpdater');
const contextSubscrbers = Symbol('Reblend.contextSubscrbers');
const contextSubscrbe = Symbol('Reblend.contextSubscrbe');
export type Context<T> = {
  [contextSubscrbers]: ContextSubscriber[];
  [contextValue]: T;
  [contextUpdater](update: StateFunctionValue<T>): void;
  [contextSubscrbe](component: BaseComponent, stateKey: string): void;
};

const invalidContext = new Error('Invalid context');

export function useState<T>(
  initial: T,
  ...dependencyStringAndOrStateKey: string[]
): [T, StateFunction<T>] {
  //@ts-ignore
  return this.useState(...arguments);
}

export function useEffect(
  fn: StateEffectiveFunction,
  dependencies?: any[],
  ...dependencyStringAndOrStateKey: string[]
): void {
  //@ts-ignore
  return this.useEffect(...arguments);
}

export function useReducer<T>(
  reducer: StateReducerFunction<T>,
  initial: T,
  ...dependencyStringAndOrStateKey: string[]
): [T, StateFunction<T>] {
  //@ts-ignore
  return this.useReducer(...arguments);
}

export function useMemo<T>(
  fn: StateEffectiveMemoFunction<T>,
  dependencies?: any[],
  ...dependencyStringAndOrStateKey: string[]
): T {
  //@ts-ignore
  return this.useMemo(...arguments);
}

export function useRef<T>(
  initial?: T,
  ...dependencyStringAndOrStateKey: string[]
): Ref<T> {
  //@ts-ignore
  return this.useRef(...arguments);
}

export function useCallback(
  fn: Function,
  ...dependencyStringAndOrStateKey: string[]
): Function {
  //@ts-ignore
  return this.useCallback(...arguments);
}

export function useContext<T>(
  context: Context<T>,
  ...dependencyStringAndOrStateKey: string[]
): T {
  if (
    !(
      contextSubscrbers in context ||
      contextValue in context ||
      contextSubscrbe in context
    )
  ) {
    throw invalidContext;
  }
  const stateID: string | undefined = dependencyStringAndOrStateKey.pop();

  if (!stateID) {
    //@ts-ignore
    throw this.stateIdNotIncluded;
  }

  if (typeof stateID !== 'string') {
    throw new Error(
      'Invalid state key. Make sure you are calling useContext correctly'
    );
  }
  //@ts-ignore
  context[contextSubscrbe](this, stateID);
  return context[contextValue];
}

export function useContextDispatch<T>(
  context: Context<T>,
  ...dependencyStringAndOrStateKey: string[]
): StateFunction<T> {
  if (
    !(
      contextValue in context ||
      contextSubscrbers in context ||
      contextUpdater in context
    )
  ) {
    throw invalidContext;
  }

  return context[contextUpdater];
}

export function createContext<T>(initial: T): Context<T> {
  const context: Context<T> = {
    [contextSubscrbers]: [],
    [contextValue]: initial,
    [contextUpdater](update: StateFunctionValue<T>) {
      const newValue =
        typeof update === 'function'
          ? (update as Function)(context[contextValue])
          : update;
      if (!isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue;
        context[contextSubscrbers].forEach(subscriber => {
          subscriber.component[subscriber.stateKey] = context[contextValue];
          //@ts-ignore
          subscriber.component.onStateChange();
        });
      }
    },
    [contextSubscrbe](component: BaseComponent, stateKey: string) {
      if (!component) {
        throw new Error('Invalid component');
      }
      if (!stateKey) {
        throw new Error('Invalid state key');
      }
      context[contextSubscrbers].push({ component, stateKey });
    },
  };
  return context;
}
