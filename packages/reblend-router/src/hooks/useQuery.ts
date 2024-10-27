import { useContext } from 'reblendjs';
import { Query } from '../contexts/query';
import { IAny } from 'reblendjs';

//@ReblendHook
export function useQuery<T = IAny | null | undefined>() {
  const [query] = useContext<T>(Query);
  return query;
}
