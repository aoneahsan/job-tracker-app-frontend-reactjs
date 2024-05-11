// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUCheckbox,
  ZRUSelect,
  ZRUSeparator,
  ZRUText
} from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  ZRUOrientationE,
  ZRUVariantE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZEditIcon,
  ZArchiveIcon,
  ZTrashBinSvg,
  ZAddCircleOutlineIcon,
  ZArrowDropdownIcon
} from '@/assets';

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

      {/* Action buttons */}
      <ZRUBox className='flex items-center justify-between py-3 border-b border-body/30'>
        <ZRUBox className='flex items-center gap-3'>
          {/* Select Checkbox */}
          <ZRUBox className='flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-md w-max'>
            <ZRUCheckbox />
            <ZRUText className='font-medium'>
              <ZRUText>0</ZRUText> selected
            </ZRUText>
          </ZRUBox>

          {/* Separator */}
          <ZRUSeparator
            orientation={ZRUOrientationE.vertical}
            size='2'
            color={ZRUColorE.violet}
          />

          {/* Edit Button */}
          <ZRUButton variant={ZRUVariantE.outline}>
            <ZEditIcon className='w-4 h-4' />
            Status
          </ZRUButton>

          {/* Separator */}
          <ZRUSeparator
            orientation={ZRUOrientationE.vertical}
            size='2'
            color={ZRUColorE.violet}
          />

          {/* Archive Button */}
          <ZRUButton variant={ZRUVariantE.outline}>
            <ZArchiveIcon className='w-4 h-4' />
            Archive
          </ZRUButton>

          {/* Delete Button */}
          <ZRUButton variant={ZRUVariantE.outline} color={ZRUColorE.tomato}>
            <ZTrashBinSvg className='w-4 h-4' />
            Delete
          </ZRUButton>
        </ZRUBox>

        <ZRUBox className='flex items-center gap-2'>
          {/* Group by */}
          <ZRUSelect
            label='Group by:'
            labelOrientation={ZRUOrientationE.horizontal}
            trigger={{
              placeholder: 'none'
            }}
          ></ZRUSelect>

          {/* Columns */}
          <ZRUSelect
            trigger={{
              placeholder: 'Columns'
            }}
          ></ZRUSelect>

          {/* Menu */}
          <ZRUSelect
            trigger={{
              placeholder: 'Menu'
            }}
          ></ZRUSelect>

          <ZRUButton>
            <ZAddCircleOutlineIcon className='w-5 h-5' /> Add a New Job
          </ZRUButton>
        </ZRUBox>
      </ZRUBox>

      {/* Table */}
      <ZRUBox className='relative mt-6 overflow-x-auto border border-medium/30 sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
          <thead className='text-xs uppercase text-lightDark bg-medium/10'>
            <tr className='*:px-3 *:py-2 *:border-e *:border-medium/30 last-of-type:*:border-transparent'>
              <th scope='col' className='!p-3'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                  />
                  <label htmlFor='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Job Position
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Company
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Max. Salary
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Location
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Status
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Date Saved
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Date Applied
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Follow up
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Excitement
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
              <th scope='col'>
                <ZRUBox className='flex items-center justify-between gap-1'>
                  Action
                  <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
                </ZRUBox>
              </th>
            </tr>
          </thead>

          <tbody className='bg-white/30 *:border-b last-of-type:*:border-transparent'>
            <tr className='*:px-3 *:py-2 *:border-e border-medium/30 *:border-medium/30 last-of-type:*:border-transparent'>
              <td scope='col' className='!p-3'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                  />
                  <label htmlFor='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>

              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
              <td scope='col' className='w-[11rem]'>
                <ZRUText className='line-clamp-2'>
                  Lorem ipsum dolor sit amet.
                </ZRUText>
              </td>
            </tr>
          </tbody>
        </table>
      </ZRUBox>

      {/* Table Pagination */}
      <ZRUBox className='flex flex-wrap items-center justify-between px-1 py-4 flex-column md:flex-row'>
        <ZRUText className='block w-full mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto'>
          Showing
          <ZRUText className='mx-1 font-semibold text-gray-900 dark:text-white'>
            1-10
          </ZRUText>
          of
          <ZRUText className='font-semibold text-gray-900 ms-1 dark:text-white'>
            1000
          </ZRUText>
        </ZRUText>
        <ul className='inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse *:flex *:items-center *:justify-center *:h-8 *:px-3 *:leading-tight *:text-medium *:bg-white *:border *:border-medium *:cursor-pointer *:ms-0 hover:*:bg-gray-100 hover:*:text-primary'>
          <li className='rounded-s-lg'>Previous</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li className='rounded-e-lg'>Next</li>
        </ul>
      </ZRUBox>
    </>
  );
};

export default JobTracker;
