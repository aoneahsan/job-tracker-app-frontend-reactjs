// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Types Imports ----
interface ZDividerI {
  text?: string;
  className?: string;
}
// #endregion

const ZDivider: React.FC<ZDividerI> = ({ text = 'OR', className }) => {
  return (
    <ZRUBox
      className={ZClassNames(className, {
        'flex items-center w-full rounded-full': true
      })}
    >
      <ZRUBox className='flex-1 border-b border-tertiary/30'></ZRUBox>
      <ZRUText className='px-4 py-2 text-base font-medium leading-8 text-tertiary'>
        {text}
      </ZRUText>
      <ZRUBox className='flex-1 border-b border-tertiary/30'></ZRUBox>
    </ZRUBox>
  );
};

export default ZDivider;
