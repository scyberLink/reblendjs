import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ThemeProvider, { createBootstrapComponent } from '../src/ThemeProvider';
import Button from '../src/Button';

describe('<ThemeProvider>', () => {
  const hocValue = 'foo';
  const Foo = createBootstrapComponent(
    class Foo extends Reblend.Component<{ bsPrefix: string }, any> {
      await render() {
        return (
          <p className={`${this.props.bsPrefix} ${this.props.bsPrefix}-bar`}>
            foo val
          </p>
        );
      }
    },
    hocValue,
  );

  it('should use HOC value', async () => {
    await render(
      <div>
        <Foo />
      </div>,
    );

    const fooElem = screen.getByText('foo val');
    expect(fooElem.classList).toContain(hocValue);
    expect(fooElem.tagName).toEqual('P');
  });

  it('should provide bsPrefix overrides', async () => {
    await render(
      <ThemeProvider prefixes={{ btn: 'my-btn', foo: 'global-foo' }}>
        <div>
          <Button variant="primary">My label</Button>
          <Foo />
        </div>
      </ThemeProvider>,
    );
    const buttonElem = screen.getByText('My label');
    expect(buttonElem.tagName).toEqual('BUTTON');
    expect(buttonElem.classList).toContain('my-btn');
    expect(buttonElem.classList).toContain('my-btn-primary');

    const fooElem = screen.getByText('foo val');
    expect(fooElem.tagName).toEqual('P');
    expect(fooElem.classList).toContain('global-foo');
  });

  it('should use prop bsPrefix first', async () => {
    await render(
      <ThemeProvider prefixes={{ foo: 'global-foo' }}>
        <div>
          <Foo bsPrefix="my-foo" />
        </div>
      </ThemeProvider>,
    );
    const fooElem = screen.getByText('foo val');
    expect(fooElem.tagName).toEqual('P');
    expect(fooElem.classList).toContain('my-foo');
  });

  it('should forward ref', async () => {
    let ref;
    await render(
      <div>
        <Foo bsPrefix="my-foo" ref={(r) => (ref = r)} />
      </div>,
    );
    // If the ref of rendered element has the correct bsPrefix, it means that
    // it has been forwarded correctly
    expect(screen.getByText('foo val').className).toContain(ref.props.bsPrefix);
  });
});
