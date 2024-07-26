import { createContext } from 'reblendjs';
import { type ReblendRenderingException } from 'reblendjs';

export const ReblendRenderingError = createContext<ReblendRenderingException>(
  null as any
);
