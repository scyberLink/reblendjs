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
const contextSubscribers = Symbol('Reblend.contextSubscrbers')
const contextSubscribe = Symbol('Reblend.contextSubscribe')
const contextSubscriberModificationTracker = Symbol('Reblend.contextSubscriberModificationTracker')

export enum CacheType {
  MEMORY,
  SESSION,
  LOCAL,
}

type CacheOption = {
  type: CacheType
  key: string
}

export type Context<T> = {
  [contextSubscribers]: Map<BaseComponent, string>
  [contextValue]: T
  [contextValueInitial]: T
  [contextInnerValue]: T
  [contextSubscriberModificationTracker]: number[]
  reset: () => void
  getValue: () => T
  isEqual: (value: T) => boolean
  update(updateValue: ReblendTyping.StateFunctionValue<T>): Promise<boolean>
  [contextSubscribe](component: BaseComponent, stateKey: string): void
}

const invalidContext = new Error('Invalid context')

export function useState<T>(
  _initial: T,
  ..._dependencyStringAndOrStateKey: string[]
): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useState(...arguments)
}

export function useEffect(
  _fn: ReblendTyping.StateEffectiveFunction,
  _dependencies?: any[],
  ..._dependencyStringAndOrStateKey: string[]
): void {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useEffect(...arguments)
}

export function useReducer<T, I>(
  _reducer: ReblendTyping.StateReducerFunction<T, I>,
  _initial: T,
  ..._dependencyStringAndOrStateKey: string[]
): [T, ReblendTyping.StateFunction<T>] {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useReducer(...arguments)
}

export function useMemo<T>(
  _fn: ReblendTyping.StateEffectiveMemoFunction<T>,
  _dependencies?: any[],
  ..._dependencyStringAndOrStateKey: string[]
): T {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useMemo(...arguments)
}

export function useRef<T>(_initial?: T, ..._dependencyStringAndOrStateKey: string[]): ReblendTyping.Ref<T> {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useRef(...arguments)
}

export function useCallback(_fn: () => any, ..._dependencyStringAndOrStateKey: string[]): () => any {
  //@ts-expect-error `this` refers to Reblend Component in which this hook is bound to
  return this.useCallback(...arguments)
}

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
  context[contextSubscribe](this, stateID)
  return [context[contextValue], context.update]
}

export function createContext<T>(initial: T, cacheOption?: CacheOption): Context<T> {
  const context: Context<T> = {
    [contextSubscribers]: new Map<BaseComponent, string>(),
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
    async update(updateValue: ReblendTyping.StateFunctionValue<T>) {
      const newValue =
        typeof updateValue === 'function' ? (updateValue as (v: T) => T)(context[contextValue]) : updateValue
      if (!isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue
        const updateId = rand(123456789, 987654321)
        context[contextSubscriberModificationTracker].unshift(updateId)

        for (const [component, stateKey] of context[contextSubscribers]) {
          if (context[contextSubscriberModificationTracker][0] === updateId) {
            component[stateKey] = context[contextValue]
            if (!component.stateEffectRunning && component.attached) {
              //Promise.resolve().then(() => {
              await component.onStateChange()
              //})
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
    [contextSubscribe](component: BaseComponent, stateKey: string) {
      if (!component) {
        throw new Error('Invalid component')
      }
      if (!stateKey) {
        throw new Error('Invalid state key')
      }
      const destructor = () => {
        context[contextSubscribers].delete(component)
      }
      context[contextSubscribers].set(component, stateKey)
      component.addDisconnectedEffect(destructor)
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
