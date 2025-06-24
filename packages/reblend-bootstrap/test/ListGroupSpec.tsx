import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ListGroup from '../src/ListGroup';

describe('<ListGroup>', () => {
  it('Should render correctly "list-group"', async () => {
    await render(<ListGroup data-testid="test" />);

    const listGroup = screen.getByTestId('test');
    expect(listGroup.tagName).toEqual('DIV');
    expect(listGroup.classList).toContain('list-group');
  });

  it('accepts <ListGroup.Item> children', async () => {
    await render(
      <ListGroup>
        <ListGroup.Item data-testid="test">hey!</ListGroup.Item>
      </ListGroup>,
    );

    const listGroupItem = screen.getByTestId('test');
    expect(listGroupItem.classList).toContain('list-group-item');
  });

  it('accepts variant', async () => {
    await render(<ListGroup variant="flush" data-testid="test" />);

    const listGroup = screen.getByTestId('test');
    expect(listGroup.classList).toContain('list-group');
    expect(listGroup.classList).toContain('list-group-flush');
  });

  it('accepts global horizontal', async () => {
    await render(<ListGroup horizontal data-testid="test" />);

    const listGroup = screen.getByTestId('test');
    expect(listGroup.classList).toContain('list-group-horizontal');
  });

  (['sm', 'md', 'lg', 'xl', 'xxl', 'custom'] as const).forEach((breakpoint) => {
    it(`accepts responsive horizontal ${breakpoint} breakpoint`, async () => {
      await render(<ListGroup horizontal={breakpoint} data-testid="test" />);

      const listGroup = screen.getByTestId('test');
      const breakpointClass = `list-group-horizontal-${breakpoint}`;
      expect(listGroup.classList).toContain(breakpointClass);
    });
  });

  it('accepts as prop', async () => {
    await render(<ListGroup as="ul" data-testid="test" />);

    const listGroup = screen.getByTestId('test');
    expect(listGroup.tagName).toEqual('UL');
    expect(listGroup.classList).toContain('list-group');
  });

  it('should set active class on list item if activeKey set on parent', async () => {
    await render(
      <ListGroup activeKey="1">
        <ListGroup.Item eventKey="1" data-testid="list-item">
          test
        </ListGroup.Item>
      </ListGroup>,
    );

    expect(screen.getByTestId('list-item').classList).toContain('active');
  });

  it('should add numbered class', async () => {
    await render(
      <ListGroup activeKey="1" numbered data-testid="list-group">
        <ListGroup.Item eventKey="1">test</ListGroup.Item>
      </ListGroup>,
    );

    const listGroup = screen.getByTestId('list-group');
    expect(listGroup.classList).toContain('list-group-numbered');
  });
});
