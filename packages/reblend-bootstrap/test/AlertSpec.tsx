import * as Reblend from 'reblendjs';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', async () => {
    await render(
      <Alert data-testid="test-alert">
        <strong>Message</strong>
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').children.length).toEqual(1);
    expect(screen.getByTestId('test-alert').children[0].tagName).toEqual(
      'STRONG',
    );
  });

  it('Should have dismissible style', async () => {
    await render(
      <Alert data-testid="test-alert" dismissible>
        <strong>Message</strong>
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList).toContain(
      'alert-dismissible',
    );
  });

  it('Should call onClose callback on dismiss click', async () => {
    const onCloseSpy = jest.fn();
    await render(
      <Alert dismissible data-testid="test-alert" onClose={onCloseSpy}>
        Message
      </Alert>,
    );
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('Should default to variant="primary"', async () => {
    await render(<Alert data-testid="test-alert">Message</Alert>);
    expect(screen.getByTestId('test-alert').classList).toContain(
      'alert-primary',
    );
  });

  it('Should use variant class', async () => {
    await render(
      <Alert variant="danger" data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList).toContain(
      'alert-danger',
    );
  });

  it('Should not have variant class when variant=null', async () => {
    await render(
      <Alert variant={null as any} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList).not.toContain(
      'alert-primary',
    );
  });

  it('should forward refs to the alert', async () => {
    const ref = Reblend.createRef<HTMLDivElement>();
    await render(
      <Alert ref={ref} data-testid="test-alert">
        message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').tagName).toEqual('DIV');
  });

  it('should not have fade class when transition=false', async () => {
    await render(
      <Alert transition={false} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList).not.toContain('fade');
  });

  it('should spread props to alert when transition=false', async () => {
    const alertId = 'alert-id';
    await render(
      <Alert transition={false} id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').getAttribute('id')).toEqual(
      alertId,
    );
  });

  it('should spread props to alert when transition=true', async () => {
    const alertId = 'alert-id';
    await render(
      <Alert transition id={alertId} data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').getAttribute('id')).toEqual(
      alertId,
    );
  });

  it('should use Fade when transition=true', async () => {
    await render(
      <Alert variant="danger" transition data-testid="test-alert">
        Message
      </Alert>,
    );
    expect(screen.getByTestId('test-alert').classList).toContain('fade');
  });

  it('should render null when transition and show are false', async () => {
    const { container } = render(
      <Alert
        variant="danger"
        transition={false}
        show={false}
        data-testid="test-alert"
      >
        Message
      </Alert>,
    );
    expect(container.innerHTML).toEqual('');
  });

  it('should render close button variant', async () => {
    await render(
      <Alert dismissible closeVariant="white">
        Message
      </Alert>,
    );
    expect(screen.getByLabelText('Close alert').classList).toContain(
      'btn-close-white',
    );
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', async () => {
      await render(<Alert data-testid="test-alert">Message</Alert>);
      expect(screen.getByTestId('test-alert').getAttribute('role')).toEqual(
        'alert',
      );
    });
  });

  describe('Alert alert-heading', () => {
    it('Should have alert-heading', async () => {
      await render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      expect(screen.getByTestId('test-alert').classList).toContain(
        'alert-heading',
      );
    });

    it('Should have div styled as an h4 by default', async () => {
      await render(
        <Alert>
          <Alert.Heading data-testid="test-alert">Well done</Alert.Heading>
          Message
        </Alert>,
      );
      expect(screen.getByTestId('test-alert').classList).toContain('h4');
    });

    it('Should support Heading as as prop', async () => {
      await render(
        <Alert>
          <Alert.Heading as="h1" data-testid="test-alert">
            Well done
          </Alert.Heading>
          Message
        </Alert>,
      );
      expect(screen.getByTestId('test-alert').tagName).toEqual('H1');
    });
  });
});
