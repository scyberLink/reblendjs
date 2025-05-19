import { useContext } from 'reblendjs';
import { PageNotfound } from '../contexts/notfound';

//@ReblendHook
export function usePageNotfound() {
  const [pageNotfound] = useContext(PageNotfound);
  return pageNotfound;
}
