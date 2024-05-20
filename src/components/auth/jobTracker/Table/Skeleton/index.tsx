// #region ---- Core Imports ----
import { ZRUBox } from '@/components/RadixUI';
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZJobsTableSkeleton: React.FC = () => {
  return (
    <ZRUBox className='relative mt-6 overflow-x-auto border border-medium/30 sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'></table>
    </ZRUBox>
  );
};

export default ZJobsTableSkeleton;
