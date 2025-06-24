import * as Reblend from 'reblendjs';

export type EventKey = string | number;

export type IntrinsicElementTypes = keyof Reblend.JSX.IntrinsicElements;

export type AssignPropsWithRef<
  Inner extends string | Reblend.ComponentType<any>,
  P,
> = Omit<
  Reblend.ComponentPropsWithRef<Inner extends Reblend.ElementType ? Inner : never>,
  keyof P
> &
  P;

export type { AssignPropsWithRef as AssignProps };

export type AssignPropsWithoutRef<
  Inner extends string | Reblend.ComponentType<any>,
  P,
> = Omit<
  Reblend.ComponentPropsWithoutRef<
    Inner extends Reblend.ElementType ? Inner : never
  >,
  keyof P
> &
  P;

export interface DynamicRefForwardingComponent<
  TInitial extends string | Reblend.ComponentType<any>,
  P = { children?: Reblend.ReactNode },
> {
  <As extends string | Reblend.ComponentType<any> = TInitial>(
    props: AssignPropsWithRef<As, { as?: As } & P>,
    context?: any,
  ): Reblend.ReactNode;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export interface DynamicFunctionComponent<
  TInitial extends string | Reblend.ComponentType<any>,
  P = { children?: Reblend.ReactNode },
> {
  <As extends string | Reblend.ComponentType<any> = TInitial>(
    props: AssignPropsWithoutRef<As, { as?: As } & P>,
    context?: any,
  ): Reblend.ReactNode;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export class DynamicComponent<
  As extends string | Reblend.ComponentType<any>,
  P = unknown,
> extends Reblend.Component<AssignPropsWithRef<As, { as?: As } & P>> {}

// Need to use this instead of typeof Component to get proper type checking.
export type DynamicComponentClass<
  As extends string | Reblend.ComponentType<any>,
  P = unknown,
> = Reblend.ComponentClass<AssignPropsWithRef<As, { as?: As } & P>>;

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
  children: Reblend.ReactElement<any>;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export type TransitionComponent = Reblend.ComponentType<TransitionProps>;
