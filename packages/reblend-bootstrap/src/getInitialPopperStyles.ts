export default function getInitialPopperStyles(
  position: Reblend.CSSProperties['position'] = 'absolute',
): Partial<Reblend.CSSProperties> {
  return {
    position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none',
  };
}
