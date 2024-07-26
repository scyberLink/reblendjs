type ElementStyles = {
  [elementQuerySelector: string]: CSSStyleDeclaration;
};
declare class StyleUtil {
  static instance: StyleUtil;
  elementStyles: ElementStyles;
  styleElement: HTMLStyleElement;
  constructor();
  init(): void;
  update(
    elementQuerySelector: string,
    style: CSSStyleDeclaration | string
  ): void;
  remove(elementQuerySelector: string, styleKey: string): void;
  refresh(): void;
}
declare const _default: StyleUtil;
export default _default;
