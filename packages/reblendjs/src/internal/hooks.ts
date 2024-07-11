import { isEqual } from 'lodash';
import BaseComponent from './BaseComponent';

export type Ref<T> = { current?: T | HTMLElement };
export type StateFunction<T> = (value: StateFunctionValue<T>) => void;
export type StateFunctionValue<T> = ((previous: T) => T) | T;
export type StateEffectiveMemoFunction<T> = () => T;
export type StateEffectiveFunction = () => (() => any) | void;
export type StateReducerFunction<T> = (previous: T, current: T) => any;
type ContextSubscriber = {
  component: BaseComponent;
  stateKey: string;
};

const contextValue = Symbol('Reblend.contextValue');
const contextUpdater = Symbol('Reblend.contextUpdater');
const contextSubscrbers = Symbol('Reblend.contextSubscrbers');
const contextSubscrbe = Symbol('Reblend.contextSubscrbe');
type Context<T> = {
  [contextSubscrbers]: ContextSubscriber[];
  [contextValue]: T;
  [contextUpdater](update: StateFunctionValue<T>): void;
  [contextSubscrbe](component: BaseComponent, stateKey: string): void;
};

const invalidContext = new Error('Invalid context');

export function useState<T>(initial: T): [T, StateFunction<T>] {
  //@ts-ignore
  return this.useState(...arguments);
}

export function useEffect(
  fn: StateEffectiveFunction,
  dependencies: any[]
): void {
  //@ts-ignore
  return this.useEffect(...arguments);
}

export function useReducer<T>(
  reducer: StateReducerFunction<T>,
  initial: T
): [T, StateFunction<T>] {
  //@ts-ignore
  return this.useReducer(...arguments);
}

export function useMemo<T>(
  fn: StateEffectiveMemoFunction<T>,
  dependencies?: any[]
): T {
  //@ts-ignore
  return this.useMemo(...arguments);
}

export function useRef<T>(initial?: T): Ref<T> {
  //@ts-ignore
  return this.useRef(...arguments);
}

export function useCallback(fn: Function): Function {
  //@ts-ignore
  return this.useCallback(...arguments);
}

export function useContext<T>(context: Context<T>): T {
  if (
    !(
      contextSubscrbers in context ||
      contextValue in context ||
      contextSubscrbe in context
    )
  ) {
    throw invalidContext;
  }
  const stateKey = arguments[arguments.length - 1];

  if (typeof stateKey !== 'string') {
    throw new Error(
      'Invalid state key. Make sure you are calling useContext correctly'
    );
  }
  //@ts-ignore
  context[contextSubscrbe](this, stateKey);
  return context[contextValue];
}

export function useContextDispatch<T>(context: Context<T>): StateFunction<T> {
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
