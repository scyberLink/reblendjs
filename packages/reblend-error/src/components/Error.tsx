import Reblend, {
  ERROR_EVENTNAME,
  useContext,
  useContextDispatch,
  useEffect,
} from 'reblendjs';
import { type ReblendRenderingException } from 'reblendjs';
import { isCallable } from 'reblendjs';
import { ReblendRenderingError } from '../contexts/error';

function Error({
  children = () => <>{''}</>,
}: {
  children?: (error: ReblendRenderingException) => JSX.Element | JSX.Element;
  props?: any[];
}) {
  const error = useContext(ReblendRenderingError);
  const errorDispatcher = useContextDispatch(ReblendRenderingError);

  const errorHandler = (e: Event) => (e as CustomEvent).detail;

  addEventListener(ERROR_EVENTNAME, errorHandler);

  useEffect(() => {
    return () => removeEventListener(ERROR_EVENTNAME, errorHandler);
  }, []);

  function view() {
    const arr: any[] = [];
    for (const child of children as any as []) {
      if (isCallable(child)) {
        arr.push((child as any)(error));
      } else {
        arr.push(child);
      }
    }
    error && errorDispatcher(null as any);
    return arr;
  }
  return view();
}

export default Error;
