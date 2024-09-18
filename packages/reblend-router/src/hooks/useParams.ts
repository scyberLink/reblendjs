import { useContext } from 'reblendjs';
import { Params } from '../contexts/params';

//@reblendcustomhook
export function useParams() {
  const [paramsContext] = useContext(Params);
  return paramsContext;
}
