// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZAttachmentIcon,
  ZCloseCircleOutlineIcon,
  ZEllipsisVerticalIcon
} from '@/assets';

// #endregion

const Attachments: React.FC = () => {
  return (
    <ZRUBox className='py-4 w-[22rem] pe-1'>
      <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
        <ZRUText className='flex items-center'>
          <ZAttachmentIcon className='w-5 h-5' />
          <ZRUText className='text-xl font-medium ms-2'>Attachments</ZRUText>
        </ZRUText>

        <ZCloseCircleOutlineIcon className='w-6 h-6 cursor-pointer' />
      </ZRUBox>

      <ZRUBox className='py-3 mx-2 border-b border-tertiary/20'>
        <ZRUBox className='flex items-start p-2 border rounded-md border-tertiary/30'>
          <ZRUBox>
            <ZRUText className='block mb-2 text-sm font-medium text-primary'>
              React Native Developer - Xtecsoft at Karāchi, Sindh, Pakistan
            </ZRUText>

            <ZRUText className='text-base text-tertiary me-4'>
              Match: <ZRUText className='font-semibold'>31%</ZRUText>
            </ZRUText>
            <ZRUText className='text-base text-tertiary'>
              Score: <ZRUText className='font-semibold'>31%</ZRUText>
            </ZRUText>
          </ZRUBox>

          <ZRUBox className='flex items-center justify-center p-2 border border-gray-100 rounded-md cursor-pointer hover:border-primary hover:bg-primary/20 hover:text-primary'>
            <ZEllipsisVerticalIcon />
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default Attachments;
