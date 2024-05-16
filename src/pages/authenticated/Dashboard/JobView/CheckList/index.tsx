// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import { ZCheckboxOutlineIcon, ZCloseOutlineIcon } from '@/assets';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const CheckList: React.FC = () => {
  return (
    <ZRUBox className='py-4 w-[22rem] pe-1'>
      <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
        <ZRUText className='flex items-center'>
          <ZCheckboxOutlineIcon className='w-5 h-5' />
          <ZRUText className='text-xl font-medium ms-2'>Attachments</ZRUText>
        </ZRUText>

        <ZCloseOutlineIcon className='w-6 h-6 cursor-pointer' />
      </ZRUBox>
    </ZRUBox>
  );
};

export default CheckList;
