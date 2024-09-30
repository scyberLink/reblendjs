import { useContext } from 'reblendjs';
import { Hash } from '../contexts/hash';

//@ReblendHook
export function useHash() {
  const [hashContext] = useContext(Hash);
  return hashContext;
}
