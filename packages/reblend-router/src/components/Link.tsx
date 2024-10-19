import Reblend from 'reblendjs';
import { setHistory } from '../contexts/history';
import { ReblendTyping } from '../../../reblend-typing/lib';

function Link({
  to,
  href,
  children,
  memory = false,
  className,
  ref,
}: {
  to?: string;
  href?: string;
  children: any;
  memory?: boolean;
  className?: string;
  ref?: ReblendTyping.Ref<HTMLAnchorElement | null>;
}) {
  async function onclick(e: any) {
    e.preventDefault();
    setHistory(to || href || '#', memory);
  }

  return (
    <a
      href={to || href || '#'}
      onClick={onclick}
      class={className || ''}
      ref={ref as any}
    >
      {children}
    </a>
  );
}

export { Link };
