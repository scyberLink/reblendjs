import { isEqual } from 'lodash';
const contextValue = Symbol('Reblend.contextValue');
const contextUpdater = Symbol('Reblend.contextUpdater');
const contextSubscrbers = Symbol('Reblend.contextSubscrbers');
const contextSubscrbe = Symbol('Reblend.contextSubscrbe');
const invalidContext = new Error('Invalid context');
export function useState(initial, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useState(...arguments);
}
export function useEffect(fn, dependencies, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useEffect(...arguments);
}
export function useReducer(reducer, initial, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useReducer(...arguments);
}
export function useMemo(fn, dependencies, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useMemo(...arguments);
}
export function useRef(initial, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useRef(...arguments);
}
export function useCallback(fn, ...dependencyStringAndOrStateKey) {
  //@ts-ignore
  return this.useCallback(...arguments);
}
export function useContext(context, ...dependencyStringAndOrStateKey) {
  if (
    !(
      contextSubscrbers in context ||
      contextValue in context ||
      contextSubscrbe in context
    )
  ) {
    throw invalidContext;
  }
  const stateID = dependencyStringAndOrStateKey.pop();
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
export function useContextDispatch(context, ...dependencyStringAndOrStateKey) {
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
export function createContext(initial) {
  const context = {
    [contextSubscrbers]: [],
    [contextValue]: initial,
    [contextUpdater](update) {
      const newValue =
        typeof update === 'function' ? update(context[contextValue]) : update;
      if (!isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue;
        context[contextSubscrbers].forEach(subscriber => {
          subscriber.component[subscriber.stateKey] = context[contextValue];
          //@ts-ignore
          subscriber.component.onStateChange();
        });
      }
    },
    [contextSubscrbe](component, stateKey) {
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
