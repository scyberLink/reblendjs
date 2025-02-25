/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

//@ts-expect-error might be missing
import { type Root } from 'react-dom/client'
//@ts-expect-error might be missing
import ReactDOM from 'react-dom/client'
import React from 'react'
//@ts-expect-error might be missing
import { createPortal, flushSync } from 'react-dom'
import { ChildrenPropsUpdateType } from 'reblend-typing'
import { NodeUtil } from './NodeUtil'
import { NodeOperationUtil } from './NodeOperationUtil'
import { REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME } from '../common/utils'

/**
 * A static class that extends the functionality of `BaseComponent`
 * to provide integration with React and Reblend.
 */
export class ReblendReactClass {
  reactDomCreateRoot_root?: Root
  props: any
  reblendReactStandardContainer!: HTMLElement
  childrenPropsUpdate!: any
  htmlElements!: any
  displayName!: string
  reactElementChildrenParent!: HTMLElement
  ReactClass: any
  reactElement!: any

  /**
   * Returns the virtual node (VNode) or children VNodes of the component, used in React's render function.
   *
   * @returns {VNode | VNodeChildren} The virtual node representing the component's HTML structure.
   */
  html(): ReblendTyping.ReblendNode {
    return (this.props as any).children
  }

  /**
   * Sets the container for rendering standard Reblend nodes and initializes the root React DOM.
   *
   * @param {HTMLElement} node - The HTML element to be set as the Reblend React standard container.
   */
  setReblendReactStandardContainer(node: HTMLElement): void {
    this.reblendReactStandardContainer = node
    this.initRoot()
  }

  /**
   * Initializes the root for React DOM rendering if it has not been created already.
   */
  initRoot(): void {
    if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
      this.reactDomCreateRoot_root = ReactDOM.createRoot(this)
    }
  }

  /**
   * Checks for any changes in the props and updates the component accordingly.
   * React Reblend nodes can trigger different updates based on the type of children or non-children changes.
   *
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if an invalid props update type is provided.
   */
  async checkPropsChange(): Promise<void> {
    for (const type of Array.from(this.childrenPropsUpdate || []).sort()) {
      this.childrenPropsUpdate?.delete(type)

      switch (type) {
        case ChildrenPropsUpdateType.CHILDREN:
          await (this as any).onStateChange()
          break

        case ChildrenPropsUpdateType.NON_CHILDREN:
          /* await */ this.reactReblendMount()
          break

        default:
          throw new Error('Invalid props update type provided')
      }
    }
  }

  /**
   * Returns a React element that wraps the children of the current component for rendering in React.
   * It ensures that child elements are properly attached to the standard parent container.
   *
   * @returns {React.ReactElement} The React element representing the children wrapper for React.
   */
  getChildrenWrapperForReact(): React.ReactElement {
    const children = this.htmlElements || []
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thiz = this
    const displayName = this.displayName || ''
    return React.createElement(
      class extends React.Component {
        containerRef: React.RefObject<HTMLDivElement>

        constructor(props) {
          super(props)
          this.containerRef = React.createRef()
        }

        componentDidMount(): void {
          if (this.containerRef.current) {
            const standardParent: HTMLElement = this.containerRef.current.parentElement!
            thiz.reactElementChildrenParent = standardParent
            let _afterNode: HTMLElement = this.containerRef.current
            for (const child of children || []) {
              if (NodeUtil.isStandard(child)) {
                _afterNode.after(child)
                _afterNode = child
                new Promise<void>((resolve) => {
                  NodeOperationUtil.attachElementsAt(child, child, null)
                  resolve()
                })
              } else {
                _afterNode = NodeOperationUtil.attachElementsAt(standardParent!, child, _afterNode) || _afterNode
              }
            }
            standardParent?.removeChild(this.containerRef.current!)
            delete (standardParent as any).removeChild
            ;(standardParent as any).removeChild = () => {}
            ;(<any>standardParent)._removeChild = (node) => HTMLElement.prototype.removeChild.call(standardParent, node)
          }
        }

        render() {
          return React.createElement(
            'div',
            {
              [REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME]: displayName,
              ref: this.containerRef,
            },
            null,
          )
        }
      },
    )
  }

  /**
   * Mounts the React Reblend component by rendering it using the React DOM root and creating a portal
   * to the standard Reblend React container.
   *
   * @protected
   */
  reactReblendMount(replacementAfterNode?: HTMLElement): void {
    this.catchErrorFrom(() => {
      if (!this.reblendReactStandardContainer || !this.ReactClass) {
        return
      }
      this.initRoot()

      const warn = window.console.warn
      const error = window.console.error
      const log = window.console.log

      window.console.warn = () => {}
      window.console.error = () => {}
      window.console.log = () => {}

      flushSync(() => {
        this.reactDomCreateRoot_root?.render(
          createPortal(
            React.createElement('div', {
              ref: (node) => {
                if ((node as any)?.refRunned) {
                  return
                }
                let childNodes = Array.from(node?.childNodes || [])
                if (node) {
                  if (replacementAfterNode) {
                    replacementAfterNode.after(node)
                  }
                  this.reactElement = []
                  let afterNode = node
                  const parent = node.parentElement
                  for (const child of childNodes) {
                    afterNode?.after(child)
                    afterNode = child as any
                    this.reactElement.push(child as any)
                  }
                  node.appendChild = (n: any) => {
                    const _afterNode = [...(this.reactElement || [])]
                      .reverse()
                      .find((reverseNode) => !!reverseNode.parentElement)
                    if (_afterNode) {
                      _afterNode?.after(n)
                    } else {
                      parent?.appendChild(n)
                    }
                    this.reactElement?.push(n)
                    return n
                  }
                  node.removeChild = (n: any) => {
                    n.remove()
                    const indexOfNInReactElement = this.reactElement?.indexOf(n!)

                    if (indexOfNInReactElement! > -1) {
                      // Remove the old node
                      this.reactElement?.splice(indexOfNInReactElement!, 1)
                    }
                    return n
                  }
                  node?.remove()
                  if (replacementAfterNode) {
                    replacementAfterNode.remove()
                  }
                  ;(node as any).refRunned = true
                } else {
                  childNodes.forEach((child) => {
                    const indexOfNInReactElement = this.reactElement?.indexOf(child as any)

                    if (indexOfNInReactElement! > -1) {
                      // Remove the old node
                      this.reactElement?.splice(indexOfNInReactElement!, 1)
                    }
                  })
                  childNodes = null as any
                }
              },
              style: { display: 'none' },
              children: React.createElement(this.ReactClass, {
                ...this.props,
                children: !(this.props as any)?.children?.length ? undefined : this.getChildrenWrapperForReact(),
              }),
            }),
            this.reblendReactStandardContainer,
          ),
        )
      })

      window.console.warn = warn
      window.console.error = error
      window.console.log = log
    })
  }
  catchErrorFrom(_arg0: () => void) {
    throw new Error('Method not implemented.')
  }

  /**
   * Cleans up the component by resetting the React DOM root and calling the parent class's cleanup method.
   *
   */
  cleanUp(): void {
    this.reactDomCreateRoot_root?.unmount()
    this.reactDomCreateRoot_root = null as any
    //@ts-expect-error nothing
    super.cleanUp()
  }
}
