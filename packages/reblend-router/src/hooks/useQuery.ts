import { useContext } from 'reblendjs';
import { Query } from '../contexts/query';

//@ReblendHook
export function useQuery() {
  const [query] = useContext(Query);
  return query;
}
