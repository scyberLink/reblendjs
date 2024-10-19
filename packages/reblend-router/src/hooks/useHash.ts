import { useContext } from 'reblendjs';
import { Hash } from '../contexts/hash';

//@ReblendHook
export function useHash() {
  const [hash] = useContext(Hash);
  return hash;
}
