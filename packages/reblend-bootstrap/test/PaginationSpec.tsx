import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', async () => {
    await render(<Pagination data-testid="test">Item content</Pagination>);
    const paginationElem = screen.getByTestId('test');
    expect(paginationElem.classList).toContain('pagination');
  });

  it('should render correctly when size is set', async () => {
    await render(
      <Pagination data-testid="test" size="sm">
        Item content
      </Pagination>,
    );
    const paginationElem = screen.getByTestId('test');
    expect(paginationElem.classList).toContain('pagination-sm');
  });

  it('sub-components should forward ref correctly', async () => {
    const ref = Reblend.createRef<HTMLLIElement>();
    await render(
      <Pagination data-testid="test" size="sm">
        Item content
        <Pagination.Next ref={ref} data-testid="next" />
      </Pagination>,
    );
    expect(ref.current?.tagName).toEqual('LI');
  });
});
