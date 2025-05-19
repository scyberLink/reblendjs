import * as CSS from 'csstype';
import React from 'react';

/**
 * Represents a generic event in the DOM.
 *
 * @export interface Event
 * @typedef {Event}
 */
export interface Event {}
/**
 * Represents an event triggered by CSS animations.
 *
 * @export interface AnimationEvent
 * @typedef {AnimationEvent}
 * @extends {Event}
 */
export interface AnimationEvent extends Event {}
/**
 * Represents an event triggered by interactions with the clipboard (e.g., cut, copy, paste).
 *
 * @export interface ClipboardEvent
 * @typedef {ClipboardEvent}
 * @extends {Event}
 */
export interface ClipboardEvent extends Event {}
/**
 * Represents an event triggered by input composition (e.g., for non-Latin text).
 *
 * @export interface CompositionEvent
 * @typedef {CompositionEvent}
 * @extends {Event}
 */
export interface CompositionEvent extends Event {}
/**
 * Represents an event related to drag-and-drop operations.
 *
 * @export interface DragEvent
 * @typedef {DragEvent}
 * @extends {Event}
 */
export interface DragEvent extends Event {}
/**
 * Represents an event triggered when an element gains or loses focus.
 *
 * @export interface FocusEvent
 * @typedef {FocusEvent}
 * @extends {Event}
 */
export interface FocusEvent extends Event {}
/**
 * Represents an event triggered by keyboard input.
 *
 * @export interface KeyboardEvent
 * @typedef {KeyboardEvent}
 * @extends {Event}
 */
export interface KeyboardEvent extends Event {}
/**
 * Represents an event triggered by mouse interactions.
 *
 * @export interface MouseEvent
 * @typedef {MouseEvent}
 * @extends {Event}
 */
export interface MouseEvent extends Event {}
/**
 * Represents an event triggered by touch interactions on touch devices.
 *
 * @export interface TouchEvent
 * @typedef {TouchEvent}
 * @extends {Event}
 */
export interface TouchEvent extends Event {}
/**
 * Represents an event triggered by pointer device interactions (e.g., mouse, pen, touch).
 *
 * @export interface PointerEvent
 * @typedef {PointerEvent}
 * @extends {Event}
 */
export interface PointerEvent extends Event {}
/**
 * Represents an event triggered by CSS transitions.
 *
 * @export interface TransitionEvent
 * @typedef {TransitionEvent}
 * @extends {Event}
 */
export interface TransitionEvent extends Event {}
/**
 * Represents a user export interface event in the DOM.
 *
 * @export interface UIEvent
 * @typedef {UIEvent}
 * @extends {Event}
 */
export interface UIEvent extends Event {}
/**
 * Represents an event triggered by the scrolling of a mouse wheel or similar device.
 *
 * @export interface WheelEvent
 * @typedef {WheelEvent}
 * @extends {Event}
 */
export interface WheelEvent extends Event {}
/**
 * Represents a DOM object that can receive events.
 *
 * @export interface EventTarget
 * @typedef {EventTarget}
 */
export interface EventTarget {}
/**
 * Represents the HTML document in the DOM.
 *
 * @export interface Document
 * @typedef {Document}
 */
export interface Document {}
/**
 * Represents the data transferred during a drag-and-drop operation.
 *
 * @export interface DataTransfer
 * @typedef {DataTransfer}
 */
export interface DataTransfer {}
/**
 * Represents the media queries associated with the current document.
 *
 * @export interface StyleMedia
 * @typedef {StyleMedia}
 */
export interface StyleMedia {}
/**
 * Represents an HTML anchor element (`<a>`).
 *
 * @export interface HTMLAnchorElement
 * @typedef {HTMLAnchorElement}
 * @extends {HTMLElement}
 */
export interface HTMLAnchorElement extends HTMLElement {}
/**
 * Represents an HTML area element (`<area>`).
 *
 * @export interface HTMLAreaElement
 * @typedef {HTMLAreaElement}
 * @extends {HTMLElement}
 */
export interface HTMLAreaElement extends HTMLElement {}
/**
 * Represents an HTML audio element (`<audio>`).
 *
 * @export interface HTMLAudioElement
 * @typedef {HTMLAudioElement}
 * @extends {HTMLElement}
 */
export interface HTMLAudioElement extends HTMLElement {}
/**
 * Represents an HTML base element (`<base>`).
 *
 * @export interface HTMLBaseElement
 * @typedef {HTMLBaseElement}
 * @extends {HTMLElement}
 */
export interface HTMLBaseElement extends HTMLElement {}
/**
 * Represents an HTML body element (`<body>`).
 *
 * @export interface HTMLBodyElement
 * @typedef {HTMLBodyElement}
 * @extends {HTMLElement}
 */
export interface HTMLBodyElement extends HTMLElement {}
/**
 * Represents an HTML break element (`<br>`).
 *
 * @export interface HTMLBRElement
 * @typedef {HTMLBRElement}
 * @extends {HTMLElement}
 */
export interface HTMLBRElement extends HTMLElement {}
/**
 * Represents an HTML button element (`<button>`).
 *
 * @export interface HTMLButtonElement
 * @typedef {HTMLButtonElement}
 * @extends {HTMLElement}
 */
export interface HTMLButtonElement extends HTMLElement {}
/**
 * Represents an HTML canvas element (`<canvas>`).
 *
 * @export interface HTMLCanvasElement
 * @typedef {HTMLCanvasElement}
 * @extends {HTMLElement}
 */
export interface HTMLCanvasElement extends HTMLElement {}
/**
 * Represents an HTML data element (`<data>`).
 *
 * @export interface HTMLDataElement
 * @typedef {HTMLDataElement}
 * @extends {HTMLElement}
 */
export interface HTMLDataElement extends HTMLElement {}
/**
 * Represents an HTML data list element (`<datalist>`).
 *
 * @export interface HTMLDataListElement
 * @typedef {HTMLDataListElement}
 * @extends {HTMLElement}
 */
export interface HTMLDataListElement extends HTMLElement {}
/**
 * Represents an HTML details element (`<details>`).
 *
 * @export interface HTMLDetailsElement
 * @typedef {HTMLDetailsElement}
 * @extends {HTMLElement}
 */
export interface HTMLDetailsElement extends HTMLElement {}
/**
 * Represents an HTML dialog element (`<dialog>`).
 *
 * @export interface HTMLDialogElement
 * @typedef {HTMLDialogElement}
 * @extends {HTMLElement}
 */
export interface HTMLDialogElement extends HTMLElement {}
/**
 * Represents an HTML div element (`<div>`).
 *
 * @export interface HTMLDivElement
 * @typedef {HTMLDivElement}
 * @extends {HTMLElement}
 */
export interface HTMLDivElement extends HTMLElement {}
/**
 * Represents an HTML description list element (`<dl>`).
 *
 * @export interface HTMLDListElement
 * @typedef {HTMLDListElement}
 * @extends {HTMLElement}
 */
export interface HTMLDListElement extends HTMLElement {}
/**
 * Represents an HTML embed element (`<embed>`).
 *
 * @export interface HTMLEmbedElement
 * @typedef {HTMLEmbedElement}
 * @extends {HTMLElement}
 */
export interface HTMLEmbedElement extends HTMLElement {}
/**
 * Represents an HTML field set element (`<fieldset>`).
 *
 * @export interface HTMLFieldSetElement
 * @typedef {HTMLFieldSetElement}
 * @extends {HTMLElement}
 */
