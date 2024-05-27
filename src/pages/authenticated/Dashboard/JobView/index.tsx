// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Outlet, useMatchRoute, useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUProgress,
  ZRUScrollArea,
  ZRUSwitch,
  ZRUText
} from '@/components/RadixUI';
import ZJobPostForm from '@/components/auth/jobTracker/JobPostFormModal';
import ZJobSalaryForm from '@/components/auth/jobTracker/JobSalaryFormModal';
import ZDates from '@/components/auth/jobView/Dates';
import ZStatusGuidance from '@/components/auth/jobView/StatusGuidance';
import constants from '@/utils/constants';
import { useZNavigate } from '@/hooks/navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import { ZClassNames } from '@/Packages/ClassNames';
import { useZModal } from '@/hooks/globalComponents.hook';
import modalsConstants from '@/utils/constants/modals';
import { ZCurrenciesData } from '@/data/currencies.data';
import ZReactStars from '@/Packages/ReactStars';
import {
  isZNonEmptyString,
  isZValidNumbers,
  reportCustomError,
  zStringify
} from '@/utils/helpers';
import { extractInnerData } from '@/utils/helpers/apis';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import { showSuccessNotification } from '@/utils/helpers/notification';
import { messages } from '@/utils/messages';

// #endregion

// #region ---- Types Imports ----
import { ZJobI, ZJobPeriodEnum } from '@/types/jobs/index.type';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
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
  ZChevronForwardCircleOutline,
  ZEditIcon,
  ZNotesIcon,
  ZAttachmentIcon,
  ZContactsBookIcon,
  ZMailOutlineIcon,
  ZCheckboxOutlineIcon,
  ZAddCircleOutlineIcon
} from '@/assets';

// #endregion

