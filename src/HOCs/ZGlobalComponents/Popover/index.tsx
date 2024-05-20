// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import { ZRUPopover } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { ZPopoverRStateAtom } from '@/store/global/index.recoil';

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZPopover: React.FC = () => {
  const [ZPopoverRState, setZPopoverRState] =
    useRecoilState(ZPopoverRStateAtom);
  return (
    <ZRUPopover
      maxWidth={ZPopoverRState.width}
      maxHeight={ZPopoverRState.height}
      open={ZPopoverRState?.isOpen}
      onOpenChange={(open) => {
        setZPopoverRState((oldValues) => ({
          ...oldValues,
          isOpen: open
        }));
      }}
    >
      {ZPopoverRState.component !== undefined ? (
        <ZPopoverRState.component {...ZPopoverRState?.componentProps} />
      ) : null}
    </ZRUPopover>
  );
};

export default ZPopover;
