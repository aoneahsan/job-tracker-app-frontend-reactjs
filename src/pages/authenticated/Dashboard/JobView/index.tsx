// #region ---- Core Imports ----
import React, { useCallback } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Outlet, useMatchRoute } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUAccordingGroup,
  ZRUAccordionContent,
  ZRUAccordionItem,
  ZRUAccordionTrigger,
  ZRUBox,
  ZRUButton,
  ZRUCheckbox,
  ZRUHeading,
  ZRUInput,
  ZRUProgress,
  ZRUScrollArea,
  ZRUSwitch,
  ZRUText,
  ZRUTextArea
} from '@/components/RadixUI';
import constants from '@/utils/constants';
import { useZNavigate } from '@/hooks/navigation.hook';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUScrollbarTypeE,
  ZRUScrollbarsE,
  ZRUTextAsE,
  ZRUVariantE
} from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZArrowRightIcon,
  ZCheckIcon,
  ZChevronForwardCircleOutline,
  ZEditIcon,
  ZStarOutlineIcon,
  ZLightbulbIcon,
  ZNotesIcon,
  ZAttachmentIcon,
  ZContactsBookIcon,
  ZMailOutlineIcon,
  ZCheckboxOutlineIcon
} from '@/assets';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

const JobView: React.FC = () => {
  // #region Hooks
  const navigate = useZNavigate();
  const matchRoute = useMatchRoute();
  // #endregion

  // #region Functions
  const addNotesRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.notes.completePath,
      params: {
        jobId: '123' // will be replace with original id when backend connected
      }
    });
  }, []);

  const addAttachmentsRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.attachments.completePath,
      params: {
        jobId: '123' // will be replace with original id when backend connected
      }
    });
  }, []);

  const addContactsRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.contacts.completePath,
      params: {
        jobId: '123' // will be replace with original id when backend connected
      }
    });
  }, []);

  //  #endregion

  // #region Routes Matches
  const isJobTrackerViewNotesPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.notes.completePath
  });

  const isJobTrackerViewContactsPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.contacts.completePath
  });

  const isJobTrackerViewAttachmentsPage = matchRoute({
    to: AppRoutes.dashboardSub.jobView.attachments.completePath
  });
  console.log({ isJobTrackerViewNotesPage });
  // #en
  // #endregion

  return (
    <ZRUBox className='flex items-start w-full h-full'>
      {/* Side bar/Jobs list */}
      <ZRUBox className='w-[17.5rem] border-e border-gray-100 h-full ps-5'>
        <ZRUText
          as={ZRUTextAsE.div}
          className='p-2 font-medium border-b border-tertiary/40 bg-warning/20'
        >
          Jobs
        </ZRUText>

        <ZRUBox className='p-2 overflow-hidden border-b cursor-pointer border-tertiary/40 hover:bg-success-shade/5 bg-success-shade/5'>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-sm font-medium line-clamp-1'
          >
            React Native Developer - Xtecsoft
          </ZRUText>
          <ZRUText
            as={ZRUTextAsE.p}
            className='text-sm font-medium line-clamp-1'
          >
            Karāchi, Sindh, Pakistan
          </ZRUText>
        </ZRUBox>

        <ZRUBox className='p-2 overflow-hidden border-b cursor-pointer border-tertiary/40 hover:bg-success-shade/5'>
          <ZRUText as={ZRUTextAsE.p} className='text-sm line-clamp-1'>
            React Native Developer - Xtecsoft
          </ZRUText>
          <ZRUText as={ZRUTextAsE.p} className='text-sm line-clamp-1'>
            Karāchi, Sindh, Pakistan
          </ZRUText>
        </ZRUBox>
      </ZRUBox>

      {/* Main content */}
      <ZRUBox className='flex items-start flex-1 h-full'>
        <ZRUBox className='h-full p-1 border-gray-100 border-e w-max'>
          <ZRUBox className='flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full cursor-pointer hover:bg-primary/20'>
            <ZChevronForwardCircleOutline className='w-[90%] h-[90%] text-primary' />
          </ZRUBox>
        </ZRUBox>

        <ZRUBox className='flex-1 h-full'>
          {/* Info */}
          <ZRUBox className='flex items-start *:flex-1 py-3 px-5'>
            <ZRUBox className='flex items-start gap-2 p-px transition-all duration-300 border border-transparent rounded-sm group hover:border-warning-shade/50'>
              <ZRUBox className='flex-1'>
                <ZRUHeading className='text-3xl tracking-wide'>
                  React Native Developer - Xtecsoft
                </ZRUHeading>

                <ZRUHeading
                  as={ZRUHeadingAsE.h3}
                  className='mt-1 tracking-wide'
                >
                  <ZRUText className='text-xl'>
                    Karāchi, Sindh, Pakistan
                  </ZRUText>
                  <ZRUText className='text-lg font-medium text-tertiary/80 ms-1'>
                    — 44 minutes ago
                  </ZRUText>
                </ZRUHeading>

                <ZRUText className='block text-base font-normal text-body'>
                  Saved a day ago on
                  <ZRUText className='underline cursor-pointer ms-1 text-primary hover:no-underline'>
                    linkedin.com
                  </ZRUText>
                </ZRUText>
              </ZRUBox>

              <ZRUBox>
                <ZRUBox className='flex items-center justify-center w-8 h-8 p-1 mt-1 transition-all duration-500 bg-transparent rounded-full opacity-0 cursor-pointer hover:bg-warning-shade/20 me-2 group-hover:opacity-100'>
                  <ZEditIcon className='w-[90%] h-[90%] text-warning-shade' />
                </ZRUBox>
              </ZRUBox>
            </ZRUBox>

            <ZRUBox className='flex flex-col items-end'>
              <ZRUBox className='flex items-center p-1 border border-transparent gap-14 group w-max hover:border-warning-shade/50'>
                <ZRUBox className='flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full opacity-0 cursor-pointer hover:bg-warning-shade/20 me-2 group-hover:opacity-100'>
                  <ZEditIcon className='w-[90%] h-[90%] text-warning-shade' />
                </ZRUBox>

                <ZRUHeading as={ZRUHeadingAsE.h3} className='text-3xl'>
                  $278.00
                </ZRUHeading>
              </ZRUBox>

              <ZRUBox className='flex items-center w-max gap-2 mt-3 *:w-5 *:h-5 *:cursor-pointer *:text-warning-shade'>
                <ZStarOutlineIcon />
                <ZStarOutlineIcon />
                <ZStarOutlineIcon />
                <ZStarOutlineIcon />
                <ZStarOutlineIcon />
              </ZRUBox>
            </ZRUBox>
          </ZRUBox>

          {/* Status progress bar */}
          <ZRUBox className='flex items-center *:py-2 mt-5 *:flex-1 *:flex *:items-center *:justify-center *:bg-tertiary/60 gap-2 *:rounded-md overflow-hidden *:text-light/90 *:font-medium *:cursor-pointer py-3 px-5'>
            <ZRUBox className='!bg-success-shade text-light/90 z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Bookmarked</ZRUText>
              <ZCheckIcon className='ms-auto me-4' />
            </ZRUBox>

            <ZRUBox className='!bg-light-blue-100 !text-primary !cursor-default z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Applying</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>

            <ZRUBox className='z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Applied</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>

            <ZRUBox className='z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Interviewing</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>

            <ZRUBox className='z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Negotiating</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>

            <ZRUBox className='z-arrow-right-clip'>
              <ZRUText className='mx-auto'>Accepted</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>

            <ZRUBox>
              <ZRUText className='mx-auto'>Close Job</ZRUText>
              {/* <ZCheckIcon className='ms-auto me-3' /> */}
            </ZRUBox>
          </ZRUBox>

          {/* Guidance */}
          <ZRUAccordingGroup type='multiple' className='px-5 py-3 mt-5'>
            <ZRUAccordionItem value='guidance'>
              <ZRUAccordionTrigger className='!bg-success-dark/40 !text-success-dark'>
                <ZRUText className='flex items-center'>
                  <ZLightbulbIcon className='me-1' />
                  Guidance
                  <ZArrowRightIcon className='w-5 h-5 ms-1' />
                  <ZRUText className='font-normal'>
                    Applied Step 0% Complete
                  </ZRUText>
                </ZRUText>
              </ZRUAccordionTrigger>
              <ZRUAccordionContent className='!bg-success-dark/30 '>
                <ZRUBox className='flex *:h-max *:py-3 *:px-4 *:bg-white m-3'>
                  <ZRUBox className='rounded-s-md'>
                    {/* Select Checkbox */}
                    <ZRUBox className='flex items-center gap-2'>
                      <ZRUCheckbox />
                      <ZRUText className='font-medium'>
                        Follow up on Job Applications
                      </ZRUText>
                    </ZRUBox>
                  </ZRUBox>
                  <ZRUBox className='flex-1 rounded-e-md'>
                    <ul className='*:mb-2 px-4 *:text-success-dark list-disc *:underline hover:*:no-underline *:cursor-pointer *:w-max'>
                      <li>Send 1st follow up on 5/17/2024</li>
                      <li>Send 2nd follow up on 5/24/2024</li>
                      <li>Send 3rd follow up on 5/31/2024</li>
                      <li>
                        Archive job on job tracker if you haven't heard back
                        after 3 weeks
                      </li>
                    </ul>
                  </ZRUBox>
                </ZRUBox>
              </ZRUAccordionContent>
            </ZRUAccordionItem>
          </ZRUAccordingGroup>

          {/* Drawer toolbar */}
          <ZRUBox className='flex items-center *:me-5 *:font-medium px-6 py-4 mt-2 border-t border-gray-100'>
            {/* Notes */}
            <ZRUButton
              size='3'
              className='text-success-dark'
              onClick={addNotesRoute}
              variant={
                isJobTrackerViewNotesPage ? ZRUVariantE.soft : ZRUVariantE.ghost
              }
            >
              <ZNotesIcon className='w-5 h-5' /> Notes
            </ZRUButton>

            <ZRUButton
              size='3'
              className='text-success-dark'
              onClick={addAttachmentsRoute}
              variant={
                isJobTrackerViewAttachmentsPage
                  ? ZRUVariantE.soft
                  : ZRUVariantE.ghost
              }
            >
              <ZAttachmentIcon className='w-5 h-5' /> Attachments
            </ZRUButton>

            <ZRUButton
              size='3'
              className='text-success-dark'
              onClick={addContactsRoute}
              variant={
                isJobTrackerViewContactsPage
                  ? ZRUVariantE.soft
                  : ZRUVariantE.ghost
              }
            >
              <ZContactsBookIcon className='w-5 h-5' /> Contacts
            </ZRUButton>

            <ZRUButton
              variant={ZRUVariantE.ghost}
              size='3'
              className='text-success-dark'
            >
              <ZMailOutlineIcon className='w-5 h-5' /> Email Templates
            </ZRUButton>

            <ZRUButton
              variant={ZRUVariantE.ghost}
              size='3'
              className='text-success-dark'
            >
              <ZCheckboxOutlineIcon className='w-5 h-5' /> Check List
            </ZRUButton>
          </ZRUBox>

          {/* Job info */}
          <ZRUBox className='flex items-start border-t border-gray-100'>
            <ZRUScrollArea
              type={ZRUScrollbarTypeE.auto}
              scrollbars={ZRUScrollbarsE.vertical}
              className='flex-1'
            >
              <ZRUBox className='h-[33rem] me-2'>
                {/* Date */}
                <ZRUText className='block px-4 py-3 text-xl font-medium border-b border-tertiary/20 text-tertiary'>
                  Dates
                </ZRUText>

                <ZRUBox className='flex items-center gap-2 *:flex-1 px-4 pt-4 pb-6 border-b border-tertiary/20'>
                  <ZRUInput type='date' />
                  <ZRUInput type='date' />
                  <ZRUInput type='date' />
                  <ZRUInput type='date' />
                </ZRUBox>

                {/* Summary */}
                <ZRUBox className='flex items-center justify-between w-full px-4 py-3 border-b border-tertiary/20 me-3'>
                  <ZRUText className='block text-xl font-medium text-tertiary '>
                    Summary
                  </ZRUText>

                  <ZRUBox className='flex items-center gap-2 px-3 py-1 w-max'>
                    <ZRUSwitch />
                    <ZRUText className='font-medium'>
                      Show full job description
                    </ZRUText>
                  </ZRUBox>
                </ZRUBox>

                <ZRUBox className='flex items-start gap-1 py-2 *:flex-1 px-5'>
                  <ZRUBox>
                    {/* About the Job */}
                    <ZRUHeading as={ZRUHeadingAsE.h5} className='text-[1.1rem]'>
                      About the Job
                    </ZRUHeading>

                    <ZRUText className='text-[.9rem] font-medium'>
                      Xtecsoft is looking for a React Native Developer with 2 to
                      4 years of experience in front-end development. The
                      location for this position is Gulshan e Iqbal Block 7,
                      Karachi.
                    </ZRUText>

                    {/* Job Responsibilities */}
                    <ZRUHeading
                      as={ZRUHeadingAsE.h5}
                      className='text-[1.1rem] mt-3'
                    >
                      Job Responsibilities
                    </ZRUHeading>

                    <ul className='list-disc *:my-1 ms-4 *:text-[.9rem]'>
                      <li>Develop and maintain React Native applications</li>

                      <li>
                        Implement UI/UX designs using React JS and Material UI
                      </li>
                    </ul>

                    {/* Requirements */}
                    <ZRUHeading
                      as={ZRUHeadingAsE.h5}
                      className='text-[1.1rem] mt-3'
                    >
                      Requirements
                    </ZRUHeading>

                    <ul className='list-disc *:my-1 ms-4 *:text-[.9rem]'>
                      <li>Experience with React JS and Material UI</li>

                      <li>Strong knowledge of JavaScript fundamentals</li>
                    </ul>
                  </ZRUBox>

                  <ZRUBox>
                    {/* Hard Skills */}
                    <ZRUBox>
                      <ZRUBox className='flex items-center gap-2 py-1 w-max'>
                        <ZRUSwitch />
                        <ZRUText className='font-semibold'>Hard Skills</ZRUText>
                      </ZRUBox>

                      <ul className='*:py-2 mt-3 ps-1 *:flex *:items-center *:justify-between *:border-t *:border-tertiary/40 last-of-type:*:border-b'>
                        <li>
                          <ZRUText className='font-medium cursor-pointer ps-1 hover:underline'>
                            React
                          </ZRUText>

                          <ZRUBox className='w-[40%] flex items-center gap-1'>
                            <ZRUText className='font-medium'>4</ZRUText>
                            <ZRUProgress
                              value={100}
                              size='3'
                              color={ZRUColorE.green}
                            />
                          </ZRUBox>
                        </li>

                        <li>
                          <ZRUText className='font-medium cursor-pointer ps-1 hover:underline'>
                            Javascript
                          </ZRUText>

                          <ZRUBox className='w-[40%] flex items-center gap-1'>
                            <ZRUText className='font-medium'>4</ZRUText>
                            <ZRUProgress
                              value={100}
                              size='3'
                              color={ZRUColorE.green}
                            />
                          </ZRUBox>
                        </li>

                        {[...Array(10)].map((el, index) => {
                          return (
                            <li key={index}>
                              <ZRUText className='font-medium cursor-pointer ps-1 hover:underline'>
                                Javascript
                              </ZRUText>

                              <ZRUBox className='w-[40%] flex items-center gap-1'>
                                <ZRUText className='font-medium'>4</ZRUText>
                                <ZRUProgress
                                  value={100}
                                  size='3'
                                  color={ZRUColorE.green}
                                />
                              </ZRUBox>
                            </li>
                          );
                        })}
                      </ul>

                      <ZRUText className='inline-block mt-4 underline cursor-pointer hover:no-underline ms-2 text-success-dark'>
                        Show all 10
                      </ZRUText>
                    </ZRUBox>

                    {/* Soft Skills */}
                    <ZRUBox className='relative'>
                      <ZRUBox className='flex items-center gap-2 py-1 w-max mt-7 z-blur'>
                        <ZRUSwitch />
                        <ZRUText className='font-semibold'>Soft Skills</ZRUText>
                      </ZRUBox>

                      <ul className='*:py-2 mt-3 ps-1 *:flex *:items-center *:justify-between z-blur *:border-t *:border-tertiary/40 last-of-type:*:border-b'>
                        <li>
                          <ZRUText className='font-medium cursor-pointer ps-1 hover:underline'>
                            React
                          </ZRUText>

                          <ZRUBox className='w-[40%] flex items-center gap-1'>
                            <ZRUText className='font-medium'>0</ZRUText>
                            <ZRUProgress
                              value={0}
                              size='3'
                              color={ZRUColorE.green}
                            />
                          </ZRUBox>
                        </li>

                        <li>
                          <ZRUText className='font-medium cursor-pointer ps-1 hover:underline'>
                            Javascript
                          </ZRUText>

                          <ZRUBox className='w-[40%] flex items-center gap-1'>
                            <ZRUText className='font-medium'>0</ZRUText>
                            <ZRUProgress
                              value={0}
                              size='3'
                              color={ZRUColorE.green}
                            />
                          </ZRUBox>
                        </li>
                      </ul>

                      <ZRUBox className='absolute flex flex-col items-center justify-center p-5 text-white -translate-x-1/2 -translate-y-1/2 rounded-lg top-1/2 left-1/2 bg-primary w-max'>
                        <ZRUText className='block text-lg'>
                          Unlock
                          <ZRUText className='mx-1 font-medium'>
                            8 Keywords
                          </ZRUText>
                          to land more interviews
                        </ZRUText>

                        <ZRUButton
                          className='w-full mt-3 rounded-full px-7'
                          color={ZRUColorE.yellow}
                          size='3'
                        >
                          Upgrade to {constants.productInfo.name}+
                        </ZRUButton>
                      </ZRUBox>
                    </ZRUBox>
                  </ZRUBox>
                </ZRUBox>
              </ZRUBox>
            </ZRUScrollArea>

            <Outlet />
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default JobView;
