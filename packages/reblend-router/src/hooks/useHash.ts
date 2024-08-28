import { useContext } from 'reblendjs';
import { Hash } from '../contexts/hash';

//@reblendcustomhook
export function useHash() {
  const paramsContext = useContext(Hash);
  return paramsContext;
}
