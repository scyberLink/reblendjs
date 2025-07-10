/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseComponent } from './BaseComponent'
import { SharedConfig } from '../common/SharedConfig'
import { getConfig, rand } from '../common/utils'
import * as ReblendTyping from 'reblend-typing'
import { isPrimitive } from './NodeUtil'
import deepEqualIterative from 'reblend-deep-equal-iterative'

const contextValue = Symbol('Reblend.contextValue')
const contextReducer = Symbol('Reblend.contextReducer')
const contextInnerValue = Symbol('Reblend.contextInnerValue')
const contextValueInitial = Symbol('Reblend.contextValueInitial')
const contextSubscribers = Symbol('Reblend.contextSubscribers')
const contextSubscribe = Symbol('Reblend.contextSubscribe')
const contextSubscriberModificationTracker = Symbol('Reblend.contextSubscriberModificationTracker')

/**
 * Enum representing different cache storage types.
 */
export enum CacheType {
  MEMORY,
  SESSION,
  LOCAL,
}

/**
 * Options for configuring behavior for a context.
 *
 * @typedef {object} Cache
 * @property {CacheOption} cache - The caching option
 * @property {ReblendTyping.StateFunction} updater - The reducer for the context
 */
type Config<S = any, A = any> = { cache: CacheOption; reducer?: ReblendTyping.StateReducerFunction<S, A> }

/**
 * Options for configuring caching behavior for a context.
 *
 * @typedef {object} CacheOption
 * @property {CacheType} type - The type of cache storage (e.g., MEMORY, SESSION, LOCAL).
 * @property {string} key - The key used to store/retrieve the cached data.
 */
type CacheOption = {
  type: CacheType
  key: string
}

type ContextSubscriber<S = any, A = any> = {
  component: BaseComponent
  stateKey: string
  reducer?: Config<S, A>['reducer']
}

/**
 * Represents a context object in Reblend, tracking state and subscribers.
 *
 * @template T - The type of the context value.
 * @typedef {object} Context<T>
 * @property {Set<ContextSubscriber>} [contextSubscribers] - Array of components subscribed to this context and their state keys.
 * @property {T} [contextValue] - The current value of the context.
 * @property {T} [contextValueInitial] - The initial value of the context.
 * @property {T} [contextInnerValue] - The actual stored value, potentially synced with cache.
 * @property {Config['cache']} [contextReducer] - The reducer.
 * @property {number[]} [contextSubscriberModificationTracker] - Tracker for subscriber modifications.
 * @property {Function} reset - Resets the context value to the initial value.
 * @property {Function} getValue - Retrieves the current context value.
 * @property {Function} isEqual - Checks if a given value is equal to the current context value.
 * @property {Function} update - Updates the context value and notifies subscribers.
 * @property {Function} [contextSubscribe] - Subscribes a component to this context with a given state key.
 */
export type Context<T, S = any, A = any> = {
  [contextSubscribers]: Set<ContextSubscriber>
  [contextValue]: T
  [contextValueInitial]: T
  [contextInnerValue]: T
  [contextReducer]?: Config<S, A>['reducer']
  [contextSubscriberModificationTracker]: number[]
  reset: () => void
  getValue: () => T
  isEqual: (value: T) => boolean
  update(updateValue: T, force?: boolean): Promise<boolean>
  [contextSubscribe](subscriber: ContextSubscriber): void
}

/**
 * Hook to manage state within a Reblend component.
 *
 * @template T - The type of the state value.
 * @param {T} initial - The initial state value.
 * @returns {[T, ReblendTyping.StateFunction<T>]} - Returns the current state and a function to update it.
 * @Note The function signature is not same as Reblend.useState because this is meant to be used in functional component which will be transpiled.
 */
export function useState<T>(initial: T): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useState(...arguments)
}

/**
 * Hook to perform side effects within a Reblend component.
 *
 * @param {ReblendTyping.StateEffectiveFunction} fn - The effect function to run.
 * @param {any} [dependencies] - Optional dependency or array of dependencies to control when the effect runs.
 * @Note The function signature is not same as Reblend.useEffect because this is meant to be used in functional component which will be transpiled.
 */
