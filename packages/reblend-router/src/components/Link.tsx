import Reblend from 'reblendjs';
import { setHistory } from '../contexts/history';
import { ReblendTyping } from 'reblend-typing';

export interface LinkProps {
  to?: string;
  href?: string;
  children: any;
  memory?: boolean;
  className?: string;
  class?: string;
  ref?: ReblendTyping.Ref<HTMLAnchorElement | null>;
  style?: ReblendTyping.CSSProperties;
  onclick:
    | ReblendTyping.DOMAttributes<HTMLAnchorElement>['onclick']
    | undefined;
  onClick:
    | ReblendTyping.DOMAttributes<HTMLAnchorElement>['onClick']
    | undefined;
}

function Link(props: LinkProps) {
  async function onclick(e: any) {
    e.preventDefault();
    setHistory(props.to || props.href || '#', props.memory);
  }

  return (
    <a
      href={props.to || props.href || '#'}
      onClick={props.onclick || props.onClick || onclick}
      class={props.class || props.className || ''}
      ref={props.ref as any}
      style={props.style}
    >
      {props.children}
    </a>
  );
}

export { Link };
