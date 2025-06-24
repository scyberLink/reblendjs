import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', async () => {
    await render(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeDefined();
  });

  it('Should add size', async () => {
    await render(
      <ButtonGroup size="lg">
        <Button>Title</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group').classList).toContain('btn-group-lg');
  });

  it('Should add vertical variation', async () => {
    await render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.classList).toContain('btn-group-vertical');
    expect(group.classList).not.toContain('btn-group');
  });

  it('Should have div as default component', async () => {
    await render(<ButtonGroup />);

    expect(screen.getByRole('group').tagName).toEqual('DIV');
  });

  it('Should allow component tag customization', async () => {
    await render(<ButtonGroup as="article" />);

    expect(screen.getByRole('group').tagName).toEqual('ARTICLE');
  });
});