export interface HTMLFieldSetElement extends HTMLElement {}
/**
 * Represents an HTML form element (`<form>`).
 *
 * @export interface HTMLFormElement
 * @typedef {HTMLFormElement}
 * @extends {HTMLElement}
 */
export interface HTMLFormElement extends HTMLElement {}
/**
 * Represents an HTML heading element (`<h1>`-`<h6>`).
 *
 * @export interface HTMLHeadingElement
 * @typedef {HTMLHeadingElement}
 * @extends {HTMLElement}
 */
export interface HTMLHeadingElement extends HTMLElement {}
/**
 * Represents an HTML head element (`<head>`).
 *
 * @export interface HTMLHeadElement
 * @typedef {HTMLHeadElement}
 * @extends {HTMLElement}
 */
export interface HTMLHeadElement extends HTMLElement {}
/**
 * Represents an HTML horizontal rule element (`<hr>`).
 *
 * @export interface HTMLHRElement
 * @typedef {HTMLHRElement}
 * @extends {HTMLElement}
 */
export interface HTMLHRElement extends HTMLElement {}
/**
 * Represents an HTML root element (`<html>`).
 *
 * @export interface HTMLHtmlElement
 * @typedef {HTMLHtmlElement}
 * @extends {HTMLElement}
 */
export interface HTMLHtmlElement extends HTMLElement {}
/**
 * Represents an HTML iframe element (`<iframe>`).
 *
 * @export interface HTMLIFrameElement
 * @typedef {HTMLIFrameElement}
 * @extends {HTMLElement}
 */
export interface HTMLIFrameElement extends HTMLElement {}
/**
 * Represents an HTML image element (`<img>`).
 *
 * @export interface HTMLImageElement
 * @typedef {HTMLImageElement}
 * @extends {HTMLElement}
 */
export interface HTMLImageElement extends HTMLElement {}
/**
 * Represents an HTML input element (`<input>`).
 *
 * @export interface HTMLInputElement
 * @typedef {HTMLInputElement}
 * @extends {HTMLElement}
 */
export interface HTMLInputElement extends HTMLElement {}
/**
 * Represents an HTML modification element (`<del>` and `<ins>`).
 *
 * @export interface HTMLModElement
 * @typedef {HTMLModElement}
 * @extends {HTMLElement}
 */
export interface HTMLModElement extends HTMLElement {}
/**
 * Represents an HTML label element (`<label>`).
 *
 * @export interface HTMLLabelElement
 * @typedef {HTMLLabelElement}
 * @extends {HTMLElement}
 */
export interface HTMLLabelElement extends HTMLElement {}
/**
 * Represents an HTML legend element (`<legend>`).
 *
 * @export interface HTMLLegendElement
 * @typedef {HTMLLegendElement}
 * @extends {HTMLElement}
 */
export interface HTMLLegendElement extends HTMLElement {}
/**
 * Represents an HTML list item element (`<li>`).
 *
 * @export interface HTMLLIElement
 * @typedef {HTMLLIElement}
 * @extends {HTMLElement}
 */
export interface HTMLLIElement extends HTMLElement {}
/**
 * Represents an HTML link element (`<link>`).
 *
 * @export interface HTMLLinkElement
 * @typedef {HTMLLinkElement}
 * @extends {HTMLElement}
 */
export interface HTMLLinkElement extends HTMLElement {}
/**
 * Represents an HTML map element (`<map>`).
 *
 * @export interface HTMLMapElement
 * @typedef {HTMLMapElement}
 * @extends {HTMLElement}
 */
export interface HTMLMapElement extends HTMLElement {}
/**
 * Represents an HTML meta element (`<meta>`).
 *
 * @export interface HTMLMetaElement
 * @typedef {HTMLMetaElement}
 * @extends {HTMLElement}
 */
export interface HTMLMetaElement extends HTMLElement {}
/**
 * Represents an HTML meter element (`<meter>`).
 *
 * @export interface HTMLMeterElement
 * @typedef {HTMLMeterElement}
 * @extends {HTMLElement}
 */
export interface HTMLMeterElement extends HTMLElement {}
/**
 * Represents an HTML object element (`<object>`).
 *
 * @export interface HTMLObjectElement
 * @typedef {HTMLObjectElement}
 * @extends {HTMLElement}
 */
export interface HTMLObjectElement extends HTMLElement {}
/**
 * Represents an HTML option element (`<option>`).
 *
 * @export interface HTMLOptionElement
 * @typedef {HTMLOptionElement}
 * @extends {HTMLElement}
 */
export interface HTMLOptionElement extends HTMLElement {}
/**
 * Represents an HTML paragraph element (`<p>`).
 *
 * @export interface HTMLParagraphElement
 * @typedef {HTMLParagraphElement}
 * @extends {HTMLElement}
 */
export interface HTMLParagraphElement extends HTMLElement {}
/**
 * Represents an HTML progress element (`<progress>`).
 *
 * @export interface HTMLProgressElement
 * @typedef {HTMLProgressElement}
 * @extends {HTMLElement}
 */
export interface HTMLProgressElement extends HTMLElement {}
/**
 * Represents an HTML script element (`<script>`).
 *
 * @export interface HTMLScriptElement
 * @typedef {HTMLScriptElement}
 * @extends {HTMLElement}
 */
export interface HTMLScriptElement extends HTMLElement {}
/**
 * Represents an HTML select element (`<select>`).
 *
 * @export interface HTMLSelectElement
 * @typedef {HTMLSelectElement}
 * @extends {HTMLElement}
 */
export interface HTMLSelectElement extends HTMLElement {}
/**
 * Represents an HTML source element (`<source>`).
 *
 * @export interface HTMLSourceElement
 * @typedef {HTMLSourceElement}
 * @extends {HTMLElement}
 */
export interface HTMLSourceElement extends HTMLElement {}
/**
 * Represents an HTML span element (`<span>`).
 *
 * @export interface HTMLSpanElement
 * @typedef {HTMLSpanElement}
 * @extends {HTMLElement}
 */
export interface HTMLSpanElement extends HTMLElement {}
/**
 * Represents an HTML style element (`<style>`).
 *
 * @export interface HTMLStyleElement
 * @typedef {HTMLStyleElement}
 * @extends {HTMLElement}
 */
export interface HTMLStyleElement extends HTMLElement {}
/**
 * Represents an HTML table element (`<table>`).
 *
 * @export interface HTMLTableElement
 * @typedef {HTMLTableElement}
 * @extends {HTMLElement}
 */
export interface HTMLTableElement extends HTMLElement {}
/**
 * Represents an HTML table column element (`<col>`).
 *
 * @export interface HTMLTableColElement
 * @typedef {HTMLTableColElement}
 * @extends {HTMLElement}
 */
export interface HTMLTableColElement extends HTMLElement {}
/**
 * Represents an HTML table row element (`<tr>`).
 *
 * @export interface HTMLTableRowElement
 * @typedef {HTMLTableRowElement}
 * @extends {HTMLElement}
 */
export interface HTMLTableRowElement extends HTMLElement {}
/**
 * Represents an HTML table section element (`<thead>`, `<tbody>`, and `<tfoot>`).
 *
 * @export interface HTMLTableSectionElement
 * @typedef {HTMLTableSectionElement}
 * @extends {HTMLElement}
 */
export interface HTMLTableSectionElement extends HTMLElement {}
/**
 * Represents an HTML template element (`<template>`).
 *
 * @export interface HTMLTemplateElement
 * @typedef {HTMLTemplateElement}
 * @extends {HTMLElement}
 */
