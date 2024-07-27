import { isEqual } from 'lodash';
import { BaseComponent } from './BaseComponent';

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
const contextValueInitial = Symbol('Reblend.contextValueInitial');
const contextSubscribers = Symbol('Reblend.contextSubscrbers');
const contextSubscribe = Symbol('Reblend.contextSubscribe');

export type Context<T> = {
  [contextSubscribers]: ContextSubscriber[];
  [contextValue]: T;
  [contextValueInitial]: T;
  reset: () => void;
  update(update: StateFunctionValue<T>): void;
  [contextSubscribe](component: BaseComponent, stateKey: string): void;
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
      contextSubscribers in context ||
      contextValue in context ||
      contextSubscribe in context
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
  context[contextSubscribe](this, stateID);
  return context[contextValue];
}

export function createContext<T>(initial: T): Context<T> {
  const context: Context<T> = {
    [contextSubscribers]: [],
    [contextValue]: initial,
    update(update: StateFunctionValue<T>) {
      const newValue =
        typeof update === 'function'
          ? (update as Function)(context[contextValue])
          : update;
      if (!isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue;
        context[contextSubscribers].forEach(subscriber => {
          subscriber.component[subscriber.stateKey] = context[contextValue];
          //@ts-ignore
          subscriber.component.onStateChange();
        });
      }
    },
    [contextSubscribe](component: BaseComponent, stateKey: string) {
      if (!component) {
        throw new Error('Invalid component');
      }
      if (!stateKey) {
        throw new Error('Invalid state key');
      }
      context[contextSubscribers].push({ component, stateKey });
    },
    [contextValueInitial]: initial,
    reset() {
      context[contextValue] = context[contextValueInitial];
    },
  };
  return context;
}
