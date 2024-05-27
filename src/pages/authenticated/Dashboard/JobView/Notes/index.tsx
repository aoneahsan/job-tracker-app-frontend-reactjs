// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import { ZRUBox, ZRUButton, ZRUText, ZRUTextArea } from '@/components/RadixUI';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import { AppRoutes } from '@/Routes/AppRoutes';
import { ZFormik } from '@/Packages/Formik';
import {
  isZNonEmptyString,
  reportCustomError,
  zStringify
} from '@/utils/helpers';

// #endregion

// #region ---- Types Imports ----
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { ZJobNote } from '@/types/jobs/index.type';

// #endregion

// #region ---- Images Imports ----
import { ZCloseCircleOutlineIcon, ZFileIcon } from '@/assets';
import { extractInnerData } from '@/utils/helpers/apis';
import { extractInnerDataOptionsEnum } from '@/types/apis/index.type';
import { showSuccessNotification } from '@/utils/helpers/notification';
import { messages } from '@/utils/messages';

// #endregion

const Notes: React.FC = () => {
  // #region Hooks
  const { jobId } = useParams({
    from: AppRoutes.dashboardSub.jobView.completePath
  });
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIs
  const { data: zJobNoteData, isFetching: isZJobNoteDataFetching } =
    useZRQGetRequest<ZJobNote>({
      _url: ApiUrlEnum.jobNote,
      _key: [queryKeys.jobs.note, jobId],
      _urlDynamicParts: [RouteParams.jobId],
      _itemsIds: [jobId],
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  const { mutateAsync: addJobNoteMutateAsync, isPending: isAddJobNotePending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.jobNote,
      _itemsIds: [jobId],
      _urlDynamicParts: [RouteParams.jobId]
    });
  // #endregion

  // #region Functions
  const formikSubmitHandler = useCallback(async (data: string) => {
    try {
      const _response = await addJobNoteMutateAsync(data);

      if (_response !== null && _response !== undefined) {
        const _data = extractInnerData<ZJobNote>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (
          _data !== null &&
          _data !== undefined &&
          isZNonEmptyString(_data?.id)
        ) {
          await updateRQCDataHandler({
            key: [queryKeys.jobs.note, jobId],
            data: _data,
            updaterAction: ZRQUpdaterAction.updateHole,
            extractType: ZRQGetRequestExtractEnum.extractItem
          });

          showSuccessNotification(messages.jobs.updateNote);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  // #endregion

  // #region Constant
  const formikInitialValues = useMemo(
    () => ({ note: zJobNoteData?.note ?? '' }),
    [zJobNoteData]
  );
  // #endregion

  return (
    <ZFormik
      enableReinitialize
      initialValues={formikInitialValues}
      onSubmit={(values) => {
        const zStringifyValues = zStringify(values);
        void formikSubmitHandler(zStringifyValues);
      }}
    >
      {({ setFieldValue, handleBlur, submitForm, values, dirty }) => {
        return (
          <ZRUBox className='py-4 w-[22rem] pe-1'>
            <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
              <ZRUText className='flex items-center'>
                <ZFileIcon className='w-5 h-5' />
                <ZRUText className='text-xl font-medium ms-2'>Notes</ZRUText>
              </ZRUText>

              <ZCloseCircleOutlineIcon className='w-6 h-6 cursor-pointer' />
            </ZRUBox>

            {isZJobNoteDataFetching ? (
              <ZRUBox className='w-[95%] mt-4 rounded-md h-20 ms-2 bg-tertiary/20'></ZRUBox>
            ) : (
              <ZRUTextArea
                className='px-2 mt-4'
                size='3'
                onChange={(event) => {
                  setFieldValue('note', event?.target?.value);
                }}
                onBlur={handleBlur}
                value={values.note}
              />
            )}

            {dirty ? (
              <ZRUBox className='px-2 mt-3 text-end'>
                <ZRUButton onClick={submitForm} loading={isAddJobNotePending}>
                  Save
                </ZRUButton>
              </ZRUBox>
            ) : null}
          </ZRUBox>
        );
      }}
    </ZFormik>
  );
};

export default Notes;
