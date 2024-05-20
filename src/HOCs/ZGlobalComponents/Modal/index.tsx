// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilState } from 'recoil';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/helpers';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----
import { ZModalRStateAtom } from '@/store/global/index.recoil';
import { ZRUDialog } from '@/components/RadixUI';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const ZModal: React.FC = () => {
  const [ZModalRState, setZModalRState] = useRecoilState(ZModalRStateAtom);

  return (
    <ZRUDialog
      maxWidth={ZModalRState.width}
      maxHeight={ZModalRState.height}
      open={ZModalRState?.isOpen}
      onOpenChange={(open) => {
        setZModalRState((oldValues) => ({
          ...oldValues,
          isOpen: open
        }));
      }}
    >
      {ZModalRState.component !== undefined ? (
        <ZModalRState.component {...ZModalRState?.componentProps} />
      ) : null}
    </ZRUDialog>
  );
};

export default ZModal;
