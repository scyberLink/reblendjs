/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEqual } from 'lodash'
import { BaseComponent } from './BaseComponent'
import { ReblendTyping } from 'reblend-typing'

const contextValue = Symbol('Reblend.contextValue')
const contextValueInitial = Symbol('Reblend.contextValueInitial')
const contextSubscribers = Symbol('Reblend.contextSubscrbers')
const contextSubscribe = Symbol('Reblend.contextSubscribe')

export type Context<T> = {
  [contextSubscribers]: Map<BaseComponent, string>
  [contextValue]: T
  [contextValueInitial]: T
  reset: () => void
  getValue: () => T
  update(update: ReblendTyping.StateFunctionValue<T>): void
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

export function useContext<T>(context: Context<T>, ...dependencyStringAndOrStateKey: string[]): T {
  if (!(contextSubscribers in context || contextValue in context || contextSubscribe in context)) {
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
  return context[contextValue]
}

export function createContext<T>(initial: T): Context<T> {
  const context: Context<T> = {
    [contextSubscribers]: new Map<BaseComponent, string>(),
    [contextValue]: initial,
    update(update: ReblendTyping.StateFunctionValue<T>) {
      const newValue = typeof update === 'function' ? (update as (v: T) => T)(context[contextValue]) : update
      if (!isEqual(newValue, context[contextValue])) {
        context[contextValue] = newValue
        context[contextSubscribers].forEach((stateKey, component) => {
          component[stateKey] = context[contextValue]
          //if (!component.stateEffectRunning) {
          component.onStateChange()
          //}
        })
      }
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
  }
  return context
}
