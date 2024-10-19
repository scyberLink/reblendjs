import { useContext } from 'reblendjs';
import { Location } from '../contexts/location';

//@ReblendHook
export function useLocation() {
  const [location] = useContext(Location);
  return location;
}
