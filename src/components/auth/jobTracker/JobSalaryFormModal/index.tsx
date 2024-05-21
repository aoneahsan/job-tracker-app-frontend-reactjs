// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRUSelect
} from '@/components/RadixUI';
import { ZFormik, ZFormikForm } from '@/Packages/Formik';
import {
  isZNonEmptyString,
  reportCustomError,
  zStringify
} from '@/utils/helpers';
import { ZCurrenciesData } from '@/data/currencies.data';
import payPeriod from '@/data/payPeriod.data';
import { extractInnerData } from '@/utils/helpers/apis';
import { queryKeys } from '@/utils/constants/query';
import { messages } from '@/utils/messages';
import { showSuccessNotification } from '@/utils/helpers/notification';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';

// #endregion

// #region ---- Types Imports ----
import { ZRUHeadingAsE, ZRUVariantE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZCloseIcon } from '@/assets';
import { ZJobI } from '@/types/jobs/index.type';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

const JobSalaryForm: React.FC<{ hideModal: () => void; jobId?: string }> = ({
  hideModal,
  jobId
}) => {
  // #region Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIs
  const { mutateAsync: updateJobMutateAsync, isPending: isUpdateJobPending } =
    useZRQUpdateRequest({
      _url: ApiUrlEnum.jobsById
    });

  const { data: zJobData, isFetching: isZJobDataFetching } =
    useZRQGetRequest<ZJobI>({
      _key: [queryKeys.jobs.get, jobId ?? ''],
      _url: ApiUrlEnum.jobsById,
      _urlDynamicParts: [RouteParams.jobId],
      _itemsIds: [jobId ?? ''],
      _shouldFetchWhenIdPassed: isZNonEmptyString(jobId),
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // #endregion

  // #region Functions
  const formikOnSubmitHandler = useCallback(async (data: string) => {
    try {
      if (jobId) {
        let _response = await updateJobMutateAsync({
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
              key: [queryKeys.jobs.get, jobId ?? ''],
              data: _data,
              updaterAction: ZRQUpdaterAction.updateHole,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });

            showSuccessNotification(messages.jobs.salaryUpdated);

            hideModal();
          }
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
      minSalary: zJobData?.salary?.min ?? '',
      maxSalary: zJobData?.salary?.max ?? '',
      currency: zJobData?.salary?.currency ?? '',
      period: zJobData?.salary?.period ?? ''
    }),
    [zJobData]
  );

  // #endregion

  return (
    <ZRUBox className='p-1'>
      <ZRUBox className='flex items-center justify-between'>
        <ZRUHeading
          as={ZRUHeadingAsE.h3}
          className='text-2xl font-semibold text-success-dark'
        >
          Edit Salary
        </ZRUHeading>

        <ZRUBox
          className={ZClassNames(
            'flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full cursor-pointer hover:bg-medium/20',
            {
              'opacity-85 !cursor-not-allowed': isUpdateJobPending
            }
          )}
          onClick={() => {
            if (!isUpdateJobPending) {
              hideModal();
            }
          }}
        >
          <ZCloseIcon className='w-[90%] h-[90%] text-medium' />
        </ZRUBox>
      </ZRUBox>

      <ZFormik
        enableReinitialize
        initialValues={formikInitialValues}
        onSubmit={(values) => {
          const _data = zStringify({
            salary: {
              min: values?.minSalary,
              max: values?.maxSalary,
              currency: values?.currency,
              period: values?.period
            }
          });

          void formikOnSubmitHandler(_data);
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit}>
              {isZJobDataFetching ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <ZRUBox
                      className='w-full h-12 rounded-sm mt-7 bg-tertiary/20'
                      key={index}
                    />
                  ))}
                </>
              ) : (
                <>
                  <ZRUInput
                    label='Min. Salary'
                    required
                    type='number'
                    placeholder='Enter Min. Salary (Enter a valid number)'
                    size='3'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    name='minSalary'
                    value={values?.minSalary}
                    errorNode={errors?.minSalary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.minSalary !== undefined
                        ? touched.minSalary &&
                          !isZNonEmptyString(errors?.minSalary)
                        : true
                    }
                  />

                  <ZRUInput
                    label='Max. Salary'
                    required
                    type='number'
                    placeholder='Enter Max. Salary (Enter a valid number)'
                    size='3'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    name='maxSalary'
                    value={values?.maxSalary}
                    errorNode={errors?.maxSalary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.maxSalary !== undefined
                        ? touched.maxSalary &&
                          !isZNonEmptyString(errors?.maxSalary)
                        : true
                    }
                  />

                  <ZRUSelect
                    options={ZCurrenciesData}
                    label='Currency'
                    className='mt-5'
                    value={values.currency}
                    onValueChange={(value) => {
                      setFieldValue('currency', value);
                    }}
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    position='popper'
                    trigger={{
                      placeholder: 'Select Currency',
                      className: 'w-full h-10'
                    }}
                  />

                  <ZRUSelect
                    label='Salary Pay Period'
                    className='mt-5'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    position='popper'
                    options={payPeriod}
                    trigger={{
                      placeholder: 'Select a Pay Period',
                      className: 'w-full h-10'
                    }}
                  />
                </>
              )}

              <ZRUBox className='flex items-center justify-end mt-5 *:tracking-wider'>
                {isZJobDataFetching ? (
                  <>
                    <ZRUBox className='w-20 rounded-sm h-7 bg-tertiary/20 me-3' />
                    <ZRUBox className='w-20 rounded-sm h-7 bg-tertiary/20' />
                  </>
                ) : (
                  <>
                    <ZRUButton
                      variant={ZRUVariantE.ghost}
                      disabled={isUpdateJobPending}
                      size='3'
                      className='font-medium me-3'
                      type='button'
                      onClick={() => {
                        hideModal();
                      }}
                    >
                      Cancel
                    </ZRUButton>
                    <ZRUButton
                      loading={isUpdateJobPending}
                      type='submit'
                      className='px-4'
                    >
                      Save Job
                    </ZRUButton>
                  </>
                )}
              </ZRUBox>
            </ZFormikForm>
          );
        }}
      </ZFormik>
    </ZRUBox>
  );
};

export default JobSalaryForm;
