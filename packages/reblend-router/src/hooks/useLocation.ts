import { useContext } from 'reblendjs';
import { Location } from '../contexts/location';

//@ReblendHook
export function useLocation() {
  const [locationContext] = useContext(Location);
  return locationContext;
}
