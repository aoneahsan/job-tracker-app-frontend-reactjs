// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { DropdownMenu } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type ZRUColorE } from '@/types/radixUI/index.type';
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
interface ZRUDropdownMenuI {
  children?: React.ReactNode;
  asChild?: boolean;
  style?: Record<string, unknown>;
  className?: string;
  size?: Responsive<'1' | '2'>;
  color?: ZRUColorE;
  highContrast?: boolean;
  trigger?: {
    children?: React.ReactNode;
  };
}
// #endregion

const ZRUDropdownMenu: React.FC<ZRUDropdownMenuI> = ({
  children,
  style,
  className,
  size,
  color,
  highContrast,
  trigger = {
    children: (
      <>
        Options
        <DropdownMenu.TriggerIcon />
      </>
    )
  }
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='focus:outline-none'>{trigger?.children}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={style}
        className={className}
        color={color}
        size={size}
        highContrast={highContrast}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ZRUDropdownMenu;
