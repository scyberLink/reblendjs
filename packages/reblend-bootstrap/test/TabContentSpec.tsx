import { describe, expect, it } from 'vitest';
import { render } from 'reblend-testing-library';
import TabContent from '../src/TabContent';

describe('<TabContent>', () => {
  it('Should have div as default component', () => {
    const { container } = render(<TabContent />);

    expect(container.tagName).toEqual('DIV');
  });
});
