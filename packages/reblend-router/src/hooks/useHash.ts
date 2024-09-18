import { useContext } from 'reblendjs';
import { Hash } from '../contexts/hash';

//@reblendcustomhook
export function useHash() {
  const [hashContext] = useContext(Hash);
  return hashContext;
}
