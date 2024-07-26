import { cssObjectFromString, cssString } from '../common/utils';
class StyleUtil {
  static instance;
  elementStyles = {};
  styleElement;
  constructor() {
    if (StyleUtil.instance) {
      return StyleUtil.instance;
    } else {
      this.init();
      StyleUtil.instance = this;
    }
  }
  init() {
    this.styleElement = document.createElement('style');
    document.head.appendChild(this.styleElement);
  }
  update(elementQuerySelector, style) {
    if (!elementQuerySelector || !style) {
      throw new Error('Invalid query selector or style');
    }
    const styleObject =
      typeof style === 'string' ? cssObjectFromString(style) : style;
    this.elementStyles[elementQuerySelector] = {
      ...this.elementStyles[elementQuerySelector],
      ...styleObject,
    };
    this.refresh();
  }
  remove(elementQuerySelector, styleKey) {
    this.elementStyles[elementQuerySelector] &&
      delete this.elementStyles[elementQuerySelector][styleKey];
    this.refresh();
  }
  refresh() {
    const textContent = [];
    for (const [querySelector, elementStyle] of Object.entries(
      this.elementStyles
    )) {
      textContent.push(`${querySelector} {${cssString(elementStyle)}}\n\n`);
    }
    this.styleElement.textContent = textContent.join('');
  }
}
export default new StyleUtil();
