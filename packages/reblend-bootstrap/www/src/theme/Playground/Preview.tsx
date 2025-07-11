import * as Reblend from 'reblendjs';
import { useContext, useEffect, useRef, useState } from 'reblendjs';
import { LiveContext, LivePreview } from 'react-live';
import qsa from 'dom-helpers/querySelectorAll';

import useMutationObserver from 'reblend-hooks/useMutationObserver';
import { useEventCallback } from 'reblend-hooks';

export interface PreviewProps {
  className?: string | undefined;
}

const Preview: Reblend.FC<PreviewProps> = ({ className }) => {
  const exampleRef = useRef(null);
  const [hjs, setHjs] = useState(null);
  const live = useContext(LiveContext);

  useEffect(() => {
    import('holderjs').then(({ default: hjsModule }) => {
      hjsModule.addTheme('gray', {
        bg: '#373940',
        fg: '#999',
        fontweight: 'normal',
      });

      setHjs(hjsModule);
    });
  }, []);

  useIsomorphicEffect(() => {
    if (!hjs) {
      return;
    }

    hjs.run({
      theme: 'gray',
      images: qsa(exampleRef.current, 'img'),
    });
  }, [hjs, (live as any).element]);

  useMutationObserver(
    exampleRef.current,
    {
      childList: true,
      subtree: true,
    },
    (mutations) => {
      mutations.forEach((mutation) => {
        if (hjs && mutation.addedNodes.length > 0) {
          hjs.run({
            theme: 'gray',
            images: qsa(exampleRef.current, 'img'),
          });
        }
      });
    },
  );

  const handleCustomRedirect = useEventCallback(
    (e: Reblend.MouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).tagName === 'A') {
        e.preventDefault();
      }
    },
  );

  return (
    <div ref={exampleRef}>
      <LivePreview
        className={className}
        onClick={handleCustomRedirect}
        // @ts-expect-error missing TS type.
        Component="div"
      />
    </div>
  );
};

export default Preview;
