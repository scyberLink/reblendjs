import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<FormControl>', () => {
  it('should render correctly', async () => {
    await render(
      <FormControl
        type="text"
        id="foo"
        name="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('INPUT');
    expect(element.id).toEqual('foo');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-control');
    expect(element.classList).toContain('my-control');
    expect(element.getAttribute('name')).toEqual('bar');
    expect(element.getAttribute('type')).toEqual('text');
  });

  it('should support textarea', async () => {
    await render(<FormControl as="textarea" data-testid="test-id" />);

    expect(screen.getByTestId('test-id').tagName).toEqual('TEXTAREA');
  });

  it('should support plaintext inputs', async () => {
    await render(<FormControl plaintext data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('form-control-plaintext');
  });

  it('should support plaintext inputs with size', async () => {
    await render(<FormControl plaintext size="sm" data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-control-sm');
  });

  it('should support type=color', async () => {
    await render(<FormControl type="color" data-testid="test-id" />);

    expect(screen.getByTestId('test-id').getAttribute('type')).toEqual('color');
  });

  it('should use controlId for id', async () => {
    await render(
      <FormGroup controlId="foo">
        <FormControl type="text" data-testid="test-id" />
      </FormGroup>,
    );

    expect(screen.getByTestId('test-id').id).toEqual('foo');
  });

  it('should prefer explicit id', async () => {
    await render(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" data-testid="test-id" />
      </FormGroup>,
    );

    expect(screen.getByTestId('test-id').id).toEqual('bar');
  });

  it('should support ref forwarding', async () => {
    let input;
    class Container extends Reblend.Component {
      await render() {
        return (
          <FormGroup controlId="foo">
            <FormControl
              type="text"
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    await render(<Container />);
    expect(input.tagName).toEqual('INPUT');
  });

  it('should properly display size of FormControl', async () => {
    await render(<FormControl type="text" size="lg" data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-control-lg');
  });

  it('should properly display html size of FormControl', async () => {
    await render(<FormControl type="text" htmlSize={42} data-testid="test-id" />);

    expect(screen.getByTestId('test-id').getAttribute('size')).toEqual('42');
  });

  it('Should have input as default component', async () => {
    await render(<FormControl data-testid="test-id" />);

    expect(screen.getByTestId('test-id').tagName).toEqual('INPUT');
  });

  it('should support numbers as values', async () => {
    await render(
      <FormControl
        value={10}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    expect(screen.getByTestId('test-id').getAttribute('value')).toEqual('10');
  });

  it('should support an array of strings as values', async () => {
    await render(
      <FormControl
        value={['hello', 'world']}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    expect(screen.getByTestId('test-id').getAttribute('value')).toEqual(
      'hello,world',
    );
  });
});
