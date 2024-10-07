import { useContext } from 'reblendjs';
import { Params } from '../contexts/params';

//@ReblendHook
export function useParams() {
  const [params] = useContext(Params);
  return params;
}
