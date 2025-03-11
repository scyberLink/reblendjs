/**
 * A map of attribute keys to their corresponding standard HTML attribute names, default values,
 * or React-specific properties. The object supports various attribute types such as standard
 * HTML attributes, RDFa attributes, microdata attributes, React-specific attributes, and more.
 *
 * - If the value is a string, it represents the corresponding HTML attribute name.
 * - If the value is `null`, the attribute does not map to an HTML attribute (e.g., React-specific attributes like `children`).
 * - If the value is an object, it represents an attribute with a custom name that should be used for the corresponding property (e.g., `dangerouslySetInnerHTML` maps to the `innerHTML` property).
 *
 * @type {Record<string, string | null | { name: string }>}
 */
export const allAttribute: Record<string, string | null | { name: string }> = {
  // Standard HTML attributes
  accept: 'accept',
  acceptCharset: 'accept-charset',
  accessKey: 'accesskey',
  action: 'action',
  allowFullScreen: 'allowfullscreen',
  allowTransparency: 'allowtransparency',
  alt: 'alt',
  async: 'async',
  autoComplete: 'autocomplete',
  autoFocus: 'autofocus',
  autoPlay: 'autoplay',
  capture: 'capture',
  cellPadding: 'cellpadding',
  cellSpacing: 'cellspacing',
  charSet: 'charset',
  checked: 'checked',
  cite: 'cite',
  class: 'class',
  classID: 'classid',
  cols: 'cols',
  colSpan: 'colspan',
  contentEditable: 'contenteditable',
  contextMenu: 'contextmenu',
  controls: 'controls',
  coords: 'coords',
  crossOrigin: 'crossorigin',
  data: 'data',
  dateTime: 'datetime',
  default: 'default',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  encType: 'enctype',
  form: 'form',
  formAction: 'formaction',
  formEncType: 'formenctype',
  formMethod: 'formmethod',
  formNoValidate: 'formnovalidate',
  formTarget: 'formtarget',
  frameBorder: 'frameborder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hrefLang: 'hreflang',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  id: 'id',
  inputMode: 'inputmode',
  integrity: 'integrity',
  is: 'is',
  keyParams: 'keyparams',
  keyType: 'keytype',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginHeight: 'marginheight',
  marginWidth: 'marginwidth',
  max: 'max',
  maxLength: 'maxlength',
  media: 'media',
  mediaGroup: 'mediagroup',
  method: 'method',
  min: 'min',
  minLength: 'minlength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  noValidate: 'novalidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsInline: 'playsinline',
  poster: 'poster',
  preload: 'preload',
  radioGroup: 'radiogroup',
  readOnly: 'readonly',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowSpan: 'rowspan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  slot: 'slot',
  span: 'span',
  spellCheck: 'spellcheck',
  src: 'src',
  srcDoc: 'srcdoc',
  srcLang: 'srclang',
  srcSet: 'srcset',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabIndex: 'tabindex',
  target: 'target',
  title: 'title',
  translate: 'translate',
  type: 'type',
  useMap: 'usemap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
  /**
   * A map of attribute keys to their corresponding standard HTML attribute names, default values,
   * or React-specific properties. The object supports various attribute types such as standard
   * HTML attributes, RDFa attributes, microdata attributes, React-specific attributes, and more.
   *
   * - If the value is a string, it represents the corresponding HTML attribute name.
   * - If the value is `null`, the attribute does not map to an HTML attribute (e.g., React-specific attributes like `children`).
   * - If the value is an object, it represents an attribute with a custom name that should be used for the corresponding property (e.g., `dangerouslySetInnerHTML` maps to the `innerHTML` property).
   *
   * @type {Record<string, string | null | { name: string }>}
   */

  // Referrer policy attributes
  referrerPolicy: 'referrerpolicy',

  // Default values
  defaultChecked: 'checked',
  defaultValue: 'value',

  // Suppressions
  suppressContentEditableWarning: 'suppresscontenteditablewarning',
  suppressHydrationWarning: 'suppresshydrationwarning',

  // RDFa attributes
  about: 'about',
  datatype: 'datatype',
  inlist: 'inlist',
  prefix: 'prefix',
  property: 'property',
  resource: 'resource',
  typeof: 'typeof',
  vocab: 'vocab',

  // Microdata attributes
  itemProp: 'itemprop',
  itemScope: 'itemscope',
  itemType: 'itemtype',
  itemID: 'itemid',
  itemRef: 'itemref',

  // Other attributes
  autoCapitalize: 'autocapitalize',
  autoCorrect: 'autocorrect',
  autoSave: 'autosave',
  color: 'color',
  results: 'results',
  security: 'security',
  unselectable: 'unselectable',

  // React-specific attributes
  className: 'class',
  dangerouslySetInnerHTML: { name: 'innerHTML' },
  children: null,

  // Event attributes (React-specific camelCase and standard HTML lowercase)
  onCopy: 'oncopy',
  oncopy: 'oncopy',
  onCut: 'oncut',
  oncut: 'oncut',
  onPaste: 'onpaste',
  onpaste: 'onpaste',
  onCompositionEnd: 'oncompositionend',
  oncompositionend: 'oncompositionend',
  onCompositionStart: 'oncompositionstart',
  oncompositionstart: 'oncompositionstart',
  onCompositionUpdate: 'oncompositionupdate',
  oncompositionupdate: 'oncompositionupdate',
  onFocus: 'onfocus',
  onfocus: 'onfocus',
  onBlur: 'onblur',
  onblur: 'onblur',
  onChange: 'onchange',
  onchange: 'onchange',
  onInput: 'oninput',
  oninput: 'oninput',
  onReset: 'onreset',
  onreset: 'onreset',
  onSubmit: 'onsubmit',
  onsubmit: 'onsubmit',
  onInvalid: 'oninvalid',
  oninvalid: 'oninvalid',
  onLoad: 'onload',
  onload: 'onload',
  onError: 'onerror',
  onerror: 'onerror',
  onKeyDown: 'onkeydown',
  onkeydown: 'onkeydown',
  onKeyPress: 'onkeypress',
  onkeypress: 'onkeypress',
  onKeyUp: 'onkeyup',
  onkeyup: 'onkeyup',
  onAbort: 'onabort',
  onabort: 'onabort',
  onCanPlay: 'oncanplay',
  oncanplay: 'oncanplay',
  onCanPlayThrough: 'oncanplaythrough',
  oncanplaythrough: 'oncanplaythrough',
  onDurationChange: 'ondurationchange',
  ondurationchange: 'ondurationchange',
  onEmptied: 'onemptied',
  onemptied: 'onemptied',
  onEncrypted: 'onencrypted',
  onencrypted: 'onencrypted',
  onEnded: 'onended',
  onended: 'onended',
  onLoadedData: 'onloadeddata',
  onloadeddata: 'onloadeddata',
  onLoadedMetadata: 'onloadedmetadata',
  onloadedmetadata: 'onloadedmetadata',
  onLoadStart: 'onloadstart',
  onloadstart: 'onloadstart',
  onPause: 'onpause',
  onpause: 'onpause',
  onPlay: 'onplay',
  onplay: 'onplay',
  onPlaying: 'onplaying',
  onplaying: 'onplaying',
  onProgress: 'onprogress',
  onprogress: 'onprogress',
  onRateChange: 'onratechange',
  onratechange: 'onratechange',
  onSeeked: 'onseeked',
  onseeked: 'onseeked',
  onSeeking: 'onseeking',
  onseeking: 'onseeking',
  onStalled: 'onstalled',
  onstalled: 'onstalled',
  onSuspend: 'onsuspend',
  onsuspend: 'onsuspend',
  onTimeUpdate: 'ontimeupdate',
  ontimeupdate: 'ontimeupdate',
  onVolumeChange: 'onvolumechange',
  onvolumechange: 'onvolumechange',
  onWaiting: 'onwaiting',
  onwaiting: 'onwaiting',
  onAuxClick: 'onauxclick',
  onauxclick: 'onauxclick',
  onClick: 'onclick',
  onclick: 'onclick',
  onContextMenu: 'oncontextmenu',
  oncontextmenu: 'oncontextmenu',
  onDoubleClick: 'ondoubleclick',
  ondoubleclick: 'ondoubleclick',
  onDrag: 'ondrag',
  ondrag: 'ondrag',
  onDragEnd: 'ondragend',
  ondragend: 'ondragend',
  onDragEnter: 'ondragenter',
  ondragenter: 'ondragenter',
  onDragExit: 'ondragexit',
  ondragexit: 'ondragexit',
  onDragLeave: 'ondragleave',
  ondragleave: 'ondragleave',
  onDragOver: 'ondragover',
  ondragover: 'ondragover',
  onDragStart: 'ondragstart',
  ondragstart: 'ondragstart',
  onDrop: 'ondrop',
  ondrop: 'ondrop',
  onMouseDown: 'onmousedown',
  onmousedown: 'onmousedown',
  onMouseEnter: 'onmouseenter',
  onmouseenter: 'onmouseenter',
  onMouseLeave: 'onmouseleave',
  onmouseleave: 'onmouseleave',
  onMouseMove: 'onmousemove',
  onmousemove: 'onmousemove',
  onMouseOut: 'onmouseout',
  onmouseout: 'onmouseout',
  onMouseOver: 'onmouseover',
  onmouseover: 'onmouseover',
  onMouseUp: 'onmouseup',
  onmouseup: 'onmouseup',
  onSelect: 'onselect',
  onselect: 'onselect',
  onTouchCancel: 'ontouchcancel',
  ontouchcancel: 'ontouchcancel',
  onTouchEnd: 'ontouchend',
  ontouchend: 'ontouchend',
  onTouchMove: 'ontouchmove',
  ontouchmove: 'ontouchmove',
  onTouchStart: 'ontouchstart',
  ontouchstart: 'ontouchstart',
  onPointerDown: 'onpointerdown',
  onpointerdown: 'onpointerdown',
  onPointerMove: 'onpointermove',
  onpointermove: 'onpointermove',
  onPointerUp: 'onpointerup',
  onpointerup: 'onpointerup',
  onPointerCancel: 'onpointercancel',
  onpointercancel: 'onpointercancel',
  onPointerEnter: 'onpointerenter',
  onpointerenter: 'onpointerenter',
  onPointerLeave: 'onpointerleave',
  onpointerleave: 'onpointerleave',
  onPointerOver: 'onpointerover',
  onpointerover: 'onpointerover',
  onPointerOut: 'onpointerout',
  onpointerout: 'onpointerout',
  onGotPointerCapture: 'ongotpointercapture',
  ongotpointercapture: 'ongotpointercapture',
  onLostPointerCapture: 'onlostpointercapture',
  onlostpointercapture: 'onlostpointercapture',
  onScroll: 'onscroll',
  onscroll: 'onscroll',
  onWheel: 'onwheel',
  onwheel: 'onwheel',
  onAnimationStart: 'onanimationstart',
  onanimationstart: 'onanimationstart',
  onAnimationEnd: 'onanimationend',
  onanimationend: 'onanimationend',
  onAnimationIteration: 'onanimationiteration',
  onanimationiteration: 'onanimationiteration',
  onTransitionEnd: 'ontransitionend',
  ontransitionend: 'ontransitionend',
  onAbortCapture: 'onabortcapture',
  onCanPlayCapture: 'oncanplaycapture',
  onCanPlayThroughCapture: 'oncanplaythroughcapture',
  onDurationChangeCapture: 'ondurationchangecapture',
  onEmptiedCapture: 'onemptiedcapture',
  onEncryptedCapture: 'onencryptedcapture',
  onEndedCapture: 'onendedcapture',
  onLoadedDataCapture: 'onloadeddatacapture',
  onLoadedMetadataCapture: 'onloadedmetadatacapture',
  onLoadStartCapture: 'onloadstartcapture',
  onPauseCapture: 'onpausecapture',
  onPlayCapture: 'onplaycapture',
  onPlayingCapture: 'onplayingcapture',
  onProgressCapture: 'onprogresscapture',
  onRateChangeCapture: 'onratechangecapture',
  onSeekedCapture: 'onseekedcapture',
  onSeekingCapture: 'onseekingcapture',
  onStalledCapture: 'onstalledcapture',
  onSuspendCapture: 'onsuspendcapture',
  onTimeUpdateCapture: 'ontimeupdatecapture',
  onVolumeChangeCapture: 'onvolumechangecapture',
  onWaitingCapture: 'onwaitingcapture',
  onAuxClickCapture: 'onauxclickcapture',
  onClickCapture: 'onclickcapture',
  onContextMenuCapture: 'oncontextmenucapture',
  onDoubleClickCapture: 'ondoubleclickcapture',
  onDragCapture: 'ondragcapture',
  onDragEndCapture: 'ondragendcapture',
  onDragEnterCapture: 'ondragentercapture',
  onDragExitCapture: 'ondragexitcapture',
  onDragLeaveCapture: 'ondragleavecapture',
  onDragOverCapture: 'ondragovercapture',
  onDragStartCapture: 'ondragstartcapture',
  onDropCapture: 'ondropcapture',
  onMouseDownCapture: 'onmousedowncapture',
  onMouseEnterCapture: 'onmouseentercapture',
  onMouseLeaveCapture: 'onmouseleavecapture',
  onMouseMoveCapture: 'onmousemovecapture',
  onMouseOutCapture: 'onmouseoutcapture',
  onMouseOverCapture: 'onmouseovercapture',
  onMouseUpCapture: 'onmouseupcapture',
  onSelectCapture: 'onselectcapture',
  onTouchCancelCapture: 'ontouchcancelcapture',
  onTouchEndCapture: 'ontouchendcapture',
  onTouchMoveCapture: 'ontouchmovecapture',
  onTouchStartCapture: 'ontouchstartcapture',
  onPointerDownCapture: 'onpointerdowncapture',
  onPointerMoveCapture: 'onpointermovecapture',
  onPointerUpCapture: 'onpointerupcapture',
  onPointerCancelCapture: 'onpointercancelcapture',
  onPointerEnterCapture: 'onpointerentercapture',
  onPointerLeaveCapture: 'onpointerleavecapture',
  onPointerOverCapture: 'onpointerovercapture',
  onPointerOutCapture: 'onpointeroutcapture',
  onGotPointerCaptureCapture: 'ongotpointercapturecapture',
  onLostPointerCaptureCapture: 'onlostpointercapturecapture',
  onScrollCapture: 'onscrollcapture',
  onWheelCapture: 'onwheelcapture',
  onAnimationStartCapture: 'onanimationstartcapture',
  onAnimationEndCapture: 'onanimationendcapture',
  onAnimationIterationCapture: 'onanimationiterationcapture',
  onTransitionEndCapture: 'ontransitionendcapture',

  // SVG attributes
  accentHeight: 'accent-height',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentBaseline: 'alignment-baseline',
  allowReorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicForm: 'arabic-form',
  ascent: 'ascent',
  attributeName: 'attributeName',
  attributeType: 'attributeType',
  autoReverse: 'autoReverse',
  azimuth: 'azimuth',
  baseFrequency: 'baseFrequency',
  baselineShift: 'baseline-shift',
  baseProfile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcMode: 'calcMode',
  capHeight: 'cap-height',
  clip: 'clip',
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  contentScriptType: 'contentScriptType',
  contentStyleType: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseConstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantBaseline: 'dominant-baseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgeMode: 'edgeMode',
  elevation: 'elevation',
  enableBackground: 'enable-background',
  end: 'end',
  exponent: 'exponent',
  externalResourcesRequired: 'externalResourcesRequired',
  fill: 'fill',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 'filter',
  filterRes: 'filterRes',
  filterUnits: 'filterUnits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  focusable: 'focusable',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphRef',
  gradientTransform: 'gradientTransform',
  gradientUnits: 'gradientUnits',
  hanging: 'hanging',
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  ideographic: 'ideographic',
  imageRendering: 'image-rendering',
  in2: 'in2',
  in: 'in',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelMatrix: 'kernelMatrix',
  kernelUnitLength: 'kernelUnitLength',
  kerning: 'kerning',
  keyPoints: 'keyPoints',
  keySplines: 'keySplines',
  keyTimes: 'keyTimes',
  lengthAdjust: 'lengthAdjust',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  limitingConeAngle: 'limitingConeAngle',
  local: 'local',
  markerEnd: 'marker-end',
  markerHeight: 'markerHeight',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerUnits: 'markerUnits',
  markerWidth: 'markerWidth',
  mask: 'mask',
  maskContentUnits: 'maskContentUnits',
  maskUnits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numOctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  paintOrder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathLength',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  patternUnits: 'patternUnits',
  pointerEvents: 'pointer-events',
  points: 'points',
  pointsAtX: 'pointsAtX',
  pointsAtY: 'pointsAtY',
  pointsAtZ: 'pointsAtZ',
  preserveAlpha: 'preserveAlpha',
  preserveAspectRatio: 'preserveAspectRatio',
  primitiveUnits: 'primitiveUnits',
  r: 'r',
  radius: 'radius',
  refX: 'refX',
  refY: 'refY',
  renderingIntent: 'rendering-intent',
  repeatCount: 'repeatCount',
  repeatDur: 'repeatDur',
  requiredExtensions: 'requiredExtensions',
  requiredFeatures: 'requiredFeatures',
  restart: 'restart',
  result: 'result',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  seed: 'seed',
  shapeRendering: 'shape-rendering',
  slope: 'slope',
  spacing: 'spacing',
  specularConstant: 'specularConstant',
  specularExponent: 'specularExponent',
  speed: 'speed',
  spreadMethod: 'spreadMethod',
  startOffset: 'startOffset',
  stdDeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchTiles: 'stitchTiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  string: 'string',
  stroke: 'stroke',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  surfaceScale: 'surfaceScale',
  systemLanguage: 'systemLanguage',
  tableValues: 'tableValues',
  targetX: 'targetX',
  targetY: 'targetY',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  textLength: 'textLength',
  to: 'to',
  transform: 'transform',
  u1: 'u1',
  u2: 'u2',
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  unicode: 'unicode',
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  vAlphabetic: 'v-alphabetic',
  values: 'values',
  vectorEffect: 'vector-effect',
  version: 'version',
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  viewBox: 'viewBox',
  viewTarget: 'viewTarget',
  visibility: 'visibility',
  vMathematical: 'v-mathematical',
  widths: 'widths',
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  x: 'x',
  xHeight: 'x-height',
  x1: 'x1',
  x2: 'x2',
  xChannelSelector: 'xChannelSelector',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xmlBase: 'xml:base',
  xmlLang: 'xml:lang',
  xmlns: 'xmlns',
  xmlnsXlink: 'xmlns:xlink',
  xmlSpace: 'xml:space',
  y: 'y',
  y1: 'y1',
  y2: 'y2',
  yChannelSelector: 'yChannelSelector',
  z: 'z',
  zoomAndPan: 'zoomAndPan',
};

