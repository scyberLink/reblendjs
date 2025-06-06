/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cssObjectFromString,
  cssString,
  REBLEND_CHILDREN_WRAPPER_FOR_REACT_COMPONENT,
  REBLEND_COMPONENT,
  REBLEND_WRAPPER_FOR_REACT_COMPONENT,
} from '../common/utils'

type ElementStyles = { [elementQuerySelector: string]: CSSStyleDeclaration }
class StyleUtil {
  static instance: StyleUtil
  elementStyles: ElementStyles = {
    [`[${REBLEND_COMPONENT}], [${REBLEND_WRAPPER_FOR_REACT_COMPONENT}], [${REBLEND_CHILDREN_WRAPPER_FOR_REACT_COMPONENT}]`]:
      { display: 'contents !important' } as any,
  }
  styleElement!: HTMLStyleElement

  constructor() {
    if (StyleUtil.instance) {
      return StyleUtil.instance
    } else {
      this.init()
      StyleUtil.instance = this
    }
  }

  init() {
    this.styleElement = document.createElement('style')
    document.head.appendChild(this.styleElement)
    this.refresh()
  }

  update(elementQuerySelector: string, style: CSSStyleDeclaration | string) {
    if (!elementQuerySelector) {
      throw new Error('Invalid query selector or style')
    }

    const styleObject: CSSStyleDeclaration = typeof style === 'string' ? cssObjectFromString(style) : style

    this.elementStyles[elementQuerySelector] = {
      ...this.elementStyles[elementQuerySelector],
      ...styleObject,
    }
    this.refresh()
  }

  remove(elementQuerySelector: string, styleKey: string) {
    this.elementStyles[elementQuerySelector] && delete this.elementStyles[elementQuerySelector][styleKey]
    this.refresh()
  }

  refresh() {
    const textContent: string[] = []
    for (const [querySelector, elementStyle] of Object.entries(this.elementStyles)) {
      textContent.push(`${querySelector} {${cssString(elementStyle)}}\n\n`)
    }
    this.styleElement.textContent = textContent.join('')
  }
}

export { type StyleUtil as StyleUtilType }
export { StyleUtil }
