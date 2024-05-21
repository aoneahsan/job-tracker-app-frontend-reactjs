// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import isURL from 'validator/lib/isURL';

// #endregion

// #region ---- Custom Imports ----
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { extractInnerData } from '@/utils/helpers/apis';
import {
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/helpers';
import { queryKeys } from '@/utils/constants/query';
import { showSuccessNotification } from '@/utils/helpers/notification';
import { messages } from '@/utils/messages';
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRUTextArea
} from '@/components/RadixUI';
import { ZFormik, ZFormikForm } from '@/Packages/Formik';

// #endregion

// #region ---- Types Imports ----
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { ZStatusEnum, type ZJobI } from '@/types/jobs/index.type';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import { ZRUHeadingAsE, ZRUVariantE } from '@/types/radixUI/index.type';
import { zValidationRuleE } from '@/utils/enums/index.enum';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZCloseIcon } from '@/assets';

// #endregion

const ZJobPostForm: React.FC<{ hideModal: () => void; jobId?: string }> = ({
  hideModal,
  jobId
}) => {
  const isEditState = useMemo(
    () => (isZNonEmptyString(jobId) ? true : false),
    [jobId]
  );

  // #region Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIs
  const { mutateAsync: createJobMutateAsync, isPending: isCreateJobPending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.jobs
    });

  const { mutateAsync: updateJobMutateAsync, isPending: isUpdateJobPending } =
    useZRQUpdateRequest({
      _url: ApiUrlEnum.jobsById
    });

  const { data: zJobData, isFetching: isZJobDataFetching } =
    useZRQGetRequest<ZJobI>({
      _key: [queryKeys.jobs.get, jobId!],
      _url: ApiUrlEnum.jobsById,
      _urlDynamicParts: [RouteParams.jobId],
      _itemsIds: [jobId!],
      _shouldFetchWhenIdPassed: !isEditState,
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });
  // #endregion

  // #region Functions
  const formikOnSubmitHandler = useCallback(async (data: string) => {
    try {
      let _response;

      if (isEditState) {
        _response = await updateJobMutateAsync({
          itemIds: [jobId!],
          urlDynamicParts: [RouteParams.jobId],
          requestData: data
        });
      }

      _response = await createJobMutateAsync(data);
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
            updaterAction: isEditState
              ? ZRQUpdaterAction.replace
              : ZRQUpdaterAction.add
          });

          if (isEditState) {
            await updateRQCDataHandler({
              key: [queryKeys.jobs.get, jobId!],
              data: _data,
              updaterAction: ZRQUpdaterAction.updateHole,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
          }

          showSuccessNotification(
            isEditState ? messages.jobs.update : messages.jobs.added
          );

          hideModal();
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const fromikValidateHandler = useCallback((values: ZJobI) => {
    try {
      const errors: { urlForOriginalPosting?: string } = {};

      validateFields(
        ['title', 'location', 'companyName'],
        values as Record<string, unknown>,
        errors,
        [
          zValidationRuleE.string,
          zValidationRuleE.string,
          zValidationRuleE.string
        ]
      );

      if (
        isZNonEmptyString(values?.urlForOriginalPosting) &&
        !isURL(values?.urlForOriginalPosting ?? '')
      ) {
        errors.urlForOriginalPosting = messages.formValidations.urlNotValid;
      } else {
        delete errors.urlForOriginalPosting;
      }
      return errors;
    } catch (error) {
      reportCustomError(error);
    }
  }, []);
  // #endregion

  // #region Constants
  const formikInitialValues = useMemo<ZJobI>(
    () => ({
      title: zJobData?.title ?? '',
      urlForOriginalPosting: zJobData?.urlForOriginalPosting ?? '',
      companyName: zJobData?.companyName ?? '',
      description: zJobData?.description ?? '',
      location: zJobData?.location ?? ''
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
          {isZJobDataFetching ? (
            <ZRUBox className='w-full h-8 rounded-sm bg-tertiary/20' />
          ) : (
            `${isEditState ? 'Edit' : 'Add a New'} Job Post`
          )}
        </ZRUHeading>

        <ZRUBox
          className='flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full cursor-pointer hover:bg-medium/20'
          onClick={() => {
            hideModal();
          }}
        >
          <ZCloseIcon className='w-[90%] h-[90%] text-medium' />
        </ZRUBox>
      </ZRUBox>

      <ZFormik
        enableReinitialize
        initialValues={formikInitialValues}
        validate={fromikValidateHandler}
        onSubmit={(values) => {
          const data = zStringify({
            ...values,
            status: {
              currentStatus: ZStatusEnum.bookmarked
            }
          });
          void formikOnSubmitHandler(data);
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit
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

                  <ZRUBox className='w-full h-24 mt-5 rounded-sm bg-tertiary/20' />
                </>
              ) : (
                <>
                  <ZRUInput
                    label='Job Title'
                    required
                    size='3'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    placeholder='Job title'
                    name='title'
                    value={values?.title}
                    errorNode={errors?.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.title !== undefined
                        ? touched.title && !isZNonEmptyString(errors?.title)
                        : true
                    }
                  />

                  <ZRUInput
                    label='URL for Original Posting'
                    size='3'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    placeholder='URL for Original Posting'
                    name='urlForOriginalPosting'
                    value={values?.urlForOriginalPosting}
                    errorNode={errors?.urlForOriginalPosting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.urlForOriginalPosting !== undefined
                        ? touched.urlForOriginalPosting &&
                          !isZNonEmptyString(errors?.urlForOriginalPosting)
                        : true
                    }
                  />

                  <ZRUInput
                    label='Company Name'
                    size='3'
                    required
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    placeholder='Company Name'
                    name='companyName'
                    value={values?.companyName}
                    errorNode={errors?.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.companyName !== undefined
                        ? touched.companyName &&
                          !isZNonEmptyString(errors?.companyName)
                        : true
                    }
                  />

                  <ZRUInput
                    label='Location'
                    size='3'
                    required
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    placeholder='Location'
                    name='location'
                    value={values?.location}
                    errorNode={errors?.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.location !== undefined
                        ? touched.location &&
                          !isZNonEmptyString(errors?.location)
                        : true
                    }
                  />

                  <ZRUTextArea
                    label='Job Description'
                    placeholder='Job Description'
                    labelClassName='font-semibold mb-1 block text-[.8rem]'
                    className='mt-5'
                    rows={5}
                    name='description'
                    value={values?.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                      disabled={isCreateJobPending || isUpdateJobPending}
                      variant={ZRUVariantE.ghost}
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
                      disabled={isCreateJobPending || isUpdateJobPending}
                      loading={isCreateJobPending || isUpdateJobPending}
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

export default ZJobPostForm;
