// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUButton, ZRUText } from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZAddCircleOutlineIcon,
  ZCloseOutlineIcon,
  ZContactsBookIcon
} from '@/assets';
import { ZStandardSelect } from '@/components/Elements/ZSelect';
import ZDivider from '@/components/inpage/Divider';

// #endregion

const Contacts: React.FC = () => {
  return (
    <ZRUBox className='py-4 w-[22rem] pe-1'>
      <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
        <ZRUText className='flex items-center'>
          <ZContactsBookIcon className='w-5 h-5' />
          <ZRUText className='text-xl font-medium ms-2'>Contacts</ZRUText>
        </ZRUText>

        <ZCloseOutlineIcon className='w-6 h-6 cursor-pointer' />
      </ZRUBox>

      <ZRUBox className='py-3 mx-2 border-b border-tertiary/20'>
        <ZRUBox className='p-2 border rounded-md border-tertiary/30'>
          <ZStandardSelect
            options={[]}
            placeholder='Find an existing contact'
            className='w-full'
          />

          <ZDivider />

          <ZRUButton className='w-full mb-2'>
            <ZAddCircleOutlineIcon /> Add a Contact
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default Contacts;
