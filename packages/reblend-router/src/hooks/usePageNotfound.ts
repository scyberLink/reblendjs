import { useContext } from 'reblendjs';
import { PageNotfound } from '../contexts/routes';

//@reblendcustomhook
export function usePageNotfound() {
  const [pageNotfoundContext] = useContext(PageNotfound);
  return pageNotfoundContext;
}
