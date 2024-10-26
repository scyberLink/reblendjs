/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEqual } from 'lodash'
import { BaseComponent } from './BaseComponent'
import { ReblendTyping } from 'reblend-typing'
import { SharedConfig } from '../common/SharedConfig'
import { rand } from '../common/utils'

const contextValue = Symbol('Reblend.contextValue')
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

type ContextSubriber = {
  component: BaseComponent
  stateKey: string
}

/**
 * Represents a context object in Reblend, tracking state and subscribers.
 *
 * @template T - The type of the context value.
 * @typedef {object} Context<T>
 * @property {Array<ContextSubriber>} [contextSubscribers] - Array of components subscribed to this context and their state keys.
 * @property {T} [contextValue] - The current value of the context.
 * @property {T} [contextValueInitial] - The initial value of the context.
 * @property {T} [contextInnerValue] - The actual stored value, potentially synced with cache.
 * @property {number[]} [contextSubscriberModificationTracker] - Tracker for subscriber modifications.
 * @property {Function} reset - Resets the context value to the initial value.
 * @property {Function} getValue - Retrieves the current context value.
 * @property {Function} isEqual - Checks if a given value is equal to the current context value.
 * @property {Function} update - Updates the context value and notifies subscribers.
 * @property {Function} [contextSubscribe] - Subscribes a component to this context with a given state key.
 */
export type Context<T> = {
  [contextSubscribers]: ContextSubriber[]
  [contextValue]: T
  [contextValueInitial]: T
  [contextInnerValue]: T
  [contextSubscriberModificationTracker]: number[]
  reset: () => void
  getValue: () => T
  isEqual: (value: T) => boolean
  update(updateValue: ReblendTyping.StateFunctionValue<T>, force?: boolean): Promise<boolean>
  [contextSubscribe](subscriber: ContextSubriber): void
}

const invalidContext = new Error('Invalid context')

/**
 * Hook to manage state within a Reblend component.
 *
 * @template T - The type of the state value.
 * @param {T} _initial - The initial state value.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {[T, ReblendTyping.StateFunction<T>]} - Returns the current state and a function to update it.
 */
export function useState<T>(
  _initial: T,
  ..._dependencyStringAndOrStateKey: string[]
): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useState(...arguments)
}

/**
 * Hook to perform side effects within a Reblend component.
 *
 * @param {ReblendTyping.StateEffectiveFunction} _fn - The effect function to run.
 * @param {any[]} [_dependencies] - Optional array of dependencies to control when the effect runs.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 */
export function useEffect(
  _fn: ReblendTyping.StateEffectiveFunction,
  _dependencies?: any[],
  ..._dependencyStringAndOrStateKey: string[]
): void {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useEffect(...arguments)
}

/**
 * Hook to manage reducer-based state within a Reblend component.
 *
 * @template T - The type of the state value.
 * @template I - The type of the action passed to the reducer.
 * @param {ReblendTyping.StateReducerFunction<T, I>} _reducer - The reducer function to apply actions to state.
 * @param {T} _initial - The initial state value.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {[T, ReblendTyping.StateFunction<T>]} - Returns the current state and a function to dispatch actions.
 */
export function useReducer<T, I>(
  _reducer: ReblendTyping.StateReducerFunction<T, I>,
  _initial: T,
  ..._dependencyStringAndOrStateKey: string[]
): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useReducer(...arguments)
}

/**
 * Hook to create memoized values within a Reblend component.
 *
 * @template T - The type of the memoized value.
 * @param {ReblendTyping.StateEffectiveMemoFunction<T>} _fn - The function to compute the memoized value.
 * @param {any[]} [_dependencies] - Optional array of dependencies to control memoization.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {T} - The memoized value.
 */
export function useMemo<T>(
  _fn: ReblendTyping.StateEffectiveMemoFunction<T>,
  _dependencies?: any[],
  ..._dependencyStringAndOrStateKey: string[]
): T {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useMemo(...arguments)
}

/**
 * Hook to create a mutable reference object within a Reblend component.
 *
 * @template T - The type of the ref value.
 * @param {T} [_initial] - The initial ref value.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {ReblendTyping.Ref<T>} - Returns a reference object with the current value.
 */
