// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import { ZRUBox } from '@/components/RadixUI';
import { isZNonEmptyString } from '@/utils/helpers';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZUploadInputI {
  isValid?: boolean;
  errorNode?: React.ReactNode;
  infoText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  value?: string | number | readonly string[];
  className?: string;
  name?: string;
  readOnly?: boolean;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  style?: React.CSSProperties;
}
// #endregion

const ZUploadInput: React.FC<ZUploadInputI> = ({
  onChange,
  isValid = true,
  errorNode,
  infoText,
  label = 'label',
  value = '',
  className,
  readOnly = false,
  multiple = true,
  style
}) => {
  return (
    <ZRUBox>
      <input
        type='file'
        name='file-input'
        id='file-input'
        onChange={onChange}
        className={ZClassNames(
          'block w-full mt-5 text-sm border rounded-lg shadow-sm cursor-pointer border-tertiary/30 focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-2 file:bg-success-dark/90 file:cursor-pointer file:text-white',
          className
        )}
      />

      {isValid &&
      ((typeof infoText === 'string' && isZNonEmptyString(infoText)) ||
        (infoText !== null && infoText !== undefined)) ? (
        <span className='text-[0.75rem] ps-4 text-[#666] leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
          {infoText}
        </span>
      ) : null}

      {!isValid &&
      ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
        (errorNode !== null && errorNode !== undefined)) ? (
        <span className='text-[0.75rem] ps-2 leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular text-danger'>
          {errorNode}
        </span>
      ) : null}
    </ZRUBox>
  );
};

export default ZUploadInput;
