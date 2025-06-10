import * as Reblend from 'reblendjs';

export interface ToastContextType {
  onClose?: (e?: Reblend.MouseEvent | Reblend.KeyboardEvent) => void;
}

const ToastContext = Reblend.createContext<ToastContextType>({
  onClose() {},
});

ToastContext.displayName = 'ToastContext';

export default ToastContext;