export function useRef<T>(_initial?: T, ..._dependencyStringAndOrStateKey: string[]): ReblendTyping.Ref<T> {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useRef(...arguments)
}

/**
 * Hook to memoize a callback function within a Reblend component.
 *
 * @param {Function} _fn - The callback function to memoize.
 * @param {string[]} _dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {Function} - The memoized callback function.
 */
export function useCallback(_fn: () => any, ..._dependencyStringAndOrStateKey: string[]): () => any {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useCallback(...arguments)
}

/**
 * Hook to subscribe to a context and get its current value.
 *
 * @template T - The type of the context value.
 * @param {Context<T>} context - The context to subscribe to.
 * @param {string[]} dependencyStringAndOrStateKey - Optional dependencies and state keys for tracking.
 * @returns {[T, ReblendTyping.StateFunction<T>]} - Returns the current context value and a function to update it.
 * @throws Will throw an error if the context is invalid or if a state key is not provided.
 */
export function useContext<T>(
  context: Context<T>,
  ...dependencyStringAndOrStateKey: string[]
): [T, ReblendTyping.StateFunction<T>] {
  if (
    !(
      contextValue in context &&
      contextInnerValue in context &&
      contextValueInitial in context &&
      contextSubscribers in context &&
      contextSubscribe in context &&
      contextSubscriberModificationTracker in context
    )
  ) {
    throw invalidContext
  }
  const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

  if (!stateID) {
    //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
    throw this.stateIdNotIncluded
  }

  if (typeof stateID !== 'string') {
    throw new Error('Invalid state key. Make sure you are calling useContext correctly')
  }
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  context[contextSubscribe]({ component: this, stateKey: stateID })
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
export function createContext<T>(initial: T, cacheOption?: CacheOption): Context<T> {
  const context: Context<T> = {
    [contextSubscribers]: [],
    [contextSubscriberModificationTracker]: [],
    [contextInnerValue]: (() => {
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
    async update(updateValue: ReblendTyping.StateFunctionValue<T>, force = false) {
      const newValue =
        typeof updateValue === 'function' ? (updateValue as (v: T) => T)(context[contextValue]) : updateValue
      if (force || !isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue
        const updateId = rand(123456789, 987654321)
        context[contextSubscriberModificationTracker].unshift(updateId)
        const alreadyDisconnected: BaseComponent[] = []
        for (const { component, stateKey } of context[contextSubscribers]) {
          if (context[contextSubscriberModificationTracker][0] === updateId) {
            component[stateKey] = context[contextValue]
            if (!component.hasDisconnected) {
              if (component.attached) {
                if (!component.stateEffectRunning) {
                  component.onStateChange && (await component.onStateChange())
                } else {
                  component.applyEffects && component.applyEffects()
                }
              } else {
                component.onMountEffects?.push(() => {
                  if (!component.stateEffectRunning) {
                    component.onStateChange && component.onStateChange()
                  } else {
                    component.applyEffects && component.applyEffects()
                  }
                })
              }
            } else {
              alreadyDisconnected.push(component)
            }
          } else {
            context[contextSubscriberModificationTracker] = []
            break
          }
        }

        for (const disco of alreadyDisconnected) {
          context[contextSubscribers] = context[contextSubscribers].filter((sub) => sub.component !== disco)
        }

        return true
      }
      return false
    },
    [contextSubscribe](subscriber) {
      if (!subscriber.component) {
        throw new Error('Invalid component')
      }
      if (!subscriber.stateKey) {
        throw new Error('Invalid state key')
      }
      const destructor = () => {
        context[contextSubscribers] = context[contextSubscribers].filter(
          (subs) => subs.component !== subscriber.component,
        )
      }
      context[contextSubscribers].push(subscriber)
      subscriber.component.addDisconnectedEffect && subscriber.component.addDisconnectedEffect(destructor)
    },
    [contextValueInitial]: initial,
    reset() {
      context[contextValue] = context[contextValueInitial]
    },
    getValue() {
      return context[contextValue]
    },
    isEqual(value: T) {
      return isEqual(value, context[contextValue])
    },
  }
  return context
}
