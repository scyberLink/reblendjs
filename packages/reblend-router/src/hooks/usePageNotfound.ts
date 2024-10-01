import { useContext } from 'reblendjs';
import { PageNotfound } from '../contexts/routes';

//@ReblendHook
export function usePageNotfound() {
  const [pageNotfoundContext] = useContext(PageNotfound);
  return pageNotfoundContext;
}
