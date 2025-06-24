import * as Reblend from 'reblendjs';
import { useContext } from 'reblendjs';
import { useEventCallback } from 'reblend-hooks';
import type { ModalHandle } from '@restart/ui/Modal';
import Offcanvas, { type OffcanvasProps } from './Offcanvas';
import NavbarContext from './NavbarContext';

export type NavbarOffcanvasProps = Omit<OffcanvasProps, 'show'>;

const NavbarOffcanvas = (
  ({ onHide, ...props }) => {
    const context = useContext(NavbarContext);

    const handleHide = useEventCallback(() => {
      context?.onToggle?.();
      onHide?.();
    });

    return (
      <Offcanvas
        ref={ref}
        show={!!context?.expanded}
        {...props}
        onHide={handleHide}
      />
    );
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
