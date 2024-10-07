import { useContext } from 'reblendjs';
import { PageNotfound } from '../contexts/routes';

//@ReblendHook
export function usePageNotfound() {
  const [pageNotfound] = useContext(PageNotfound);
  return pageNotfound;
}
