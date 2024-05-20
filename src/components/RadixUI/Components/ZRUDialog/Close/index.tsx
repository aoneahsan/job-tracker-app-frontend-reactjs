// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Dialog } from '@radix-ui/themes';

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZRUDialogCloseI {
  children?: React.ReactNode;
  disabled?: boolean;
}
// #endregion

/**
 * A customized Radix Dialog Close component.
 */
const ZRUDialogClose: React.FC<ZRUDialogCloseI> = ({ children, disabled }) => {
  return <Dialog.Close disabled={disabled}>{children}</Dialog.Close>;
};

export default ZRUDialogClose;
