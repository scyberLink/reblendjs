/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenPropsUpdateType } from 'reblend-typing'
import { NodeUtil } from './NodeUtil'
import { NodeOperationUtil } from './NodeOperationUtil'
import { REBLEND_CHILDREN_WRAPPER_FOR_REACT_COMPONENT, REBLEND_WRAPPER_FOR_REACT_COMPONENT } from '../common/utils'
import { ElementUtil } from './ElementUtil'
import { Reblend } from './Reblend'

/**
 * A static class that extends the functionality of `BaseComponent`
 * to provide integration with React and Reblend.
 */
export class ReblendReactClass {
  [x: string]: any

  /**
   * Returns the virtual node (VNode) or children VNodes of the component, used in React's render function.
   *
   * @returns {VNode | VNodeChildren} The virtual node representing the component's HTML structure.
   */
  html(): ReblendTyping.ReblendNode {
    return (this.props as any).children
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
  async getChildrenWrapperForReact(): Promise<React.ReactElement> {
    return (await import('react')).default.createElement(
      'div',
      {
        [REBLEND_CHILDREN_WRAPPER_FOR_REACT_COMPONENT]: this.displayName || '',
        ref: async (node: HTMLElement & { childrenAttached?: boolean }) => {
          if (node) {
            if (!node.childrenAttached) {
              NodeUtil.extendPrototype(node, Reblend.prototype)
              node.childrenAttached = true
            }

            const children = this.reactElementChildren || []

            for (const child of children || []) {
              if (!node.contains(child)) {
                node.appendChild(child)
                setTimeout(() => NodeOperationUtil.connected(child), 0)
              }
            }
            this.reactElementChildrenWrapper = node
          } else {
            const children = this.reactElementChildren || []
            for (const child of children || []) {
              child.remove()
            }
            //NodeOperationUtil.detach(thiz.reactElementChildrenWrapper)
            this.reactElementChildrenWrapper = null
          }
        },
      },
      null,
    )
  }

  /**
   * Initializes the root for React DOM rendering if it has not been created already.
   */
  async initRoot() {
    const { default: ReactDOM } = await import('react-dom/client')

    if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
      this.reactDomCreateRoot_root = ReactDOM.createRoot(this as any)
    }
  }

  /**
   * Mounts the React Reblend component by rendering it using the React DOM root and creating a portal
   * to the standard Reblend React container.
   *
   * @protected
   */
  async reactReblendMount() {
    const { default: React } = await import('react')

    if (!this.ReactClass) {
      return
    }

    const children =
      !this.props?.children || !this.props?.children?.length ? undefined : await this.getChildrenWrapperForReact()

    await this.initRoot()

    //const warn = window.console.warn
    //const error = window.console.error
    //const log = window.console.log

    //window.console.warn = () => {}
    //window.console.error = () => {}
    //window.console.log = () => {}

    this.reactDomCreateRoot_root?.render(
      React.createElement(
        this.ReactClass,
        {
          ...this.props,
        },
        children,
      ),
    )

    //window.console.warn = warn
    //window.console.error = error
    //window.console.log = log
  }

  /**
   * Cleans up the component by resetting the React DOM root and calling the parent class's cleanup method.
   *
   */
  cleanUp(): void {
    this.reactDomCreateRoot_root?.unmount()
    this.reactDomCreateRoot_root = null as any
    /* //@ts-expect-error nothing
    super.cleanUp() */
  }
}
