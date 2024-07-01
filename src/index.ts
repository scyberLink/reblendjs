import Reblend from "./internal/Reblend";
import ShadowMode from "./internal/ShadowMode";
import IAny from "./interface/IAny";
import IPair from "./interface/IPair";
import IStyle from "./interface/IStyle";
import md5 from "./common/md5";
import * as utils from "./common/utils";
import { StateFunction, SingleState } from "./internal/BaseComponent";
import SharedConfig from "./common/SharedConfig";
import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "./internal/hooks";

export namespace JSX {
  type ElementType = ReblendTyping.JSX.ElementType;
  interface Element extends ReblendTyping.JSX.Element {}
  interface ElementClass extends ReblendTyping.JSX.ElementClass {}
  interface ElementAttributesProperty
    extends ReblendTyping.JSX.ElementAttributesProperty {}
  interface ElementChildrenAttribute
    extends ReblendTyping.JSX.ElementChildrenAttribute {}
  type LibraryManagedAttributes<C, P> =
    ReblendTyping.JSX.LibraryManagedAttributes<C, P>;
  interface IntrinsicAttributes extends ReblendTyping.JSX.IntrinsicAttributes {}
  interface IntrinsicClassAttributes<T>
    extends ReblendTyping.JSX.IntrinsicClassAttributes<T> {}
  interface IntrinsicElements extends ReblendTyping.JSX.IntrinsicElements {}
}

export default Reblend;

export {
  ShadowMode,
  IAny,
  IPair,
  IStyle,
  md5,
  utils,
  StateFunction,
  SingleState,
  SharedConfig,
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
};
