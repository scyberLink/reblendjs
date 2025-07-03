import Reblend, { ReblendElement } from 'reblendjs';

export type EventKey = string | number;

export type IntrinsicElementTypes = keyof Reblend.JSX.IntrinsicElements;

export interface DynamicComponent<
  TInitial extends string | Reblend.ComponentType<any>,
  P = { children?: Reblend.ReactNode },
> {
  <As extends string | Reblend.ComponentType<any> = TInitial>(
    props: { as?: As } & P,
  ): Reblend.ReactNode;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export interface DynamicFunctionComponent<
  TInitial extends string | Reblend.ComponentType<any>,
  P = { children?: Reblend.ReactNode },
> {
  <As extends string | Reblend.ComponentType<any> = TInitial>(
    props: { as?: As } & P,
  ): Reblend.ReactNode;
  defaultProps?: Partial<P>;
  displayName?: string;
}

// Need to use this instead of typeof Component to get proper type checking.
export type DynamicComponentClass<
  As extends string | Reblend.ComponentType<any>,
  P = unknown,
> = Reblend.ComponentClass<{ as?: As } & P>;

export type SelectCallback = (
  eventKey: string | null,
  e: Reblend.SyntheticEvent<any>,
) => void;

export interface TransitionCallbacks {
  /**
   * Callback fired before the component transitions in
   */
  onEnter?(node: HTMLElement, isAppearing: boolean): any;
  /**
   * Callback fired as the component begins to transition in
   */
  onEntering?(node: HTMLElement, isAppearing: boolean): any;
  /**
   * Callback fired after the component finishes transitioning in
   */
  onEntered?(node: HTMLElement, isAppearing: boolean): any;
  /**
   * Callback fired right before the component transitions out
   */
  onExit?(node: HTMLElement): any;
  /**
   * Callback fired as the component begins to transition out
   */
  onExiting?(node: HTMLElement): any;
  /**
   * Callback fired after the component finishes transitioning out
   */
  onExited?(node: HTMLElement): any;
}

export interface TransitionProps extends TransitionCallbacks {
  in?: boolean;
  appear?: boolean;
  children: ReblendElement;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export type TransitionComponent = Reblend.ComponentType<TransitionProps>;
