// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Progress } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
import { type Responsive } from '@radix-ui/themes/dist/cjs/props';
import {
  type ZRURadiusE,
  type ZRUColorE,
  type ZRUTriggerVariantE
} from '@/types/radixUI/index.type';
interface ZRUProgressI {
  className?: string;
  style?: Record<string, unknown>;
  size?: Responsive<'1' | '2' | '3'>;
  variant?: ZRUTriggerVariantE;
  color?: ZRUColorE;
  highContrast?: boolean;
  radius?: ZRURadiusE;
  duration?: `${number}s` | `${number}ms`;
  value?: number;
}
// #endregion

/**
 * A customized Radix Progress component.
 */
const ZRUProgress: React.FC<ZRUProgressI> = (props) => {
  return <Progress {...props} />;
};

export default ZRUProgress;
