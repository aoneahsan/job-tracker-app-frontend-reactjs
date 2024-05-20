// #region ---- Core Imports ----
import React, { useMemo, useState } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import ZJobsTable from '@/components/auth/jobTracker/Table';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const JobTracker: React.FC = () => {
  return (
    <>
      {/* Job Tracker/Pipeline Section */}
      <ZRUBox className='flex gap-3 *:flex-1 *:flex *:flex-col *:items-center *:justify-center *:border *:border-gray-200 *:py-2 *:text-body *:overflow-hidden border-b pb-4 border-body/30 *:font-medium *:select-none'>
        {/* bookmarked */}
        <ZRUBox className='transition-all duration-200 cursor-pointer hover:bg-light-blue-100'>
          <ZRUText className='text-lg text-dark'>5</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase text-dark'>
            bookmarked
          </ZRUText>
        </ZRUBox>

        {/* applying */}
        <ZRUBox>
          <ZRUText className='text-lg'>--</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase'>applying</ZRUText>
        </ZRUBox>

        {/* applied */}
        <ZRUBox>
          <ZRUText className='text-lg'>--</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase'>applied</ZRUText>
        </ZRUBox>

        {/* interviewing */}
        <ZRUBox>
          <ZRUText className='text-lg'>--</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase'>
            interviewing
          </ZRUText>
        </ZRUBox>

        {/* negotiating */}
        <ZRUBox>
          <ZRUText className='text-lg'>--</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase'>
            negotiating
          </ZRUText>
        </ZRUBox>

        {/* accepted */}
        <ZRUBox>
          <ZRUText className='text-lg'>--</ZRUText>
          <ZRUText className='block mt-1 text-sm uppercase'>accepted</ZRUText>
        </ZRUBox>
      </ZRUBox>

      {/* Table */}
      <ZJobsTable />
    </>
  );
};

export default JobTracker;
