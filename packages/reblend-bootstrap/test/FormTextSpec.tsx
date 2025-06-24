import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', async () => {
    await render(
      <FormText data-testid="foo" className="my-form-text">
        Help content
      </FormText>,
    );

    const formText = screen.getByTestId('foo');
    expect(formText.classList).toHaveLength(2);
    expect(formText.classList).toContain('form-text');
    expect(formText.classList).toContain('my-form-text');
    expect(formText.innerText).toEqual('Help content');
  });

  it('Should have small as default component', async () => {
    await render(<FormText data-testid="foo" />);

    const formText = screen.getByTestId('foo');
    expect(formText.tagName).toEqual('SMALL');
  });

  it('Should have "form-text" & "text-muted" class', async () => {
    await render(<FormText data-testid="foo" muted />);

    const formText = screen.getByTestId('foo');
    expect(formText.classList).toHaveLength(2);
    expect(formText.classList).toContain('form-text');
    expect(formText.classList).toContain('text-muted');
  });
});
