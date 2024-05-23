// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUAccordingGroup,
  ZRUAccordionContent,
  ZRUAccordionItem,
  ZRUAccordionTrigger,
  ZRUBox,
  ZRUCheckbox,
  ZRUText
} from '@/components/RadixUI';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZFormik } from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';
import {
  isZNonEmptyString,
  reportCustomError,
  zConvertToBoolean,
  zStringify
} from '@/utils/helpers';
import { extractInnerData } from '@/utils/helpers/apis';

// #endregion

// #region ---- Types Imports ----
import {
  jobStatusInterface,
  ZJobGuidance,
  ZJobI,
  ZJobStatusEnum
} from '@/types/jobs/index.type';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { ZRUColorE } from '@/types/radixUI/index.type';
import { ZGenericObject } from '@/types/global/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowRightIcon, ZCheckIcon, ZLightbulbIcon } from '@/assets';

// #endregion

const ZStatusGuidance: React.FC = () => {
  // #region Hooks
  const { jobId } = useParams({
    from: AppRoutes.dashboardSub.jobView.completePath
  });
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
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

  const { data: zJobGuidanceData, isFetching: isZJobGuidanceDataFetching } =
    useZRQGetRequest<Array<ZJobGuidance>>({
      _url: ApiUrlEnum.jobGuidance,
      _key: [queryKeys.jobGuidance.list]
    });

  const {
    mutateAsync: updateJobStatusMutateAsync,
    isPending: isUpdateJobStatusPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.jobsStatus
  });

  // #endregion

  // #region Constants
  const formikInitialValues = useMemo(
    () => ({
      currentStatus:
        zSelectedJobData?.status?.currentStatus ?? ZJobStatusEnum.bookmarked
    }),
    [zSelectedJobData]
  );

  const zCurrentStatus = useMemo(
    () => zSelectedJobData?.status.currentStatus as keyof jobStatusInterface,
    [zSelectedJobData]
  );

  const zCurrentGuidanceChecks = useMemo(
    () => zSelectedJobData?.status[zCurrentStatus] as ZGenericObject<boolean>,
    [zSelectedJobData]
  );

  const zJobGuidanceList = useMemo(
    () =>
      zJobGuidanceData?.find(
        (el) => el.value === zSelectedJobData?.status?.currentStatus
      )?.list,
    [zJobGuidanceData, zSelectedJobData]
  );
  // #endregion

  // #region Functions
  const formikSubmitHandler = useCallback(async (data: string) => {
    try {
      const _response = await updateJobStatusMutateAsync({
        itemIds: [jobId],
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
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const zGuidanceStepCount = useCallback(() => {
    if (zCurrentGuidanceChecks && typeof zCurrentGuidanceChecks === 'object') {
      const totalSteps = Object.keys(zCurrentGuidanceChecks).length;
      const completedSteps = Object.values(zCurrentGuidanceChecks).filter(
        (value) => zConvertToBoolean(value) === true
      ).length;

      const completionPercentage = Math.round(
        (100 / totalSteps) * completedSteps
      );

      return completionPercentage;
    }

    return 0; // Return 0 if zCurrentGuidanceChecks is undefined or not an object
  }, [zCurrentGuidanceChecks]);
  // #endregion

  return (
    <ZFormik
      enableReinitialize
      initialValues={formikInitialValues}
      onSubmit={(values) => {
        const stringifyData = zStringify(values);

        void formikSubmitHandler(stringifyData);
      }}
    >
      {({ setFieldValue, submitForm }) => {
        return (
          <>
            {/* Status progress bar */}
            {isZSelectedJobDataFetching ? (
              <ZRUBox className='px-5'>
                <ZRUBox className='w-full my-3 mt-5 rounded-sm h-11 bg-tertiary/20' />
              </ZRUBox>
            ) : (
              <ZRUBox
                className={ZClassNames({
                  'flex items-center *:py-2 mt-5 *:flex-1 *:flex *:items-center *:justify-center *:bg-tertiary/60 gap-2 *:rounded-md overflow-hidden *:text-light/90 *:font-medium *:cursor-pointer py-3 px-5':
                    true,
                  '*:!cursor-not-allowed animate-pulse':
                    isUpdateJobStatusPending
                })}
              >
                {/* Bookmarked */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.bookmarked,
                    '!bg-success-shade text-light/90':
                      zSelectedJobData?.status?.currentStatus !==
                      ZJobStatusEnum.bookmarked
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.bookmarked &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.bookmarked
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Bookmarked</ZRUText>
                  {zSelectedJobData?.status?.currentStatus !==
                  ZJobStatusEnum.bookmarked ? (
                    <ZCheckIcon className='ms-auto me-4' />
                  ) : null}
                </ZRUBox>

                {/* Applying */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.applying,
                    '!bg-success-shade text-light/90': [
                      ZJobStatusEnum.applied,
                      ZJobStatusEnum.interviewing,
                      ZJobStatusEnum.negotiating,
                      ZJobStatusEnum.accepted
                    ].some(
                      (val) => val === zSelectedJobData?.status?.currentStatus
                    )
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.applying &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.applying
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Applying</ZRUText>
                  {[
                    ZJobStatusEnum.applied,
                    ZJobStatusEnum.interviewing,
                    ZJobStatusEnum.negotiating,
                    ZJobStatusEnum.accepted
                  ].some(
                    (val) => val === zSelectedJobData?.status?.currentStatus
                  ) ? (
                    <ZCheckIcon className='ms-auto me-4' />
                  ) : null}
                </ZRUBox>

                {/* Applied */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.applied,
                    '!bg-success-shade text-light/90': [
                      ZJobStatusEnum.interviewing,
                      ZJobStatusEnum.negotiating,
                      ZJobStatusEnum.accepted
                    ].some(
                      (val) => val === zSelectedJobData?.status?.currentStatus
                    )
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.applied &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.applied
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Applied</ZRUText>
                  {[
                    ZJobStatusEnum.interviewing,
                    ZJobStatusEnum.negotiating,
                    ZJobStatusEnum.accepted
                  ].some(
                    (val) => val === zSelectedJobData?.status?.currentStatus
                  ) ? (
                    <ZCheckIcon className='ms-auto me-4' />
                  ) : null}
                </ZRUBox>

                {/* Interviewing */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.interviewing,
                    '!bg-success-shade text-light/90': [
                      ZJobStatusEnum.negotiating,
                      ZJobStatusEnum.accepted
                    ].some(
                      (val) => val === zSelectedJobData?.status?.currentStatus
                    )
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.interviewing &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.interviewing
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Interviewing</ZRUText>
                  {[ZJobStatusEnum.negotiating, ZJobStatusEnum.accepted].some(
                    (val) => val === zSelectedJobData?.status?.currentStatus
                  ) ? (
                    <ZCheckIcon className='ms-auto me-4' />
                  ) : null}
                </ZRUBox>

                {/* Negotiating */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.negotiating,
                    '!bg-success-shade text-light/90':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.accepted
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.negotiating &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.negotiating
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Negotiating</ZRUText>
                </ZRUBox>

                {/* Accepted */}
                <ZRUBox
                  className={ZClassNames('z-arrow-right-clip', {
                    '!bg-light-blue-100 !text-primary !cursor-default':
                      zSelectedJobData?.status?.currentStatus ===
                      ZJobStatusEnum.accepted
                  })}
                  onClick={() => {
                    if (
                      zSelectedJobData?.status?.currentStatus !==
                        ZJobStatusEnum.accepted &&
                      !isUpdateJobStatusPending
                    ) {
                      setFieldValue(
                        'currentStatus',
                        ZJobStatusEnum.accepted
                      ).then(() => submitForm());
                    }
                  }}
                >
                  <ZRUText className='mx-auto'>Accepted</ZRUText>
                </ZRUBox>

                <ZRUBox>
                  <ZRUText className='mx-auto'>Close Job</ZRUText>
                  {/* <ZCheckIcon className='ms-auto me-3' /> */}
                </ZRUBox>
              </ZRUBox>
            )}

            {/* Guidance */}
            {isZSelectedJobDataFetching ? (
              <ZRUBox className='px-5 py-3 mt-5'>
                <ZRUBox className='w-full rounded-sm h-9 bg-tertiary/20' />
              </ZRUBox>
            ) : zJobGuidanceList !== undefined ? (
              <ZRUAccordingGroup
                type='multiple'
                className='px-5 py-3 mt-5'
                disabled={isUpdateJobStatusPending}
              >
                <ZRUAccordionItem value='guidance'>
                  <ZRUAccordionTrigger className='!bg-success-dark/40 !text-success-dark'>
                    <ZRUText className='flex items-center'>
                      <ZLightbulbIcon className='me-1' />
                      Guidance
                      <ZArrowRightIcon className='w-5 h-5 ms-1' />
                      <ZRUText className='font-normal'>
                        <ZRUText className='capitalize me-1'>
                          {zCurrentStatus}
                        </ZRUText>
                        Steps: {zGuidanceStepCount()}% Completed
                      </ZRUText>
                    </ZRUText>
                  </ZRUAccordionTrigger>
                  <ZRUAccordionContent className='!bg-success-dark/30'>
                    <ZRUAccordingGroup type='single' className='my-1'>
                      {zJobGuidanceList?.map((el, index) => {
                        const _value =
                          el?.value as keyof typeof zCurrentGuidanceChecks;
                        return (
                          <ZRUAccordionItem
                            value={el?.value}
                            key={index}
                            className='!bg-light'
                          >
                            <ZRUAccordionTrigger color={ZRUColorE.blue}>
                              <ZRUText className='font-medium'>
                                {el?.label}
                              </ZRUText>
                            </ZRUAccordionTrigger>
                            <ZRUAccordionContent>
                              <ZRUBox className='*:h-max m-3'>
                                <ZRUBox className='flex items-center gap-2 mb-3'>
                                  {/* Select Checkbox */}
                                  <ZRUCheckbox
                                    disabled={isUpdateJobStatusPending}
                                    onCheckedChange={(value) => {
                                      setFieldValue(el?.value, value).then(() =>
                                        submitForm()
                                      );
                                    }}
                                    className='cursor-pointer'
                                    checked={zConvertToBoolean(
                                      zCurrentGuidanceChecks
                                        ? zCurrentGuidanceChecks[_value]
                                        : false
                                    )}
                                  />
                                  <ZRUText className='font-medium'>
                                    {el?.label}
                                  </ZRUText>
                                </ZRUBox>

                                <ul className='*:mb-2 ms-1 px-4 *:text-success-dark list-disc *:underline hover:*:no-underline *:cursor-pointer *:w-max'>
                                  {el?.items?.map((item, index) => {
                                    return <li key={index}>{item?.text}</li>;
                                  })}
                                </ul>
                              </ZRUBox>
                            </ZRUAccordionContent>
                          </ZRUAccordionItem>
                        );
                      })}
                    </ZRUAccordingGroup>
                  </ZRUAccordionContent>
                </ZRUAccordionItem>
              </ZRUAccordingGroup>
            ) : null}
          </>
        );
      }}
    </ZFormik>
  );
};

export default ZStatusGuidance;
