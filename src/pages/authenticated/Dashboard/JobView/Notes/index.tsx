// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUButton, ZRUText, ZRUTextArea } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZCloseOutlineIcon, ZFileIcon } from '@/assets';

// #endregion

const Notes: React.FC = () => {
  return (
    <ZRUBox className='py-4 w-[22rem] pe-1'>
      <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
        <ZRUText className='flex items-center'>
          <ZFileIcon className='w-5 h-5' />
          <ZRUText className='text-xl font-medium ms-2'>Notes</ZRUText>
        </ZRUText>

        <ZCloseOutlineIcon className='w-6 h-6 cursor-pointer' />
      </ZRUBox>

      <ZRUTextArea className='px-2 mt-4' size='3' />

      <ZRUBox className='px-2 mt-3 text-end'>
        <ZRUButton>Save</ZRUButton>
      </ZRUBox>
    </ZRUBox>
  );
};

export default Notes;
