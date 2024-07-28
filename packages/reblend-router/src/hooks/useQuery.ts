import { useContext } from 'reblendjs';
import { Query } from '../contexts/query';

//@reblendcustomhook
export function useQuery() {
  const queryContext = useContext(Query);
  return queryContext;
}
