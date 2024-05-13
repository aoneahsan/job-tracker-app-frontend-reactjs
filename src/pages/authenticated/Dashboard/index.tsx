// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Outlet, useMatchRoute } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUText } from '@/components/RadixUI';
import { ZPage } from '@/components/Elements';
import constants from '@/utils/constants';
import { useZNavigate } from '@/hooks/navigation.hook';

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZArrowDropLeftIcon,
  ZHomeIcon,
  ZFileIcon,
  productWhiteLogo,
  ZStatsChartIconOutlineIcon,
  ZContactsBookIcon,
  ZBuildingsIcon,
  ZChartBarIcon,
  ZSearchSvg,
  ZQuestionCircleIcon
} from '@/assets';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

const Dashboard: React.FC = () => {
  // #region Hooks
  const navigate = useZNavigate();
  const matchRoute = useMatchRoute();
  // #endregion

  // #region Constants
  const pageHelmet = useMemo(
    () => ({
      title: `${constants.productInfo.name} - Dashboard - Zaions`
    }),
    []
  );
  // #endregion

  // #region Functions
  const jobTrackerPage = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobTracker.completePath
    });
  }, []);

  // #endregion

  // #region Routes Matches
  const isJobTrackerPage = matchRoute({
    to: AppRoutes.dashboardSub.jobTracker.completePath
  });

  const isJobTrackerViewPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.completePath
  });

  const isJobTrackerViewNotesPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.notes.completePath
  });

  const isJobTrackerViewContactsPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.contacts.completePath
  });

  const isJobTrackerViewAttachmentsPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.attachments.completePath
  });
  // #endregion

  return (
    <ZPage helmet={pageHelmet} className='flex !flex-row'>
      {/* Aside */}
      <aside className='h-screen text-sm sidebar-home justify-between flex flex-col bg-primary w-auto min-w-[auto] text-white p-3.5'>
        <ZRUBox className='w-full'>
          <ZRUBox className='flex items-center justify-between mb-8'>
            <img src={productWhiteLogo} alt='Product White Logo' />

            <ZArrowDropLeftIcon className='w-8 h-8 cursor-pointer' />
          </ZRUBox>

          <ul
            className='*:flex *:items-center *:gap-2 *:cursor-pointer *:mb-2 pt-2'
            role='list'
          >
            {/* Home */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZHomeIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>Home</ZRUText>
            </li>

            {/* Resume Builder */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZFileIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Resume Builder
              </ZRUText>
            </li>

            {/* Job Tracker */}
            <li className='group/item' onClick={jobTrackerPage}>
              <ZRUBox
                className={ZClassNames({
                  'flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20':
                    true,
                  'bg-white text-primary group-hover/item:bg-white':
                    isJobTrackerPage ||
                    isJobTrackerViewPage ||
                    isJobTrackerViewNotesPage ||
                    isJobTrackerViewContactsPage ||
                    isJobTrackerViewAttachmentsPage
                })}
              >
                <ZStatsChartIconOutlineIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Job Tracker
              </ZRUText>
            </li>

            {/* Contacts */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZContactsBookIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Contacts
              </ZRUText>
            </li>

            {/* Companies */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZBuildingsIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Companies
              </ZRUText>
            </li>

            {/* Work Styles */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZChartBarIcon className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Work Styles
              </ZRUText>
            </li>

            {/* Job Search */}
            <li className='group/item'>
              <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
                <ZSearchSvg className='w-[90%] h-[90%]' />
              </ZRUBox>
              <ZRUText className='text-base font-medium mt-[3px]'>
                Job Search
              </ZRUText>
            </li>
          </ul>
        </ZRUBox>

        <ul
          className='*:flex *:items-center *:gap-2 *:cursor-pointer *:mb-2 mt-2'
          role='list'
        >
          {/* Support Center */}
          <li className='group/item'>
            <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent rounded-full w-9 h-9 group-hover/item:bg-light/20'>
              <ZQuestionCircleIcon className='w-[90%] h-[90%]' />
            </ZRUBox>
            <ZRUText className='text-base font-medium mt-[1px]'>
              Support Center
            </ZRUText>
          </li>

          {/* Account */}
          <li className='group/item'>
            <ZRUBox className='flex items-center justify-center p-1 transition-all duration-500 bg-transparent border rounded-full w-9 h-9 group-hover/item:bg-light/20 border-light'>
              T
            </ZRUBox>
            <ZRUText className='text-base font-medium mt-[1px]'>
              Account
            </ZRUText>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <ZRUBox className='flex-1 h-screen px-5 py-4 bg-light'>
        <Outlet />
      </ZRUBox>
    </ZPage>
  );
};

export default Dashboard;
