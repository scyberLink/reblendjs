import Reblend from 'reblendjs';
import { setHistory } from '../contexts/history';
import { ReblendTyping } from 'reblend-typing';

interface LinkProps {
  to?: string;
  href?: string;
  children: any;
  memory?: boolean;
  className?: string;
  class?: string;
  ref?: ReblendTyping.Ref<HTMLAnchorElement | null>;
  style?: ReblendTyping.CSSProperties;
}

function Link(props: LinkProps) {
  async function onclick(e: any) {
    e.preventDefault();
    setHistory(props.to || props.href || '#', props.memory);
  }

  return (
    <a
      href={props.to || props.href || '#'}
      onClick={onclick}
      class={props.class || props.className || ''}
      ref={props.ref as any}
      style={props.style}
    >
      {props.children}
    </a>
  );
}

export { Link };
