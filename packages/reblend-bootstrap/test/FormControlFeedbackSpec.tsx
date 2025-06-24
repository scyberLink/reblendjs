import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<Feedback>', () => {
  it('should render default success', async () => {
    await render(
      <FormGroup>
        <FormControl isValid />
        <FormControl.Feedback type="valid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('valid-feedback');
  });

  it('should render default error', async () => {
    await render(
      <FormGroup>
        <FormControl isInvalid />
        <FormControl.Feedback type="invalid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('invalid-feedback');
  });

  it('should render custom component', async () => {
    class MyComponent extends Reblend.Component {
      await render() {
        return <div id="my-component" {...this.props} />;
      }
    }

    await render(<FormControl.Feedback as={MyComponent} data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('my-component');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('valid-feedback');
  });
});
