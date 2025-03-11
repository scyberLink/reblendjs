import * as CSS from 'csstype';
import * as PropTypes from 'prop-types';
import React from 'react';
declare global {
  /**
   * Represents a generic event in the DOM.
   *
   * @interface Event
   * @typedef {Event}
   */
  interface Event {}
  /**
   * Represents an event triggered by CSS animations.
   *
   * @interface AnimationEvent
   * @typedef {AnimationEvent}
   * @extends {Event}
   */
  interface AnimationEvent extends Event {}
  /**
   * Represents an event triggered by interactions with the clipboard (e.g., cut, copy, paste).
   *
   * @interface ClipboardEvent
   * @typedef {ClipboardEvent}
   * @extends {Event}
   */
  interface ClipboardEvent extends Event {}
  /**
   * Represents an event triggered by input composition (e.g., for non-Latin text).
   *
   * @interface CompositionEvent
   * @typedef {CompositionEvent}
   * @extends {Event}
   */
  interface CompositionEvent extends Event {}
  /**
   * Represents an event related to drag-and-drop operations.
   *
   * @interface DragEvent
   * @typedef {DragEvent}
   * @extends {Event}
   */
  interface DragEvent extends Event {}
  /**
   * Represents an event triggered when an element gains or loses focus.
   *
   * @interface FocusEvent
   * @typedef {FocusEvent}
   * @extends {Event}
   */
  interface FocusEvent extends Event {}
  /**
   * Represents an event triggered by keyboard input.
   *
   * @interface KeyboardEvent
   * @typedef {KeyboardEvent}
   * @extends {Event}
   */
  interface KeyboardEvent extends Event {}
  /**
   * Represents an event triggered by mouse interactions.
   *
   * @interface MouseEvent
   * @typedef {MouseEvent}
   * @extends {Event}
   */
  interface MouseEvent extends Event {}
  /**
   * Represents an event triggered by touch interactions on touch devices.
   *
   * @interface TouchEvent
   * @typedef {TouchEvent}
   * @extends {Event}
   */
  interface TouchEvent extends Event {}
  /**
   * Represents an event triggered by pointer device interactions (e.g., mouse, pen, touch).
   *
   * @interface PointerEvent
   * @typedef {PointerEvent}
   * @extends {Event}
   */
  interface PointerEvent extends Event {}
  /**
   * Represents an event triggered by CSS transitions.
   *
   * @interface TransitionEvent
   * @typedef {TransitionEvent}
   * @extends {Event}
   */
  interface TransitionEvent extends Event {}
  /**
   * Represents a user interface event in the DOM.
   *
   * @interface UIEvent
   * @typedef {UIEvent}
   * @extends {Event}
   */
  interface UIEvent extends Event {}
  /**
   * Represents an event triggered by the scrolling of a mouse wheel or similar device.
   *
   * @interface WheelEvent
   * @typedef {WheelEvent}
   * @extends {Event}
   */
  interface WheelEvent extends Event {}
  /**
   * Represents a DOM object that can receive events.
   *
   * @interface EventTarget
   * @typedef {EventTarget}
   */
  interface EventTarget {}
  /**
   * Represents the HTML document in the DOM.
   *
   * @interface Document
   * @typedef {Document}
   */
  interface Document {}
  /**
   * Represents the data transferred during a drag-and-drop operation.
   *
   * @interface DataTransfer
   * @typedef {DataTransfer}
   */
  interface DataTransfer {}
  /**
   * Represents the media queries associated with the current document.
   *
   * @interface StyleMedia
   * @typedef {StyleMedia}
   */
  interface StyleMedia {}
  /**
   * Represents an HTML anchor element (`<a>`).
   *
   * @interface HTMLAnchorElement
   * @typedef {HTMLAnchorElement}
   * @extends {HTMLElement}
   */
  interface HTMLAnchorElement extends HTMLElement {}
  /**
   * Represents an HTML area element (`<area>`).
   *
   * @interface HTMLAreaElement
   * @typedef {HTMLAreaElement}
   * @extends {HTMLElement}
   */
  interface HTMLAreaElement extends HTMLElement {}
  /**
   * Represents an HTML audio element (`<audio>`).
   *
   * @interface HTMLAudioElement
   * @typedef {HTMLAudioElement}
   * @extends {HTMLElement}
   */
  interface HTMLAudioElement extends HTMLElement {}
  /**
   * Represents an HTML base element (`<base>`).
   *
   * @interface HTMLBaseElement
   * @typedef {HTMLBaseElement}
   * @extends {HTMLElement}
   */
  interface HTMLBaseElement extends HTMLElement {}
  /**
   * Represents an HTML body element (`<body>`).
   *
   * @interface HTMLBodyElement
   * @typedef {HTMLBodyElement}
   * @extends {HTMLElement}
   */
  interface HTMLBodyElement extends HTMLElement {}
  /**
   * Represents an HTML break element (`<br>`).
   *
   * @interface HTMLBRElement
   * @typedef {HTMLBRElement}
   * @extends {HTMLElement}
   */
  interface HTMLBRElement extends HTMLElement {}
  /**
   * Represents an HTML button element (`<button>`).
   *
   * @interface HTMLButtonElement
   * @typedef {HTMLButtonElement}
   * @extends {HTMLElement}
   */
  interface HTMLButtonElement extends HTMLElement {}
  /**
   * Represents an HTML canvas element (`<canvas>`).
   *
   * @interface HTMLCanvasElement
   * @typedef {HTMLCanvasElement}
   * @extends {HTMLElement}
   */
  interface HTMLCanvasElement extends HTMLElement {}
  /**
   * Represents an HTML data element (`<data>`).
   *
   * @interface HTMLDataElement
   * @typedef {HTMLDataElement}
   * @extends {HTMLElement}
   */
  interface HTMLDataElement extends HTMLElement {}
  /**
   * Represents an HTML data list element (`<datalist>`).
   *
   * @interface HTMLDataListElement
   * @typedef {HTMLDataListElement}
   * @extends {HTMLElement}
   */
  interface HTMLDataListElement extends HTMLElement {}
  /**
   * Represents an HTML details element (`<details>`).
   *
   * @interface HTMLDetailsElement
   * @typedef {HTMLDetailsElement}
   * @extends {HTMLElement}
   */
  interface HTMLDetailsElement extends HTMLElement {}
  /**
   * Represents an HTML dialog element (`<dialog>`).
   *
   * @interface HTMLDialogElement
   * @typedef {HTMLDialogElement}
   * @extends {HTMLElement}
   */
  interface HTMLDialogElement extends HTMLElement {}
  /**
   * Represents an HTML div element (`<div>`).
   *
   * @interface HTMLDivElement
   * @typedef {HTMLDivElement}
   * @extends {HTMLElement}
   */
  interface HTMLDivElement extends HTMLElement {}
  /**
   * Represents an HTML description list element (`<dl>`).
   *
   * @interface HTMLDListElement
   * @typedef {HTMLDListElement}
   * @extends {HTMLElement}
   */
  interface HTMLDListElement extends HTMLElement {}
  /**
   * Represents an HTML embed element (`<embed>`).
   *
   * @interface HTMLEmbedElement
   * @typedef {HTMLEmbedElement}
   * @extends {HTMLElement}
   */
  interface HTMLEmbedElement extends HTMLElement {}
  /**
   * Represents an HTML field set element (`<fieldset>`).
   *
   * @interface HTMLFieldSetElement
   * @typedef {HTMLFieldSetElement}
   * @extends {HTMLElement}
   */
  interface HTMLFieldSetElement extends HTMLElement {}
  /**
   * Represents an HTML form element (`<form>`).
   *
   * @interface HTMLFormElement
   * @typedef {HTMLFormElement}
   * @extends {HTMLElement}
   */
  interface HTMLFormElement extends HTMLElement {}
  /**
   * Represents an HTML heading element (`<h1>`-`<h6>`).
   *
   * @interface HTMLHeadingElement
   * @typedef {HTMLHeadingElement}
   * @extends {HTMLElement}
   */
  interface HTMLHeadingElement extends HTMLElement {}
  /**
   * Represents an HTML head element (`<head>`).
   *
   * @interface HTMLHeadElement
   * @typedef {HTMLHeadElement}
   * @extends {HTMLElement}
   */
  interface HTMLHeadElement extends HTMLElement {}
  /**
   * Represents an HTML horizontal rule element (`<hr>`).
   *
   * @interface HTMLHRElement
   * @typedef {HTMLHRElement}
   * @extends {HTMLElement}
   */
  interface HTMLHRElement extends HTMLElement {}
  /**
   * Represents an HTML root element (`<html>`).
   *
   * @interface HTMLHtmlElement
   * @typedef {HTMLHtmlElement}
   * @extends {HTMLElement}
   */
  interface HTMLHtmlElement extends HTMLElement {}
  /**
   * Represents an HTML iframe element (`<iframe>`).
   *
   * @interface HTMLIFrameElement
   * @typedef {HTMLIFrameElement}
   * @extends {HTMLElement}
   */
  interface HTMLIFrameElement extends HTMLElement {}
  /**
   * Represents an HTML image element (`<img>`).
   *
   * @interface HTMLImageElement
   * @typedef {HTMLImageElement}
   * @extends {HTMLElement}
   */
  interface HTMLImageElement extends HTMLElement {}
  /**
   * Represents an HTML input element (`<input>`).
   *
   * @interface HTMLInputElement
   * @typedef {HTMLInputElement}
   * @extends {HTMLElement}
   */
  interface HTMLInputElement extends HTMLElement {}
  /**
   * Represents an HTML modification element (`<del>` and `<ins>`).
   *
   * @interface HTMLModElement
   * @typedef {HTMLModElement}
   * @extends {HTMLElement}
   */
  interface HTMLModElement extends HTMLElement {}
  /**
   * Represents an HTML label element (`<label>`).
   *
   * @interface HTMLLabelElement
   * @typedef {HTMLLabelElement}
   * @extends {HTMLElement}
   */
  interface HTMLLabelElement extends HTMLElement {}
  /**
   * Represents an HTML legend element (`<legend>`).
   *
   * @interface HTMLLegendElement
   * @typedef {HTMLLegendElement}
   * @extends {HTMLElement}
   */
  interface HTMLLegendElement extends HTMLElement {}
  /**
   * Represents an HTML list item element (`<li>`).
   *
   * @interface HTMLLIElement
   * @typedef {HTMLLIElement}
   * @extends {HTMLElement}
   */
  interface HTMLLIElement extends HTMLElement {}
  /**
   * Represents an HTML link element (`<link>`).
   *
   * @interface HTMLLinkElement
   * @typedef {HTMLLinkElement}
   * @extends {HTMLElement}
   */
  interface HTMLLinkElement extends HTMLElement {}
  /**
   * Represents an HTML map element (`<map>`).
   *
   * @interface HTMLMapElement
   * @typedef {HTMLMapElement}
   * @extends {HTMLElement}
   */
  interface HTMLMapElement extends HTMLElement {}
  /**
   * Represents an HTML meta element (`<meta>`).
   *
   * @interface HTMLMetaElement
   * @typedef {HTMLMetaElement}
   * @extends {HTMLElement}
   */
  interface HTMLMetaElement extends HTMLElement {}
  /**
   * Represents an HTML meter element (`<meter>`).
   *
   * @interface HTMLMeterElement
   * @typedef {HTMLMeterElement}
   * @extends {HTMLElement}
   */
  interface HTMLMeterElement extends HTMLElement {}
  /**
   * Represents an HTML object element (`<object>`).
   *
   * @interface HTMLObjectElement
   * @typedef {HTMLObjectElement}
   * @extends {HTMLElement}
   */
  interface HTMLObjectElement extends HTMLElement {}
  /**
   * Represents an HTML option element (`<option>`).
   *
   * @interface HTMLOptionElement
   * @typedef {HTMLOptionElement}
   * @extends {HTMLElement}
   */
  interface HTMLOptionElement extends HTMLElement {}
  /**
   * Represents an HTML paragraph element (`<p>`).
   *
   * @interface HTMLParagraphElement
   * @typedef {HTMLParagraphElement}
   * @extends {HTMLElement}
   */
  interface HTMLParagraphElement extends HTMLElement {}
  /**
   * Represents an HTML progress element (`<progress>`).
   *
   * @interface HTMLProgressElement
   * @typedef {HTMLProgressElement}
   * @extends {HTMLElement}
   */
  interface HTMLProgressElement extends HTMLElement {}
  /**
   * Represents an HTML script element (`<script>`).
   *
   * @interface HTMLScriptElement
   * @typedef {HTMLScriptElement}
   * @extends {HTMLElement}
   */
  interface HTMLScriptElement extends HTMLElement {}
  /**
   * Represents an HTML select element (`<select>`).
   *
   * @interface HTMLSelectElement
   * @typedef {HTMLSelectElement}
   * @extends {HTMLElement}
   */
  interface HTMLSelectElement extends HTMLElement {}
  /**
   * Represents an HTML source element (`<source>`).
   *
   * @interface HTMLSourceElement
   * @typedef {HTMLSourceElement}
   * @extends {HTMLElement}
   */
  interface HTMLSourceElement extends HTMLElement {}
  /**
   * Represents an HTML span element (`<span>`).
   *
   * @interface HTMLSpanElement
   * @typedef {HTMLSpanElement}
   * @extends {HTMLElement}
   */
  interface HTMLSpanElement extends HTMLElement {}
  /**
   * Represents an HTML style element (`<style>`).
   *
   * @interface HTMLStyleElement
   * @typedef {HTMLStyleElement}
   * @extends {HTMLElement}
   */
  interface HTMLStyleElement extends HTMLElement {}
  /**
   * Represents an HTML table element (`<table>`).
   *
   * @interface HTMLTableElement
   * @typedef {HTMLTableElement}
   * @extends {HTMLElement}
   */
  interface HTMLTableElement extends HTMLElement {}
  /**
   * Represents an HTML table column element (`<col>`).
   *
   * @interface HTMLTableColElement
   * @typedef {HTMLTableColElement}
   * @extends {HTMLElement}
   */
  interface HTMLTableColElement extends HTMLElement {}
  /**
   * Represents an HTML table row element (`<tr>`).
   *
   * @interface HTMLTableRowElement
   * @typedef {HTMLTableRowElement}
   * @extends {HTMLElement}
   */
  interface HTMLTableRowElement extends HTMLElement {}
  /**
   * Represents an HTML table section element (`<thead>`, `<tbody>`, and `<tfoot>`).
   *
   * @interface HTMLTableSectionElement
   * @typedef {HTMLTableSectionElement}
   * @extends {HTMLElement}
   */
  interface HTMLTableSectionElement extends HTMLElement {}
  /**
   * Represents an HTML template element (`<template>`).
   *
   * @interface HTMLTemplateElement
   * @typedef {HTMLTemplateElement}
   * @extends {HTMLElement}
   */
  interface HTMLTemplateElement extends HTMLElement {}
  /**
   * Represents an HTML text area element (`<textarea>`).
   *
   * @interface HTMLTextAreaElement
   * @typedef {HTMLTextAreaElement}
   * @extends {HTMLElement}
   */
  interface HTMLTextAreaElement extends HTMLElement {}
  /**
   * Represents an HTML time element (`<time>`).
   *
   * @interface HTMLTimeElement
   * @typedef {HTMLTimeElement}
   * @extends {HTMLElement}
   */
  interface HTMLTimeElement extends HTMLElement {}
  /**
   * Represents an HTML title element (`<title>`).
   *
   * @interface HTMLTitleElement
   * @typedef {HTMLTitleElement}
   * @extends {HTMLElement}
   */
  interface HTMLTitleElement extends HTMLElement {}
  /**
   * Represents an HTML track element (`<track>`).
   *
   * @interface HTMLTrackElement
   * @typedef {HTMLTrackElement}
   * @extends {HTMLElement}
   */
  interface HTMLTrackElement extends HTMLElement {}
  /**
   * Represents an HTML video element (`<video>`).
   *
   * @interface HTMLVideoElement
   * @typedef {HTMLVideoElement}
   * @extends {HTMLElement}
   */
  interface HTMLVideoElement extends HTMLElement {}
  /**
   * Represents a native animation event, typically fired when a CSS animation starts, ends, or is repeated.
   *
   * @typedef {NativeAnimationEvent}
   */
  type NativeAnimationEvent = AnimationEvent;
  /**
   * Represents a native clipboard event, used when performing clipboard actions such as copy, paste, and cut.
   *
   * @typedef {NativeClipboardEvent}
   */
  type NativeClipboardEvent = ClipboardEvent;
  /**
   * Represents a native composition event, which occurs when the user is composing text via an input method editor (IME).
   *
   * @typedef {NativeCompositionEvent}
   */
  type NativeCompositionEvent = CompositionEvent;
  /**
   * Represents a native drag event, triggered when an element or text selection is being dragged.
   *
   * @typedef {NativeDragEvent}
   */
  type NativeDragEvent = DragEvent;
  /**
   * Represents a native focus event, which occurs when an element gains or loses focus.
   *
   * @typedef {NativeFocusEvent}
   */
  type NativeFocusEvent = FocusEvent;
  /**
   * Represents a native keyboard event, fired when the user presses or releases a key on the keyboard.
   *
   * @typedef {NativeKeyboardEvent}
   */
  type NativeKeyboardEvent = KeyboardEvent;
  /**
   * Represents a native mouse event, typically triggered by mouse actions such as clicks or movements.
   *
   * @typedef {NativeMouseEvent}
   */
  type NativeMouseEvent = MouseEvent;
  /**
   * Represents a native touch event, used when the user interacts with a touch screen.
   *
   * @typedef {NativeTouchEvent}
   */
  type NativeTouchEvent = TouchEvent;
  /**
   * Represents a native pointer event, which encompasses mouse, touch, and pen/stylus input.
   *
   * @typedef {NativePointerEvent}
   */
  type NativePointerEvent = PointerEvent;
  /**
   * Represents a native transition event, fired when a CSS transition ends.
   *
   * @typedef {NativeTransitionEvent}
   */
  type NativeTransitionEvent = TransitionEvent;
  /**
   * Represents a native UI event, which provides basic information about user interface events like focus or blur.
   *
   * @typedef {NativeUIEvent}
   */
  type NativeUIEvent = UIEvent;
  /**
   * Represents a native wheel event, typically triggered when the user rotates a wheel device (e.g., a mouse wheel).
   *
   * @typedef {NativeWheelEvent}
   */
  type NativeWheelEvent = WheelEvent;
  /**
   * Used to represent DOM API's where users can either pass
   * true or false as a boolean or as its equivalent strings.
   */
  type Booleanish = boolean | 'true' | 'false';
  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin MDN}
   */
  type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
  /**
   * Description placeholder
   *
   * @type {unique symbol}
   */
  const UNDEFINED_VOID_ONLY: unique symbol;
  /**
   * The function returned from an effect passed to {@link ReblendTyping.useEffect useEffect},
   * which can be used to clean up the effect when the component unmounts.
   *
   * @see {@link https://reblend.dev/reference/reblend/useEffect Reblend Docs}
   */
  type Destructor = () => void | {
    [UNDEFINED_VOID_ONLY]: never;
  };
  /**
   * Description placeholder
   *
   * @typedef {VoidOrUndefinedOnly}
   */
  type VoidOrUndefinedOnly = void | {
    [UNDEFINED_VOID_ONLY]: never;
  };
  export type ChildWithProps = {
    child: ReblendTyping.Component;
    propsKey: string[];
  };
  export type ReblendRenderingException = Error & {
    component: ReblendTyping.Component;
  };
  export interface PropPatch {
    type: 'REMOVE' | 'UPDATE';
    node: ReblendTyping.Component;
    key: string;
    propValue?: string;
  }
  export type Primitive = boolean | null | number | string | undefined;
  export interface ReblendPrimitive extends ReblendTyping.Component {
    reblendPrimitiveData: any;
    setData(data: Primitive): this;
    getData(): Primitive;
  }
  export type IAny = {
    [key: string]: any;
  };
  export type VNodeChild = Primitive | VNode;
  export type VNodeChildren = VNodeChild[];
  export type DomNodeChild = ReblendTyping.Component | ReblendPrimitive;
  export type DomNodeChildren = DomNodeChild[];
  export interface ReactNode {
    $$typeof: symbol;
    displayName: string;
    render: (props: any) => any;
  }
  export interface VNode {
    [reblendVComponent: symbol]: boolean;
    props: IAny & {
      children?: VNodeChildren;
    };
    displayName: string | typeof ReblendTyping.Component | ReactNode;
  }
  export interface Patch {
    type: PatchTypeAndOrder;
    newNode?: VNodeChild;
    oldNode?: DomNodeChild;
    parent?: ReblendTyping.Component;
    patches?: PropPatch[];
  }
  export namespace ReblendTyping {
    /**
     * Represents a mutable reference object whose `current` property can hold a value of type `T` or an `HTMLElement`.
     *
     * @template T
     * @typedef {Object} Ref
     * @property {T | HTMLElement} [current] - The current value held by the reference, which can be of type `T` or an `HTMLElement`.
     */
    type Ref<T> = {
      current?: T;
      stateKey: string;
    };
    /**
     * A function that updates the state based on the provided value. It accepts a value or a function that returns a new value based on the previous state.
     *
     * @template T
     * @callback StateFunction
     * @param {StateFunctionValue<T>} value - The value or function used to update the state.
     * @param {boolean} [force=false] - Optional flag to force the update.
     */
    type StateFunction<T> = (
      value: StateFunctionValue<T>,
      force?: boolean
    ) => void;
    /**
     * The value used to update the state, which can be either a new value directly or a function that computes the new value based on the previous state.
     *
     * @template T
     */
    type StateFunctionValue<T> =
      | ((previous: T) => T | Promise<T>)
      | T
      | Promise<T>;
    /**
     * A function that returns a memoized value, which is recalculated only when dependencies change.
     *
     * @template T
     * @callback StateEffectiveMemoFunction
     * @returns {T} - The memoized value.
     */
    type StateEffectiveMemoFunction<T> = () => T | Promise<T>;
    /**
     * A function that can return a cleanup function or nothing, commonly used in effect hooks.
     *
     * @callback StateEffectiveFunction
     * @returns {(() => any) | void} - A cleanup function or void if no cleanup is necessary.
     */
    type StateEffectiveFunction = () => (() => void) | void;
    /**
     * A reducer function that takes a previous value and an incoming value, and returns a new value. This is often used in state management patterns like `useReducer`.
     *
     * @template ValueType, IncomingType
     * @callback StateReducerFunction
     * @param {ValueType} previous - The previous state or value.
     * @param {IncomingType} current - The incoming value or action that affects the state.
     * @returns {ValueType} - The new value after applying the reducer logic.
     */
    type StateReducerFunction<ValueType, IncomingType> = (
      previous: ValueType,
      current: IncomingType
    ) => ValueType;
    /**
     * Used to retrieve the possible components which accept a given set of props.
     *
     * Can be passed no type parameters to get a union of all possible components
     * and tags.
     *
     * Is a superset of {@link ComponentType}.
     *
     * @template P The props to match against. If not passed, defaults to any.
     * @template Tag An optional tag to match against. If not passed, attempts to match against all possible tags.
     *
     * @example
     *
     * ```tsx
     * // All components and tags (img, embed etc.)
     * // which accept `src`
     * type SrcComponents = ElementType<{ src: any }>;
     * ```
     *
     * @example
     *
     * ```tsx
     * // All components
     * type AllComponents = ElementType;
     * ```
     *
     * @example
     *
     * ```tsx
     * // All custom components which match `src`, and tags which
     * // match `src`, narrowed down to just `audio` and `embed`
     * type SrcComponents = ElementType<{ src: any }, 'audio' | 'embed'>;
     * ```
     */
    type ElementType<
      P = any,
      Tag extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
    > =
      | {
          [K in Tag]: P extends JSX.IntrinsicElements[K] ? K : never;
        }[Tag]
      | ComponentType<P>;
    /**
     * Represents any user-defined component, either as a function or a class.
     *
     * Similar to {@link JSXElementConstructor}, but with extra properties like
     * {@link FunctionComponent.defaultProps defaultProps } and
     * {@link ComponentClass.contextTypes contextTypes}.
     *
     * @template P The props the component accepts.
     *
     * @see {@link ComponentClass}
     * @see {@link FunctionComponent}
     */
    type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
    /**
     * Represents any user-defined component, either as a function or a class.
     *
     * Similar to {@link ComponentType}, but without extra properties like
     * {@link FunctionComponent.defaultProps defaultProps } and
     * {@link ComponentClass.contextTypes contextTypes}.
     *
     * @template P The props the component accepts.
     */
    type JSXElementConstructor<P> = (props: P) => ReblendNode | ReblendNode[];
    interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES {}
    /**
     * A callback fired whenever the ref's value changes.
     *
     * @template T The type of the ref's value.
     *
     * @see {@link https://reblend.dev/reference/reblend-dom/components/common#ref-callback Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * <div ref={(node) => console.log(node)} />
     * ```
     */
    type RefCallback<T> = {
      bivarianceHack(
        instance: T | null
      ):
        | void
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES];
    }['bivarianceHack'];
    /**
     * A union type of all possible shapes for Reblend refs.
     *
     * @see {@link RefCallback}
     * @see {@link Ref}
     */
    /**
     * A legacy implementation of refs where you can pass a string to a ref prop.
     *
     * @see {@link https://reblend.dev/reference/reblend/Component#refs Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * <div ref="myRef" />
     * ```
     */
    type LegacyRef<T> = Ref<T>;
    /**
     * Retrieves the type of the 'ref' prop for a given component type or tag name.
     *
     * @template C The component type.
     *
     * @example
     *
     * ```tsx
     * type MyComponentRef = Reblend.ElementRef<typeof MyComponent>;
     * ```
     *
     * @example
     *
     * ```tsx
     * type DivRef = Reblend.ElementRef<'div'>;
     * ```
     */
    type ComponentState = any;
    /**
     * A value which uniquely identifies a node among items in an array.
     *
     * @see {@link https://reblend.dev/learn/rendering-lists#keeping-list-items-in-order-with-key Reblend Docs}
     */
    type Key = string | number | bigint;
    /**
     * @internal The props any component can receive.
     * You don't have to add this type. All components automatically accept these props.
     * ```tsx
     * const Component = () => <div />;
     * <Component key="one" />
     * ```
     *
     * WARNING: The implementation of a component will never have access to these attributes.
     * The following example would be incorrect usage because {@link Component} would never have access to `key`:
     * ```tsx
     * const Component = (props: Reblend.Attributes) => props.key;
     * ```
     */
    interface Attributes {
      key?: Key | null | undefined;
    }
    /**
     * The props any component accepting refs can receive.
     * Class components, built-in browser components (e.g. `div`) and forwardRef components can receive refs and automatically accept these props.
     * ```tsx
     * const Component = forwardRef(() => <div />);
     * <Component ref={(current) => console.log(current)} />
     * ```
     *
     * You only need this type if you manually author the types of props that need to be compatible with legacy refs.
     * ```tsx
     * interface Props extends Reblend.RefAttributes<HTMLDivElement> {}
     * declare const Component: Reblend.FunctionComponent<Props>;
     * ```
     *
     * Otherwise it's simpler to directly use {@link Ref} since you can safely use the
     * props type to describe to props that a consumer can pass to the component
     * as well as describing the props the implementation of a component "sees".
     * {@link RefAttributes} is generally not safe to describe both consumer and seen props.
     *
     * ```tsx
     * interface Props extends {
     *   ref?: Reblend.Ref<HTMLDivElement> | undefined;
     * }
     * declare const Component: Reblend.FunctionComponent<Props>;
     * ```
     *
     * WARNING: The implementation of a component will not have access to the same type in versions of Reblend supporting string refs.
     * The following example would be incorrect usage because {@link Component} would never have access to a `ref` with type `string`
     * ```tsx
     * const Component = (props: Reblend.RefAttributes) => props.ref;
     * ```
     */
    interface RefAttributes<T> extends Attributes {
      /**
       * Allows getting a ref to the component instance.
       * Once the component unmounts, Reblend will set `ref.current` to `null`
       * (or call the ref with `null` if you passed a callback ref).
       *
       * @see {@link https://reblend.dev/learn/referencing-values-with-refs#refs-and-the-dom Reblend Docs}
       */
      ref?: LegacyRef<T> | undefined;
    }
    /**
     * Represents the built-in attributes available to class components.
     */
    interface ClassAttributes<T> extends RefAttributes<T> {}
    /**
     * Represents a JSX element.
     *
     * Where {@link ReblendNode} represents everything that can be rendered, `ReblendElement`
     * only represents JSX.
     *
     * @template P The type of the props object
     * @template T The type of the component or tag
     *
     * @example
     *
     * ```tsx
     * const element: ReblendElement = <div />;
     * ```
     */
    type HTMLs =
      | HTMLAnchorElement
      | HTMLAreaElement
      | HTMLAudioElement
      | HTMLBaseElement
      | HTMLBodyElement
      | HTMLBRElement
      | HTMLButtonElement
      | HTMLCanvasElement
      | HTMLDataElement
      | HTMLDataListElement
      | HTMLDetailsElement
      | HTMLDialogElement
      | HTMLDivElement
      | HTMLDListElement
      | HTMLEmbedElement
      | HTMLFieldSetElement
      | HTMLFormElement
      | HTMLHeadingElement
      | HTMLHeadElement
      | HTMLHRElement
      | HTMLHtmlElement
      | HTMLIFrameElement
      | HTMLImageElement
      | HTMLInputElement
      | HTMLModElement
      | HTMLLabelElement
      | HTMLLegendElement
      | HTMLLIElement
      | HTMLLinkElement
      | HTMLMapElement
      | HTMLMetaElement
      | HTMLMeterElement
      | HTMLObjectElement
      | HTMLOListElement
      | HTMLOptGroupElement
      | HTMLOptionElement
      | HTMLOutputElement
      | HTMLParagraphElement
      | HTMLParamElement
      | HTMLPreElement
      | HTMLProgressElement
      | HTMLQuoteElement
      | HTMLSlotElement
      | HTMLScriptElement
      | HTMLSelectElement
      | HTMLSourceElement
      | HTMLSpanElement
      | HTMLStyleElement
      | HTMLTableElement
      | HTMLTableColElement
      | HTMLTableDataCellElement
      | HTMLTableHeaderCellElement
      | HTMLTableRowElement
      | HTMLTableSectionElement
      | HTMLTemplateElement
      | HTMLTextAreaElement
      | HTMLTimeElement
      | HTMLTitleElement
      | HTMLTrackElement
      | HTMLUListElement
      | HTMLVideoElement
      | HTMLWebViewElement
      | SVGElement;
    /**
     * Represents a JSX element that is both a native `HTMLElement` and a `React` element, including support for portals.
     *
     * Where {@link ReblendNode} represents everything that can be rendered, `ReblendElement`
     * specifically represents JSX elements that are rendered via Reblend, including native HTML elements and React portals.
     *
     * @template P The type of the props object for the React element
     * @template T The type of the HTML component or tag name
     *
     * @example
     * ```tsx
     * const element: ReblendElement = <div />;
     * ```
     */
    type ReblendElement = HTMLElement & React.ReactElement & React.ReactPortal;
    /**
     * @deprecated
     */
    interface ReblendComponentElement<
      T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
      P = Pick<
        ComponentProps<T>,
        Exclude<keyof ComponentProps<T>, 'key' | 'ref'>
      >
    > extends ReblendElement {}
    interface FunctionComponentElement<P> extends ReblendElement {
      ref?:
        | ('ref' extends keyof P
            ? P extends {
                ref?: infer R | undefined;
              }
              ? R
              : never
            : never)
        | undefined;
    }
    type CElement<P, T extends Component<P, ComponentState>> = ComponentElement<
      P,
      T
    >;
    interface ComponentElement<P, T extends Component<P, ComponentState>>
      extends ReblendElement {
      ref?: LegacyRef<T> | undefined;
    }
    /**
     * @deprecated Use {@link ComponentElement} instead.
     */
    type ClassicElement<P> = CElement<P, ClassicComponent<P, ComponentState>>;
    interface DOMElement<
      P extends HTMLAttributes<T> | SVGAttributes<T>,
      T extends Element
    > extends ReblendElement {
      ref: LegacyRef<T>;
    }
    interface ReblendHTMLElement<T extends HTMLElement>
      extends DetailedReblendHTMLElement<AllHTMLAttributes<T>, T> {}
    interface DetailedReblendHTMLElement<
      P extends HTMLAttributes<T>,
      T extends HTMLElement
    > extends DOMElement<P, T> {
      type: keyof ReblendHTML;
    }
    interface ReblendSVGElement
      extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
      type: keyof ReblendSVG;
    }
    type Factory<P> = (
      props?: Attributes & P,
      ...children: ReblendNode[]
    ) => ReblendElement;
    /**
     * @deprecated Please use `FunctionComponentFactory`
     */
    type SFCFactory<P> = FunctionComponentFactory<P>;
    type FunctionComponentFactory<P> = (
      props?: Attributes & P,
      ...children: ReblendNode[]
    ) => FunctionComponentElement<P>;
    type ComponentFactory<P, T extends Component<P, ComponentState>> = (
      props?: ClassAttributes<T> & P,
      ...children: ReblendNode[]
    ) => CElement<P, T>;
    type CFactory<P, T extends Component<P, ComponentState>> = ComponentFactory<
      P,
      T
    >;
    type ClassicFactory<P> = CFactory<P, ClassicComponent<P, ComponentState>>;
    type DOMFactory<P extends DOMAttributes<T>, T extends Element> = (
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ) => DOMElement<P, T>;
    interface HTMLFactory<T extends HTMLElement>
      extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> {}
    interface DetailedHTMLFactory<
      P extends HTMLAttributes<T>,
      T extends HTMLElement
    > extends DOMFactory<P, T> {
      (
        props?: (ClassAttributes<T> & P) | null,
        ...children: ReblendNode[]
      ): DetailedReblendHTMLElement<P, T>;
    }
    interface SVGFactory
      extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
      (
        props?:
          | (ClassAttributes<SVGElement> & SVGAttributes<SVGElement>)
          | null,
        ...children: ReblendNode[]
      ): ReblendSVGElement;
    }
    /**
     * @deprecated - This type is not relevant when using Reblend. Inline the type instead to make the intent clear.
     */
    type ReblendText = string | number;
    /**
     * @deprecated - This type is not relevant when using Reblend. Inline the type instead to make the intent clear.
     */
    type ReblendChild = ReblendElement | string | number;
    /**
     * @deprecated Use either `ReblendNode[]` if you need an array or `Iterable<ReblendNode>` if its passed to a host component.
     */
    interface ReblendNodeArray extends ReadonlyArray<ReblendNode> {}
    /**
     * WARNING: Not related to `Reblend.Fragment`.
     * @deprecated This type is not relevant when using Reblend. Inline the type instead to make the intent clear.
     */
    type ReblendFragment = Iterable<ReblendNode>;
    /**
     * Different release channels declare additional types of ReblendNode this particular release channel accepts.
     * App or library types should never augment this interface.
     */
    interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REBLEND_NODES {}
    /**
     * Represents all of the things Reblend can render.
     *
     * Where {@link ReblendElement} only represents JSX, `ReblendNode` represents everything that can be rendered.
     *
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/reblend-types/reblendnode/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * // Typing children
     * type Props = { children: ReblendNode }
     *
     * const Component = ({ children }: Props) => <div>{children}</div>
     *
     * <Component>hello</Component>
     * ```
     *
     * @example
     *
     * ```tsx
     * // Typing a custom element
     * type Props = { customElement: ReblendNode }
     *
     * const Component = ({ customElement }: Props) => <div>{customElement}</div>
     *
     * <Component customElement={<div>hello</div>} />
     * ```
     */
    type ReblendNode =
      | ReblendElement
      | HTMLs
      | React.ReactNode
      | Iterable<ReblendNode>
      | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REBLEND_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REBLEND_NODES];
    /** @deprecated */
    function createFactory<T extends HTMLElement>(
      type: keyof ReblendHTML
    ): HTMLFactory<T>;
    /** @deprecated */
    function createFactory(type: keyof ReblendSVG): SVGFactory;
    /** @deprecated */
    function createFactory<P extends DOMAttributes<T>, T extends Element>(
      type: string
    ): DOMFactory<P, T>;
    /** @deprecated */
    function createFactory<P>(
      type: FunctionComponent<P>
    ): FunctionComponentFactory<P>;
    /** @deprecated */
    function createFactory<
      P,
      T extends Component<P, ComponentState>,
      C extends ComponentClass<P>
    >(type: ClassType<P, T, C>): CFactory<P, T>;
    /** @deprecated */
    function createFactory<P>(type: ComponentClass<P>): Factory<P>;
    function createElement(
      type: 'input',
      props?:
        | (InputHTMLAttributes<HTMLInputElement> &
            ClassAttributes<HTMLInputElement>)
        | null,
      ...children: ReblendNode[]
    ): DetailedReblendHTMLElement<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
    function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      type: keyof ReblendHTML,
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ): DetailedReblendHTMLElement<P, T>;
    function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
      type: keyof ReblendSVG,
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ): ReblendSVGElement;
    function createElement<P extends DOMAttributes<T>, T extends Element>(
      type: string,
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ): DOMElement<P, T>;
    function createElement<P extends {}>(
      type: FunctionComponent<P>,
      props?: (Attributes & P) | null,
      ...children: ReblendNode[]
    ): FunctionComponentElement<P>;
    function createElement<
      P extends {},
      T extends Component<P, ComponentState>,
      C extends ComponentClass<P>
    >(
      type: ClassType<P, T, C>,
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ): CElement<P, T>;
    function createElement<P extends {}>(
      type: FunctionComponent<P> | ComponentClass<P> | string,
      props?: (Attributes & P) | null,
      ...children: ReblendNode[]
    ): ReblendElement;
    function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      element: DetailedReblendHTMLElement<P, T>,
      props?: P,
      ...children: ReblendNode[]
    ): DetailedReblendHTMLElement<P, T>;
    function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      element: ReblendHTMLElement<T>,
      props?: P,
      ...children: ReblendNode[]
    ): ReblendHTMLElement<T>;
    function cloneElement<P extends SVGAttributes<T>, T extends SVGElement>(
      element: ReblendSVGElement,
      props?: P,
      ...children: ReblendNode[]
    ): ReblendSVGElement;
    function cloneElement<P extends DOMAttributes<T>, T extends Element>(
      element: DOMElement<P, T>,
      props?: DOMAttributes<T> & P,
      ...children: ReblendNode[]
    ): DOMElement<P, T>;
    function cloneElement<P>(
      element: FunctionComponentElement<P>,
      props?: Partial<P> & Attributes,
      ...children: ReblendNode[]
    ): FunctionComponentElement<P>;
    function cloneElement<P, T extends Component<P, ComponentState>>(
      element: CElement<P, T>,
      props?: Partial<P> & ClassAttributes<T>,
      ...children: ReblendNode[]
    ): CElement<P, T>;
    function cloneElement<P>(
      element: ReblendElement,
      props?: Partial<P> & Attributes,
      ...children: ReblendNode[]
    ): ReblendElement;
    /**
     * Describes the props accepted by a Context {@link Provider}.
     *
     * @template T The type of the value the context provides.
     */
    interface ProviderProps<T> {
      value: T;
      children?: ReblendNode | undefined;
    }
    /**
     * Describes the props accepted by a Context {@link Consumer}.
     *
     * @template T The type of the value the context provides.
     */
    interface ConsumerProps<T> {
      children: (value: T) => ReblendNode;
    }
    /**
     * An object masquerading as a component. These are created by functions
     * like {@link forwardRef}, {@link memo}, and {@link createContext}.
     *
     * In order to make TypeScript work, we pretend that they are normal
     * components.
     *
     * But they are, in fact, not callable - instead, they are objects which
     * are treated specially by the renderer.
     *
     * @template P The props the component accepts.
     */
    interface ExoticComponent<P = {}> {
      (props: P): ReblendNode;
      readonly $$typeof: symbol;
    }
    /**
     * An {@link ExoticComponent} with a `displayName` property applied to it.
     *
     * @template P The props the component accepts.
     */
    interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
      /**
       * Used in debugging messages. You might want to set it
       * explicitly if you want to display a different name for
       * debugging purposes.
       *
       * @see {@link https://legacy.reblendjs.org/docs/reblend-component.html#displayname Legacy Reblend Docs}
       */
      displayName?: string | undefined;
    }
    /**
     * An {@link ExoticComponent} with a `propTypes` property applied to it.
     *
     * @template P The props the component accepts.
     */
    interface ProviderExoticComponent<P> extends ExoticComponent<P> {
      propTypes?: WeakValidationMap<P> | undefined;
    }
    /**
     * Used to retrieve the type of a context object from a {@link Context}.
     *
     * @template C The context object.
     *
     * @example
     *
     * ```tsx
     * import { createContext } from 'reblend';
     *
     * const MyContext = createContext({ foo: 'bar' });
     *
     * type ContextType = ContextType<typeof MyContext>;
     * // ContextType = { foo: string }
     * ```
     */
    type ContextType<C extends Context<any>> = C extends Context<infer T>
      ? T
      : never;
    /**
     * Wraps your components to specify the value of this context for all components inside.
     *
     * @see {@link https://reblend.dev/reference/reblend/createContext#provider Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * import { createContext } from 'reblend';
     *
     * const ThemeContext = createContext('light');
     *
     * function App() {
     *   return (
     *     <ThemeContext.Provider value="dark">
     *       <Toolbar />
     *     </ThemeContext.Provider>
     *   );
     * }
     * ```
     */
    type Provider<T> = ProviderExoticComponent<ProviderProps<T>>;
    /**
     * The old way to read context, before {@link useContext} existed.
     *
     * @see {@link https://reblend.dev/reference/reblend/createContext#consumer Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * import { UserContext } from './user-context';
     *
     * function Avatar() {
     *   return (
     *     <UserContext.Consumer>
     *       {user => <img src={user.profileImage} alt={user.name} />}
     *     </UserContext.Consumer>
     *   );
     * }
     * ```
     */
    type Consumer<T> = ExoticComponent<ConsumerProps<T>>;
    /**
     * Context lets components pass information deep down without explicitly
     * passing props.
     *
     * Created from {@link createContext}
     *
     * @see {@link https://reblend.dev/learn/passing-data-deeply-with-context Reblend Docs}
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * import { createContext } from 'reblend';
     *
     * const ThemeContext = createContext('light');
     * ```
     */
    interface Context<T> {
      Provider: Provider<T>;
      Consumer: Consumer<T>;
      /**
       * Used in debugging messages. You might want to set it
       * explicitly if you want to display a different name for
       * debugging purposes.
       *
       * @see {@link https://legacy.reblendjs.org/docs/reblend-component.html#displayname Legacy Reblend Docs}
       */
      displayName?: string | undefined;
    }
    /**
     * Lets you create a {@link Context} that components can provide or read.
     *
     * @param defaultValue The value you want the context to have when there is no matching
     * {@link Provider} in the tree above the component reading the context. This is meant
     * as a "last resort" fallback.
     *
     * @see {@link https://reblend.dev/reference/reblend/createContext#reference Reblend Docs}
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * import { createContext } from 'reblend';
     *
     * const ThemeContext = createContext('light');
     * ```
     */
    function createContext<T>(defaultValue: T): Context<T>;
    function isValidElement<P>(
      object: {} | null | undefined
    ): object is ReblendElement;
    /**
     * Maintainer's note: Sync with {@link ReblendChildren} until {@link ReblendChildren} is removed.
     */
    const Children: {
      map<T, C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => T
      ): C extends null | undefined
        ? C
        : Array<Exclude<T, boolean | null | undefined>>;
      forEach<C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => void
      ): void;
      count(children: any): number;
      only<C>(children: C): C extends any[] ? never : C;
      toArray(
        children: ReblendNode | ReblendNode[]
      ): Array<Exclude<ReblendNode, boolean | null | undefined>>;
    };
    /**
     * Lets you group elements without a wrapper node.
     *
     * @see {@link https://reblend.dev/reference/reblend/Fragment Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * import { Fragment } from 'reblend';
     *
     * <Fragment>
     *   <td>Hello</td>
     *   <td>World</td>
     * </Fragment>
     * ```
     *
     * @example
     *
     * ```tsx
     * // Using the <></> shorthand syntax:
     *
     * <>
     *   <td>Hello</td>
     *   <td>World</td>
     * </>
     * ```
     */
    const Fragment: ExoticComponent<{
      children?: ReblendNode | undefined;
    }>;
    /**
     * Lets you find common bugs in your components early during development.
     *
     * @see {@link https://reblend.dev/reference/reblend/StrictMode Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * import { StrictMode } from 'reblend';
     *
     * <StrictMode>
     *   <App />
     * </StrictMode>
     * ```
     */
    const StrictMode: ExoticComponent<{
      children?: ReblendNode | undefined;
    }>;
    /**
     * The props accepted by {@link Suspense}.
     *
     * @see {@link https://reblend.dev/reference/reblend/Suspense Reblend Docs}
     */
    interface SuspenseProps {
      children?: ReblendNode | undefined;
      /** A fallback reblend tree to show when a Suspense child (like Reblend.lazy) suspends */
      fallback?: ReblendNode;
    }
    /**
     * Lets you display a fallback until its children have finished loading.
     *
     * @see {@link https://reblend.dev/reference/reblend/Suspense Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * import { Suspense } from 'reblend';
     *
     * <Suspense fallback={<Loading />}>
     *   <ProfileDetails />
     * </Suspense>
     * ```
     */
    const Suspense: ExoticComponent<SuspenseProps>;
    const version: string;
    /**
     * The callback passed to {@link ProfilerProps.onRender}.
     *
     * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
     */
    type ProfilerOnRenderCallback = (
      /**
       * The string id prop of the {@link Profiler} tree that has just committed. This lets
       * you identify which part of the tree was committed if you are using multiple
       * profilers.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      id: string,
      /**
       * This lets you know whether the tree has just been mounted for the first time
       * or re-rendered due to a change in props, state, or hooks.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      phase: 'mount' | 'update' | 'nested-update',
      /**
       * The number of milliseconds spent rendering the {@link Profiler} and its descendants
       * for the current update. This indicates how well the subtree makes use of
       * memoization (e.g. {@link memo} and {@link useMemo}). Ideally this value should decrease
       * significantly after the initial mount as many of the descendants will only need to
       * re-render if their specific props change.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      actualDuration: number,
      /**
       * The number of milliseconds estimating how much time it would take to re-render the entire
       * {@link Profiler} subtree without any optimizations. It is calculated by summing up the most
       * recent render durations of each component in the tree. This value estimates a worst-case
       * cost of rendering (e.g. the initial mount or a tree with no memoization). Compare
       * {@link actualDuration} against it to see if memoization is working.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      baseDuration: number,
      /**
       * A numeric timestamp for when Reblend began rendering the current update.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      startTime: number,
      /**
       * A numeric timestamp for when Reblend committed the current update. This value is shared
       * between all profilers in a commit, enabling them to be grouped if desirable.
       *
       * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
       */
      commitTime: number
    ) => void;
    /**
     * The props accepted by {@link Profiler}.
     *
     * @see {@link https://reblend.dev/reference/reblend/Profiler Reblend Docs}
     */
    interface ProfilerProps {
      children?: ReblendNode | undefined;
      id: string;
      onRender: ProfilerOnRenderCallback;
    }
    /**
     * Lets you measure rendering performance of a Reblend tree programmatically.
     *
     * @see {@link https://reblend.dev/reference/reblend/Profiler#onrender-callback Reblend Docs}
     *
     * @example
     *
     * ```tsx
     * <Profiler id="App" onRender={onRender}>
     *   <App />
     * </Profiler>
     * ```
     */
    const Profiler: ExoticComponent<ProfilerProps>;
    type ReblendInstance = Component<any> | Element;
    interface Component<P = {}, S = {}, SS = any>
      extends ComponentLifecycle<P, S, SS> {}
    class Component<P, S> extends HTMLElement {
      constructor();
      html(): Promise<ReblendNode>;
      readonly props: Readonly<P>;
      /**
       * Used to identify the component, similar to `displayName`.
       * This can also be used to track components that have changed.
       *
       * @static
       * @type {string}
       */
      static ELEMENT_NAME: any;
      /**
       * Holds the props (properties) of the component.
       * Can be any type of object containing the default component's configuration.
       *
       * @static
       * @type {IAny}
       */
      static props: any;
      /**
       * Component to render first if this component is asyncronous
       */
      static ReblendPlaceholder?: VNode | typeof Component<any, any>;
      /**
       * Style for default reblend placeholder i.e if your are not using custom placeholder for your async components
       */
      static defaultReblendPlaceholderStyle?: CSSProperties | string;
      /**
       * Constructs a VNode from the provided display name, props, and children.
       * If the display name is an array, it will return that array.
       * Otherwise, it constructs a new VNode using the provided properties.
       *
       * @param {typeof Reblend | string | VNode[]} displayName - The display name or class for the VNode.
       * @param {IAny} props - The props to pass to the VNode.
       * @param {...VNodeChildren} children - The children to include in the VNode.
       * @returns {VNode | VNodeChildren} The constructed VNode or VNode children.
       */
      static construct(
        displayName: typeof Component | string | VNode[],
        props: IAny,
        ...children: VNodeChildren
      ): VNode | VNodeChildren;
      /**
       * Mounts the given component or function component to the DOM at the specified element ID.
       * The component is constructed and its elements are attached to the DOM root.
       *
       * @param {string} elementId - The ID of the DOM element where the component should be mounted.
       * @param {typeof Reblend | FunctionComponent} app - The component or function component to mount.
       * @param {IAny} [props] - Optional props to pass to the component.
       * @returns {Promise<void>} A promise that resolves when the component is mounted.
       * @throws {Error} If the specified element ID is invalid.
       */
      static mountOn(
        elementId: string,
        app: typeof Component | FunctionComponent,
        props?: IAny
      ): Promise<void>;
      nearestStandardParent?: HTMLElement;
      /**
       * The name of this component.
       * Use for debugging and to identify when an this component should be replaced with another.
       */
      displayName: string;
      /**
       * Symbol representing type of reblend component.
       */
      [reblendComponent: symbol]: boolean;
      /**
       * This holds reference to children of the component
       */
      elementChildren: Set<HTMLElement> | null;
      /**
       * This is a wrapper for the react element children
       */
      reactElementChildrenWrapper: Component<any, any> | null;
      /**
       * This denote when current component children has been initialized
       */
      childrenInitialize: boolean;
      /**
       * The selector string for querying elements by data ID.
       */
      dataIdQuerySelector: string;
      /**
       * The rendering error, if any occurred during rendering.
       */
      renderingError?: ReblendRenderingException;
      /**
       * The error handler for rendering exceptions.
       */
      renderingErrorHandler?: (e: ReblendRenderingException) => void;
      /**
       * Indicates whether the component is attached.
       */
      attached: boolean;
      /**
       * Indicates that the component is part of a placeholder component.
       */
      isPlaceholder: boolean;
      /**
       * Indicates that a placeholder has been attached to the component.
       */
      placeholderAttached: boolean;
      /**
       * Function that will be called when the children get attached
       */
      removePlaceholder?: () => Promise<void>;
      /**
       * The React class associated with this component.
       */
      ReactClass: any;
      /**
       * Component to render first if this component is asyncronous
       */
      ReblendPlaceholder?: VNode | typeof Component<any, any>;
      /**
       * Style for default reblend placeholder i.e if your are not using custom placeholder for your async components
       */
      defaultReblendPlaceholderStyle?: CSSProperties | string;
      /**
       * A reference for the component's DOM node.
       */
      ref: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any);
      /**
       * This hold effects functions
       */
      effectState: { [key: string]: Primitive | Array<Primitive> };
      /**
       * The effects to apply when the component is mounted.
       */
      onMountEffects?: Set<ReblendTyping.StateEffectiveFunction>;
      /**
       * The effects functions defined for the component.
       */
      effectsFn?: Set<ReblendTyping.StateEffectiveFunction>;
      /**
       * The disconnect effects to apply when the component is disconnected.
       */
      disconnectEffects?: Set<ReblendTyping.StateEffectiveFunction>;
      /**
       * Error thrown when a state identifier/key is not specified.
       */
      stateIdNotIncluded: Error;
      /**
       * Indicates number of awaiting updates.
       */
      numAwaitingUpdates: number;
      /**
       * Indicates whether state effects are currently running.
       */
      stateEffectRunning: boolean;
      /**
       * The parent of this component
       */
      directParent: Component<any, any>;
      /**
       * Indicates when first time effects are being called.
       */
      mountingEffects: boolean;
      /**
       * Indicate state initialization
       */
      initStateRunning: boolean;
      /**
       * Indicate when connectedCallback should be called but state has not finished initializing
       */
      awaitingInitState: boolean;
      /**
       * Indicates whether this component disconnected callback was called.
       */
      hasDisconnected: boolean;
      /**
       * Set of update types for children properties.
       */
      childrenPropsUpdate?: Set<ChildrenPropsUpdateType>;
      /**
       * The component's state.
       */
      state: S;
      /**
       * Lifecycle method for mounting the component in React.
       */
      reactReblendMount?: undefined | ((afterNode?: HTMLElement) => void);
      /**
       * Populates the HTML elements for this component.
       */
      populateHtmlElements(): void;
      /**
       * Callback invoked when the component is connected to the DOM.
       */
      connectedCallback(): void;
      /**
       * Adds a disconnect effect function to be executed when the component is disconnected.
       *
       * @param {() => void} effect - The effect function to add.
       */
      addDisconnectedEffect(effect: () => void): void;
      /**
       * Adds styles to the component.
       *
       * @param {string[]} styles - An array of style strings to apply.
       * @param {IAny} style - An object representing styles as key-value pairs.
       * @param {string} style - A single style string to apply.
       * @param {string[] | IAny | string} style - The styles to apply.
       */
      addStyle(style: string[] | IAny | string): void;
      /**
       * Initializes the component's state.
       */
      initState(): Promise<void>;
      /**
       * Initializes the component's properties.
       *
       * @param {P} props - The properties to set on the component.
       */
      initProps(props: P): Promise<void>;
      /**
       * Lifecycle method called after the component is mounted.
       */
      componentDidMount(): void;
      /**
       * Sets the state of the component using the setter.
       *
       * @param {S} value - The new state value.
       */
      setState(value: S): void;
      /**
       * Applies effects defined in the component, executing them in order.
       */
      applyEffects(): void;
      /**
       * Handles an error that occurs during rendering or lifecycle methods.
       *
       * @param {Error} error - The error to handle.
       */
      handleError(error: Error): void;
      /**
       * Catches errors thrown by a given function and handles them.
       *
       * @param {() => void} fn - The function to execute and catch errors from.
       */
      catchErrorFrom(fn: () => void): void;
      /**
       * Handles state changes, applying effects and updating virtual DOM nodes.
       * @async
       */
      onStateChange(): void;
      /**
       * Returns the virtual DOM structure. Must be implemented by subclasses.
       * @returns {VNode | VNodeChildren} The virtual DOM nodes.
       */
      html(): Promise<ReblendTyping.ReblendNode>;
      /**
       * Mounts effects defined in the component, executing them and storing disconnect functions.
       * @
       */
      mountEffects(): void;
      /**
       * Lifecycle method called when the component is disconnected from the DOM.
       * Cleans up resources and removes the component from its parent.
       */
      disconnectedCallback(): void;
      /**
       * Cleans up resources before the component unmounts.
       */
      cleanUp(): void;
      /**
       * Lifecycle method for component unmount actions.
       */
      componentWillUnmount(): void;
      /**
       * Shallow compare dependecies for changes
       * @param {Array<any>} currentDependencies
       * @param {Array<any>} previousDependencies
       * @returns {boolean} Returns true if the two object are not equal
       */
      dependenciesChanged(
        currentDependencies: Array<any>,
        previousDependencies: Array<any>
      ): boolean;
      /**
       * State management hook for functional components.
       *
       * @template T - The type of the state.
       * @param {ReblendTyping.StateFunctionValue<T>} initial - The initial state value.
       * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
       * @returns {[T, ReblendTyping.StateFunction<T>]} The current state and a function to update it.
       */
      useState<T>(
        initial: ReblendTyping.StateFunctionValue<T>,
        ...dependencyStringAndOrStateKey: string[]
      ): [T, ReblendTyping.StateFunction<T>];
      /**
       * Effect hook for performing side effects in functional components.
       *
       * @param {ReblendTyping.StateEffectiveFunction} fn - The effect function to execute.
       * @param {any[]} dependencies - Array of dependencies for the effect.
       * @param {...string[]} _dependencyStringAndOrStateKey - Optional dependencies or state key.
       */
      useEffect(
        fn: ReblendTyping.StateEffectiveFunction,
        dependencies: any[],
        ..._dependencyStringAndOrStateKey: string[]
      ): void;
      /**
       * Reducer hook for managing state with a reducer function.
       *
       * @template T - The type of the state.
       * @template I - The type of the action.
       * @param {ReblendTyping.StateReducerFunction<T, I>} reducer - The reducer function.
       * @param {ReblendTyping.StateFunctionValue<T>} initial - The initial state value.
       * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
       * @returns {[T, ReblendTyping.StateFunction<I>]} The current state and a dispatch function.
       */
      useReducer<T, I>(
        reducer: ReblendTyping.StateReducerFunction<T, I>,
        initial: ReblendTyping.StateFunctionValue<T>,
        ...dependencyStringAndOrStateKey: string[]
      ): [T, ReblendTyping.StateFunction<I>];
      /**
       * Memoization hook for caching values in functional components.
       *
       * @template T - The type of the memoized value.
       * @param {ReblendTyping.StateEffectiveMemoFunction<T>} fn - The function to compute the value.
       * @param {any[]} [dependencies] - Array of dependencies for the memoization.
       * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
       * @returns {T} The memoized value.
       */
      useMemo<T>(
        fn: ReblendTyping.StateEffectiveMemoFunction<T>,
        dependencies?: any[],
        ...dependencyStringAndOrStateKey: string[]
      ): T;
      /**
       * Creates a ref object to hold mutable values that do not trigger re-renders.
       *
       * @template T - The type of the referenced value.
       * @param {T} [initial] - The initial value of the ref.
       * @param {T} [stateKey] - Added for compatibility with reblend function component transpiler
       * @returns {ReblendTyping.Ref<T>} The ref object.
       */
      useRef<T>(initial: T, stateKey: string): ReblendTyping.Ref<T>;
      /**
       * Binds a function to the current context.
       *
       * @param {() => any} fn - The function to bind.
       * @returns {Function} The bound function.
       */
      useCallback(fn: () => any): Function;
      /**
       * Initializes the component, preparing effect management.
       * For compatibility in case a standard element inherits this prototype; can manually execute this constructor.
       */
      _constructor(): void;
    }
    class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {}
    /**
     * @deprecated Use `ClassicComponent` from `create-reblend-class`
     *
     * @see {@link https://legacy.reblendjs.org/docs/reblend-without-es6.html Legacy Reblend Docs}
     * @see {@link https://www.npmjs.com/package/create-reblend-class `create-reblend-class` on npm}
     */
    interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
      replaceState(nextState: S, callback?: () => void): void;
      isMounted(): boolean;
      getInitialState?(): S;
    }
    interface ChildContextProvider<CC> {
      getChildContext(): CC;
    }
    /**
     * Represents the type of a function component. Can optionally
     * receive a type argument that represents the props the component
     * receives.
     *
     * @template P The props the component accepts.
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components Reblend TypeScript Cheatsheet}
     * @alias for {@link FunctionComponent}
     *
     * @example
     *
     * ```tsx
     * // With props:
     * type Props = { name: string }
     *
     * const MyComponent: FC<Props> = (props) => {
     *  return <div>{props.name}</div>
     * }
     * ```
     *
     * @example
     *
     * ```tsx
     * // Without props:
     * const MyComponentWithoutProps: FC = () => {
     *   return <div>MyComponentWithoutProps</div>
     * }
     * ```
     */
    type FC<P = {}> = FunctionComponent<P>;
    /**
     * Represents the type of a function component. Can optionally
     * receive a type argument that represents the props the component
     * accepts.
     *
     * @template P The props the component accepts.
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * // With props:
     * type Props = { name: string }
     *
     * const MyComponent: FunctionComponent<Props> = (props) => {
     *  return <div>{props.name}</div>
     * }
     * ```
     *
     * @example
     *
     * ```tsx
     * // Without props:
     * const MyComponentWithoutProps: FunctionComponent = () => {
     *   return <div>MyComponentWithoutProps</div>
     * }
     * ```
     */
    interface FunctionComponent<P = {}> {
      (props: P): ReblendNode;
      /**
       * Used to declare the types of the props accepted by the
       * component. These types will be checked during rendering
       * and in development only.
       *
       * We recommend using TypeScript instead of checking prop
       * types at runtime.
       *
       * @see {@link https://reblend.dev/reference/reblend/Component#static-proptypes Reblend Docs}
       */
      propTypes?: WeakValidationMap<P> | undefined;
      /**
       * @deprecated
       *
       * Lets you specify which legacy context is consumed by
       * this component.
       *
       * @see {@link https://legacy.reblendjs.org/docs/legacy-context.html Legacy Reblend Docs}
       */
      contextTypes?: ValidationMap<any> | undefined;
      /**
       * Used to define default values for the props accepted by
       * the component.
       *
       * @see {@link https://reblend.dev/reference/reblend/Component#static-defaultprops Reblend Docs}
       *
       * @example
       *
       * ```tsx
       * type Props = { name?: string }
       *
       * const MyComponent: FC<Props> = (props) => {
       *   return <div>{props.name}</div>
       * }
       *
       * MyComponent.defaultProps = {
       *   name: 'John Doe'
       * }
       * ```
       *
       * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value|default values for destructuring assignments instead}.
       */
      defaultProps?: Partial<P> | undefined;
      props?: Partial<P> | undefined;
      /**
       * Used in debugging messages. You might want to set it
       * explicitly if you want to display a different name for
       * debugging purposes.
       *
       * @see {@link https://legacy.reblendjs.org/docs/reblend-component.html#displayname Legacy Reblend Docs}
       *
       * @example
       *
       * ```tsx
       *
       * const MyComponent: FC = () => {
       *   return <div>Hello!</div>
       * }
       *
       * MyComponent.displayName = 'MyAwesomeComponent'
       * ```
       */
      displayName?: string | undefined;
    }
    /**
     * @deprecated - Equivalent to {@link ReblendTyping.FunctionComponent}.
     *
     * @see {@link ReblendTyping.FunctionComponent}
     * @alias {@link VoidFunctionComponent}
     */
    type VFC<P = {}> = VoidFunctionComponent<P>;
    /**
     * @deprecated - Equivalent to {@link ReblendTyping.FunctionComponent}.
     *
     * @see {@link ReblendTyping.FunctionComponent}
     */
    interface VoidFunctionComponent<P = {}> {
      (props: P): ReblendNode;
      propTypes?: WeakValidationMap<P> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      /**
       * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value|default values for destructuring assignments instead}.
       */
      defaultProps?: Partial<P> | undefined;
      props?: Partial<P> | undefined;
      displayName?: string | undefined;
    }
    /**
     * The type of the ref received by a {@link ForwardRefRenderFunction}.
     *
     * @see {@link ForwardRefRenderFunction}
     */
    type ForwardedRef<T> =
      | ((instance: T | null) => void)
      | MutableRefObject<T | null>
      | null;
    /**
     * The type of the function passed to {@link forwardRef}. This is considered different
     * to a normal {@link FunctionComponent} because it receives an additional argument,
     *
     * @param props Props passed to the component, if any.
     * @param ref A ref forwarded to the component of type {@link ForwardedRef}.
     *
     * @template T The type of the forwarded ref.
     * @template P The type of the props the component accepts.
     *
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/ Reblend TypeScript Cheatsheet}
     * @see {@link forwardRef}
     */
    interface ForwardRefRenderFunction<T, P = {}> {
      (props: P): ReblendNode;
      /**
       * Used in debugging messages. You might want to set it
       * explicitly if you want to display a different name for
       * debugging purposes.
       *
       * Will show `ForwardRef(${Component.displayName || Component.name})`
       * in devtools by default, but can be given its own specific name.
       *
       * @see {@link https://legacy.reblendjs.org/docs/reblend-component.html#displayname Legacy Reblend Docs}
       */
      displayName?: string | undefined;
      /**
       * defaultProps are not supported on render functions passed to forwardRef.
       *
       * @see {@link https://github.com/microsoft/TypeScript/issues/36826 linked GitHub issue} for context
       * @see {@link https://reblend.dev/reference/reblend/Component#static-defaultprops Reblend Docs}
       */
      defaultProps?: never | undefined;
      props?: never | undefined;
      /**
       * propTypes are not supported on render functions passed to forwardRef.
       *
       * @see {@link https://github.com/microsoft/TypeScript/issues/36826 linked GitHub issue} for context
       * @see {@link https://reblend.dev/reference/reblend/Component#static-proptypes Reblend Docs}
       */
      propTypes?: never | undefined;
    }
    /**
     * Represents a component class in Reblend.
     *
     * @template P The props the component accepts.
     * @template S The internal state of the component.
     */
    interface ComponentClass<P = {}, S = ComponentState>
      extends StaticLifecycle<P, S> {
      new (props: P): Component<P, S>;
      /**
       * Used to declare the types of the props accepted by the
       * component. These types will be checked during rendering
       * and in development only.
       *
       * We recommend using TypeScript instead of checking prop
       * types at runtime.
       *
       * @see {@link https://reblend.dev/reference/reblend/Component#static-proptypes Reblend Docs}
       */
      propTypes?: WeakValidationMap<P> | undefined;
      contextType?: Context<any> | undefined;
      /**
       * @deprecated use {@link ComponentClass.contextType} instead
       *
       * Lets you specify which legacy context is consumed by
       * this component.
       *
       * @see {@link https://legacy.reblendjs.org/docs/legacy-context.html Legacy Reblend Docs}
       */
      contextTypes?: ValidationMap<any> | undefined;
      /**
       * @deprecated
       *
       * @see {@link https://legacy.reblendjs.org/docs/legacy-context.html#how-to-use-context Legacy Reblend Docs}
       */
      childContextTypes?: ValidationMap<any> | undefined;
      /**
       * Used to define default values for the props accepted by
       * the component.
       *
       * @see {@link https://reblend.dev/reference/reblend/Component#static-defaultprops Reblend Docs}
       */
      defaultProps?: Partial<P> | undefined;
      props?: Partial<P> | undefined;
      /**
       * Used in debugging messages. You might want to set it
       * explicitly if you want to display a different name for
       * debugging purposes.
       *
       * @see {@link https://legacy.reblendjs.org/docs/reblend-component.html#displayname Legacy Reblend Docs}
       */
      displayName?: string | undefined;
    }
    /**
     * @deprecated Use `ClassicComponentClass` from `create-reblend-class`
     *
     * @see {@link https://legacy.reblendjs.org/docs/reblend-without-es6.html Legacy Reblend Docs}
     * @see {@link https://www.npmjs.com/package/create-reblend-class `create-reblend-class` on npm}
     */
    interface ClassicComponentClass<P = {}> extends ComponentClass<P> {
      new (props: P): ClassicComponent<P, ComponentState>;
      getDefaultProps?(): P;
    }
    /**
     * Used in {@link createElement} and {@link createFactory} to represent
     * a class.
     *
     * An intersection type is used to infer multiple type parameters from
     * a single argument, which is useful for many top-level API defs.
     * See {@link https://github.com/Microsoft/TypeScript/issues/7234 this GitHub issue}
     * for more info.
     */
    type ClassType<
      P,
      T extends Component<P, ComponentState>,
      C extends ComponentClass<P>
    > = C & (new (props: P) => T);
    interface ComponentLifecycle<P, S, SS = any>
      extends NewLifecycle<P, S, SS>,
        DeprecatedLifecycle<P, S> {
      /**
       * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
       */
      componentDidMount?(): void;
      /**
       * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
       * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
       */
      componentWillUnmount?(): void;
    }
    interface StaticLifecycle<P, S> {
      getDerivedStateFromProps?: GetDerivedStateFromProps<P, S> | undefined;
      getDerivedStateFromError?: GetDerivedStateFromError<P, S> | undefined;
    }
    type GetDerivedStateFromProps<P, S> =
      /**
       * Returns an update to a component's state based on its new props and old state.
       *
       * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
       */
      (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;
    type GetDerivedStateFromError<P, S> =
      /**
       * This lifecycle is invoked after an error has been thrown by a descendant component.
       * It receives the error that was thrown as a parameter and should return a value to update state.
       *
       * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
       */
      (error: any) => Partial<S> | null;
    interface NewLifecycle<P, S, SS> {}
    interface DeprecatedLifecycle<P, S> {}
    /**
     * @deprecated
     *
     * @see {@link https://legacy.reblendjs.org/blog/2016/07/13/mixins-considered-harmful.html Mixins Considered Harmful}
     */
    interface Mixin<P, S> extends ComponentLifecycle<P, S> {
      mixins?: Array<Mixin<P, S>> | undefined;
      statics?:
        | {
            [key: string]: any;
          }
        | undefined;
      displayName?: string | undefined;
      propTypes?: ValidationMap<any> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      childContextTypes?: ValidationMap<any> | undefined;
      getDefaultProps?(): P;
      getInitialState?(): S;
    }
    /**
     * @deprecated
     *
     * @see {@link https://legacy.reblendjs.org/blog/2016/07/13/mixins-considered-harmful.html Mixins Considered Harmful}
     */
    interface ComponentSpec<P, S> extends Mixin<P, S> {
      render(): ReblendNode;
      [propertyName: string]: any;
    }
    function createRef<T>(): Ref<T>;
    /**
     * The type of the component returned from {@link forwardRef}.
     *
     * @template P The props the component accepts, if any.
     *
     * @see {@link ExoticComponent}
     */
    interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
      /**
       * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value|default values for destructuring assignments instead}.
       */
      defaultProps?: Partial<P> | undefined;
      props?: Partial<P> | undefined;
      propTypes?: WeakValidationMap<P> | undefined;
    }
    /**
     * Lets your component expose a DOM node to a parent component
     * using a ref.
     *
     * @see {@link https://reblend.dev/reference/reblend/forwardRef Reblend Docs}
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/ Reblend TypeScript Cheatsheet}
     *
     * @param render See the {@link ForwardRefRenderFunction}.
     *
     * @template T The type of the DOM node.
     * @template P The props the component accepts, if any.
     *
     * @example
     *
     * ```tsx
     * interface Props {
     *   children?: ReblendNode;
     *   type: "submit" | "button";
     * }
     *
     * export const FancyButton = forwardRef<HTMLButtonElement, Props>((props, ref) => (
     *   <button ref={ref} className="MyClassName" type={props.type}>
     *     {props.children}
     *   </button>
     * ));
     * ```
     */
    function forwardRef<T, P = {}>(
      render: ForwardRefRenderFunction<T, P>
    ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
    /**
     * Omits the 'ref' attribute from the given props object.
     *
     * @template P The props object type.
     */
    type PropsWithoutRef<P> = P extends any
      ? 'ref' extends keyof P
        ? Omit<P, 'ref'>
        : P
      : P;
    /** Ensures that the props do not include string ref, which cannot be forwarded */
    type PropsWithRef<P> = 'ref' extends keyof P
      ? P extends {
          ref?: infer R | undefined;
        }
        ? string extends R
          ? PropsWithoutRef<P> & {
              ref?: Exclude<R, string> | undefined;
            }
          : P
        : P
      : P;
    type PropsWithChildren<P = unknown> = P & {
      children?: ReblendNode | undefined;
    };
    /**
     * Used to retrieve the props a component accepts. Can either be passed a string,
     * indicating a DOM element (e.g. 'div', 'span', etc.) or the type of a Reblend
     * component.
     *
     * It's usually better to use {@link ComponentPropsWithRef} or {@link ComponentPropsWithoutRef}
     * instead of this type, as they let you be explicit about whether or not to include
     * the `ref` prop.
     *
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/reblend-types/componentprops/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * // Retrieves the props an 'input' element accepts
     * type InputProps = Reblend.ComponentProps<'input'>;
     * ```
     *
     * @example
     *
     * ```tsx
     * const MyComponent = (props: { foo: number, bar: string }) => <div />;
     *
     * // Retrieves the props 'MyComponent' accepts
     * type MyComponentProps = Reblend.ComponentProps<typeof MyComponent>;
     * ```
     */
    type ComponentProps<
      T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
    > = T extends JSXElementConstructor<infer P>
      ? P
      : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {};
    /**
     * Used to retrieve the props a component accepts with its ref. Can either be
     * passed a string, indicating a DOM element (e.g. 'div', 'span', etc.) or the
     * type of a Reblend component.
     *
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/reblend-types/componentprops/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * // Retrieves the props an 'input' element accepts
     * type InputProps = Reblend.ComponentPropsWithRef<'input'>;
     * ```
     *
     * @example
     *
     * ```tsx
     * const MyComponent = (props: { foo: number, bar: string }) => <div />;
     *
     * // Retrieves the props 'MyComponent' accepts
     * type MyComponentPropsWithRef = Reblend.ComponentPropsWithRef<typeof MyComponent>;
     * ```
     */
    /**
     * Used to retrieve the props a custom component accepts with its ref.
     *
     * Unlike {@link ComponentPropsWithRef}, this only works with custom
     * components, i.e. components you define yourself. This is to improve
     * type-checking performance.
     *
     * @example
     *
     * ```tsx
     * const MyComponent = (props: { foo: number, bar: string }) => <div />;
     *
     * // Retrieves the props 'MyComponent' accepts
     * type MyComponentPropsWithRef = Reblend.CustomComponentPropsWithRef<typeof MyComponent>;
     * ```
     */
    type CustomComponentPropsWithRef<T extends ComponentType> = T extends new (
      props: infer P
    ) => Component<any, any>
      ? PropsWithoutRef<P> & RefAttributes<InstanceType<T>>
      : T extends (props: infer P) => ReblendNode
      ? PropsWithRef<P>
      : never;
    /**
     * Used to retrieve the props a component accepts without its ref. Can either be
     * passed a string, indicating a DOM element (e.g. 'div', 'span', etc.) or the
     * type of a Reblend component.
     *
     * @see {@link https://reblend-typescript-cheatsheet.netlify.app/docs/reblend-types/componentprops/ Reblend TypeScript Cheatsheet}
     *
     * @example
     *
     * ```tsx
     * // Retrieves the props an 'input' element accepts
     * type InputProps = Reblend.ComponentPropsWithoutRef<'input'>;
     * ```
     *
     * @example
     *
     * ```tsx
     * const MyComponent = (props: { foo: number, bar: string }) => <div />;
     *
     * // Retrieves the props 'MyComponent' accepts
     * type MyComponentPropsWithoutRef = Reblend.ComponentPropsWithoutRef<typeof MyComponent>;
     * ```
     */
    type MemoExoticComponent<T extends ComponentType<any>> =
      NamedExoticComponent<CustomComponentPropsWithRef<T>> & {
        readonly type: T;
      };
    /**
     * Lets you skip re-rendering a component when its props are unchanged.
     *
     * @see {@link https://reblend.dev/reference/reblend/memo Reblend Docs}
     *
     * @param Component The component to memoize.
     * @param propsAreEqual A function that will be used to determine if the props have changed.
     *
     * @example
     *
     * ```tsx
     * import { memo } from 'reblend';
     *
     * const SomeComponent = memo(function SomeComponent(props: { foo: string }) {
     *   // ...
     * });
     * ```
     */
    function memo<P extends object>(
      Component: FunctionComponent<P>,
      propsAreEqual?: (
        prevProps: Readonly<P>,
        nextProps: Readonly<P>
      ) => boolean
    ): NamedExoticComponent<P>;
    interface LazyExoticComponent<T extends ComponentType<any>>
      extends ExoticComponent<CustomComponentPropsWithRef<T>> {
      readonly _result: T;
    }
    /**
     * Lets you defer loading a component’s code until it is rendered for the first time.
     *
     * @see {@link https://reblend.dev/reference/reblend/lazy Reblend Docs}
     *
     * @param load A function that returns a `Promise` or another thenable (a `Promise`-like object with a
     * then method). Reblend will not call `load` until the first time you attempt to render the returned
     * component. After Reblend first calls load, it will wait for it to resolve, and then render the
     * resolved value’s `.default` as a Reblend component. Both the returned `Promise` and the `Promise`’s
     * resolved value will be cached, so Reblend will not call load more than once. If the `Promise` rejects,
     * Reblend will throw the rejection reason for the nearest Error Boundary to handle.
     *
     * @example
     *
     * ```tsx
     * import { lazy } from 'reblend';
     *
     * const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
     * ```
     */
    function lazy<T extends ComponentType<any>>(
      load: () => Promise<{
        default: T;
      }>
    ): LazyExoticComponent<T>;
    /**
     * The instruction passed to a {@link Dispatch} function in {@link useState}
     * to tell Reblend what the next value of the {@link useState} should be.
     *
     * Often found wrapped in {@link Dispatch}.
     *
     * @template S The type of the state.
     *
     * @example
     *
     * ```tsx
     * // This return type correctly represents the type of
     * // `setCount` in the example below.
     * const useCustomState = (): Dispatch<SetStateAction<number>> => {
     *   const [count, setCount] = useState(0);
     *
     *   return setCount;
     * }
     * ```
     */
    type SetStateAction<S> = S | ((prevState: S) => S);
    /**
     * A function that can be used to update the state of a {@link useState}
     * or {@link useReducer} hook.
     */
    type Dispatch<A> = (value: A) => void;
    /**
     * A {@link Dispatch} function can sometimes be called without any arguments.
     */
    type DispatchWithoutAction = () => void;
    type Reducer<S, A> = (prevState: S, action: A) => S;
    type ReducerWithoutAction<S> = (prevState: S) => S;
    type ReducerState<R extends Reducer<any, any>> = R extends Reducer<
      infer S,
      any
    >
      ? S
      : never;
    type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
      any,
      infer A
    >
      ? A
      : never;
    type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> =
      R extends ReducerWithoutAction<infer S> ? S : never;
    type DependencyList = readonly unknown[];
    type EffectCallback = () => void | Destructor;
    interface MutableRefObject<T> {
      current: T;
    }
    /**
     * Accepts a context object (the value returned from `Reblend.createContext`) and returns the current
     * context value, as given by the nearest context provider for the given context.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useContext}
     */
    function useContext<T>(context: Context<T>): T;
    /**
     * Returns a stateful value, and a function to update it.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useState}
     */
    function useState<S>(
      initialState: S | (() => S)
    ): [S, Dispatch<SetStateAction<S>>];
    /**
     * Returns a stateful value, and a function to update it.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useState}
     */
    function useState<S = undefined>(): [
      S | undefined,
      Dispatch<SetStateAction<S | undefined>>
    ];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useReducer}
     */
    function useReducer<R extends ReducerWithoutAction<any>, I>(
      reducer: R,
      initializerArg: I,
      initializer: (arg: I) => ReducerStateWithoutAction<R>
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useReducer}
     */
    function useReducer<R extends ReducerWithoutAction<any>>(
      reducer: R,
      initializerArg: ReducerStateWithoutAction<R>,
      initializer?: undefined
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useReducer}
     */
    function useReducer<R extends Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I & ReducerState<R>,
      initializer: (arg: I & ReducerState<R>) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useReducer}
     */
    function useReducer<R extends Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I,
      initializer: (arg: I) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useReducer}
     */
    function useReducer<R extends Reducer<any, any>>(
      reducer: R,
      initialState: ReducerState<R>,
      initializer?: undefined
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
    /**
     * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
     * (`initialValue`). The returned object will persist for the full lifetime of the component.
     *
     * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
     * value around similar to how you’d use instance fields in classes.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useRef}
     */
    function useRef<T>(initialValue: T): MutableRefObject<T>;
    /**
     * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
     * (`initialValue`). The returned object will persist for the full lifetime of the component.
     *
     * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
     * value around similar to how you’d use instance fields in classes.
     *
     * Usage note: if you need the result of useRef to be directly mutable, include `| null` in the type
     * of the generic argument.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useRef}
     */
    function useRef<T>(initialValue: T | null): Ref<T>;
    /**
     * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
     * (`initialValue`). The returned object will persist for the full lifetime of the component.
     *
     * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
     * value around similar to how you’d use instance fields in classes.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useRef}
     */
    function useRef<T = undefined>(): MutableRefObject<T | undefined>;
    /**
     * The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.
     * Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside
     * `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
     *
     * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
     *
     * If you’re migrating code from a class component, `useLayoutEffect` fires in the same phase as
     * `componentDidMount` and `componentDidUpdate`.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useLayoutEffect}
     */
    function useLayoutEffect(
      effect: EffectCallback,
      deps?: DependencyList
    ): void;
    /**
     * Accepts a function that contains imperative, possibly effectful code.
     *
     * @param effect Imperative function that can return a cleanup function
     * @param deps If present, effect will only activate if the values in the list change.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useEffect}
     */
    function useEffect(effect: EffectCallback, deps?: DependencyList): void;
    /**
     * `useImperativeHandle` customizes the instance value that is exposed to parent components when using
     * `ref`. As always, imperative code using refs should be avoided in most cases.
     *
     * `useImperativeHandle` should be used with `Reblend.forwardRef`.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useImperativeHandle}
     */
    function useImperativeHandle<T, R extends T>(
      ref: Ref<T> | undefined,
      init: () => R,
      deps?: DependencyList
    ): void;
    /**
     * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
     * has changed.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useCallback}
     */
    function useCallback<T extends Function>(
      callback: T,
      deps: DependencyList
    ): T;
    /**
     * `useMemo` will only recompute the memoized value when one of the `deps` has changed.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useMemo}
     */
    function useMemo<T>(factory: () => T, deps: DependencyList): T;
    /**
     * `useDebugValue` can be used to display a label for custom hooks in Reblend DevTools.
     *
     * NOTE: We don’t recommend adding debug values to every custom hook.
     * It’s most valuable for custom hooks that are part of shared libraries.
     *
     * @version 16.8.0
     * @see {@link https://reblend.dev/reference/reblend/useDebugValue}
     */
    function useDebugValue<T>(value: T, format?: (value: T) => any): void;
    type TransitionFunction = () => VoidOrUndefinedOnly;
    interface TransitionStartFunction {
      /**
       * State updates caused inside the callback are allowed to be deferred.
       *
       * **If some state update causes a component to suspend, that state update should be wrapped in a transition.**
       *
       * @param callback A _synchronous_ function which causes state updates that can be deferred.
       */
      (callback: TransitionFunction): void;
    }
    /**
     * Returns a deferred version of the value that may “lag behind” it.
     *
     * This is commonly used to keep the interface responsive when you have something that renders immediately
     * based on user input and something that needs to wait for a data fetch.
     *
     * A good example of this is a text input.
     *
     * @param value The value that is going to be deferred
     *
     * @see {@link https://reblend.dev/reference/reblend/useDeferredValue}
     */
    function useDeferredValue<T>(value: T): T;
    /**
     * Allows components to avoid undesirable loading states by waiting for content to load
     * before transitioning to the next screen. It also allows components to defer slower,
     * data fetching updates until subsequent renders so that more crucial updates can be
     * rendered immediately.
     *
     * The `useTransition` hook returns two values in an array.
     *
     * The first is a boolean, Reblend’s way of informing us whether we’re waiting for the transition to finish.
     * The second is a function that takes a callback. We can use it to tell Reblend which state we want to defer.
     *
     * **If some state update causes a component to suspend, that state update should be wrapped in a transition.**
     *
     * @see {@link https://reblend.dev/reference/reblend/useTransition}
     */
    function useTransition(): [boolean, TransitionStartFunction];
    /**
     * Similar to `useTransition` but allows uses where hooks are not available.
     *
     * @param callback A _synchronous_ function which causes state updates that can be deferred.
     */
    function startTransition(scope: TransitionFunction): void;
    /**
     * Wrap any code rendering and triggering updates to your components into `act()` calls.
     *
     * Ensures that the behavior in your tests matches what happens in the browser
     * more closely by executing pending `useEffect`s before returning. This also
     * reduces the amount of re-renders done.
     *
     * @param callback A synchronous, void callback that will execute as a single, complete Reblend commit.
     *
     * @see https://reblendjs.org/blog/2019/02/06/reblend-v16.8.0.html#testing-hooks
     */
    function act(callback: () => VoidOrUndefinedOnly): void;
    function act<T>(callback: () => T | Promise<T>): Promise<T>;
    function useId(): string;
    /**
     * @param effect Imperative function that can return a cleanup function
     * @param deps If present, effect will only activate if the values in the list change.
     *
     * @see {@link https://github.com/facebook/reblend/pull/21913}
     */
    function useInsertionEffect(
      effect: EffectCallback,
      deps?: DependencyList
    ): void;
    /**
     * @param subscribe
     * @param getSnapshot
     *
     * @see {@link https://github.com/reblendwg/reblend-18/discussions/86}
     */
    function useSyncExternalStore<Snapshot>(
      subscribe: (onStoreChange: () => void) => () => void,
      getSnapshot: () => Snapshot,
      getServerSnapshot?: () => Snapshot
    ): Snapshot;
    interface BaseSyntheticEvent<E = object, C = any, T = any> {
      nativeEvent: E;
      currentTarget: C;
      target: T;
      bubbles: boolean;
      cancelable: boolean;
      defaultPrevented: boolean;
      eventPhase: number;
      isTrusted: boolean;
      preventDefault(): void;
      isDefaultPrevented(): boolean;
      stopPropagation(): void;
      isPropagationStopped(): boolean;
      persist(): void;
      timeStamp: number;
      type: string;
    }
    /**
     * currentTarget - a reference to the element on which the event listener is registered.
     *
     * target - a reference to the element from which the event was originally dispatched.
     * This might be a child element to the element on which the event listener is registered.
     * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
     */
    interface SyntheticEvent<T = Element, E = Event>
      extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
    interface ClipboardEvent<T = Element>
      extends SyntheticEvent<T, NativeClipboardEvent> {
      clipboardData: DataTransfer;
    }
    interface CompositionEvent<T = Element>
      extends SyntheticEvent<T, NativeCompositionEvent> {
      data: string;
    }
    interface DragEvent<T = Element> extends MouseEvent<T, NativeDragEvent> {
      dataTransfer: DataTransfer;
    }
    interface PointerEvent<T = Element>
      extends MouseEvent<T, NativePointerEvent> {
      pointerId: number;
      pressure: number;
      tangentialPressure: number;
      tiltX: number;
      tiltY: number;
      twist: number;
      width: number;
      height: number;
      pointerType: 'mouse' | 'pen' | 'touch';
      isPrimary: boolean;
    }
    interface FocusEvent<Target = Element, RelatedTarget = Element>
      extends SyntheticEvent<Target, NativeFocusEvent> {
      relatedTarget: (EventTarget & RelatedTarget) | null;
      target: EventTarget & Target;
    }
    interface FormEvent<T = Element> extends SyntheticEvent<T> {}
    interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & T;
    }
    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & T;
    }
    type ModifierKey =
      | 'Alt'
      | 'AltGraph'
      | 'CapsLock'
      | 'Control'
      | 'Fn'
      | 'FnLock'
      | 'Hyper'
      | 'Meta'
      | 'NumLock'
      | 'ScrollLock'
      | 'Shift'
      | 'Super'
      | 'Symbol'
      | 'SymbolLock';
    interface KeyboardEvent<T = Element>
      extends UIEvent<T, NativeKeyboardEvent> {
      altKey: boolean;
      /** @deprecated */
      charCode: number;
      ctrlKey: boolean;
      code: string;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: ModifierKey): boolean;
      /**
       * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
       */
      key: string;
      /** @deprecated */
      keyCode: number;
      locale: string;
      location: number;
      metaKey: boolean;
      repeat: boolean;
      shiftKey: boolean;
      /** @deprecated */
      which: number;
    }
    interface MouseEvent<T = Element, E = NativeMouseEvent>
      extends UIEvent<T, E> {
      altKey: boolean;
      button: number;
      buttons: number;
      clientX: number;
      clientY: number;
      ctrlKey: boolean;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: ModifierKey): boolean;
      metaKey: boolean;
      movementX: number;
      movementY: number;
      pageX: number;
      pageY: number;
      relatedTarget: EventTarget | null;
      screenX: number;
      screenY: number;
      shiftKey: boolean;
    }
    interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
      altKey: boolean;
      changedTouches: TouchList;
      ctrlKey: boolean;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: ModifierKey): boolean;
      metaKey: boolean;
      shiftKey: boolean;
      targetTouches: TouchList;
      touches: TouchList;
    }
    interface UIEvent<T = Element, E = NativeUIEvent>
      extends SyntheticEvent<T, E> {
      detail: number;
      view: AbstractView;
    }
    interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
      deltaMode: number;
      deltaX: number;
      deltaY: number;
      deltaZ: number;
    }
    interface AnimationEvent<T = Element>
      extends SyntheticEvent<T, NativeAnimationEvent> {
      animationName: string;
      elapsedTime: number;
      pseudoElement: string;
    }
    interface TransitionEvent<T = Element>
      extends SyntheticEvent<T, NativeTransitionEvent> {
      elapsedTime: number;
      propertyName: string;
      pseudoElement: string;
    }
    type EventHandler<E extends SyntheticEvent<any>> = {
      bivarianceHack(event: E): void;
    }['bivarianceHack'];
    type ReblendEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
    type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
    type CompositionEventHandler<T = Element> = EventHandler<
      CompositionEvent<T>
    >;
    type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
    type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
    type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
    type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
    type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
    type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
    type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
    type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
    type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
    type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
    type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
    type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
    interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {}
    type DetailedHTMLProps<
      E extends HTMLAttributes<T>,
      T
    > = ClassAttributes<T> & E;
    interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {}
    interface SVGLineElementAttributes<T> extends SVGProps<T> {}
    interface SVGTextElementAttributes<T> extends SVGProps<T> {}
    interface DOMAttributes<T> {
      children?: ReblendNode | undefined;
      dangerouslySetInnerHTML?:
        | {
            __html: string | TrustedHTML;
          }
        | undefined;
      onCopy?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncopy?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCopyCapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncopycapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCut?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncut?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCutCapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncutcapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPaste?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpaste?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPasteCapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpastecapture?:
        | ClipboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionEnd?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionend?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionEndCapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionendcapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionStart?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionstart?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionStartCapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionstartcapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionUpdate?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionupdate?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCompositionUpdateCapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncompositionupdatecapture?:
        | CompositionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onFocus?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onfocus?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onFocusCapture?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onfocuscapture?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onBlur?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onblur?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onBlurCapture?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onblurcapture?:
        | FocusEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onChange?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onchange?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onChangeCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onchangecapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onBeforeInput?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onbeforeinput?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onBeforeInputCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onbeforeinputcapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onInput?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oninput?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onInputCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oninputcapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onReset?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onreset?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onResetCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onresetcapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSubmit?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onsubmit?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSubmitCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onsubmitcapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onInvalid?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oninvalid?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onInvalidCapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oninvalidcapture?:
        | FormEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoad?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onload?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onError?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onerror?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onErrorCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onerrorcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onKeyDown?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeydown?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onKeyDownCapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeydowncapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      /** @deprecated */
      onKeyPress?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeypress?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      /** @deprecated */
      onKeyPressCapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeypresscapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onKeyUp?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeyup?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onKeyUpCapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onkeyupcapture?:
        | KeyboardEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAbort?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onabort?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAbortCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onabortcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCanPlay?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncanplay?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCanPlayCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncanplaycapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCanPlayThrough?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncanplaythrough?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onCanPlayThroughCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncanplaythroughcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDurationChange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondurationchange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDurationChangeCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondurationchangecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEmptied?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onemptied?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEmptiedCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onemptiedcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEncrypted?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onencrypted?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEncryptedCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onencryptedcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEnded?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onended?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onEndedCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onendedcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadedData?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadeddata?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadedDataCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadeddatacapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadedMetadata?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadedmetadata?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadedMetadataCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadedmetadatacapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadStart?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadstart?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLoadStartCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onloadstartcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPause?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpause?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPauseCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpausecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPlay?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onplay?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPlayCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onplaycapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPlaying?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onplaying?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPlayingCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onplayingcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onProgress?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onprogress?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onProgressCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onprogresscapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onRateChange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onratechange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onRateChangeCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onratechangecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onResize?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onresize?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onResizeCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onresizecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSeeked?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onseeked?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSeekedCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onseekedcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSeeking?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onseeking?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSeekingCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onseekingcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onStalled?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onstalled?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onStalledCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onstalledcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSuspend?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onsuspend?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSuspendCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onsuspendcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTimeUpdate?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontimeupdate?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTimeUpdateCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontimeupdatecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onVolumeChange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onvolumechange?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onVolumeChangeCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onvolumechangecapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onWaiting?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onwaiting?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onWaitingCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onwaitingcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAuxClick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onauxclick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAuxClickCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onauxclickcapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onClick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onclick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onClickCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onclickcapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onContextMenu?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncontextmenu?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onContextMenuCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      oncontextmenucapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDoubleClick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondoubleclick?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDoubleClickCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondoubleclickcapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDrag?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondrag?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragcapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragEnd?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragend?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragEndCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragendcapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragEnter?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragenter?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragEnterCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragentercapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragExit?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragexit?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragExitCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragexitcapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragLeave?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragleave?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragLeaveCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragleavecapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragOver?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragover?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragOverCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragovercapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragStart?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragstart?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDragStartCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondragstartcapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDrop?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondrop?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onDropCapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ondropcapture?:
        | DragEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseDown?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmousedown?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseDownCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmousedowncapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseEnter?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseenter?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseLeave?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseleave?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseMove?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmousemove?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseMoveCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmousemovecapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseOut?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseout?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseOutCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseoutcapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseOver?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseover?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseOverCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseovercapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseUp?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseup?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onMouseUpCapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onmouseupcapture?:
        | MouseEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSelect?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onselect?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onSelectCapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onselectcapture?:
        | ReblendEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchCancel?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchcancel?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchCancelCapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchcancelcapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchEnd?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchend?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchEndCapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchendcapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchMove?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchmove?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchMoveCapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchmovecapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchStart?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchstart?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTouchStartCapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontouchstartcapture?:
        | TouchEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerDown?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerdown?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerDownCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerdowncapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerMove?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointermove?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerMoveCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointermovecapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerUp?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerup?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerUpCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerupcapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerCancel?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointercancel?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerCancelCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointercancelcapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerEnter?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerenter?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerLeave?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerleave?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerOver?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerover?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerOverCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerovercapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerOut?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointerout?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onPointerOutCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onpointeroutcapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onGotPointerCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ongotpointercapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onGotPointerCaptureCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ongotpointercapturecapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLostPointerCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onlostpointercapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onLostPointerCaptureCapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onlostpointercapturecapture?:
        | PointerEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onScroll?:
        | UIEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onscroll?:
        | UIEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onScrollCapture?:
        | UIEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onscrollcapture?:
        | UIEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onWheel?:
        | WheelEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onwheel?:
        | WheelEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onWheelCapture?:
        | WheelEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onwheelcapture?:
        | WheelEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationStart?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationstart?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationStartCapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationstartcapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationEnd?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationend?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationEndCapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationendcapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationIteration?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationiteration?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onAnimationIterationCapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onanimationiterationcapture?:
        | AnimationEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTransitionEnd?:
        | TransitionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontransitionend?:
        | TransitionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      onTransitionEndCapture?:
        | TransitionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
      ontransitionendcapture?:
        | TransitionEventHandler<T>
        | undefined
        | (() => any)
        | ((value: any) => any);
    }
    interface CSSProperties extends CSS.Properties<string | number> {}
    interface AriaAttributes {
      /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
      'aria-activedescendant'?: string | undefined;
      /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
      'aria-atomic'?: Booleanish | undefined;
      /**
       * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
       * presented if they are made.
       */
      'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
      /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
      /**
       * Defines a string value that labels the current element, which is intended to be converted into Braille.
       * @see aria-label.
       */
      'aria-braillelabel'?: string | undefined;
      /**
       * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
       * @see aria-roledescription.
       */
      'aria-brailleroledescription'?: string | undefined;
      'aria-busy'?: Booleanish | undefined;
      /**
       * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
       * @see aria-pressed @see aria-selected.
       */
      'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
      /**
       * Defines the total number of columns in a table, grid, or treegrid.
       * @see aria-colindex.
       */
      'aria-colcount'?: number | undefined;
      /**
       * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
       * @see aria-colcount @see aria-colspan.
       */
      'aria-colindex'?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-colindex.
       * @see aria-rowindextext.
       */
      'aria-colindextext'?: string | undefined;
      /**
       * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-colindex @see aria-rowspan.
       */
      'aria-colspan'?: number | undefined;
      /**
       * Identifies the element (or elements) whose contents or presence are controlled by the current element.
       * @see aria-owns.
       */
      'aria-controls'?: string | undefined;
      /** Indicates the element that represents the current item within a container or set of related elements. */
      'aria-current'?:
        | boolean
        | 'false'
        | 'true'
        | 'page'
        | 'step'
        | 'location'
        | 'date'
        | 'time'
        | undefined;
      /**
       * Identifies the element (or elements) that describes the object.
       * @see aria-labelledby
       */
      'aria-describedby'?: string | undefined;
      /**
       * Defines a string value that describes or annotates the current element.
       * @see related aria-describedby.
       */
      'aria-description'?: string | undefined;
      /**
       * Identifies the element that provides a detailed, extended description for the object.
       * @see aria-describedby.
       */
      'aria-details'?: string | undefined;
      /**
       * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
       * @see aria-hidden @see aria-readonly.
       */
      'aria-disabled'?: Booleanish | undefined;
      /**
       * Indicates what functions can be performed when a dragged object is released on the drop target.
       * @deprecated in ARIA 1.1
       */
      'aria-dropeffect'?:
        | 'none'
        | 'copy'
        | 'execute'
        | 'link'
        | 'move'
        | 'popup'
        | undefined;
      /**
       * Identifies the element that provides an error message for the object.
       * @see aria-invalid @see aria-describedby.
       */
      'aria-errormessage'?: string | undefined;
      /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
      'aria-expanded'?: Booleanish | undefined;
      /**
       * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
       * allows assistive technology to override the general default of reading in document source order.
       */
      'aria-flowto'?: string | undefined;
      /**
       * Indicates an element's "grabbed" state in a drag-and-drop operation.
       * @deprecated in ARIA 1.1
       */
      'aria-grabbed'?: Booleanish | undefined;
      /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
      'aria-haspopup'?:
        | boolean
        | 'false'
        | 'true'
        | 'menu'
        | 'listbox'
        | 'tree'
        | 'grid'
        | 'dialog'
        | undefined;
      /**
       * Indicates whether the element is exposed to an accessibility API.
       * @see aria-disabled.
       */
      'aria-hidden'?: Booleanish | undefined;
      /**
       * Indicates the entered value does not conform to the format expected by the application.
       * @see aria-errormessage.
       */
      'aria-invalid'?:
        | boolean
        | 'false'
        | 'true'
        | 'grammar'
        | 'spelling'
        | undefined;
      /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
      'aria-keyshortcuts'?: string | undefined;
      /**
       * Defines a string value that labels the current element.
       * @see aria-labelledby.
       */
      'aria-label'?: string | undefined;
      /**
       * Identifies the element (or elements) that labels the current element.
       * @see aria-describedby.
       */
      'aria-labelledby'?: string | undefined;
      /** Defines the hierarchical level of an element within a structure. */
      'aria-level'?: number | undefined;
      /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
      'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
      /** Indicates whether an element is modal when displayed. */
      'aria-modal'?: Booleanish | undefined;
      /** Indicates whether a text box accepts multiple lines of input or only a single line. */
      'aria-multiline'?: Booleanish | undefined;
      /** Indicates that the user may select more than one item from the current selectable descendants. */
      'aria-multiselectable'?: Booleanish | undefined;
      /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
      'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
      /**
       * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
       * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
       * @see aria-controls.
       */
      'aria-owns'?: string | undefined;
      /**
       * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
       * A hint could be a sample value or a brief description of the expected format.
       */
      'aria-placeholder'?: string | undefined;
      /**
       * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-setsize.
       */
      'aria-posinset'?: number | undefined;
      /**
       * Indicates the current "pressed" state of toggle buttons.
       * @see aria-checked @see aria-selected.
       */
      'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
      /**
       * Indicates that the element is not editable, but is otherwise operable.
       * @see aria-disabled.
       */
      'aria-readonly'?: Booleanish | undefined;
      /**
       * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
       * @see aria-atomic.
       */
      'aria-relevant'?:
        | 'additions'
        | 'additions removals'
        | 'additions text'
        | 'all'
        | 'removals'
        | 'removals additions'
        | 'removals text'
        | 'text'
        | 'text additions'
        | 'text removals'
        | undefined;
      /** Indicates that user input is required on the element before a form may be submitted. */
      'aria-required'?: Booleanish | undefined;
      /** Defines a human-readable, author-localized description for the role of an element. */
      'aria-roledescription'?: string | undefined;
      /**
       * Defines the total number of rows in a table, grid, or treegrid.
       * @see aria-rowindex.
       */
      'aria-rowcount'?: number | undefined;
      /**
       * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
       * @see aria-rowcount @see aria-rowspan.
       */
      'aria-rowindex'?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-rowindex.
       * @see aria-colindextext.
       */
      'aria-rowindextext'?: string | undefined;
      /**
       * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-rowindex @see aria-colspan.
       */
      'aria-rowspan'?: number | undefined;
      /**
       * Indicates the current "selected" state of various widgets.
       * @see aria-checked @see aria-pressed.
       */
      'aria-selected'?: Booleanish | undefined;
      /**
       * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-posinset.
       */
      'aria-setsize'?: number | undefined;
      /** Indicates if items in a table or grid are sorted in ascending or descending order. */
      'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
      /** Defines the maximum allowed value for a range widget. */
      'aria-valuemax'?: number | undefined;
      /** Defines the minimum allowed value for a range widget. */
      'aria-valuemin'?: number | undefined;
      /**
       * Defines the current value for a range widget.
       * @see aria-valuetext.
       */
      'aria-valuenow'?: number | undefined;
      /** Defines the human readable text alternative of aria-valuenow for a range widget. */
      'aria-valuetext'?: string | undefined;
    }
    type AriaRole =
      | 'alert'
      | 'alertdialog'
      | 'application'
      | 'article'
      | 'banner'
      | 'button'
      | 'cell'
      | 'checkbox'
      | 'columnheader'
      | 'combobox'
      | 'complementary'
      | 'contentinfo'
      | 'definition'
      | 'dialog'
      | 'directory'
      | 'document'
      | 'feed'
      | 'figure'
      | 'form'
      | 'grid'
      | 'gridcell'
      | 'group'
      | 'heading'
      | 'img'
      | 'link'
      | 'list'
      | 'listbox'
      | 'listitem'
      | 'log'
      | 'main'
      | 'marquee'
      | 'math'
      | 'menu'
      | 'menubar'
      | 'menuitem'
      | 'menuitemcheckbox'
      | 'menuitemradio'
      | 'navigation'
      | 'none'
      | 'note'
      | 'option'
      | 'presentation'
      | 'progressbar'
      | 'radio'
      | 'radiogroup'
      | 'region'
      | 'row'
      | 'rowgroup'
      | 'rowheader'
      | 'scrollbar'
      | 'search'
      | 'searchbox'
      | 'separator'
      | 'slider'
      | 'spinbutton'
      | 'status'
      | 'switch'
      | 'tab'
      | 'table'
      | 'tablist'
      | 'tabpanel'
      | 'term'
      | 'textbox'
      | 'timer'
      | 'toolbar'
      | 'tooltip'
      | 'tree'
      | 'treegrid'
      | 'treeitem'
      | (string & {});
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      defaultChecked?: boolean | undefined;
      defaultValue?: string | number | readonly string[] | undefined;
      suppressContentEditableWarning?: boolean | undefined;
      suppressHydrationWarning?: boolean | undefined;
      accessKey?: string | undefined;
      autoFocus?: boolean | undefined;
      className?: string | undefined;
      class?: string | undefined;
      contentEditable?: Booleanish | 'inherit' | 'plaintext-only' | undefined;
      contextMenu?: string | undefined;
      dir?: string | undefined;
      draggable?: Booleanish | undefined;
      hidden?: boolean | undefined;
      id?: string | undefined;
      lang?: string | undefined;
      nonce?: string | undefined;
      slot?: string | undefined;
      spellCheck?: Booleanish | undefined;
      style?: CSSProperties | string | undefined | null;
      tabIndex?: number | undefined;
      title?: string | undefined;
      translate?: 'yes' | 'no' | undefined;
      radioGroup?: string | undefined;
      role?: AriaRole | undefined;
      about?: string | undefined;
      content?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      rel?: string | undefined;
      resource?: string | undefined;
      rev?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;
      autoCapitalize?: string | undefined;
      autoCorrect?: string | undefined;
      autoSave?: string | undefined;
      color?: string | undefined;
      itemProp?: string | undefined;
      itemScope?: boolean | undefined;
      itemType?: string | undefined;
      itemID?: string | undefined;
      itemRef?: string | undefined;
      results?: number | undefined;
      security?: string | undefined;
      unselectable?: 'on' | 'off' | undefined;
      /**
       * Hints at the type of data that might be entered by the user while editing the element or its contents
       * @see {@link https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute}
       */
      inputMode?:
        | 'none'
        | 'text'
        | 'tel'
        | 'url'
        | 'email'
        | 'numeric'
        | 'decimal'
        | 'search'
        | undefined;
      /**
       * Specify that a standard HTML element should behave like a defined custom built-in element
       * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is}
       */
      is?: string | undefined;
    }
    /**
     * For internal usage only.
     * Different release channels declare additional types of ReblendNode this particular release channel accepts.
     * App or library types should never augment this interface.
     */
    interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS {}
    interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
      accept?: string | undefined;
      acceptCharset?: string | undefined;
      acceptcharset?: string | undefined;
      action?:
        | string
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS];
      allowFullScreen?: boolean | undefined;
      allowfullscreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      allowtransparency?: boolean | undefined;
      alt?: string | undefined;
      as?: string | undefined;
      async?: boolean | undefined;
      autoComplete?: string | undefined;
      autocomplete?: string | undefined;
      autoPlay?: boolean | undefined;
      autoplay?: boolean | undefined;
      capture?: boolean | 'user' | 'environment' | undefined;
      cellPadding?: number | string | undefined;
      cellpadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      cellspacing?: number | string | undefined;
      charSet?: string | undefined;
      charset?: string | undefined;
      challenge?: string | undefined;
      checked?: boolean | undefined;
      cite?: string | undefined;
      classID?: string | undefined;
      cols?: number | undefined;
      colSpan?: number | undefined;
      colspan?: number | undefined;
      controls?: boolean | undefined;
      coords?: string | undefined;
      crossOrigin?: CrossOrigin;
      crossorigin?: CrossOrigin;
      data?: string | undefined;
      dateTime?: string | undefined;
      datetime?: string | undefined;
      default?: boolean | undefined;
      defer?: boolean | undefined;
      disabled?: boolean | undefined;
      download?: any;
      encType?: string | undefined;
      enctype?: string | undefined;
      form?: string | undefined;
      formAction?:
        | string
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS];
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      frameBorder?: number | string | undefined;
      frameborder?: number | string | undefined;
      headers?: string | undefined;
      height?: number | string | undefined;
      high?: number | undefined;
      href?: string | undefined;
      hrefLang?: string | undefined;
      hreflang?: string | undefined;
      htmlFor?: string | undefined;
      for?: string | undefined;
      httpEquiv?: string | undefined;
      httpequiv?: string | undefined;
      integrity?: string | undefined;
      keyParams?: string | undefined;
      keyparams?: string | undefined;
      keyType?: string | undefined;
      keytype?: string | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      list?: string | undefined;
      loop?: boolean | undefined;
      low?: number | undefined;
      manifest?: string | undefined;
      marginHeight?: number | undefined;
      marginheight?: number | undefined;
      marginWidth?: number | undefined;
      marginwidth?: number | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      maxlength?: number | undefined;
      media?: string | undefined;
      mediaGroup?: string | undefined;
      mediagroup?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      minlength?: number | undefined;
      multiple?: boolean | undefined;
      muted?: boolean | undefined;
      name?: string | undefined;
      noValidate?: boolean | undefined;
      novalidate?: boolean | undefined;
      open?: boolean | undefined;
      optimum?: number | undefined;
      pattern?: string | undefined;
      placeholder?: string | undefined;
      playsInline?: boolean | undefined;
      playsinline?: boolean | undefined;
      poster?: string | undefined;
      preload?: string | undefined;
      readOnly?: boolean | undefined;
      readonly?: boolean | undefined;
      required?: boolean | undefined;
      reversed?: boolean | undefined;
      rows?: number | undefined;
      rowSpan?: number | undefined;
      rowspan?: number | undefined;
      sandbox?: string | undefined;
      scope?: string | undefined;
      scoped?: boolean | undefined;
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      selected?: boolean | undefined;
      shape?: string | undefined;
      size?: number | undefined;
      sizes?: string | undefined;
      span?: number | undefined;
      src?: string | undefined;
      srcDoc?: string | undefined;
      srcdoc?: string | undefined;
      srcLang?: string | undefined;
      srclang?: string | undefined;
      srcSet?: string | undefined;
      srcset?: string | undefined;
      start?: number | undefined;
      step?: number | string | undefined;
      summary?: string | undefined;
      target?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      usemap?: string | undefined;
      value?: string | readonly string[] | number | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
      wrap?: string | undefined;
    }
    type HTMLAttributeReferrerPolicy =
      | ''
      | 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url';
    type HTMLAttributeAnchorTarget =
      | '_self'
      | '_blank'
      | '_parent'
      | '_top'
      | (string & {});
    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
      download?: any;
      href?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      ping?: string | undefined;
      target?: HTMLAttributeAnchorTarget | undefined;
      type?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    }
    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}
    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
      alt?: string | undefined;
      coords?: string | undefined;
      download?: any;
      href?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      shape?: string | undefined;
      target?: string | undefined;
    }
    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
      href?: string | undefined;
      target?: string | undefined;
    }
    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
    }
    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      form?: string | undefined;
      formAction?:
        | string
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS]
        | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      name?: string | undefined;
      type?: 'submit' | 'reset' | 'button' | undefined;
      value?: string | readonly string[] | number | undefined;
    }
    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      width?: number | string | undefined;
    }
    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
      span?: number | undefined;
      width?: number | string | undefined;
    }
    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
      span?: number | undefined;
    }
    interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
      value?: string | readonly string[] | number | undefined;
    }
    interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
      open?: boolean | undefined;
      onToggle?: ReblendEventHandler<T> | undefined;
      name?: string | undefined;
    }
    interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
      dateTime?: string | undefined;
    }
    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
      onCancel?: ReblendEventHandler<T> | undefined;
      onClose?: ReblendEventHandler<T> | undefined;
      open?: boolean | undefined;
    }
    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      src?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
    }
    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      form?: string | undefined;
      name?: string | undefined;
    }
    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
      acceptCharset?: string | undefined;
      action?:
        | string
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS];
      autoComplete?: string | undefined;
      encType?: string | undefined;
      method?: string | undefined;
      name?: string | undefined;
      noValidate?: boolean | undefined;
      target?: string | undefined;
    }
    interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
      manifest?: string | undefined;
    }
    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
      allow?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      /** @deprecated */
      frameBorder?: number | string | undefined;
      height?: number | string | undefined;
      loading?: 'eager' | 'lazy' | undefined;
      /** @deprecated */
      marginHeight?: number | undefined;
      /** @deprecated */
      marginWidth?: number | undefined;
      name?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sandbox?: string | undefined;
      /** @deprecated */
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      src?: string | undefined;
      srcDoc?: string | undefined;
      width?: number | string | undefined;
    }
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
      alt?: string | undefined;
      crossOrigin?: CrossOrigin;
      decoding?: 'async' | 'auto' | 'sync' | undefined;
      fetchPriority?: 'high' | 'low' | 'auto';
      height?: number | string | undefined;
      loading?: 'eager' | 'lazy' | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcSet?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
    }
    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
      dateTime?: string | undefined;
    }
    type HTMLInputTypeAttribute =
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
      | (string & {});
    type AutoFillAddressKind = 'billing' | 'shipping';
    type AutoFillBase = '' | 'off' | 'on';
    type AutoFillContactField =
      | 'email'
      | 'tel'
      | 'tel-area-code'
      | 'tel-country-code'
      | 'tel-extension'
      | 'tel-local'
      | 'tel-local-prefix'
      | 'tel-local-suffix'
      | 'tel-national';
    type AutoFillContactKind = 'home' | 'mobile' | 'work';
    type AutoFillCredentialField = 'webauthn';
    type AutoFillNormalField =
      | 'additional-name'
      | 'address-level1'
      | 'address-level2'
      | 'address-level3'
      | 'address-level4'
      | 'address-line1'
      | 'address-line2'
      | 'address-line3'
      | 'bday-day'
      | 'bday-month'
      | 'bday-year'
      | 'cc-csc'
      | 'cc-exp'
      | 'cc-exp-month'
      | 'cc-exp-year'
      | 'cc-family-name'
      | 'cc-given-name'
      | 'cc-name'
      | 'cc-number'
      | 'cc-type'
      | 'country'
      | 'country-name'
      | 'current-password'
      | 'family-name'
      | 'given-name'
      | 'honorific-prefix'
      | 'honorific-suffix'
      | 'name'
      | 'new-password'
      | 'one-time-code'
      | 'organization'
      | 'postal-code'
      | 'street-address'
      | 'transaction-amount'
      | 'transaction-currency'
      | 'username';
    type OptionalPrefixToken<T extends string> = `${T} ` | '';
    type OptionalPostfixToken<T extends string> = ` ${T}` | '';
    type AutoFillField =
      | AutoFillNormalField
      | `${OptionalPrefixToken<AutoFillContactKind>}${AutoFillContactField}`;
    type AutoFillSection = `section-${string}`;
    type AutoFill =
      | AutoFillBase
      | `${OptionalPrefixToken<AutoFillSection>}${OptionalPrefixToken<AutoFillAddressKind>}${AutoFillField}${OptionalPostfixToken<AutoFillCredentialField>}`;
    type HTMLInputAutoCompleteAttribute = AutoFill | (string & {});
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      accept?: string | undefined;
      alt?: string | undefined;
      autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
      capture?: boolean | 'user' | 'environment' | undefined;
      checked?: boolean | undefined;
      disabled?: boolean | undefined;
      enterKeyHint?:
        | 'enter'
        | 'done'
        | 'go'
        | 'next'
        | 'previous'
        | 'search'
        | 'send'
        | undefined;
      form?: string | undefined;
      formAction?:
        | string
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS]
        | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      height?: number | string | undefined;
      list?: string | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      pattern?: string | undefined;
      placeholder?: string | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      src?: string | undefined;
      step?: number | string | undefined;
      type?: HTMLInputTypeAttribute | undefined;
      value?: string | readonly string[] | number | undefined;
      width?: number | string | undefined;
      onChange?: ChangeEventHandler<T> | undefined;
    }
    interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
      challenge?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      keyType?: string | undefined;
      keyParams?: string | undefined;
      name?: string | undefined;
    }
    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      htmlFor?: string | undefined;
      for?: string | undefined;
    }
    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
      value?: string | readonly string[] | number | undefined;
    }
    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
      as?: string | undefined;
      crossOrigin?: CrossOrigin;
      fetchPriority?: 'high' | 'low' | 'auto';
      href?: string | undefined;
      hrefLang?: string | undefined;
      integrity?: string | undefined;
      media?: string | undefined;
      imageSrcSet?: string | undefined;
      imageSizes?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sizes?: string | undefined;
      type?: string | undefined;
      charSet?: string | undefined;
    }
    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
    }
    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
      type?: string | undefined;
    }
    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
      autoPlay?: boolean | undefined;
      controls?: boolean | undefined;
      controlsList?: string | undefined;
      crossOrigin?: CrossOrigin;
      loop?: boolean | undefined;
      mediaGroup?: string | undefined;
      muted?: boolean | undefined;
      playsInline?: boolean | undefined;
      preload?: string | undefined;
      src?: string | undefined;
    }
    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
      charSet?: string | undefined;
      content?: string | undefined;
      httpEquiv?: string | undefined;
      media?: string | undefined;
      name?: string | undefined;
    }
    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      high?: number | undefined;
      low?: number | undefined;
      max?: number | string | undefined;
      min?: number | string | undefined;
      optimum?: number | undefined;
      value?: string | readonly string[] | number | undefined;
    }
    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
    }
    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
      classID?: string | undefined;
      data?: string | undefined;
      form?: string | undefined;
      height?: number | string | undefined;
      name?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
    }
    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
      reversed?: boolean | undefined;
      start?: number | undefined;
      type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
    }
    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      label?: string | undefined;
    }
    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      label?: string | undefined;
      selected?: boolean | undefined;
      value?: string | readonly string[] | number | undefined;
    }
    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      htmlFor?: string | undefined;
      name?: string | undefined;
    }
    interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
      value?: string | readonly string[] | number | undefined;
    }
    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
      max?: number | string | undefined;
      value?: string | readonly string[] | number | undefined;
    }
    interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
    }
    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
      async?: boolean | undefined;
      /** @deprecated */
      charSet?: string | undefined;
      crossOrigin?: CrossOrigin;
      defer?: boolean | undefined;
      integrity?: string | undefined;
      noModule?: boolean | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      src?: string | undefined;
      type?: string | undefined;
    }
    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
      autoComplete?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      value?: string | readonly string[] | number | undefined;
      onChange?: ChangeEventHandler<T> | undefined;
    }
    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      media?: string | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcSet?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
    }
    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
      media?: string | undefined;
      scoped?: boolean | undefined;
      type?: string | undefined;
    }
    interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
      align?: 'left' | 'center' | 'right' | undefined;
      bgcolor?: string | undefined;
      border?: number | undefined;
      cellPadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      frame?: boolean | undefined;
      rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all' | undefined;
      summary?: string | undefined;
      width?: number | string | undefined;
    }
    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
      autoComplete?: string | undefined;
      cols?: number | undefined;
      dirName?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      maxLength?: number | undefined;
      minLength?: number | undefined;
      name?: string | undefined;
      placeholder?: string | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      rows?: number | undefined;
      value?: string | readonly string[] | number | undefined;
      wrap?: string | undefined;
      onChange?: ChangeEventHandler<T> | undefined;
    }
    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
      align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
      height?: number | string | undefined;
      width?: number | string | undefined;
      valign?: 'top' | 'middle' | 'bottom' | 'baseline' | undefined;
    }
    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
      align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
    }
    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
      dateTime?: string | undefined;
    }
    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
      default?: boolean | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      src?: string | undefined;
      srcLang?: string | undefined;
    }
    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
      height?: number | string | undefined;
      playsInline?: boolean | undefined;
      poster?: string | undefined;
      width?: number | string | undefined;
      disablePictureInPicture?: boolean | undefined;
      disableRemotePlayback?: boolean | undefined;
    }
    interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      suppressHydrationWarning?: boolean | undefined;
      className?: string | undefined;
      class?: string | undefined;
      color?: string | undefined;
      height?: number | string | undefined;
      id?: string | undefined;
      lang?: string | undefined;
      max?: number | string | undefined;
      media?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      name?: string | undefined;
      style?: CSSProperties | string | undefined;
      target?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
      role?: AriaRole | undefined;
      tabIndex?: number | undefined;
      crossOrigin?: CrossOrigin;
      accentHeight?: number | string | undefined;
      accumulate?: 'none' | 'sum' | undefined;
      additive?: 'replace' | 'sum' | undefined;
      alignmentBaseline?:
        | 'auto'
        | 'baseline'
        | 'before-edge'
        | 'text-before-edge'
        | 'middle'
        | 'central'
        | 'after-edge'
        | 'text-after-edge'
        | 'ideographic'
        | 'alphabetic'
        | 'hanging'
        | 'mathematical'
        | 'inherit'
        | undefined;
      allowReorder?: 'no' | 'yes' | undefined;
      alphabetic?: number | string | undefined;
      amplitude?: number | string | undefined;
      arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated' | undefined;
      ascent?: number | string | undefined;
      attributeName?: string | undefined;
      attributeType?: string | undefined;
      autoReverse?: Booleanish | undefined;
      azimuth?: number | string | undefined;
      baseFrequency?: number | string | undefined;
      baselineShift?: number | string | undefined;
      baseProfile?: number | string | undefined;
      bbox?: number | string | undefined;
      begin?: number | string | undefined;
      bias?: number | string | undefined;
      by?: number | string | undefined;
      calcMode?: number | string | undefined;
      capHeight?: number | string | undefined;
      clip?: number | string | undefined;
      clipPath?: string | undefined;
      clipPathUnits?: number | string | undefined;
      clipRule?: number | string | undefined;
      colorInterpolation?: number | string | undefined;
      colorInterpolationFilters?:
        | 'auto'
        | 'sRGB'
        | 'linearRGB'
        | 'inherit'
        | undefined;
      colorProfile?: number | string | undefined;
      colorRendering?: number | string | undefined;
      contentScriptType?: number | string | undefined;
      contentStyleType?: number | string | undefined;
      cursor?: number | string | undefined;
      cx?: number | string | undefined;
      cy?: number | string | undefined;
      d?: string | undefined;
      decelerate?: number | string | undefined;
      descent?: number | string | undefined;
      diffuseConstant?: number | string | undefined;
      direction?: number | string | undefined;
      display?: number | string | undefined;
      divisor?: number | string | undefined;
      dominantBaseline?: number | string | undefined;
      dur?: number | string | undefined;
      dx?: number | string | undefined;
      dy?: number | string | undefined;
      edgeMode?: number | string | undefined;
      elevation?: number | string | undefined;
      enableBackground?: number | string | undefined;
      end?: number | string | undefined;
      exponent?: number | string | undefined;
      externalResourcesRequired?: Booleanish | undefined;
      fill?: string | undefined;
      fillOpacity?: number | string | undefined;
      fillRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined;
      filter?: string | undefined;
      filterRes?: number | string | undefined;
      filterUnits?: number | string | undefined;
      floodColor?: number | string | undefined;
      floodOpacity?: number | string | undefined;
      focusable?: Booleanish | 'auto' | undefined;
      fontFamily?: string | undefined;
      fontSize?: number | string | undefined;
      fontSizeAdjust?: number | string | undefined;
      fontStretch?: number | string | undefined;
      fontStyle?: number | string | undefined;
      fontVariant?: number | string | undefined;
      fontWeight?: number | string | undefined;
      format?: number | string | undefined;
      fr?: number | string | undefined;
      from?: number | string | undefined;
      fx?: number | string | undefined;
      fy?: number | string | undefined;
      g1?: number | string | undefined;
      g2?: number | string | undefined;
      glyphName?: number | string | undefined;
      glyphOrientationHorizontal?: number | string | undefined;
      glyphOrientationVertical?: number | string | undefined;
      glyphRef?: number | string | undefined;
      gradientTransform?: string | undefined;
      gradientUnits?: string | undefined;
      hanging?: number | string | undefined;
      horizAdvX?: number | string | undefined;
      horizOriginX?: number | string | undefined;
      href?: string | undefined;
      ideographic?: number | string | undefined;
      imageRendering?: number | string | undefined;
      in2?: number | string | undefined;
      in?: string | undefined;
      intercept?: number | string | undefined;
      k1?: number | string | undefined;
      k2?: number | string | undefined;
      k3?: number | string | undefined;
      k4?: number | string | undefined;
      k?: number | string | undefined;
      kernelMatrix?: number | string | undefined;
      kernelUnitLength?: number | string | undefined;
      kerning?: number | string | undefined;
      keyPoints?: number | string | undefined;
      keySplines?: number | string | undefined;
      keyTimes?: number | string | undefined;
      lengthAdjust?: number | string | undefined;
      letterSpacing?: number | string | undefined;
      lightingColor?: number | string | undefined;
      limitingConeAngle?: number | string | undefined;
      local?: number | string | undefined;
      markerEnd?: string | undefined;
      markerHeight?: number | string | undefined;
      markerMid?: string | undefined;
      markerStart?: string | undefined;
      markerUnits?: number | string | undefined;
      markerWidth?: number | string | undefined;
      mask?: string | undefined;
      maskContentUnits?: number | string | undefined;
      maskUnits?: number | string | undefined;
      mathematical?: number | string | undefined;
      mode?: number | string | undefined;
      numOctaves?: number | string | undefined;
      offset?: number | string | undefined;
      opacity?: number | string | undefined;
      operator?: number | string | undefined;
      order?: number | string | undefined;
      orient?: number | string | undefined;
      orientation?: number | string | undefined;
      origin?: number | string | undefined;
      overflow?: number | string | undefined;
      overlinePosition?: number | string | undefined;
      overlineThickness?: number | string | undefined;
      paintOrder?: number | string | undefined;
      panose1?: number | string | undefined;
      path?: string | undefined;
      pathLength?: number | string | undefined;
      patternContentUnits?: string | undefined;
      patternTransform?: number | string | undefined;
      patternUnits?: string | undefined;
      pointerEvents?: number | string | undefined;
      points?: string | undefined;
      pointsAtX?: number | string | undefined;
      pointsAtY?: number | string | undefined;
      pointsAtZ?: number | string | undefined;
      preserveAlpha?: Booleanish | undefined;
      preserveAspectRatio?: string | undefined;
      primitiveUnits?: number | string | undefined;
      r?: number | string | undefined;
      radius?: number | string | undefined;
      refX?: number | string | undefined;
      refY?: number | string | undefined;
      renderingIntent?: number | string | undefined;
      repeatCount?: number | string | undefined;
      repeatDur?: number | string | undefined;
      requiredExtensions?: number | string | undefined;
      requiredFeatures?: number | string | undefined;
      restart?: number | string | undefined;
      result?: string | undefined;
      rotate?: number | string | undefined;
      rx?: number | string | undefined;
      ry?: number | string | undefined;
      scale?: number | string | undefined;
      seed?: number | string | undefined;
      shapeRendering?: number | string | undefined;
      slope?: number | string | undefined;
      spacing?: number | string | undefined;
      specularConstant?: number | string | undefined;
      specularExponent?: number | string | undefined;
      speed?: number | string | undefined;
      spreadMethod?: string | undefined;
      startOffset?: number | string | undefined;
      stdDeviation?: number | string | undefined;
      stemh?: number | string | undefined;
      stemv?: number | string | undefined;
      stitchTiles?: number | string | undefined;
      stopColor?: string | undefined;
      stopOpacity?: number | string | undefined;
      strikethroughPosition?: number | string | undefined;
      strikethroughThickness?: number | string | undefined;
      string?: number | string | undefined;
      stroke?: string | undefined;
      strokeDasharray?: string | number | undefined;
      strokeDashoffset?: string | number | undefined;
      strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
      strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined;
      strokeMiterlimit?: number | string | undefined;
      strokeOpacity?: number | string | undefined;
      strokeWidth?: number | string | undefined;
      surfaceScale?: number | string | undefined;
      systemLanguage?: number | string | undefined;
      tableValues?: number | string | undefined;
      targetX?: number | string | undefined;
      targetY?: number | string | undefined;
      textAnchor?: string | undefined;
      textDecoration?: number | string | undefined;
      textLength?: number | string | undefined;
      textRendering?: number | string | undefined;
      to?: number | string | undefined;
      transform?: string | undefined;
      u1?: number | string | undefined;
      u2?: number | string | undefined;
      underlinePosition?: number | string | undefined;
      underlineThickness?: number | string | undefined;
      unicode?: number | string | undefined;
      unicodeBidi?: number | string | undefined;
      unicodeRange?: number | string | undefined;
      unitsPerEm?: number | string | undefined;
      vAlphabetic?: number | string | undefined;
      values?: string | undefined;
      vectorEffect?: number | string | undefined;
      version?: string | undefined;
      vertAdvY?: number | string | undefined;
      vertOriginX?: number | string | undefined;
      vertOriginY?: number | string | undefined;
      vHanging?: number | string | undefined;
      vIdeographic?: number | string | undefined;
      viewBox?: string | undefined;
      viewTarget?: number | string | undefined;
      visibility?: number | string | undefined;
      vMathematical?: number | string | undefined;
      widths?: number | string | undefined;
      wordSpacing?: number | string | undefined;
      writingMode?: number | string | undefined;
      x1?: number | string | undefined;
      x2?: number | string | undefined;
      x?: number | string | undefined;
      xChannelSelector?: string | undefined;
      xHeight?: number | string | undefined;
      xlinkActuate?: string | undefined;
      xlinkArcrole?: string | undefined;
      xlinkHref?: string | undefined;
      'xlink:href'?: string | undefined;
      xlinkRole?: string | undefined;
      xlinkShow?: string | undefined;
      xlinkTitle?: string | undefined;
      xlinkType?: string | undefined;
      xmlBase?: string | undefined;
      xmlLang?: string | undefined;
      xmlns?: string | undefined;
      xmlnsXlink?: string | undefined;
      xmlSpace?: string | undefined;
      y1?: number | string | undefined;
      y2?: number | string | undefined;
      y?: number | string | undefined;
      yChannelSelector?: string | undefined;
      z?: number | string | undefined;
      zoomAndPan?: string | undefined;
    }
    interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
      allowFullScreen?: boolean | undefined;
      allowpopups?: boolean | undefined;
      autosize?: boolean | undefined;
      blinkfeatures?: string | undefined;
      disableblinkfeatures?: string | undefined;
      disableguestresize?: boolean | undefined;
      disablewebsecurity?: boolean | undefined;
      guestinstance?: string | undefined;
      httpreferrer?: string | undefined;
      nodeintegration?: boolean | undefined;
      partition?: string | undefined;
      plugins?: boolean | undefined;
      preload?: string | undefined;
      src?: string | undefined;
      useragent?: string | undefined;
      webpreferences?: string | undefined;
    }
    interface ReblendHTML {
      a: DetailedHTMLFactory<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >;
      abbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      address: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      area: DetailedHTMLFactory<
        AreaHTMLAttributes<HTMLAreaElement>,
        HTMLAreaElement
      >;
      article: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      aside: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      audio: DetailedHTMLFactory<
        AudioHTMLAttributes<HTMLAudioElement>,
        HTMLAudioElement
      >;
      b: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      base: DetailedHTMLFactory<
        BaseHTMLAttributes<HTMLBaseElement>,
        HTMLBaseElement
      >;
      bdi: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      bdo: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      big: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      blockquote: DetailedHTMLFactory<
        BlockquoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >;
      body: DetailedHTMLFactory<
        HTMLAttributes<HTMLBodyElement>,
        HTMLBodyElement
      >;
      br: DetailedHTMLFactory<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      button: DetailedHTMLFactory<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >;
      canvas: DetailedHTMLFactory<
        CanvasHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
      >;
      caption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      center: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      cite: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      code: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      col: DetailedHTMLFactory<
        ColHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      colgroup: DetailedHTMLFactory<
        ColgroupHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      data: DetailedHTMLFactory<
        DataHTMLAttributes<HTMLDataElement>,
        HTMLDataElement
      >;
      datalist: DetailedHTMLFactory<
        HTMLAttributes<HTMLDataListElement>,
        HTMLDataListElement
      >;
      dd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      del: DetailedHTMLFactory<
        DelHTMLAttributes<HTMLModElement>,
        HTMLModElement
      >;
      details: DetailedHTMLFactory<
        DetailsHTMLAttributes<HTMLDetailsElement>,
        HTMLDetailsElement
      >;
      dfn: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      dialog: DetailedHTMLFactory<
        DialogHTMLAttributes<HTMLDialogElement>,
        HTMLDialogElement
      >;
      div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      dl: DetailedHTMLFactory<
        HTMLAttributes<HTMLDListElement>,
        HTMLDListElement
      >;
      dt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      em: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      embed: DetailedHTMLFactory<
        EmbedHTMLAttributes<HTMLEmbedElement>,
        HTMLEmbedElement
      >;
      fieldset: DetailedHTMLFactory<
        FieldsetHTMLAttributes<HTMLFieldSetElement>,
        HTMLFieldSetElement
      >;
      figcaption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      figure: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      form: DetailedHTMLFactory<
        FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
      >;
      h1: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h2: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h3: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h4: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h5: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h6: DetailedHTMLFactory<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      head: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLHeadElement>;
      header: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      hgroup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      hr: DetailedHTMLFactory<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
      html: DetailedHTMLFactory<
        HtmlHTMLAttributes<HTMLHtmlElement>,
        HTMLHtmlElement
      >;
      i: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      iframe: DetailedHTMLFactory<
        IframeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
      >;
      img: DetailedHTMLFactory<
        ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >;
      input: DetailedHTMLFactory<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      ins: DetailedHTMLFactory<
        InsHTMLAttributes<HTMLModElement>,
        HTMLModElement
      >;
      kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      keygen: DetailedHTMLFactory<
        KeygenHTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      label: DetailedHTMLFactory<
        LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >;
      legend: DetailedHTMLFactory<
        HTMLAttributes<HTMLLegendElement>,
        HTMLLegendElement
      >;
      li: DetailedHTMLFactory<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      link: DetailedHTMLFactory<
        LinkHTMLAttributes<HTMLLinkElement>,
        HTMLLinkElement
      >;
      main: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      map: DetailedHTMLFactory<
        MapHTMLAttributes<HTMLMapElement>,
        HTMLMapElement
      >;
      mark: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      menu: DetailedHTMLFactory<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
      menuitem: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      meta: DetailedHTMLFactory<
        MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
      >;
      meter: DetailedHTMLFactory<
        MeterHTMLAttributes<HTMLMeterElement>,
        HTMLMeterElement
      >;
      nav: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      noscript: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      object: DetailedHTMLFactory<
        ObjectHTMLAttributes<HTMLObjectElement>,
        HTMLObjectElement
      >;
      ol: DetailedHTMLFactory<
        OlHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
      >;
      optgroup: DetailedHTMLFactory<
        OptgroupHTMLAttributes<HTMLOptGroupElement>,
        HTMLOptGroupElement
      >;
      option: DetailedHTMLFactory<
        OptionHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      >;
      output: DetailedHTMLFactory<
        OutputHTMLAttributes<HTMLOutputElement>,
        HTMLOutputElement
      >;
      p: DetailedHTMLFactory<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      param: DetailedHTMLFactory<
        ParamHTMLAttributes<HTMLParamElement>,
        HTMLParamElement
      >;
      picture: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      pre: DetailedHTMLFactory<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
      progress: DetailedHTMLFactory<
        ProgressHTMLAttributes<HTMLProgressElement>,
        HTMLProgressElement
      >;
      q: DetailedHTMLFactory<
        QuoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >;
      rp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      rt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      ruby: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      s: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      samp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      search: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      slot: DetailedHTMLFactory<
        SlotHTMLAttributes<HTMLSlotElement>,
        HTMLSlotElement
      >;
      script: DetailedHTMLFactory<
        ScriptHTMLAttributes<HTMLScriptElement>,
        HTMLScriptElement
      >;
      section: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      select: DetailedHTMLFactory<
        SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >;
      small: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      source: DetailedHTMLFactory<
        SourceHTMLAttributes<HTMLSourceElement>,
        HTMLSourceElement
      >;
      span: DetailedHTMLFactory<
        HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
      strong: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      style: DetailedHTMLFactory<
        StyleHTMLAttributes<HTMLStyleElement>,
        HTMLStyleElement
      >;
      sub: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      summary: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      sup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      table: DetailedHTMLFactory<
        TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
      >;
      template: DetailedHTMLFactory<
        HTMLAttributes<HTMLTemplateElement>,
        HTMLTemplateElement
      >;
      tbody: DetailedHTMLFactory<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      td: DetailedHTMLFactory<
        TdHTMLAttributes<HTMLTableDataCellElement>,
        HTMLTableDataCellElement
      >;
      textarea: DetailedHTMLFactory<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      tfoot: DetailedHTMLFactory<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      th: DetailedHTMLFactory<
        ThHTMLAttributes<HTMLTableHeaderCellElement>,
        HTMLTableHeaderCellElement
      >;
      thead: DetailedHTMLFactory<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      time: DetailedHTMLFactory<
        TimeHTMLAttributes<HTMLTimeElement>,
        HTMLTimeElement
      >;
      title: DetailedHTMLFactory<
        HTMLAttributes<HTMLTitleElement>,
        HTMLTitleElement
      >;
      tr: DetailedHTMLFactory<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >;
      track: DetailedHTMLFactory<
        TrackHTMLAttributes<HTMLTrackElement>,
        HTMLTrackElement
      >;
      u: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      ul: DetailedHTMLFactory<
        HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >;
      var: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      video: DetailedHTMLFactory<
        VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
      >;
      wbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      webview: DetailedHTMLFactory<
        WebViewHTMLAttributes<HTMLWebViewElement>,
        HTMLWebViewElement
      >;
    }
    interface ReblendSVG {
      animate: SVGFactory;
      circle: SVGFactory;
      clipPath: SVGFactory;
      defs: SVGFactory;
      desc: SVGFactory;
      ellipse: SVGFactory;
      feBlend: SVGFactory;
      feColorMatrix: SVGFactory;
      feComponentTransfer: SVGFactory;
      feComposite: SVGFactory;
      feConvolveMatrix: SVGFactory;
      feDiffuseLighting: SVGFactory;
      feDisplacementMap: SVGFactory;
      feDistantLight: SVGFactory;
      feDropShadow: SVGFactory;
      feFlood: SVGFactory;
      feFuncA: SVGFactory;
      feFuncB: SVGFactory;
      feFuncG: SVGFactory;
      feFuncR: SVGFactory;
      feGaussianBlur: SVGFactory;
      feImage: SVGFactory;
      feMerge: SVGFactory;
      feMergeNode: SVGFactory;
      feMorphology: SVGFactory;
      feOffset: SVGFactory;
      fePointLight: SVGFactory;
      feSpecularLighting: SVGFactory;
      feSpotLight: SVGFactory;
      feTile: SVGFactory;
      feTurbulence: SVGFactory;
      filter: SVGFactory;
      foreignObject: SVGFactory;
      g: SVGFactory;
      image: SVGFactory;
      line: SVGFactory;
      linearGradient: SVGFactory;
      marker: SVGFactory;
      mask: SVGFactory;
      metadata: SVGFactory;
      path: SVGFactory;
      pattern: SVGFactory;
      polygon: SVGFactory;
      polyline: SVGFactory;
      radialGradient: SVGFactory;
      rect: SVGFactory;
      stop: SVGFactory;
      svg: SVGFactory;
      switch: SVGFactory;
      symbol: SVGFactory;
      text: SVGFactory;
      textPath: SVGFactory;
      tspan: SVGFactory;
      use: SVGFactory;
      view: SVGFactory;
    }
    interface ReblendDOM extends ReblendHTML, ReblendSVG {}
    /**
     * @deprecated Use `Validator` from the ´prop-types` instead.
     */
    type Validator<T> = PropTypes.Validator<T>;
    /**
     * @deprecated Use `Requireable` from the ´prop-types` instead.
     */
    type Requireable<T> = PropTypes.Requireable<T>;
    /**
     * @deprecated Use `ValidationMap` from the ´prop-types` instead.
     */
    type ValidationMap<T> = PropTypes.ValidationMap<T>;
    /**
     * @deprecated Use `WeakValidationMap` from the ´prop-types` instead.
     */
    type WeakValidationMap<T> = {
      [K in keyof T]?: null extends T[K]
        ? Validator<T[K] | null | undefined>
        : undefined extends T[K]
        ? Validator<T[K] | null | undefined>
        : Validator<T[K]>;
    };
    /**
     * @deprecated Use `PropTypes.*` where `PropTypes` comes from `import * as PropTypes from 'prop-types'` instead.
     */
    interface ReblendPropTypes {
      any: typeof PropTypes.any;
      array: typeof PropTypes.array;
      bool: typeof PropTypes.bool;
      func: typeof PropTypes.func;
      number: typeof PropTypes.number;
      object: typeof PropTypes.object;
      string: typeof PropTypes.string;
      node: typeof PropTypes.node;
      element: typeof PropTypes.element;
      instanceOf: typeof PropTypes.instanceOf;
      oneOf: typeof PropTypes.oneOf;
      oneOfType: typeof PropTypes.oneOfType;
      arrayOf: typeof PropTypes.arrayOf;
      objectOf: typeof PropTypes.objectOf;
      shape: typeof PropTypes.shape;
      exact: typeof PropTypes.exact;
    }
    /**
     * @deprecated - Use `typeof Reblend.Children` instead.
     */
    interface ReblendChildren {
      map<T, C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => T
      ): C extends null | undefined
        ? C
        : Array<Exclude<T, boolean | null | undefined>>;
      forEach<C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => void
      ): void;
      count(children: any): number;
      only<C>(children: C): C extends any[] ? never : C;
      toArray(
        children: ReblendNode | ReblendNode[]
      ): Array<Exclude<ReblendNode, boolean | null | undefined>>;
    }
    interface AbstractView {
      styleMedia: StyleMedia;
      document: Document;
    }
    interface Touch {
      identifier: number;
      target: EventTarget;
      screenX: number;
      screenY: number;
      clientX: number;
      clientY: number;
      pageX: number;
      pageY: number;
    }
    interface TouchList {
      [index: number]: Touch;
      length: number;
      item(index: number): Touch;
      identifiedTouch(identifier: number): Touch;
    }
    interface ErrorInfo {
      /**
       * Captures which component contained the exception, and its ancestors.
       */
      componentStack?: string | null;
      digest?: string | null;
    }
  }
  /**
   * Description placeholder
   *
   * @typedef {IsExactlyAny}
   * @template T
   */
  type IsExactlyAny<T> = boolean extends (T extends never ? true : false)
    ? true
    : false;
  /**
   * Description placeholder
   *
   * @typedef {ExactlyAnyPropertyKeys}
   * @template T
   */
  type ExactlyAnyPropertyKeys<T> = {
    [K in keyof T]: IsExactlyAny<T[K]> extends true ? K : never;
  }[keyof T];
  /**
   * Description placeholder
   *
   * @typedef {NotExactlyAnyPropertyKeys}
   * @template T
   */
  type NotExactlyAnyPropertyKeys<T> = Exclude<
    keyof T,
    ExactlyAnyPropertyKeys<T>
  >;
  /**
   * Description placeholder
   *
   * @typedef {MergePropTypes}
   * @template P
   * @template T
   */
  type MergePropTypes<P, T> = P extends any
    ? IsExactlyAny<P> extends true
      ? T
      : string extends keyof P
      ? P
      : Pick<P, NotExactlyAnyPropertyKeys<P>> &
          Pick<T, Exclude<keyof T, NotExactlyAnyPropertyKeys<P>>> &
          Pick<P, Exclude<keyof P, keyof T>>
    : never;
  /**
   * Description placeholder
   *
   * @typedef {InexactPartial}
   * @template T
   */
  type InexactPartial<T> = {
    [K in keyof T]?: T[K] | undefined;
  };
  /**
   * Description placeholder
   *
   * @typedef {Defaultize}
   * @template P
   * @template D
   */
  type Defaultize<P, D> = P extends any
    ? string extends keyof P
      ? P
      : Pick<P, Exclude<keyof P, keyof D>> &
          InexactPartial<Pick<P, Extract<keyof P, keyof D>>> &
          InexactPartial<Pick<D, Exclude<keyof D, keyof P>>>
    : never;
  /**
   * Description placeholder
   *
   * @export
   * @typedef {ReblendManagedAttributes}
   * @template C
   * @template P
   */
  export type ReblendManagedAttributes<C, P> = C extends {
    propTypes: infer T;
    defaultProps: infer D;
    props: infer D;
  }
    ? Defaultize<MergePropTypes<P, PropTypes.InferProps<T>>, D>
    : C extends {
        propTypes: infer T;
      }
    ? MergePropTypes<P, PropTypes.InferProps<T>>
    : C extends {
        defaultProps: infer D;
        props: infer D;
      }
    ? Defaultize<P, D>
    : P;
}

export enum ChildrenPropsUpdateType {
  NON_CHILDREN = 0,
  CHILDREN = 1,
}

export enum PatchTypeAndOrder {
  NONE = 0,
  REMOVE = 1,
  TEXT = 2,
  CREATE = 3,
  REPLACE = 4,
  UPDATE = 5,
}

export const ERROR_EVENTNAME = 'reblend-render-error';
export const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive';

export {
  allAttribute,
  shouldUseSetAttribute,
  attributeName,
} from './standardAttribute';
