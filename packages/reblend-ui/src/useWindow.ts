import { createContext, useContext } from 'reblendjs';

const Context = createContext(
  typeof window !== 'undefined' ? window : undefined,
);

/**
 * The document "window" placed in React context. Helpful for determining
 * SSR context, or when rendering into an iframe.
 *
 * @returns the current window
 */
export default function useWindow() {
  const windowContext = useContext(Context);
  return windowContext;
}
