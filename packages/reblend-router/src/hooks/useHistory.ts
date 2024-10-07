import { useContext } from 'reblendjs';
import { History } from '../contexts/history';

//@ReblendHook
export function useHistory() {
  const [history] = useContext(History);
  return history;
}