/**
 * A list of attributes that have corresponding properties and should not use `setAttribute`.
 * Instead, these attributes should directly manipulate the corresponding property on the element.
 */
const attributesWithDirectProperties = [
  'value',
  'checked',
  'selected',
  'disabled',
];

/**
 * Determines whether to use `setAttribute` for a given attribute key.
 *
 * @param {string} key - The attribute key to check.
 * @returns {boolean} - Returns true if `setAttribute` should be used, false if the direct property should be accessed.
 */
export const shouldUseSetAttribute = (key: string): boolean => {
  if (key.includes(':') || key.includes('data-')) {
    return true;
  }
  const attribute = allAttribute[key];

  // Handle cases where we should use direct property access
  if (
    !attribute ||
    attribute instanceof Object ||
    attribute.startsWith('on') ||
    attribute.startsWith('aria') ||
    attributesWithDirectProperties.includes(key)
  ) {
    return false;
  }

  return true;
};

/**
 * Returns the correct attribute name for a given key.
 *
 * @param {string} key - The key to be transformed into an attribute name.
 * @returns {string} - The corresponding attribute name.
 */
export const attributeName = (key: string): string => {
  const attribute = allAttribute[key];

  if (attribute === undefined) {
    return key;
  }

  if (attribute instanceof Object) {
    return attribute?.name || key;
  }

  if (attribute === null || attribute.startsWith('aria-')) {
    return key;
  } else if (attribute.startsWith('on')) {
    return key.toLowerCase();
  } else {
    return attribute;
  }
};
