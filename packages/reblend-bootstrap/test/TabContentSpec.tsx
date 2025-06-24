import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import TabContent from '../src/TabContent';

describe('<TabContent>', () => {
  it('Should have div as default component', async () => {
    const { container } = render(<TabContent />);

    expect(container.tagName).toEqual('DIV');
  });
});
