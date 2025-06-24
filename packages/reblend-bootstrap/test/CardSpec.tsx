import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', async () => {
    await render(<Card>Card</Card>);
    expect(screen.getByText('Card').tagName).toEqual('DIV');
    expect(screen.getByText('Card').classList).toContain('card');
  });

  it('should have additional classes', async () => {
    await render(<Card className="custom-class">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('custom-class');
  });

  it('accepts a bg prop', async () => {
    await render(<Card bg="primary">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('bg-primary');
  });

  it('accepts a text prop', async () => {
    await render(<Card text="success">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('text-success');
  });

  it('accepts a border prop', async () => {
    await render(<Card border="danger">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('border-danger');
  });

  it('should render children', async () => {
    await render(
      <Card data-testid="test-card">
        <p>hello</p>
      </Card>,
    );
    expect(screen.getByTestId('test-card').children.length).toEqual(1);
    expect(screen.getByTestId('test-card').children[0].tagName).toEqual('P');
  });

  it('accepts as prop', async () => {
    await render(<Card as="section">body</Card>);
    expect(screen.getByText('body').tagName).toEqual('SECTION');
  });

  it('allows for the body shorthand', async () => {
    await render(<Card body>test</Card>);
    expect(screen.getByText('test').classList).toContain('card-body');
  });

  it('Should have div as default component', async () => {
    await render(<Card data-testid="default-test" />);
    expect(screen.getByTestId('default-test').tagName).toEqual('DIV');
  });
});
