import { registerElement } from '../common/utils';
import BaseComponent from './BaseComponent';
import { ReblendTyping } from 'reblend-typing';

declare global {
  /**
   * @deprecated Use `Reblend.JSX` instead of the global `JSX` namespace.
   */
  namespace JSX {
    type ElementType = string | ReblendTyping.JSXElementConstructor<any>;
    interface Element extends ReblendTyping.ReblendElement {}
    interface ElementClass extends ReblendTyping.Component<any> {
      html(): ReblendTyping.ReblendNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    type LibraryManagedAttributes<C, P> = C extends
      | ReblendTyping.MemoExoticComponent<infer T>
      | ReblendTyping.LazyExoticComponent<infer T>
      ? T extends
          | ReblendTyping.MemoExoticComponent<infer U>
          | ReblendTyping.LazyExoticComponent<infer U>
        ? //@ts-ignore
          ReblendManagedAttributes<U, P>
        : //@ts-ignore
          ReblendManagedAttributes<T, P>
      : //@ts-ignore
        ReblendManagedAttributes<C, P>;
    interface IntrinsicAttributes extends ReblendTyping.Attributes {}
    interface IntrinsicClassAttributes<T>
      extends ReblendTyping.ClassAttributes<T> {}
    interface IntrinsicElements {
      a: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >;
      abbr: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      address: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      area: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.AreaHTMLAttributes<HTMLAreaElement>,
        HTMLAreaElement
      >;
      article: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      aside: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      audio: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.AudioHTMLAttributes<HTMLAudioElement>,
        HTMLAudioElement
      >;
      b: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      base: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.BaseHTMLAttributes<HTMLBaseElement>,
        HTMLBaseElement
      >;
      bdi: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      bdo: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      big: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      blockquote: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >;
      body: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLBodyElement>,
        HTMLBodyElement
      >;
      br: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLBRElement>,
        HTMLBRElement
      >;
      button: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >;
      canvas: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.CanvasHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
      >;
      caption: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      center: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      cite: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      code: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      col: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ColHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      colgroup: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ColgroupHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      data: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.DataHTMLAttributes<HTMLDataElement>,
        HTMLDataElement
      >;
      datalist: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLDataListElement>,
        HTMLDataListElement
      >;
      dd: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      del: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.DelHTMLAttributes<HTMLModElement>,
        HTMLModElement
      >;
      details: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.DetailsHTMLAttributes<HTMLDetailsElement>,
        HTMLDetailsElement
      >;
      dfn: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      dialog: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.DialogHTMLAttributes<HTMLDialogElement>,
        HTMLDialogElement
      >;
      div: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >;
      dl: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLDListElement>,
        HTMLDListElement
      >;
      dt: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      em: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      embed: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.EmbedHTMLAttributes<HTMLEmbedElement>,
        HTMLEmbedElement
      >;
      fieldset: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.FieldsetHTMLAttributes<HTMLFieldSetElement>,
        HTMLFieldSetElement
      >;
      figcaption: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      figure: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      footer: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      form: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
      >;
      h1: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h2: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h3: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h4: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h5: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h6: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      head: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHeadElement>,
        HTMLHeadElement
      >;
      header: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      hgroup: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      hr: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLHRElement>,
        HTMLHRElement
      >;
      html: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HtmlHTMLAttributes<HTMLHtmlElement>,
        HTMLHtmlElement
      >;
      i: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      iframe: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.IframeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
      >;
      img: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >;
      input: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      ins: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.InsHTMLAttributes<HTMLModElement>,
        HTMLModElement
      >;
      kbd: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      keygen: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.KeygenHTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      label: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >;
      legend: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLLegendElement>,
        HTMLLegendElement
      >;
      li: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.LiHTMLAttributes<HTMLLIElement>,
        HTMLLIElement
      >;
      link: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.LinkHTMLAttributes<HTMLLinkElement>,
        HTMLLinkElement
      >;
      main: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      map: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.MapHTMLAttributes<HTMLMapElement>,
        HTMLMapElement
      >;
      mark: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      menu: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.MenuHTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      menuitem: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      meta: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
      >;
      meter: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.MeterHTMLAttributes<HTMLMeterElement>,
        HTMLMeterElement
      >;
      nav: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      noindex: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      noscript: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      object: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ObjectHTMLAttributes<HTMLObjectElement>,
        HTMLObjectElement
      >;
      ol: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.OlHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
      >;
      optgroup: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.OptgroupHTMLAttributes<HTMLOptGroupElement>,
        HTMLOptGroupElement
      >;
      option: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.OptionHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      >;
      output: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.OutputHTMLAttributes<HTMLOutputElement>,
        HTMLOutputElement
      >;
      p: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      param: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ParamHTMLAttributes<HTMLParamElement>,
        HTMLParamElement
      >;
      picture: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      pre: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLPreElement>,
        HTMLPreElement
      >;
      progress: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ProgressHTMLAttributes<HTMLProgressElement>,
        HTMLProgressElement
      >;
      q: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.QuoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >;
      rp: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      rt: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      ruby: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      s: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      samp: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      search: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      slot: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.SlotHTMLAttributes<HTMLSlotElement>,
        HTMLSlotElement
      >;
      script: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ScriptHTMLAttributes<HTMLScriptElement>,
        HTMLScriptElement
      >;
      section: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      select: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >;
      small: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      source: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.SourceHTMLAttributes<HTMLSourceElement>,
        HTMLSourceElement
      >;
      span: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
      strong: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      style: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.StyleHTMLAttributes<HTMLStyleElement>,
        HTMLStyleElement
      >;
      sub: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      summary: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      sup: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      table: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
      >;
      template: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTemplateElement>,
        HTMLTemplateElement
      >;
      tbody: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      td: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.TdHTMLAttributes<HTMLTableDataCellElement>,
        HTMLTableDataCellElement
      >;
      textarea: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      tfoot: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      th: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        HTMLTableHeaderCellElement
      >;
      thead: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      time: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.TimeHTMLAttributes<HTMLTimeElement>,
        HTMLTimeElement
      >;
      title: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTitleElement>,
        HTMLTitleElement
      >;
      tr: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >;
      track: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.TrackHTMLAttributes<HTMLTrackElement>,
        HTMLTrackElement
      >;
      u: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      ul: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >;
      var: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      video: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
      >;
      wbr: ReblendTyping.DetailedHTMLProps<
        ReblendTyping.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      webview: ReblendTyping.DetailedHTMLProps<
        //@ts-ignore
        ReblendTyping.WebViewHTMLAttributes<HTMLWebViewElement>,
        //@ts-ignore
        HTMLWebViewElement
      >;
      svg: ReblendTyping.SVGProps<SVGSVGElement>;
      animate: ReblendTyping.SVGProps<SVGElement>;
      animateMotion: ReblendTyping.SVGProps<SVGElement>;
      animateTransform: ReblendTyping.SVGProps<SVGElement>;
      circle: ReblendTyping.SVGProps<SVGCircleElement>;
      clipPath: ReblendTyping.SVGProps<SVGClipPathElement>;
      defs: ReblendTyping.SVGProps<SVGDefsElement>;
      desc: ReblendTyping.SVGProps<SVGDescElement>;
      ellipse: ReblendTyping.SVGProps<SVGEllipseElement>;
      feBlend: ReblendTyping.SVGProps<SVGFEBlendElement>;
      feColorMatrix: ReblendTyping.SVGProps<SVGFEColorMatrixElement>;
      feComponentTransfer: ReblendTyping.SVGProps<SVGFEComponentTransferElement>;
      feComposite: ReblendTyping.SVGProps<SVGFECompositeElement>;
      feConvolveMatrix: ReblendTyping.SVGProps<SVGFEConvolveMatrixElement>;
      feDiffuseLighting: ReblendTyping.SVGProps<SVGFEDiffuseLightingElement>;
      feDisplacementMap: ReblendTyping.SVGProps<SVGFEDisplacementMapElement>;
      feDistantLight: ReblendTyping.SVGProps<SVGFEDistantLightElement>;
      feDropShadow: ReblendTyping.SVGProps<SVGFEDropShadowElement>;
      feFlood: ReblendTyping.SVGProps<SVGFEFloodElement>;
      feFuncA: ReblendTyping.SVGProps<SVGFEFuncAElement>;
      feFuncB: ReblendTyping.SVGProps<SVGFEFuncBElement>;
      feFuncG: ReblendTyping.SVGProps<SVGFEFuncGElement>;
      feFuncR: ReblendTyping.SVGProps<SVGFEFuncRElement>;
      feGaussianBlur: ReblendTyping.SVGProps<SVGFEGaussianBlurElement>;
      feImage: ReblendTyping.SVGProps<SVGFEImageElement>;
      feMerge: ReblendTyping.SVGProps<SVGFEMergeElement>;
      feMergeNode: ReblendTyping.SVGProps<SVGFEMergeNodeElement>;
      feMorphology: ReblendTyping.SVGProps<SVGFEMorphologyElement>;
      feOffset: ReblendTyping.SVGProps<SVGFEOffsetElement>;
      fePointLight: ReblendTyping.SVGProps<SVGFEPointLightElement>;
      feSpecularLighting: ReblendTyping.SVGProps<SVGFESpecularLightingElement>;
      feSpotLight: ReblendTyping.SVGProps<SVGFESpotLightElement>;
      feTile: ReblendTyping.SVGProps<SVGFETileElement>;
      feTurbulence: ReblendTyping.SVGProps<SVGFETurbulenceElement>;
      filter: ReblendTyping.SVGProps<SVGFilterElement>;
      foreignObject: ReblendTyping.SVGProps<SVGForeignObjectElement>;
      g: ReblendTyping.SVGProps<SVGGElement>;
      image: ReblendTyping.SVGProps<SVGImageElement>;
      line: ReblendTyping.SVGLineElementAttributes<SVGLineElement>;
      linearGradient: ReblendTyping.SVGProps<SVGLinearGradientElement>;
      marker: ReblendTyping.SVGProps<SVGMarkerElement>;
      mask: ReblendTyping.SVGProps<SVGMaskElement>;
      metadata: ReblendTyping.SVGProps<SVGMetadataElement>;
      mpath: ReblendTyping.SVGProps<SVGElement>;
      path: ReblendTyping.SVGProps<SVGPathElement>;
      pattern: ReblendTyping.SVGProps<SVGPatternElement>;
      polygon: ReblendTyping.SVGProps<SVGPolygonElement>;
      polyline: ReblendTyping.SVGProps<SVGPolylineElement>;
      radialGradient: ReblendTyping.SVGProps<SVGRadialGradientElement>;
      rect: ReblendTyping.SVGProps<SVGRectElement>;
      set: ReblendTyping.SVGProps<SVGSetElement>;
      stop: ReblendTyping.SVGProps<SVGStopElement>;
      switch: ReblendTyping.SVGProps<SVGSwitchElement>;
      symbol: ReblendTyping.SVGProps<SVGSymbolElement>;
      text: ReblendTyping.SVGTextElementAttributes<SVGTextElement>;
      textPath: ReblendTyping.SVGProps<SVGTextPathElement>;
      tspan: ReblendTyping.SVGProps<SVGTSpanElement>;
      use: ReblendTyping.SVGProps<SVGUseElement>;
      view: ReblendTyping.SVGProps<SVGViewElement>;
    }
  }
}

class Reblend extends BaseComponent {
  static ELEMENT_NAME = 'Fragment';

  constructor() {
    super();
  }

  protected html() {
    return this.props.children;
  }
}

registerElement(`ReblendFragment`, Reblend);

export default Reblend;