const JobView: React.FC = () => {
  // #region Hooks
  const { jobId } = useParams({
    from: AppRoutes.dashboardSub.jobView.completePath
  });

  const navigate = useZNavigate();
  const matchRoute = useMatchRoute();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  const { showModal: showJobEditFormModal } = useZModal({
    component: ZJobPostForm,
    width: modalsConstants.modalsWidth.ZJobPostForm,
    componentProps: {
      jobId
    }
  });

  const { showModal: showJobSalaryFormModal } = useZModal({
    component: ZJobSalaryForm,
    width: modalsConstants.modalsWidth.ZJobSalaryForm,
    componentProps: {
      jobId
    }
  });
  // #endregion

  // #region APIs
  const { data: zSelectedJobData, isFetching: isZSelectedJobDataFetching } =
    useZRQGetRequest<ZJobI>({
      _url: ApiUrlEnum.jobsById,
      _key: [queryKeys.jobs.get, jobId],
      _urlDynamicParts: [RouteParams.jobId],
      _itemsIds: [jobId],
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  const { mutateAsync: updateJobMutateAsync, isPending: isUpdateJobPending } =
    useZRQUpdateRequest({
      _url: ApiUrlEnum.jobsById
    });
  // #endregion

  // #region Functions
  const updateJobHandler = useCallback(async (data: string) => {
    try {
      const _response = await updateJobMutateAsync({
        itemIds: [jobId!],
        urlDynamicParts: [RouteParams.jobId],
        requestData: data
      });

      if (_response !== null && _response !== undefined) {
        const _data = extractInnerData<ZJobI>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (
          _data !== null &&
          _data !== undefined &&
          isZNonEmptyString(_data?.id)
        ) {
          await updateRQCDataHandler({
            key: [queryKeys.jobs.list],
            data: _data,
            id: jobId, // available only in edit state
            updaterAction: ZRQUpdaterAction.replace
          });
          await updateRQCDataHandler({
            key: [queryKeys.jobs.get, jobId!],
            data: _data,
            updaterAction: ZRQUpdaterAction.updateHole,
            extractType: ZRQGetRequestExtractEnum.extractItem
          });

          showSuccessNotification(messages.jobs.update);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const addNotesRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.notes.completePath,
      params: {
        jobId: jobId
      }
    });
  }, []);

  const addAttachmentsRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.attachments.completePath,
      params: {
        jobId: jobId
      }
    });
  }, []);

  const addContactsRoute = useCallback(() => {
    navigate({
      to: AppRoutes.dashboardSub.jobView.contacts.completePath,
      params: {
        jobId: jobId
      }
    });
  }, []);

  const getSalaryPeriodText = useCallback(() => {
    try {
      const _period = zSelectedJobData?.salary?.period;
      if (isZNonEmptyString(_period)) {
        switch (_period) {
          case ZJobPeriodEnum.hourly:
            return '/hr';
          case ZJobPeriodEnum.weekly:
            return '/wk';
          case ZJobPeriodEnum.monthly:
            return '/mth';
          case ZJobPeriodEnum.yearly:
            return '/yr';
          default:
            return '';
        }
      }

      return '';
    } catch (error) {
      reportCustomError(error);
      return '';
    }
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
  // #endregion

  const _jobSalaryCurrencySymbol = useMemo(
    () =>
      ZCurrenciesData?.find(
        (el) => el.value === zSelectedJobData?.salary?.currency
      )?.symbol ?? '',
    [zSelectedJobData]
  );

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
      <ZRUBox
        className={ZClassNames('flex items-start flex-1 h-full', {
          'animate-pulse': isZSelectedJobDataFetching
        })}
      >
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
                  {isZSelectedJobDataFetching ? (
                    <ZRUBox className='w-full h-8 rounded-sm bg-tertiary/20' />
                  ) : (
                    `${zSelectedJobData?.title} - ${zSelectedJobData?.companyName}`
                  )}
                </ZRUHeading>

                <ZRUHeading
                  as={ZRUHeadingAsE.h3}
                  className='mt-1 tracking-wide'
                >
                  {isZSelectedJobDataFetching ? (
                    <ZRUBox className='w-full h-6 mt-1 rounded-sm bg-tertiary/20' />
                  ) : (
                    <>
                      <ZRUText className='text-xl'>
                        {zSelectedJobData?.location}
                      </ZRUText>
                      <ZRUText className='text-lg font-medium text-tertiary/80 ms-1'>
                        — 44 minutes ago
                      </ZRUText>
                    </>
                  )}
                </ZRUHeading>

                <ZRUText className='block text-base font-normal text-body'>
                  {isZSelectedJobDataFetching ? (
                    <ZRUBox className='w-full h-5 mt-2 rounded-sm bg-tertiary/20' />
                  ) : (
                    <>
                      Saved a day ago on
                      <ZRUText className='underline cursor-pointer ms-1 text-primary hover:no-underline'>
                        linkedin.com
                      </ZRUText>
                    </>
                  )}
                </ZRUText>
              </ZRUBox>

              <ZRUBox>
                <ZRUBox
                  className='flex items-center justify-center w-8 h-8 p-1 mt-1 transition-all duration-500 bg-transparent rounded-full opacity-0 cursor-pointer hover:bg-warning-shade/20 me-2 group-hover:opacity-100'
                  onClick={() => {
                    showJobEditFormModal();
                  }}
                >
                  <ZEditIcon className='w-[90%] h-[90%] text-warning-shade' />
                </ZRUBox>
              </ZRUBox>
            </ZRUBox>

            <ZRUBox className='flex flex-col items-end'>
              <ZRUBox
                className={ZClassNames(
                  'flex items-center p-1 border border-transparent gap-14 group w-max',
                  {
                    'hover:border-warning-shade/50': isZValidNumbers([
                      zSelectedJobData?.salary?.min,
                      zSelectedJobData?.salary?.max
                    ])
                  }
                )}
              >
                {isZSelectedJobDataFetching ? null : isZValidNumbers([
                    zSelectedJobData?.salary?.min,
                    zSelectedJobData?.salary?.max
                  ]) ? (
                  <>
                    <ZRUBox
                      className='flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full opacity-0 cursor-pointer hover:bg-warning-shade/20 me-2 group-hover:opacity-100'
                      onClick={() => {
                        showJobSalaryFormModal();
                      }}
                    >
                      <ZEditIcon className='w-[90%] h-[90%] text-warning-shade' />
                    </ZRUBox>

                    <ZRUHeading as={ZRUHeadingAsE.h3} className='text-3xl'>
                      {isZSelectedJobDataFetching ? (
                        <ZRUBox className='mt-2 rounded-sm w-36 h-7 bg-tertiary/20' />
                      ) : (
                        `${Boolean(zSelectedJobData?.salary?.min) ? _jobSalaryCurrencySymbol + zSelectedJobData?.salary?.min + ' - ' : ''} ${_jobSalaryCurrencySymbol}${zSelectedJobData?.salary?.max ?? ''}`
                      )}
                      <sub className='text-base font-thin'>
                        {getSalaryPeriodText()}
                      </sub>
                    </ZRUHeading>
                  </>
                ) : (
                  <ZRUButton
                    onClick={() => {
                      showJobSalaryFormModal();
                    }}
                    size='3'
                    variant={ZRUVariantE.ghost}
                  >
                    <ZAddCircleOutlineIcon className='w-6 h-6' /> Add Salary
                    Range
                  </ZRUButton>
                )}
              </ZRUBox>

              {isZSelectedJobDataFetching ? (
                <ZRUBox className='mt-2 rounded-sm w-36 me-1 h-7 bg-tertiary/20' />
              ) : (
                <ZRUBox
                  className={ZClassNames(
                    'flex items-center w-max gap-2 mt-1 *:cursor-pointer *:text-warning-shade',
                    {
                      'animate-pulse': isUpdateJobPending
                    }
                  )}
                >
                  <ZReactStars
                    count={5}
                    size={28}
                    value={zSelectedJobData?.excitement as number}
                    disabled={isUpdateJobPending}
                    onChange={(value) => {
                      const data = zStringify({
                        excitement: value
                      });

                      void updateJobHandler(data);
                    }}
                  />
                </ZRUBox>
              )}
            </ZRUBox>
          </ZRUBox>

          {/* Status Bar & Guidance */}
          <ZStatusGuidance />

          {/* Drawer toolbar */}
          {isZSelectedJobDataFetching ? (
            <ZRUBox className='px-6 py-4 mt-2 border-t border-gray-100'>
              <ZRUBox className='w-full rounded-sm h-9 bg-tertiary/20' />
            </ZRUBox>
          ) : (
            <ZRUBox className='flex items-center *:me-5 *:font-medium px-6 py-4 mt-2 border-t border-gray-100'>
              {/* Notes */}
              <ZRUButton
                size='3'
                className='text-success-dark'
                onClick={addNotesRoute}
                variant={
                  isJobTrackerViewNotesPage
                    ? ZRUVariantE.soft
                    : ZRUVariantE.ghost
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
          )}

          {/* Job info */}
          <ZRUBox className='flex items-start border-t border-gray-100'>
            {isZSelectedJobDataFetching ? (
              <ZRUBox className='w-full px-4 py-2'>
                <ZRUBox className='w-full rounded-sm h-[33rem] bg-tertiary/20' />
              </ZRUBox>
            ) : (
              <ZRUScrollArea
                type={ZRUScrollbarTypeE.auto}
                scrollbars={ZRUScrollbarsE.vertical}
                className='flex-1'
              >
                <ZRUBox className='h-[33rem] me-2'>
                  {/* Date */}
                  <ZDates />

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
                    {/* <ZRUBox>
                      {/* About the Job * /}
                      <ZRUHeading
                        as={ZRUHeadingAsE.h5}
                        className='text-[1.1rem]'
                      >
                        About the Job
                      </ZRUHeading>

                      <ZRUText className='text-[.9rem] font-medium'>
                        Xtecsoft is looking for a React Native Developer with 2
                        to 4 years of experience in front-end development. The
                        location for this position is Gulshan e Iqbal Block 7,
                        Karachi.
                      </ZRUText>

                      {/* Job Responsibilities * /}
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

                      {/* Requirements * /}
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
                    </ZRUBox> */}
                    <ZRUBox>
                      {isZNonEmptyString(zSelectedJobData?.description) ? (
                        <ZRUText>{zSelectedJobData?.description}</ZRUText>
                      ) : (
                        <ZRUBox>
                          <ZRUText className='text-[.9rem] font-medium text-base mt-2 block'>
                            No description available
                          </ZRUText>
                          <ZRUButton
                            className='mt-4'
                            onClick={() => {
                              showJobEditFormModal();
                            }}
                          >
                            <ZAddCircleOutlineIcon className='w-5 h-5' /> Add
                            Description
                          </ZRUButton>
                        </ZRUBox>
                      )}
                    </ZRUBox>

                    <ZRUBox>
                      {/* Hard Skills */}
                      <ZRUBox>
                        <ZRUBox className='flex items-center gap-2 py-1 w-max'>
                          <ZRUSwitch />
                          <ZRUText className='font-semibold'>
                            Hard Skills
                          </ZRUText>
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
                          <ZRUText className='font-semibold'>
                            Soft Skills
                          </ZRUText>
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
            )}
            {isZSelectedJobDataFetching ? null : <Outlet />}
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default JobView;
