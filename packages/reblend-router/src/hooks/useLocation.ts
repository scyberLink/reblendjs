import { useContext } from 'reblendjs';
import { Location } from '../contexts/location';

//@reblendcustomhook
export function useLocation() {
  const [locationContext] = useContext(Location);
  return locationContext;
}
