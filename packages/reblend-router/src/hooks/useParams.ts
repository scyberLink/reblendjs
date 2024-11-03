import { useContext } from 'reblendjs';
import { Params } from '../contexts/params';
import { IAny } from 'reblendjs';

//@ReblendHook
export function useParams<T = IAny | null | undefined>() {
  const [params] = useContext<T>(Params);
  return params;
}
