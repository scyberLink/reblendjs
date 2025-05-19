import { createContext } from 'reblendjs';
import { RouterProps } from '../components/Router';

const Routes = createContext<Map<string, RouterProps<any>>>(new Map());

export { Routes };
