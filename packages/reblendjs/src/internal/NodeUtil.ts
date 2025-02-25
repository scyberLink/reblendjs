/* eslint-disable @typescript-eslint/no-explicit-any */
import { REBLEND_PRIMITIVE_ELEMENT_NAME } from 'reblend-typing'
import { isCallable } from '../common/utils'
import { Reblend } from './Reblend'

type SymbolsType = {
  ReblendNode: symbol
  ReblendVNode: symbol
  ReactToReblendNode: symbol
  ReactToReblendVNode: symbol
  ReblendNodeStandard: symbol
  ReblendVNodeStandard: symbol
}

const Symbols: SymbolsType = {
  ReblendNode: Symbol('Reblend.Node'),
  ReblendVNode: Symbol('Reblend.VNode'),
  ReactToReblendNode: Symbol('React.Reblend.Node'),
  ReactToReblendVNode: Symbol('React.Reblend.VNode'),
  ReblendNodeStandard: Symbol('Reblend.Node.Standard'),
  ReblendVNodeStandard: Symbol('Reblend.VNode.Standard'),
}

export class NodeUtil {
  static addSymbol(type: keyof SymbolsType, obj: object) {
    const symb = Symbols[type]

    if (!obj || !symb) {
      return false
    }

    obj[symb] = true
    return obj[symb]
  }

  /**
   * Checks if the provided node is a rendered Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a rendered Reblend node, otherwise `false`.
   */
  static isReblendRenderedNode(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReblendNode]
  }

  /**
   * Checks if the provided node is a virtual Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a virtual Reblend node, otherwise `false`.
   */
  static isReblendVirtualNode(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReblendVNode]
  }

  /**
   * Checks if the provided node is a standard rendered Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard rendered Reblend node, otherwise `false`.
   */
  static isReblendRenderedNodeStandard(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReblendNodeStandard]
  }

  /**
   * Checks if the provided node is a standard virtual Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard virtual Reblend node, otherwise `false`.
   */
  static isReblendVirtualNodeStandard(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReblendVNodeStandard]
  }

  /**
   * Checks if the provided node is a React to Reblend rendered node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a React to Reblend rendered node, otherwise `false`.
   */
  static isReactToReblendRenderedNode(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReactToReblendNode]
  }

  /**
   * Checks if the provided node is a React to Reblend virtual node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a React to Reblend virtual node, otherwise `false`.
   */
  static isReactToReblendVirtualNode(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReactToReblendVNode]
  }

  /**
   * Checks if the provided node is a standard virtual node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard virtual node, otherwise `false`.
   */
  static isStandardVirtualNode(node: any): boolean {
    return node && typeof node === 'object' && node![Symbols.ReblendVNodeStandard]
  }

  /**
   * Checks if the provided element is a Reblend primitive element.
   *
   * @param {any} element - The element to check.
   * @returns {boolean} `true` if the element is a Reblend primitive element, otherwise `false`.
   */
  static isReblendPrimitiveElement(element: any): boolean {
    return !NodeUtil.isPrimitive(element) && element.displayName === REBLEND_PRIMITIVE_ELEMENT_NAME
  }

  /**
   * Checks if the provided data is a primitive type.
   * Primitive types include string, number, boolean, bigint, null, undefined, and symbol.
   *
   * @param {any} data - The data to check.
   * @returns {boolean} `true` if the data is a primitive, otherwise `false`.
   */
  static isPrimitive(data: any): boolean {
    const primitves = ['string', 'number', 'boolean', 'bigint', 'null', 'undefined', 'symbol']
    const dataType = typeof data
    return primitves.some((primitve) => primitve === (data === null ? 'null' : dataType))
  }

  /**
   * Checks if the given object is an array-like structure by verifying that it contains array-specific methods and properties.
   *
   * @param {unknown} obj - The object to check.
   * @returns {boolean} `true` if the object is an array-like structure, otherwise `false`.
   */
  static isArray(obj: unknown): boolean {
    const arrayProperties = ['pop', 'push', 'length', 'shift', 'unshift', 'splice', 'slice', 'find', 'includes']
    return typeof obj === 'object' && arrayProperties.every((property) => property in obj!)
  }

  /**
   * Checks if the provided display name represents a React node.
   *
   * @param {IAny} displayName - The display name to check.
   * @returns {boolean} `true` if the display name represents a React node, otherwise `false`.
   */
  static isReactNode(displayName: IAny): boolean {
    return (
      displayName &&
      typeof displayName !== 'string' &&
      ('$$typeof' in displayName ||
        (displayName.prototype && displayName.prototype.isReactComponent) ||
        (isCallable(displayName) && !(displayName instanceof Reblend)))
    )
  }

  /**
   * Checks if a node is a standard HTML element or a Reblend primitive element.
   *
   * @param {ReblendTyping.Component | HTMLElement} node - The node to check.
   * @returns {boolean} - True if the node is standard or a Reblend primitive element, false otherwise.
   */
  static isStandard(node: ReblendTyping.Component | HTMLElement) {
    if (!node) {
      return false
    }
    return NodeUtil.isReblendRenderedNodeStandard(node) || NodeUtil.isReblendPrimitiveElement(node)
  }

  /**
   * Checks if a node is a Reblend HTML element or a Reblend React HTML element.
   *
   * @param {ReblendTyping.Component | HTMLElement} node - The node to check.
   * @returns {boolean} - True if the node is Reblend or a Reblend React element, false otherwise.
   */
  static isNonStandard(node: ReblendTyping.Component | HTMLElement) {
    if (!node) {
      return false
    }
    return NodeUtil.isReblendRenderedNode(node) || NodeUtil.isReactToReblendRenderedNode(node)
  }

  /**
   * Determines if a given node is a text node.
   *
   * @param {Node} node - The node to check.
   * @returns {boolean} - True if the node is a text node, otherwise false.
   */
  static isTextNode(node: Node): node is Text {
    return node?.nodeType === Node.TEXT_NODE
  }

  /**
   * Checks whether the given data is empty (undefined or null).
   *
   * @param {*} data - The data to check.
   * @returns {boolean} - True if the data is empty, otherwise false.
   */
  static isEmpty(data: any) {
    return data === undefined || data === null
  }

  /**
   * Extends the prototype of the target object with the provided prototype, skipping constructors and existing functions.
   *
   * @param {any} target - The target object to extend.
   * @param {any} prototype - The prototype object to copy properties and methods from.
   */
  static extendPrototype(target: any, prototype: any): void {
    // If there's a prototype chain, continue copying from the prototype chain
    const proto = Object.getPrototypeOf(prototype)
    if (proto && proto !== Object.prototype) {
      NodeUtil.extendPrototype(target, proto)
    }

    const descriptors = Object.getOwnPropertyDescriptors(prototype)

    for (const key in descriptors) {
      if (Object.prototype.hasOwnProperty.call(descriptors, key)) {
        // Skip the constructor
        if (key === 'constructor') continue

        const descriptor = descriptors[key]

        // Avoid replacing existing functions on the target
        //if (!(key in target) || (typeof descriptor.value !== 'function' && !(key in target))) {
        Object.defineProperty(target, key, descriptor)
        //}
      }
    }
  }
}
