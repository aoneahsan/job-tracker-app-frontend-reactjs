// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUButton, ZRUInput, ZRUText } from '@/components/RadixUI';
import {
  isZNonEmptyString,
  reportCustomError,
  zStringify
} from '@/utils/helpers';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZFormik } from '@/Packages/Formik';

// #endregion

// #region ---- Types Imports ----
import { ZJobI } from '@/types/jobs/index.type';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { extractInnerData } from '@/utils/helpers/apis';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZDates: React.FC = () => {
  // #region Hooks
  const { jobId } = useParams({
    from: AppRoutes.dashboardSub.jobView.completePath
  });
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIs
  const { data: zSelectedJobData } = useZRQGetRequest<ZJobI>({
    _url: ApiUrlEnum.jobsById,
    _key: [queryKeys.jobs.get, jobId],
    _urlDynamicParts: [RouteParams.jobId],
    _itemsIds: [jobId],
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });

  const {
    mutateAsync: updateJobDataMutateAsync,
    isPending: isUpdateJobDataPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.jobsById
  });
  // #endregion

  // #region Functions
  const formikSubmitHandler = useCallback(async (data: string) => {
    try {
      const _response = await updateJobDataMutateAsync({
        itemIds: [jobId],
        urlDynamicParts: [RouteParams.jobId],
        requestData: data
      });

      if (_response !== undefined && _response !== null) {
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

  // #endregion

  // #region Constants
  const formikInitialValues = useMemo(
    () => ({
      postedDate: zSelectedJobData?.postedDate ?? '',
      savedDate: zSelectedJobData?.savedDate ?? '',
      appliedDate: zSelectedJobData?.appliedDate ?? '',
      followUpDate: zSelectedJobData?.followUpDate ?? ''
    }),
    [zSelectedJobData]
  );
  // #endregion

  return (
    <ZFormik
      enableReinitialize
      initialValues={formikInitialValues}
      onSubmit={(values) => {
        const data = zStringify(values);
        void formikSubmitHandler(data);
      }}
    >
      {({ values, setFieldValue, handleBlur, dirty, submitForm }) => {
        return (
          <>
            <ZRUText className='block px-4 py-3 text-xl font-medium border-b border-tertiary/20 text-tertiary'>
              Dates
            </ZRUText>

            <ZRUBox className='px-4 pt-4 pb-6 border-b border-tertiary/20'>
              <ZRUBox className='flex items-center gap-2 *:flex-1'>
                <ZRUInput
                  type='date'
                  name='postedDate'
                  label='Posted'
                  labelClassName='text-[.8rem] text-medium/80'
                  value={values?.postedDate}
                  disabled={isUpdateJobDataPending}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    if (isZNonEmptyString(value?.target?.value ?? '')) {
                      setFieldValue('postedDate', value?.target?.value);
                    }
                  }}
                />
                <ZRUInput
                  type='date'
                  name='savedDate'
                  label='Saved'
                  disabled={isUpdateJobDataPending}
                  labelClassName='text-[.8rem] text-medium/80'
                  value={values?.savedDate}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    if (isZNonEmptyString(value?.target?.value ?? '')) {
                      setFieldValue('savedDate', value?.target?.value);
                    }
                  }}
                />
                <ZRUInput
                  type='date'
                  name='appliedDate'
                  label='Applied'
                  disabled={isUpdateJobDataPending}
                  labelClassName='text-[.8rem] text-medium/80'
                  value={values?.appliedDate}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    if (isZNonEmptyString(value?.target?.value ?? '')) {
                      setFieldValue('appliedDate', value?.target?.value);
                    }
                  }}
                />
                <ZRUInput
                  type='date'
                  name='followUpDate'
                  label='Follow Up'
                  disabled={isUpdateJobDataPending}
                  labelClassName='text-[.8rem] text-medium/80'
                  value={values?.followUpDate}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    if (isZNonEmptyString(value?.target?.value ?? '')) {
                      setFieldValue('followUpDate', value?.target?.value);
                    }
                  }}
                />
              </ZRUBox>
              {dirty && (
                <ZRUButton
                  onClick={submitForm}
                  className='w-20 mt-3 ms-auto'
                  loading={isUpdateJobDataPending}
                >
                  Save
                </ZRUButton>
              )}
            </ZRUBox>
          </>
        );
      }}
    </ZFormik>
  );
};

export default ZDates;
