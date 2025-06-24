import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', async () => {
    await render(<InputGroup data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('Should render size correctly', async () => {
    await render(<InputGroup size="sm" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('input-group-sm');
  });

  it('Should render hasValidation correctly', async () => {
    await render(<InputGroup hasValidation data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('has-validation');
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', async () => {
      const name = 'foobar';

      await render(<InputGroup.Checkbox name={name} />);

      expect(screen.getByRole('checkbox').getAttribute('name')).toEqual(name);
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', async () => {
      const name = 'foobar';

      await render(<InputGroup.Radio name={name} />);

      expect(screen.getByRole('radio').getAttribute('name')).toEqual(name);
    });
  });
});
