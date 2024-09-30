import { useContext } from 'reblendjs';
import { Params } from '../contexts/params';

//@ReblendHook
export function useParams() {
  const [paramsContext] = useContext(Params);
  return paramsContext;
}
