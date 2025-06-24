import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Container from '../src/Container';

describe('<Container>', () => {
  it('should render props correctly', async () => {
    await render(<Container className="whatever">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('whatever');
  });

  it('turns grid into "full-width" layout via "fluid" property set', async () => {
    await render(<Container fluid>Container</Container>);
    expect(screen.getByText('Container').classList).toContain(
      'container-fluid',
    );
  });

  it('Should include size breakpoint class when fluid is set to sm, md, lg or xl', async () => {
    await render(<Container fluid="sm">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('container-sm');
  });

  it('allows custom elements instead of "div"', async () => {
    await render(<Container as="section">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('container');
    expect(screen.getByText('Container').tagName).toEqual('SECTION');
  });

  it('Should have div as default component', async () => {
    await render(<Container>Container</Container>);
    expect(screen.getByText('Container').tagName).toEqual('DIV');
  });

  it('should allow custom breakpoints', async () => {
    await render(<Container fluid="custom">test</Container>);
    expect(screen.getByText('test').classList).toContain('container-custom');
  });
});
