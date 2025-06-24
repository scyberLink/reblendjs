import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import ModalManager from '@restart/ui/ModalManager';
import { injectCss } from './helpers';
import BootstrapModalManager, {
  getSharedManager,
} from '../src/BootstrapModalManager';

const SCROLLBAR_SIZE = 10;

jest.spyOn(ModalManager.prototype, 'getScrollbarWidth').mockImplementation(
  () => SCROLLBAR_SIZE,
);

const createModal = () => ({ dialog: null, backdrop: null });

describe('BootstrapModalManager', () => {
  let container, manager;

  beforeEach(async () => {
    manager?.reset();
    manager = new BootstrapModalManager();
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    const fixedContent = document.createElement('div');
    fixedContent.className = 'fixed-top';
    container.appendChild(fixedContent);
    const stickyContent = document.createElement('div');
    stickyContent.className = 'sticky-top';
    container.appendChild(stickyContent);
    const navbarToggler = document.createElement('div');
    navbarToggler.className = 'navbar-toggler';
    container.appendChild(navbarToggler);

    document.body.appendChild(container);
  });

  afterEach(async () => {
    manager?.reset();
    document.body.removeChild(container);
    container = null;
    manager = null;
  });

  it('should add Modal', async () => {
    const modal = createModal();

    manager.add(modal);

    expect(manager.modals.length).toEqual(1);
    expect(manager.modals[0]).toEqual(modal);

    expect(manager.state).toEqual({
      scrollBarWidth: SCROLLBAR_SIZE,
      style: {
        overflow: '',
        paddingRight: '',
      },
    });
  });

  it('should return a shared modal manager', async () => {
    const localManager = getSharedManager();
    expect(localManager).toBeDefined();
  });

  it('should return a same modal manager if called twice', async () => {
    let localManager = getSharedManager();
    expect(localManager).toBeDefined();

    const modal = createModal();
    localManager.add(modal as any);
    expect(localManager.modals).toHaveLength(1);

    localManager = getSharedManager();
    expect(localManager.modals).toHaveLength(1);

    localManager.remove(modal as any);
  });

  describe('container styles', () => {
    beforeEach(async () => {
      injectCss(`
        body {
          padding-right: 20px;
          padding-left: 20px;
          overflow: scroll;
        }

        #container {
          height: 4000px;
        }
      `);
    });

    afterEach(() => injectCss.reset());

    it('should set padding to right side', async () => {
      const modal = createModal();
      manager.add(modal);

      expect(document.body.style.paddingRight).toEqual(
        `${SCROLLBAR_SIZE + 20}px`,
      );
    });

    it('should set padding to left side if RTL', async () => {
      const modal = createModal();

      new BootstrapModalManager({ isRTL: true }).add(modal as any);

      expect(document.body.style.paddingLeft).toEqual(
        `${SCROLLBAR_SIZE + 20}px`,
      );
    });

    it('should restore container overflow style', async () => {
      const modal = createModal();

      document.body.style.overflow = 'scroll';

      expect(document.body.style.overflow).toEqual('scroll');

      manager.add(modal);
      manager.remove(modal);

      expect(document.body.style.overflow).toEqual('scroll');
      document.body.style.overflow = '';
    });

    it('should restore container overflow style for RTL', async () => {
      const modal = createModal();

      document.body.style.overflow = 'scroll';

      expect(document.body.style.overflow).toEqual('scroll');

      const localManager = new BootstrapModalManager({ isRTL: true });
      localManager.add(modal as any);
      localManager.remove(modal as any);

      expect(document.body.style.overflow).toEqual('scroll');
      document.body.style.overflow = '';
    });
  });
});
