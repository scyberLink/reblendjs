import clsx from 'clsx';
import camelize from 'dom-helpers/camelize';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

interface BsPrefixOptions<As extends Reblend.ElementType = 'div'> {
  displayName?: string;
  Component?: As;
  defaultProps?: Partial<Reblend.ComponentProps<As>>;
}

// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
export default function createWithBsPrefix<
  As extends Reblend.ElementType = 'div',
>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component,
    defaultProps,
  }: BsPrefixOptions<As> = {},
): DynamicRefForwardingComponent<As> {
  const BsComponent = (
    (
      { className, bsPrefix, as: Tag = Component || 'div', ...props }: any,
      ref,
    ) => {
      const componentProps = {
        ...defaultProps,
        ...props,
      };

      const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={clsx(className, resolvedPrefix)}
          {...componentProps}
        />
      );
    },
  );

  BsComponent.displayName = displayName;
  return BsComponent as any;
}