export function useEffect<T>(fn: ReblendTyping.StateEffectiveFunction<T>, dependencies?: T): void {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useEffect(...arguments)
}

/**
 * Hook to perform side effects within a Reblend component after children populate or after state change.
 *
 * @param {ReblendTyping.StateEffectiveFunction} fn - The effect function to run.
 * @param {any} [dependencies] - Optional dependency or array of dependencies to control when the effect runs.
 * @Note The function signature is not same as Reblend.useEffectAfter because this is meant to be used in functional component which will be transpiled.
 */
export function useEffectAfter<T>(fn: ReblendTyping.StateEffectiveFunction<T>, dependencies?: T): void {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useEffectAfter(...arguments)
}

/**
 * Effect hook for performing side effects or have access to previous and current props useful within custom hooks.
 *
 * @param {ReblendTyping.StateEffectiveFunction} fn - The effect function to run.
 * @Note The function signature is not same as Reblend.useProps because this is meant to be used in functional component which will be transpiled.
 */
export function useProps<T>(fn: ReblendTyping.StateEffectiveFunction<T>): void {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useProps(...arguments)
}

/**
 * Hook to manage reducer-based state within a Reblend component.
 *
 * @template T - The type of the state value.
 * @template I - The type of the action passed to the reducer.
 * @param {ReblendTyping.StateReducerFunction<T, I>} reducer - The reducer function to apply actions to state.
 * @param {T} initial - The initial state value.
 * @returns {[T, ReblendTyping.StateFunction<T>]} - Returns the current state and a function to dispatch actions.
 * @Note The function signature is not same as Reblend.useReducer because this is meant to be used in functional component which will be transpiled.
 */
export function useReducer<T, I>(
  reducer: ReblendTyping.StateReducerFunction<T, I>,
  initial: T,
): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useReducer(...arguments)
}

/**
 * Hook to create memoized values within a Reblend component.
 *
 * @template T - The type of the memoized value.
 * @param {ReblendTyping.StateEffectiveMemoFunction<T>} fn - The function to compute the memoized value.
 * @param {any} [dependencies] - Optional dependency or array of dependencies to control memoization.
 * @returns {T} - The memoized value.
 * @Note The function signature is not same as Reblend.useMemo because this is meant to be used in functional component which will be transpiled.
 */
export function useMemo<T, E>(fn: ReblendTyping.StateEffectiveMemoFunction<T, E>, dependencies?: E): T {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useMemo(...arguments)
}

/**
 * Hook to create a mutable reference object within a Reblend component.
 *
 * @template T - The type of the ref value.
 * @param {T} [initial] - The initial ref value.
 * @returns {ReblendTyping.Ref<T>} - Returns a reference object with the current value.
 */
export function useRef<T>(initial?: T): ReblendTyping.Ref<T> {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return !this
    ? BaseComponent.createRef(...arguments)
    : //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
      this.useRef(...arguments)
}

/**
 * Bind callback function to the current component.
 *
 * @param {Function} fn - The callback function to be bound to this
 * @returns {Function} - The bounded callback function.
 * @Note This function is just here for compatibility with Reactjs it same as regular function define inside function component
 */
export function useCallback<T extends (...args: any[]) => any>(fn: T): T {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useCallback(...arguments)
}

/**
 * Hook to subscribe to a context and get its current value.
 *
 * @template T - The type of the context value.
 * @param {Context<T>} context - The context to subscribe to.
 * @param {string} stateKey - State key.
 * @returns {[T, (arg: T) => Promise<void>]} - Returns the current context value and a function to update it.
 * @throws Will throw an error if the context is invalid
 * @Note State key is optional because this function is assume to be called in a functional component which is meant to be transpile
 */
