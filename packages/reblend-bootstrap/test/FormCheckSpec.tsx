import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import FormCheck from '../src/FormCheck';
import Switch from '../src/Switch';

describe('<FormCheck>', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        defaultChecked
        label="My label"
        className="my-checkbox"
        data-testid="test-id"
      />,
    );

    const element = screen.getByTestId('test-id');

    expect(element.parentElement!.classList).toHaveLength(2);
    expect(element.parentElement!.classList).toContain('form-check');
    expect(element.parentElement!.classList).toContain('my-checkbox');

    expect(element.id).toEqual('foo');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('form-check-input');
    expect(element.getAttribute('name')).toEqual('foo');
    expect(element.getAttribute('type')).toEqual('checkbox');
    expect(element.getAttribute('value')).toEqual('foo');
    expect(element.getAttribute('checked')).toEqual('');

    const labels = container.getElementsByTagName('label');
    expect(labels).toHaveLength(1);
    const label = labels[0];
    expect(label.classList).toHaveLength(1);
    expect(label.classList).toContain('form-check-label');
    expect(label.getAttribute('for')).toEqual('foo');
    expect(label.innerText).toEqual('My label');
  });

  it('should render radio correctly', async () => {
    const { container } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        type="radio"
        defaultChecked
        className="my-radio"
        label="My label"
        data-testid="test-id"
      />,
    );

    const element = screen.getByTestId('test-id');

    expect(element.parentElement!.classList).toHaveLength(2);
    expect(element.parentElement!.classList).toContain('form-check');
    expect(element.parentElement!.classList).toContain('my-radio');

    expect(element.id).toEqual('foo');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('form-check-input');
    expect(element.getAttribute('name')).toEqual('foo');
    expect(element.getAttribute('type')).toEqual('radio');
    expect(element.getAttribute('value')).toEqual('foo');
    expect(element.getAttribute('checked')).toEqual('');

    const labels = container.getElementsByTagName('label');
    expect(labels).toHaveLength(1);
    const label = labels[0];
    expect(label.classList).toHaveLength(1);
    expect(label.classList).toContain('form-check-label');
    expect(label.getAttribute('for')).toEqual('foo');
    expect(label.innerText).toEqual('My label');
  });

  it('should support inline', async () => {
    const {
      container: { firstElementChild: element },
    } = render(<FormCheck inline label="My label" />);

    expect(element!.classList).toHaveLength(2);
    expect(element!.classList).toContain('form-check-inline');
  });

  it('should support in reverse', async () => {
    const {
      container: { firstElementChild: element },
    } = render(<FormCheck reverse label="My label" />);

    expect(element!.classList).toHaveLength(2);
    expect(element!.classList).toContain('form-check-reverse');
  });

  it('should support isValid', async () => {
    await render(<FormCheck isValid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element!.classList).toHaveLength(2);
    expect(element.classList).toContain('is-valid');
  });

  it('should support isInvalid', async () => {
    await render(<FormCheck isInvalid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element!.classList).toHaveLength(2);
    expect(element.classList).toContain('is-invalid');
  });

  it('should support ref forwarding', async () => {
    let input;
    class Container extends Reblend.Component {
      await render() {
        return (
          <FormCheck
            ref={(ref) => {
              input = ref;
            }}
          />
        );
      }
    }

    await render(<Container />);
    expect(input.tagName).toEqual('INPUT');
  });

  it('should not render bsPrefix if no label is specified', async () => {
    const { container } = render(
      <FormCheck id="foo" name="foo" value="foo" type="radio" />,
    );

    expect(container.getElementsByClassName('form-check')).toHaveLength(0);
  });

  it('should support type switch', async () => {
    const { container } = render(
      <FormCheck
        type="switch"
        label="My label"
        id="switch-id"
        data-testid="test-id"
      />,
    );

    const element = screen.getByTestId('test-id');

    expect(element.parentElement!.classList).toHaveLength(2);
    expect(element.parentElement!.classList).toContain('form-check');
    expect(element.parentElement!.classList).toContain('form-switch');

    expect(element.id).toEqual('switch-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('form-check-input');
    expect(element.id).toEqual('switch-id');
    expect(element.getAttribute('type')).toEqual('checkbox');

    const labels = container.getElementsByTagName('label');
    expect(labels).toHaveLength(1);
    const label = labels[0];
    expect(label.classList).toHaveLength(1);
    expect(label.classList).toContain('form-check-label');
    expect(label.getAttribute('for')).toEqual('switch-id');
    expect(label.innerText).toEqual('My label');
  });

  it('should support Switch', async () => {
    const { container } = render(
      <Switch label="My label" id="switch-id" data-testid="test-id" />,
    );

    const element = screen.getByTestId('test-id');

    expect(element.parentElement!.classList).toHaveLength(2);
    expect(element.parentElement!.classList).toContain('form-check');
    expect(element.parentElement!.classList).toContain('form-switch');

    expect(element.id).toEqual('switch-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('form-check-input');
    expect(element.id).toEqual('switch-id');
    expect(element.getAttribute('type')).toEqual('checkbox');

    const labels = container.getElementsByTagName('label');
    expect(labels).toHaveLength(1);
    const label = labels[0];
    expect(label.classList).toHaveLength(1);
    expect(label.classList).toContain('form-check-label');
    expect(label.getAttribute('for')).toEqual('switch-id');
    expect(label.innerText).toEqual('My label');
  });

  it('should support "as"', async () => {
    const Surrogate = ({ className = '', ...rest }) => (
      <input className={`extraClass ${className}'`} {...rest} />
    );
    await render(<FormCheck as={Surrogate} data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('extraClass');
  });

  it('Should render valid feedback properly', async () => {
    const { container } = render(
      <FormCheck label="My label" feedbackType="valid" feedback="test" />,
    );

    const feedbacks = container.getElementsByClassName('valid-feedback');
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].textContent!).toEqual('test');
  });

  it('Should render invalid feedback properly', async () => {
    const { container } = render(
      <FormCheck label="My label" feedbackType="invalid" feedback="test" />,
    );

    const feedbacks = container.getElementsByClassName('invalid-feedback');
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].textContent).toEqual('test');
  });

  it('Should render valid feedback tooltip properly', async () => {
    const { container } = render(
      <FormCheck
        label="My label"
        feedbackType="valid"
        feedback="test"
        feedbackTooltip
      />,
    );

    const feedbacks = container.getElementsByClassName('valid-tooltip');
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].textContent).toEqual('test');
  });

  it('Should render invalid feedback tooltip properly', async () => {
    const { container } = render(
      <FormCheck
        label="My label"
        feedbackType="invalid"
        feedback="test"
        feedbackTooltip
      />,
    );

    const feedbacks = container.getElementsByClassName('invalid-tooltip');
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].textContent).toEqual('test');
  });
});