export interface HTMLTemplateElement extends HTMLElement {}
/**
 * Represents an HTML text area element (`<textarea>`).
 *
 * @export interface HTMLTextAreaElement
 * @typedef {HTMLTextAreaElement}
 * @extends {HTMLElement}
 */
export interface HTMLTextAreaElement extends HTMLElement {}
/**
 * Represents an HTML time element (`<time>`).
 *
 * @export interface HTMLTimeElement
 * @typedef {HTMLTimeElement}
 * @extends {HTMLElement}
 */
export interface HTMLTimeElement extends HTMLElement {}
/**
 * Represents an HTML title element (`<title>`).
 *
 * @export interface HTMLTitleElement
 * @typedef {HTMLTitleElement}
 * @extends {HTMLElement}
 */
export interface HTMLTitleElement extends HTMLElement {}
/**
 * Represents an HTML track element (`<track>`).
 *
 * @export interface HTMLTrackElement
 * @typedef {HTMLTrackElement}
 * @extends {HTMLElement}
 */
export interface HTMLTrackElement extends HTMLElement {}
/**
 * Represents an HTML video element (`<video>`).
 *
 * @export interface HTMLVideoElement
 * @typedef {HTMLVideoElement}
 * @extends {HTMLElement}
 */
export interface HTMLVideoElement extends HTMLElement {}
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
 * Represents a native UI event, which provides basic information about user export interface events like focus or blur.
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

