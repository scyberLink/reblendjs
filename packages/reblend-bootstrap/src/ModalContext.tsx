import * as Reblend from 'reblendjs';

interface ModalContextType {
  onHide: () => void;
}

const ModalContext = Reblend.createContext<ModalContextType>({
  onHide() {},
});

ModalContext.displayName = 'ModalContext';

export default ModalContext;
