import Reblend, { ReblendElement, ReblendNode } from 'reblendjs';

export function isEscKey(e: KeyboardEvent) {
  return e.code === 'Escape' || e.keyCode === 27;
}

export function getReblendVersion() {
  const parts = Reblend.version.split('.');
  return {
    major: +parts[0],
    minor: +parts[1],
    patch: +parts[2],
  };
}

export function getChildRef(
  element?: ReblendElement | ((...args: any[]) => ReblendNode) | null,
): Reblend.Ref<any> | null {
  if (!element || typeof element === 'function') {
    return null;
  }
  const childRef = ((element as any).props as any).ref;
  return childRef;
}