export function useContext<T>(context: Context<T>, stateKey?: string): [T, (arg: T) => Promise<boolean>] {
  if (
    !(
      contextValue in context &&
      contextInnerValue in context &&
      contextReducer in context &&
      contextValueInitial in context &&
      contextSubscribers in context &&
      contextSubscribe in context &&
      contextSubscriberModificationTracker in context
    )
  ) {
    throw new Error('Invalid context')
  }

  if (!stateKey) {
    throw new Error('State Identifier/Key not specified')
  }

  if (typeof stateKey !== 'string') {
    throw new Error('Invalid state key. Make sure you are calling useContext correctly')
  }
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  context[contextSubscribe]({ component: this, stateKey: stateKey })
  return [context[contextValue], context.update]
}

/**
 * Function to create a new context with an initial value.
 * Optionally, you can specify cache options for storing the context value in session or local storage.
 *
 * @template T - The type of the context value.
 * @param {T} initial - The initial value of the context.
 * @param {CacheOption} [cacheOption] - Optional caching options.
 * @returns {Context<T>} - The created context object.
 */
export function createContext<T, S = any, A = any>(initial: T, config?: Config): Context<T> {
  const context: Context<T, S, A> = {
    [contextSubscribers]: new Set(),
    [contextSubscriberModificationTracker]: [],
    [contextInnerValue]: (() => {
      const cacheOption = config?.cache as CacheOption | undefined
      if (!(cacheOption && cacheOption.type && cacheOption.key)) {
        return initial
      }

      let value
      switch (cacheOption.type) {
        case CacheType.SESSION:
          value = SharedConfig.getSessionData(cacheOption.key)
          break

        case CacheType.LOCAL:
          value = SharedConfig.getLocalData(cacheOption.key)
          break

        default:
          break
      }

      return value === undefined || value === null ? initial : value
    })(),
    set [contextValue](value: T) {
      const cacheOption = config?.cache as CacheOption | undefined
      if (cacheOption && cacheOption.type && cacheOption.key) {
        switch (cacheOption.type) {
          case CacheType.SESSION:
            SharedConfig.setSessionData(cacheOption.key, value)
            break

          case CacheType.LOCAL:
            SharedConfig.setLocalData(cacheOption.key, value)
            break

          default:
            break
        }
      }
      context[contextInnerValue] = value
    },
    get [contextValue]() {
      return context[contextInnerValue]
    },
    async update(updateValue: T, force = false) {
      const reducer = context[contextReducer]
      updateValue = (reducer ? await reducer(context[contextValue] as any, updateValue as any) : updateValue) as T
      if (force || updateValue !== context[contextValue]) {
        context[contextValue] = updateValue
        const updateId = rand(123456789, 987654321)
        context[contextSubscriberModificationTracker].unshift(updateId)
        for (const { component, stateKey } of context[contextSubscribers]) {
          if (context[contextSubscriberModificationTracker][0] === updateId) {
            ;(component.state as object)[stateKey] = context[contextValue]
            if (component.attached) {
              if (force) {
                component.forceEffects = true
              }
              await component.onStateChange()
            }
          } else {
            context[contextSubscriberModificationTracker] = []
            break
          }
        }
        return true
      }
      return false
    },
    [contextSubscribe](subscriber) {
      if (!subscriber.component || isPrimitive(subscriber.component)) {
        throw new Error('Invalid component or object')
      }
      if (!subscriber.stateKey) {
        throw new Error('Invalid state key')
      }
      const destructor = () => {
        context[contextSubscribers].delete(subscriber)
      }
      context[contextSubscribers].add(subscriber)
      if (subscriber.component instanceof Node) {
        subscriber.component.addHookDisconnectedEffect(destructor)
      } else if ((subscriber.component as any).addHookDisconnectedEffect) {
        ;(subscriber.component as any).addHookDisconnectedEffect(destructor)
      }
    },
    [contextValueInitial]: initial,
    [contextReducer]: config?.reducer,
    reset() {
      context[contextValue] = context[contextValueInitial]
    },
    getValue() {
      return context[contextValue]
    },
    isEqual(value: T) {
      return deepEqualIterative(value, context[contextValue], getConfig().diffConfig || {})
    },
  }
  return context
}