export namespace ReblendTyping {
  export interface ChildWithProps<P, S> {
    child: ReblendTyping.Component<P, S>;
    propsKey: string[];
  }
  export interface ReblendRenderingException<P, S> extends Error {
    component: ReblendTyping.Component<P, S>;
  }
  export interface PropPatch<P, S> {
    type: 'REMOVE' | 'UPDATE';
    node: ReblendTyping.Component<P, S>;
    key: string;
    propValue?: string;
  }
  export type Primitive = boolean | null | number | string | undefined;
  export interface ReblendPrimitive<P, S>
    extends ReblendTyping.Component<P, S> {
    reblendPrimitiveData: any;
    setData(data: Primitive): this;
    getData(): Primitive;
  }
  export type IAny = {
    [key: string]: any;
  };
  export type VNodeChild = Primitive | VNode;
  export type VNodeChildren = VNodeChild[];
  export type DomNodeChild<P, S> =
    | ReblendTyping.Component<P, S>
    | ReblendPrimitive<P, S>;
  export type DomNodeChildren<P, S> = DomNodeChild<P, S>[];
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
    //@ts-ignore
    displayName: string | typeof Component | ReactNode;
  }
  export interface Patch<P, S> {
    type: PatchTypeAndOrder;
    newNode?: VNodeChild;
    oldNode?: DomNodeChild<P, S>;
    parent?: Component<P, S>;
    patches?: PropPatch<P, S>[];
  }

  export interface ReblendComponentConfig {
    /**
     * Component to render first if this component is asyncronous
     */
    ReblendPlaceholder?: ReblendElement;
    /**
     * Style for default reblend placeholder i.e if your are not using custom placeholder for your async components
     */
    defaultReblendPlaceholderStyle?: string | CSSProperties;
  }

  /**
   * Represents a mutable reference object whose `current` property can hold a value of type `T` or an `HTMLElement`.
   *
   * @template T
   * @typedef {Object} Ref
   * @property {T | HTMLElement} [current] - The current value held by the reference, which can be of type `T` or an `HTMLElement`.
   */
  export type Ref<T> = {
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
  export type StateFunction<T> = (
    value: StateFunctionValue<T>,
    force?: boolean
  ) => Promise<void>;
  /**
   * The value used to update the state, which can be either a new value directly or a function that computes the new value based on the previous state.
   *
   * @template T
   */
  export type StateFunctionValue<T> =
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
  export type StateEffectiveMemoFunction<T> = () => T | Promise<T>;
  /**
   * A function that can return a cleanup function or nothing, commonly used in effect hooks.
   *
   * @callback StateEffectiveFunction
   * @returns {(() => any) | void} - A cleanup function or void if no cleanup is necessary.
   */
  export type StateEffectiveFunction = () =>
    | Promise<(() => void) | void>
    | (() => void)
    | void;
  /**
   * A reducer function that takes a previous value and an incoming value, and returns a new value. This is often used in state management patterns like `useReducer`.
   *
   * @template ValueType, IncomingType
   * @callback StateReducerFunction
   * @param {ValueType} previous - The previous state or value.
   * @param {IncomingType} current - The incoming value or action that affects the state.
   * @returns {ValueType} - The new value after applying the reducer logic.
   */
  export type StateReducerFunction<ValueType, IncomingType> = (
    previous: ValueType,
    current: IncomingType
  ) => Promise<ValueType> | ValueType;
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
  export type ElementType<
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
  export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  /**
   * Represents any user-defined component, either as a function or a class.
   *
   * Similar to {@link ComponentType}, but without extra properties like
   * {@link FunctionComponent.defaultProps defaultProps } and
   * {@link ComponentClass.contextTypes contextTypes}.
   *
   * @template P The props the component accepts.
   */
  export type JSXElementConstructor<P> =
    | Primitive
    | Promise<
        (
          props: P
        ) => Promise<ReblendNode | ReblendNode[]> | ReblendNode | ReblendNode[]
      >
    | ((
        props: P
      ) => Promise<ReblendNode | ReblendNode[]> | ReblendNode | ReblendNode[]);

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
  export interface Attributes {
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
   * export interface Props extends Reblend.RefAttributes<HTMLDivElement> {}
   * declare const Component: Reblend.FunctionComponent<Props>;
   * ```
   *
   * Otherwise it's simpler to directly use {@link Ref} since you can safely use the
   * props type to describe to props that a consumer can pass to the component
   * as well as describing the props the implementation of a component "sees".
   * {@link RefAttributes} is generally not safe to describe both consumer and seen props.
   *
   * ```tsx
   * export interface Props extends {
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
  export interface RefAttributes<T> extends Attributes {
    /**
     * Allows getting a ref to the component instance.
     * Once the component unmounts, Reblend will set `ref.current` to `null`
     * (or call the ref with `null` if you passed a callback ref).
     *
     * @see {@link https://reblend.dev/learn/referencing-values-with-refs#refs-and-the-dom Reblend Docs}
     */
    ref?: Ref<T> | undefined;
  }
  /**
   * Represents the built-in attributes available to class components.
   */
  export interface ClassAttributes<T> extends RefAttributes<T> {}
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
  export type ReblendElement = HTMLElement &
    React.ReactElement &
    React.ReactPortal &
    React.ForwardRefExoticComponent<any> &
    undefined &
    null;

  //@ts-ignore Don't have to implement Component
  export interface FunctionComponentElement<P> extends Component<P, any> {
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

  export interface DOMElement<
    P extends HTMLAttributes<T> | SVGAttributes<T>,
    T extends Element
    //@ts-ignore
  > extends ReblendElement {
    ref: Ref<T>;
  }
  export interface ReblendHTMLElement<T extends HTMLElement>
    extends DetailedReblendHTMLElement<AllHTMLAttributes<T>, T> {}
  export interface DetailedReblendHTMLElement<
    P extends HTMLAttributes<T>,
    T extends HTMLElement
  > extends DOMElement<P, T> {
    type: keyof ReblendHTML;
  }
  export interface ReblendSVGElement
    extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
    type: keyof ReblendSVG;
  }

  type DOMFactory<P extends DOMAttributes<T>, T extends Element> = (
    props?: (ClassAttributes<T> & P) | null,
    ...children: ReblendNode[]
  ) => DOMElement<P, T>;
  export interface HTMLFactory<T extends HTMLElement>
    extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> {}
  export interface DetailedHTMLFactory<
    P extends HTMLAttributes<T>,
    T extends HTMLElement
  > extends DOMFactory<P, T> {
    (
      props?: (ClassAttributes<T> & P) | null,
      ...children: ReblendNode[]
    ): DetailedReblendHTMLElement<P, T>;
  }
  export interface SVGFactory
    extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
    (
      props?: (ClassAttributes<SVGElement> & SVGAttributes<SVGElement>) | null,
      ...children: ReblendNode[]
    ): ReblendSVGElement;
  }

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
  export type ReblendNode =
    | ReblendElement
    | HTMLs
    | React.ReactNode
    | Iterable<ReblendNode>
    | undefined
    | null;
  export interface Component<P, S> extends HTMLElement {
    // constructor();
    html(): Promise<ReblendNode>;
    /**
     * Holds the props (properties) of the component.
     * Can be any type of object containing the default component's configuration.
     *
     * @static
     * @type {IAny}
     */
    props: any;
    /**
     * static configuration for the component
     */
    config?: ReblendComponentConfig;
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
    elementChildren: Set<Component<any, any>> | null;
    /**
     * This is a wrapper for the react element children
     */
    reactElementChildrenWrapper: Component<any, any> | null;
    /**
     * This is a react dom root
     */
    reactDomCreateRoot_root: import('react-dom/client').Root | null;
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
    renderingError?: ReblendRenderingException<P, S>;
    /**
     * The error handler for rendering exceptions.
     */
    renderingErrorHandler?: (e: ReblendRenderingException<P, S>) => void;
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
    ReactClass: () => any;
    /**
     * Component to render first if this component is asyncronous
     */
    //@ts-ignore
    ReblendPlaceholder?: VNode | typeof Component;
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
    effectsState: Map<
      string,
      {
        cache: Primitive | Array<Primitive>;
        cacher: () => Primitive | Array<Primitive>;
        /**
         * The effects functions defined for the component.
         */
        effect?: ReblendTyping.StateEffectiveFunction;
        /**
         * The disconnect effects to apply when the component is disconnected.
         */
        disconnectEffect?: ReblendTyping.StateEffectiveFunction;
      }
    >;
    /**
     * The effects to apply when the component is mounted.
     */
    onMountEffects?: Set<ReblendTyping.StateEffectiveFunction>;
    hookDisconnectedEffects?: Set<() => void>;
    /**
     * Indicates number of awaiting updates.
     */
    numAwaitingUpdates: number;
    /**
     * Indicates whether state effects are currently running.
     */
    stateEffectRunning: boolean;
    /**
     * Indicates when effects function are required to update regardless of changes
     */
    forceEffects: boolean;
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
     * Indicate when onStateChange of a component is triggered before its children initialized
     */
    awaitingReRender: boolean;
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
     * Adds a hook disconnect effect function to be executed when the component is disconnected.
     *
     * @param {() => void} destructor - The destructor function to add.
     */
    addHookDisconnectedEffect(destructor: () => void): void;
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
    initState<ExpectedReturn = any>(): Promise<ExpectedReturn>;
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
     * Recache effect functions dependencies, useful in cases where rendering is skipped because of previous unfinished rendering
     */
    cacheEffectDependencies(): void;
    /**
     * Handles state changes, applying effects and updating virtual DOM nodes.
     * @async
     */
    onStateChange(): Promise<void>;
    /**
     * Returns the virtual DOM structure. Must be implemented by subclasses.
     * @returns {VNode | VNodeChildren} The virtual DOM nodes.
     */
    html(): Promise<ReblendTyping.ReblendNode>;
    /**
     * Checks for any changes in the props and updates the component accordingly.
     * React Reblend nodes can trigger different updates based on the type of children or non-children changes.
     *
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if an invalid props update type is provided.
     */
    checkPropsChange(): Promise<void>;
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
  export type FC<P = {}> = FunctionComponent<P>;
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
  export interface FunctionComponent<P = {}> {
    (props: P): ReblendNode;
    props?: Partial<P> | undefined;
  }

  /**
   * Represents a component class in Reblend.
   *
   * @template P The props the component accepts.
   * @template S The internal state of the component.
   */
  //@ts-expect-error
  export interface ComponentClass<P = {}, S = ComponentState>
    extends Component<P, S> {
    new (props: P): Component<P, S>;
    props?: Partial<P> | undefined;
  }

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
  export interface BaseSyntheticEvent<E = object, C = any, T = any> {
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
  export interface SyntheticEvent<T = Element, E = Event>
    extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
  export interface ClipboardEvent<T = Element>
    extends SyntheticEvent<T, NativeClipboardEvent> {
    clipboardData: DataTransfer;
  }
  export interface CompositionEvent<T = Element>
    extends SyntheticEvent<T, NativeCompositionEvent> {
    data: string;
  }
  export interface DragEvent<T = Element>
    extends MouseEvent<T, NativeDragEvent> {
    dataTransfer: DataTransfer;
  }
  export interface PointerEvent<T = Element>
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
  export interface FocusEvent<Target = Element, RelatedTarget = Element>
    extends SyntheticEvent<Target, NativeFocusEvent> {
    relatedTarget: (EventTarget & RelatedTarget) | null;
    target: EventTarget & Target;
  }
  export interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
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
  export interface KeyboardEvent<T = Element>
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
  export interface MouseEvent<T = Element, E = NativeMouseEvent>
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
  export interface TouchEvent<T = Element>
    extends UIEvent<T, NativeTouchEvent> {
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
  export interface UIEvent<T = Element, E = NativeUIEvent>
    extends SyntheticEvent<T, E> {
    detail: number;
    view: AbstractView;
  }
  export interface WheelEvent<T = Element>
    extends MouseEvent<T, NativeWheelEvent> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
  }
  export interface AnimationEvent<T = Element>
    extends SyntheticEvent<T, NativeAnimationEvent> {
    animationName: string;
    elapsedTime: number;
    pseudoElement: string;
  }
  export interface TransitionEvent<T = Element>
    extends SyntheticEvent<T, NativeTransitionEvent> {
    elapsedTime: number;
    propertyName: string;
    pseudoElement: string;
  }
  type EventHandler<E extends SyntheticEvent<any>> = {
    bivarianceHack(event: E): void;
  }['bivarianceHack'];
  export type ReblendEventHandler<T = Element> = EventHandler<
    SyntheticEvent<T>
  >;
  export type ClipboardEventHandler<T = Element> = EventHandler<
    ClipboardEvent<T>
  >;
  export type CompositionEventHandler<T = Element> = EventHandler<
    CompositionEvent<T>
  >;
  export type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
  export type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
  export type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
  export type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
  export type KeyboardEventHandler<T = Element> = EventHandler<
    KeyboardEvent<T>
  >;
  export type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
  export type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
  export type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
  export type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
  export type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
  export type AnimationEventHandler<T = Element> = EventHandler<
    AnimationEvent<T>
  >;
  export type TransitionEventHandler<T = Element> = EventHandler<
    TransitionEvent<T>
  >;
  export interface HTMLProps<T>
    extends AllHTMLAttributes<T>,
      ClassAttributes<T> {}
  export type DetailedHTMLProps<
    E extends HTMLAttributes<T>,
    T
  > = ClassAttributes<T> & E;
  export interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {}
  export interface SVGLineElementAttributes<T> extends SVGProps<T> {}
  export interface SVGTextElementAttributes<T> extends SVGProps<T> {}
  export interface DOMAttributes<T> {
    children?: ReblendNode | undefined;
    dangerouslySetInnerHTML?:
      | {
          __html: string | TrustedHTML;
        }
      | undefined;
    onCopy?: ClipboardEventHandler<T> | undefined;
    oncopy?: ClipboardEventHandler<T> | undefined;
    onCopyCapture?: ClipboardEventHandler<T> | undefined;
    oncopycapture?: ClipboardEventHandler<T> | undefined;
    onCut?: ClipboardEventHandler<T> | undefined;
    oncut?: ClipboardEventHandler<T> | undefined;
    onCutCapture?: ClipboardEventHandler<T> | undefined;
    oncutcapture?: ClipboardEventHandler<T> | undefined;
    onPaste?: ClipboardEventHandler<T> | undefined;
    onpaste?: ClipboardEventHandler<T> | undefined;
    onPasteCapture?: ClipboardEventHandler<T> | undefined;
    onpastecapture?: ClipboardEventHandler<T> | undefined;
    onCompositionEnd?: CompositionEventHandler<T> | undefined;
    oncompositionend?: CompositionEventHandler<T> | undefined;
    onCompositionEndCapture?: CompositionEventHandler<T> | undefined;
    oncompositionendcapture?: CompositionEventHandler<T> | undefined;
    onCompositionStart?: CompositionEventHandler<T> | undefined;
    oncompositionstart?: CompositionEventHandler<T> | undefined;
    onCompositionStartCapture?: CompositionEventHandler<T> | undefined;
    oncompositionstartcapture?: CompositionEventHandler<T> | undefined;
    onCompositionUpdate?: CompositionEventHandler<T> | undefined;
    oncompositionupdate?: CompositionEventHandler<T> | undefined;
    onCompositionUpdateCapture?: CompositionEventHandler<T> | undefined;
    oncompositionupdatecapture?: CompositionEventHandler<T> | undefined;
    onFocus?: FocusEventHandler<T> | undefined;
    onfocus?: FocusEventHandler<T> | undefined;
    onFocusCapture?: FocusEventHandler<T> | undefined;
    onfocuscapture?: FocusEventHandler<T> | undefined;
    onBlur?: FocusEventHandler<T> | undefined;
    onblur?: FocusEventHandler<T> | undefined;
    onBlurCapture?: FocusEventHandler<T> | undefined;
    onblurcapture?: FocusEventHandler<T> | undefined;
    onChange?: FormEventHandler<T> | undefined;
    onchange?: FormEventHandler<T> | undefined;
    onChangeCapture?: FormEventHandler<T> | undefined;
    onchangecapture?: FormEventHandler<T> | undefined;
    onBeforeInput?: FormEventHandler<T> | undefined;
    onbeforeinput?: FormEventHandler<T> | undefined;
    onBeforeInputCapture?: FormEventHandler<T> | undefined;
    onbeforeinputcapture?: FormEventHandler<T> | undefined;
    onInput?: FormEventHandler<T> | undefined;
    oninput?: FormEventHandler<T> | undefined;
    onInputCapture?: FormEventHandler<T> | undefined;
    oninputcapture?: FormEventHandler<T> | undefined;
    onReset?: FormEventHandler<T> | undefined;
    onreset?: FormEventHandler<T> | undefined;
    onResetCapture?: FormEventHandler<T> | undefined;
    onresetcapture?: FormEventHandler<T> | undefined;
    onSubmit?: FormEventHandler<T> | undefined;
    onsubmit?: FormEventHandler<T> | undefined;
    onSubmitCapture?: FormEventHandler<T> | undefined;
    onsubmitcapture?: FormEventHandler<T> | undefined;
    onInvalid?: FormEventHandler<T> | undefined;
    oninvalid?: FormEventHandler<T> | undefined;
    onInvalidCapture?: FormEventHandler<T> | undefined;
    oninvalidcapture?: FormEventHandler<T> | undefined;
    onLoad?: ReblendEventHandler<T> | undefined;
    onload?: ReblendEventHandler<T> | undefined;
    onLoadCapture?: ReblendEventHandler<T> | undefined;
    onloadcapture?: ReblendEventHandler<T> | undefined;
    onError?: ReblendEventHandler<T> | undefined;
    onerror?: ReblendEventHandler<T> | undefined;
    onErrorCapture?: ReblendEventHandler<T> | undefined;
    onerrorcapture?: ReblendEventHandler<T> | undefined;
    onKeyDown?: KeyboardEventHandler<T> | undefined;
    onkeydown?: KeyboardEventHandler<T> | undefined;
    onKeyDownCapture?: KeyboardEventHandler<T> | undefined;
    onkeydowncapture?: KeyboardEventHandler<T> | undefined;
    /** @deprecated */
    onKeyPress?: KeyboardEventHandler<T> | undefined;
    onkeypress?: KeyboardEventHandler<T> | undefined;
    /** @deprecated */
    onKeyPressCapture?: KeyboardEventHandler<T> | undefined;
    onkeypresscapture?: KeyboardEventHandler<T> | undefined;
    onKeyUp?: KeyboardEventHandler<T> | undefined;
    onkeyup?: KeyboardEventHandler<T> | undefined;
    onKeyUpCapture?: KeyboardEventHandler<T> | undefined;
    onkeyupcapture?: KeyboardEventHandler<T> | undefined;
    onAbort?: ReblendEventHandler<T> | undefined;
    onabort?: ReblendEventHandler<T> | undefined;
    onAbortCapture?: ReblendEventHandler<T> | undefined;
    onabortcapture?: ReblendEventHandler<T> | undefined;
    onCanPlay?: ReblendEventHandler<T> | undefined;
    oncanplay?: ReblendEventHandler<T> | undefined;
    onCanPlayCapture?: ReblendEventHandler<T> | undefined;
    oncanplaycapture?: ReblendEventHandler<T> | undefined;
    onCanPlayThrough?: ReblendEventHandler<T> | undefined;
    oncanplaythrough?: ReblendEventHandler<T> | undefined;
    onCanPlayThroughCapture?: ReblendEventHandler<T> | undefined;
    oncanplaythroughcapture?: ReblendEventHandler<T> | undefined;
    onDurationChange?: ReblendEventHandler<T> | undefined;
    ondurationchange?: ReblendEventHandler<T> | undefined;
    onDurationChangeCapture?: ReblendEventHandler<T> | undefined;
    ondurationchangecapture?: ReblendEventHandler<T> | undefined;
    onEmptied?: ReblendEventHandler<T> | undefined;
    onemptied?: ReblendEventHandler<T> | undefined;
    onEmptiedCapture?: ReblendEventHandler<T> | undefined;
    onemptiedcapture?: ReblendEventHandler<T> | undefined;
    onEncrypted?: ReblendEventHandler<T> | undefined;
    onencrypted?: ReblendEventHandler<T> | undefined;
    onEncryptedCapture?: ReblendEventHandler<T> | undefined;
    onencryptedcapture?: ReblendEventHandler<T> | undefined;
    onEnded?: ReblendEventHandler<T> | undefined;
    onended?: ReblendEventHandler<T> | undefined;
    onEndedCapture?: ReblendEventHandler<T> | undefined;
    onendedcapture?: ReblendEventHandler<T> | undefined;
    onLoadedData?: ReblendEventHandler<T> | undefined;
    onloadeddata?: ReblendEventHandler<T> | undefined;
    onLoadedDataCapture?: ReblendEventHandler<T> | undefined;
    onloadeddatacapture?: ReblendEventHandler<T> | undefined;
    onLoadedMetadata?: ReblendEventHandler<T> | undefined;
    onloadedmetadata?: ReblendEventHandler<T> | undefined;
    onLoadedMetadataCapture?: ReblendEventHandler<T> | undefined;
    onloadedmetadatacapture?: ReblendEventHandler<T> | undefined;
    onLoadStart?: ReblendEventHandler<T> | undefined;
    onloadstart?: ReblendEventHandler<T> | undefined;
    onLoadStartCapture?: ReblendEventHandler<T> | undefined;
    onloadstartcapture?: ReblendEventHandler<T> | undefined;
    onPause?: ReblendEventHandler<T> | undefined;
    onpause?: ReblendEventHandler<T> | undefined;
    onPauseCapture?: ReblendEventHandler<T> | undefined;
    onpausecapture?: ReblendEventHandler<T> | undefined;
    onPlay?: ReblendEventHandler<T> | undefined;
    onplay?: ReblendEventHandler<T> | undefined;
    onPlayCapture?: ReblendEventHandler<T> | undefined;
    onplaycapture?: ReblendEventHandler<T> | undefined;
    onPlaying?: ReblendEventHandler<T> | undefined;
    onplaying?: ReblendEventHandler<T> | undefined;
    onPlayingCapture?: ReblendEventHandler<T> | undefined;
    onplayingcapture?: ReblendEventHandler<T> | undefined;
    onProgress?: ReblendEventHandler<T> | undefined;
    onprogress?: ReblendEventHandler<T> | undefined;
    onProgressCapture?: ReblendEventHandler<T> | undefined;
    onprogresscapture?: ReblendEventHandler<T> | undefined;
    onRateChange?: ReblendEventHandler<T> | undefined;
    onratechange?: ReblendEventHandler<T> | undefined;
    onRateChangeCapture?: ReblendEventHandler<T> | undefined;
    onratechangecapture?: ReblendEventHandler<T> | undefined;
    onResize?: ReblendEventHandler<T> | undefined;
    onresize?: ReblendEventHandler<T> | undefined;
    onResizeCapture?: ReblendEventHandler<T> | undefined;
    onresizecapture?: ReblendEventHandler<T> | undefined;
    onSeeked?: ReblendEventHandler<T> | undefined;
    onseeked?: ReblendEventHandler<T> | undefined;
    onSeekedCapture?: ReblendEventHandler<T> | undefined;
    onseekedcapture?: ReblendEventHandler<T> | undefined;
    onSeeking?: ReblendEventHandler<T> | undefined;
    onseeking?: ReblendEventHandler<T> | undefined;
    onSeekingCapture?: ReblendEventHandler<T> | undefined;
    onseekingcapture?: ReblendEventHandler<T> | undefined;
    onStalled?: ReblendEventHandler<T> | undefined;
    onstalled?: ReblendEventHandler<T> | undefined;
    onStalledCapture?: ReblendEventHandler<T> | undefined;
    onstalledcapture?: ReblendEventHandler<T> | undefined;
    onSuspend?: ReblendEventHandler<T> | undefined;
    onsuspend?: ReblendEventHandler<T> | undefined;
    onSuspendCapture?: ReblendEventHandler<T> | undefined;
    onsuspendcapture?: ReblendEventHandler<T> | undefined;
    onTimeUpdate?: ReblendEventHandler<T> | undefined;
    ontimeupdate?: ReblendEventHandler<T> | undefined;
    onTimeUpdateCapture?: ReblendEventHandler<T> | undefined;
    ontimeupdatecapture?: ReblendEventHandler<T> | undefined;
    onVolumeChange?: ReblendEventHandler<T> | undefined;
    onvolumechange?: ReblendEventHandler<T> | undefined;
    onVolumeChangeCapture?: ReblendEventHandler<T> | undefined;
    onvolumechangecapture?: ReblendEventHandler<T> | undefined;
    onWaiting?: ReblendEventHandler<T> | undefined;
    onwaiting?: ReblendEventHandler<T> | undefined;
    onWaitingCapture?: ReblendEventHandler<T> | undefined;
    onwaitingcapture?: ReblendEventHandler<T> | undefined;
    onAuxClick?: MouseEventHandler<T> | undefined;
    onauxclick?: MouseEventHandler<T> | undefined;
    onAuxClickCapture?: MouseEventHandler<T> | undefined;
    onauxclickcapture?: MouseEventHandler<T> | undefined;
    onClick?: MouseEventHandler<T> | undefined;
    onclick?: MouseEventHandler<T> | undefined;
    onClickCapture?: MouseEventHandler<T> | undefined;
    onclickcapture?: MouseEventHandler<T> | undefined;
    onContextMenu?: MouseEventHandler<T> | undefined;
    oncontextmenu?: MouseEventHandler<T> | undefined;
    onContextMenuCapture?: MouseEventHandler<T> | undefined;
    oncontextmenucapture?: MouseEventHandler<T> | undefined;
    onDoubleClick?: MouseEventHandler<T> | undefined;
    ondoubleclick?: MouseEventHandler<T> | undefined;
    onDoubleClickCapture?: MouseEventHandler<T> | undefined;
    ondoubleclickcapture?: MouseEventHandler<T> | undefined;
    onDrag?: DragEventHandler<T> | undefined;
    ondrag?: DragEventHandler<T> | undefined;
    onDragCapture?: DragEventHandler<T> | undefined;
    ondragcapture?: DragEventHandler<T> | undefined;
    onDragEnd?: DragEventHandler<T> | undefined;
    ondragend?: DragEventHandler<T> | undefined;
    onDragEndCapture?: DragEventHandler<T> | undefined;
    ondragendcapture?: DragEventHandler<T> | undefined;
    onDragEnter?: DragEventHandler<T> | undefined;
    ondragenter?: DragEventHandler<T> | undefined;
    onDragEnterCapture?: DragEventHandler<T> | undefined;
    ondragentercapture?: DragEventHandler<T> | undefined;
    onDragExit?: DragEventHandler<T> | undefined;
    ondragexit?: DragEventHandler<T> | undefined;
    onDragExitCapture?: DragEventHandler<T> | undefined;
    ondragexitcapture?: DragEventHandler<T> | undefined;
    onDragLeave?: DragEventHandler<T> | undefined;
    ondragleave?: DragEventHandler<T> | undefined;
    onDragLeaveCapture?: DragEventHandler<T> | undefined;
    ondragleavecapture?: DragEventHandler<T> | undefined;
    onDragOver?: DragEventHandler<T> | undefined;
    ondragover?: DragEventHandler<T> | undefined;
    onDragOverCapture?: DragEventHandler<T> | undefined;
    ondragovercapture?: DragEventHandler<T> | undefined;
    onDragStart?: DragEventHandler<T> | undefined;
    ondragstart?: DragEventHandler<T> | undefined;
    onDragStartCapture?: DragEventHandler<T> | undefined;
    ondragstartcapture?: DragEventHandler<T> | undefined;
    onDrop?: DragEventHandler<T> | undefined;
    ondrop?: DragEventHandler<T> | undefined;
    onDropCapture?: DragEventHandler<T> | undefined;
    ondropcapture?: DragEventHandler<T> | undefined;
    onMouseDown?: MouseEventHandler<T> | undefined;
    onmousedown?: MouseEventHandler<T> | undefined;
    onMouseDownCapture?: MouseEventHandler<T> | undefined;
    onmousedowncapture?: MouseEventHandler<T> | undefined;
    onMouseEnter?: MouseEventHandler<T> | undefined;
    onmouseenter?: MouseEventHandler<T> | undefined;
    onMouseLeave?: MouseEventHandler<T> | undefined;
    onmouseleave?: MouseEventHandler<T> | undefined;
    onMouseMove?: MouseEventHandler<T> | undefined;
    onmousemove?: MouseEventHandler<T> | undefined;
    onMouseMoveCapture?: MouseEventHandler<T> | undefined;
    onmousemovecapture?: MouseEventHandler<T> | undefined;
    onMouseOut?: MouseEventHandler<T> | undefined;
    onmouseout?: MouseEventHandler<T> | undefined;
    onMouseOutCapture?: MouseEventHandler<T> | undefined;
    onmouseoutcapture?: MouseEventHandler<T> | undefined;
    onMouseOver?: MouseEventHandler<T> | undefined;
    onmouseover?: MouseEventHandler<T> | undefined;
    onMouseOverCapture?: MouseEventHandler<T> | undefined;
    onmouseovercapture?: MouseEventHandler<T> | undefined;
    onMouseUp?: MouseEventHandler<T> | undefined;
    onmouseup?: MouseEventHandler<T> | undefined;
    onMouseUpCapture?: MouseEventHandler<T> | undefined;
    onmouseupcapture?: MouseEventHandler<T> | undefined;
    onSelect?: ReblendEventHandler<T> | undefined;
    onselect?: ReblendEventHandler<T> | undefined;
    onSelectCapture?: ReblendEventHandler<T> | undefined;
    onselectcapture?: ReblendEventHandler<T> | undefined;
    onTouchCancel?: TouchEventHandler<T> | undefined;
    ontouchcancel?: TouchEventHandler<T> | undefined;
    onTouchCancelCapture?: TouchEventHandler<T> | undefined;
    ontouchcancelcapture?: TouchEventHandler<T> | undefined;
    onTouchEnd?: TouchEventHandler<T> | undefined;
    ontouchend?: TouchEventHandler<T> | undefined;
    onTouchEndCapture?: TouchEventHandler<T> | undefined;
    ontouchendcapture?: TouchEventHandler<T> | undefined;
    onTouchMove?: TouchEventHandler<T> | undefined;
    ontouchmove?: TouchEventHandler<T> | undefined;
    onTouchMoveCapture?: TouchEventHandler<T> | undefined;
    ontouchmovecapture?: TouchEventHandler<T> | undefined;
    onTouchStart?: TouchEventHandler<T> | undefined;
    ontouchstart?: TouchEventHandler<T> | undefined;
    onTouchStartCapture?: TouchEventHandler<T> | undefined;
    ontouchstartcapture?: TouchEventHandler<T> | undefined;
    onPointerDown?: PointerEventHandler<T> | undefined;
    onpointerdown?: PointerEventHandler<T> | undefined;
    onPointerDownCapture?: PointerEventHandler<T> | undefined;
    onpointerdowncapture?: PointerEventHandler<T> | undefined;
    onPointerMove?: PointerEventHandler<T> | undefined;
    onpointermove?: PointerEventHandler<T> | undefined;
    onPointerMoveCapture?: PointerEventHandler<T> | undefined;
    onpointermovecapture?: PointerEventHandler<T> | undefined;
    onPointerUp?: PointerEventHandler<T> | undefined;
    onpointerup?: PointerEventHandler<T> | undefined;
    onPointerUpCapture?: PointerEventHandler<T> | undefined;
    onpointerupcapture?: PointerEventHandler<T> | undefined;
    onPointerCancel?: PointerEventHandler<T> | undefined;
    onpointercancel?: PointerEventHandler<T> | undefined;
    onPointerCancelCapture?: PointerEventHandler<T> | undefined;
    onpointercancelcapture?: PointerEventHandler<T> | undefined;
    onPointerEnter?: PointerEventHandler<T> | undefined;
    onpointerenter?: PointerEventHandler<T> | undefined;
    onPointerLeave?: PointerEventHandler<T> | undefined;
    onpointerleave?: PointerEventHandler<T> | undefined;
    onPointerOver?: PointerEventHandler<T> | undefined;
    onpointerover?: PointerEventHandler<T> | undefined;
    onPointerOverCapture?: PointerEventHandler<T> | undefined;
    onpointerovercapture?: PointerEventHandler<T> | undefined;
    onPointerOut?: PointerEventHandler<T> | undefined;
    onpointerout?: PointerEventHandler<T> | undefined;
    onPointerOutCapture?: PointerEventHandler<T> | undefined;
    onpointeroutcapture?: PointerEventHandler<T> | undefined;
    onGotPointerCapture?: PointerEventHandler<T> | undefined;
    ongotpointercapture?: PointerEventHandler<T> | undefined;
    onGotPointerCaptureCapture?: PointerEventHandler<T> | undefined;
    ongotpointercapturecapture?: PointerEventHandler<T> | undefined;
    onLostPointerCapture?: PointerEventHandler<T> | undefined;
    onlostpointercapture?: PointerEventHandler<T> | undefined;
    onLostPointerCaptureCapture?: PointerEventHandler<T> | undefined;
    onlostpointercapturecapture?: PointerEventHandler<T> | undefined;
    onScroll?: UIEventHandler<T> | undefined;
    onscroll?: UIEventHandler<T> | undefined;
    onScrollCapture?: UIEventHandler<T> | undefined;
    onscrollcapture?: UIEventHandler<T> | undefined;
    onWheel?: WheelEventHandler<T> | undefined;
    onwheel?: WheelEventHandler<T> | undefined;
    onWheelCapture?: WheelEventHandler<T> | undefined;
    onwheelcapture?: WheelEventHandler<T> | undefined;
    onAnimationStart?: AnimationEventHandler<T> | undefined;
    onanimationstart?: AnimationEventHandler<T> | undefined;
    onAnimationStartCapture?: AnimationEventHandler<T> | undefined;
    onanimationstartcapture?: AnimationEventHandler<T> | undefined;
    onAnimationEnd?: AnimationEventHandler<T> | undefined;
    onanimationend?: AnimationEventHandler<T> | undefined;
    onAnimationEndCapture?: AnimationEventHandler<T> | undefined;
    onanimationendcapture?: AnimationEventHandler<T> | undefined;
    onAnimationIteration?: AnimationEventHandler<T> | undefined;
    onanimationiteration?: AnimationEventHandler<T> | undefined;
    onAnimationIterationCapture?: AnimationEventHandler<T> | undefined;
    onanimationiterationcapture?: AnimationEventHandler<T> | undefined;
    onTransitionEnd?: TransitionEventHandler<T> | undefined;
    ontransitionend?: TransitionEventHandler<T> | undefined;
    onTransitionEndCapture?: TransitionEventHandler<T> | undefined;
    ontransitionendcapture?: TransitionEventHandler<T> | undefined;
  }
  export interface CSSProperties extends CSS.Properties<string | number> {}
  export interface AriaAttributes {
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
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
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
    tabIndex?: string | number | undefined;
    tabindex?: string | number | undefined;
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

  export interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string | undefined;
    acceptCharset?: string | undefined;
    acceptcharset?: string | undefined;
    action?: string | undefined;
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
    formAction?: string | undefined;
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
  export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  }
  export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}
  export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string | undefined;
    target?: string | undefined;
  }
  export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
  }
  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    action?: string | undefined;
    formEncType?: string | undefined;
    enctype?: string | undefined;
    formMethod?: string | undefined;
    method?: string | undefined;
    formNoValidate?: boolean | undefined;
    novalidate?: boolean | undefined;
    formTarget?: string | undefined;
    target?: string | undefined;
    name?: string | undefined;
    type?: 'submit' | 'reset' | 'button' | undefined;
    value?: string | readonly string[] | number | undefined;
  }
  export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string | undefined;
    width?: number | string | undefined;
  }
  export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number | undefined;
    width?: number | string | undefined;
  }
  export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number | undefined;
  }
  export interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | readonly string[] | number | undefined;
  }
  export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean | undefined;
    onToggle?: ReblendEventHandler<T> | undefined;
    name?: string | undefined;
  }
  export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
    dateTime?: string | undefined;
  }
  export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    onCancel?: ReblendEventHandler<T> | undefined;
    onClose?: ReblendEventHandler<T> | undefined;
    open?: boolean | undefined;
  }
  export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
  }
  export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }
  export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autoComplete?: string | undefined;
    encType?: string | undefined;
    enctype?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
  }
  export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string | undefined;
  }
  export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string | undefined;
    alt?: string | undefined;
    autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
    autocomplete?: HTMLInputAutoCompleteAttribute | undefined;
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
    formAction?: string | undefined;
    action?: string | undefined;
    formEncType?: string | undefined;
    enctype?: string | undefined;
    formMethod?: string | undefined;
    method?: string | undefined;
    formNoValidate?: boolean | undefined;
    novalidate?: boolean | undefined;
    formTarget?: string | undefined;
    target?: string | undefined;
    height?: number | string | undefined;
    list?: string | undefined;
    max?: string | number | string | undefined;
    maxLength?: string | number | undefined;
    maxlength?: string | number | undefined;
    min?: string | number | string | undefined;
    minLength?: string | number | undefined;
    minlength?: string | number | undefined;
    multiple?: string | boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    readonly?: boolean | string | undefined;
    required?: boolean | string | undefined;
    size?: number | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | readonly string[] | number | undefined;
    width?: number | string | undefined;
    onChange?: ChangeEventHandler<T> | undefined;
    onchange?: ChangeEventHandler<T> | undefined;
  }
  export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keyType?: string | undefined;
    keyParams?: string | undefined;
    name?: string | undefined;
  }
  export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    htmlFor?: string | undefined;
    for?: string | undefined;
  }
  export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | readonly string[] | number | undefined;
  }
  export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string | undefined;
    crossOrigin?: CrossOrigin;
    crossorigin?: CrossOrigin;
    fetchPriority?: 'high' | 'low' | 'auto';
    fetchpriority?: 'high' | 'low' | 'auto';
    href?: string | undefined;
    hrefLang?: string | undefined;
    hreflang?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imageSrcSet?: string | undefined;
    imagesrcset?: string | undefined;
    imageSizes?: string | undefined;
    imagesizes?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charSet?: string | undefined;
    charset?: string | undefined;
  }
  export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
  }
  export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string | undefined;
  }
  export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean | undefined;
    autoplay?: boolean | undefined;
    controls?: boolean | undefined;
    controlsList?: string | undefined;
    controlslist?: string | undefined;
    crossOrigin?: CrossOrigin;
    crossorigin?: CrossOrigin;
    loop?: boolean | undefined;
    mediaGroup?: string | undefined;
    mediagroup?: string | undefined;
    muted?: boolean | undefined;
    playsInline?: boolean | undefined;
    playsinline?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
  }
  export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string | undefined;
    charset?: string | undefined;
    content?: string | undefined;
    httpEquiv?: string | undefined;
    media?: string | undefined;
    name?: string | undefined;
  }
  export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    high?: number | undefined;
    low?: number | undefined;
    max?: number | string | undefined;
    min?: number | string | undefined;
    optimum?: number | undefined;
    value?: string | readonly string[] | number | undefined;
  }
  export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
  }
  export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean | undefined;
    start?: number | undefined;
    type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
  }
  export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
  }
  export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string | readonly string[] | number | undefined;
  }
  export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    htmlFor?: string | undefined;
    for?: string | undefined;
    name?: string | undefined;
  }
  export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
    value?: string | readonly string[] | number | undefined;
  }
  export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string | undefined;
    value?: string | readonly string[] | number | undefined;
  }
  export interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
  }
  export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean | undefined;
    /** @deprecated */
    charSet?: string | undefined;
    charset?: string | undefined;
    crossOrigin?: CrossOrigin;
    crossorigin?: CrossOrigin;
    defer?: boolean | undefined;
    integrity?: string | undefined;
    noModule?: boolean | undefined;
    nomodule?: boolean | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    src?: string | undefined;
    type?: string | undefined;
  }
  export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    value?: string | readonly string[] | number | undefined;
    onChange?: ChangeEventHandler<T> | undefined;
    onchange?: ChangeEventHandler<T> | undefined;
  }
  export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string | undefined;
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
  }
  export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string | undefined;
    scoped?: boolean | undefined;
    type?: string | undefined;
  }
  export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
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
    rows?: string | number | undefined;
    value?: string | readonly string[] | number | undefined;
    wrap?: string | undefined;
    onChange?: ChangeEventHandler<T> | undefined;
    onchange?: ChangeEventHandler<T> | undefined;
  }
  export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;
    colSpan?: number | undefined;
    headers?: string | undefined;
    rowSpan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
  }
  export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string | undefined;
  }
  export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srcLang?: string | undefined;
  }
  export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    width?: number | string | undefined;
    disablePictureInPicture?: boolean | undefined;
    disableRemotePlayback?: boolean | undefined;
  }
  export interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
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
    'xmlns:xlink'?: string | undefined;
    xmlSpace?: string | undefined;
    'xml:space'?: string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
    y?: number | string | undefined;
    yChannelSelector?: string | undefined;
    z?: number | string | undefined;
    zoomAndPan?: string | undefined;
  }
  export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
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
  export interface ReblendHTML {
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
    body: DetailedHTMLFactory<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
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
    del: DetailedHTMLFactory<DelHTMLAttributes<HTMLModElement>, HTMLModElement>;
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
    dl: DetailedHTMLFactory<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
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
    ins: DetailedHTMLFactory<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
    kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    keygen: DetailedHTMLFactory<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
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
    map: DetailedHTMLFactory<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
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
    span: DetailedHTMLFactory<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
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
    ul: DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
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
  export interface ReblendSVG {
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
  export interface ReblendDOM extends ReblendHTML, ReblendSVG {}
  export interface AbstractView {
    styleMedia: StyleMedia;
    document: Document;
  }
  export interface Touch {
    identifier: number;
    target: EventTarget;
    screenX: number;
    screenY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
  }
  export interface TouchList {
    [index: number]: Touch;
    length: number;
    item(index: number): Touch;
    identifiedTouch(identifier: number): Touch;
  }
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
