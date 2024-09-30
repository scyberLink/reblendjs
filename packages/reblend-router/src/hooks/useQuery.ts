import { useContext } from 'reblendjs';
import { Query } from '../contexts/query';

//@ReblendHook
export function useQuery() {
  const [queryContext] = useContext(Query);
  return queryContext;
}
