import Reblend from 'reblendjs';
import { setHistory } from '../contexts/history';

export interface LinkProps {
  to?: string;
  href?: string;
  children: any;
  memory?: boolean;
  className?: string;
  class?: string;
  ref?: Reblend.Ref<HTMLAnchorElement | null>;
  style?: Reblend.CSSProperties;
  onclick?: Reblend.DOMAttributes<HTMLAnchorElement>['onclick'] | undefined;
  onClick?: Reblend.DOMAttributes<HTMLAnchorElement>['onClick'] | undefined;
}

function Link(props: LinkProps) {
  async function onclick(e: any) {
    e.preventDefault();
    setHistory(props.to || props.href || '#', props.memory);
  }

  return (
    <a
      href={props.to || props.href || '#'}
      onClick={e => {
        try {
          if (props.onclick) {
            props.onclick(e);
          }
          if (props.onClick) {
            props.onClick(e);
          }
        } catch (e) {}
        if (!e.defaultPrevented) {
          onclick(e);
        }
      }}
      class={props.class || props.className || ''}
      ref={props.ref as any}
      style={props.style}
    >
      {props.children}
    </a>
  );
}

export { Link };
