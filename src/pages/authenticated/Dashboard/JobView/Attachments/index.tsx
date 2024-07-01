// #region ---- Core Imports ----
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useParams } from '@tanstack/react-router';

// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUButton,
  ZRUHeading,
  ZRUInput,
  ZRUText
} from '@/components/RadixUI';
import {
  listZFirebaseFiles,
  uploadZFirebaseFile
} from '@/utils/helpers/firebase';
import { isZNonEmptyString, reportCustomError } from '@/utils/helpers';
import { AppRoutes } from '@/Routes/AppRoutes';
import modalsConstants from '@/utils/constants/modals';
import { ZUploadInput } from '@/components/Elements';
import { ZClassNames } from '@/Packages/ClassNames';
import { useZModal } from '@/hooks/globalComponents.hook';

// #endregion

// #region ---- Types Imports ----
import { ZFBStorageBucketFoldersEnum } from '@/types/firebase';
import { ZRUHeadingAsE, ZRUVariantE } from '@/types/radixUI/index.type';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZAttachmentIcon,
  ZCloseCircleOutlineIcon,
  ZCloseIcon,
  ZEllipsisVerticalIcon,
  ZFileIcon
} from '@/assets';
import { ZFormik } from '@/Packages/Formik';
import { messages } from '@/utils/messages';
import constants from '@/utils/constants';
// #endregion

const AttachmentModal: React.FC<{
  hideModal: (fileUrl: { url: string; name: string } | null) => void;
  jobId?: string;
}> = ({ hideModal, jobId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const addJobAttachment = useCallback(
    async (values: { name?: string; file: File | null }) => {
      try {
        setLoading(() => true);
        if (values?.file !== undefined && values?.file !== null) {
          const _response = await uploadZFirebaseFile({
            file: values?.file,
            fileName: isZNonEmptyString(values?.name)
              ? values?.name
              : undefined,
            folderName: `${ZFBStorageBucketFoldersEnum.jobsData}/${jobId}`
          });

          if (isZNonEmptyString(_response?.url) && _response !== null) {
            setLoading(() => false);

            hideModal(_response);
          }
        }

        if (loading) {
          setLoading(() => false);
        }
      } catch (error) {
        setLoading(() => false);
        reportCustomError(error);
      }
    },
    []
  );

  const formikValidation = useCallback(
    (value: { name: string; file: File | null }) => {
      const errors: { file?: string } = {};

      if (value?.file === null) {
        errors.file = messages.general.file.required;
      }
      if (
        value?.file !== null &&
        (value?.file?.size ?? 0) > constants.file.maxSize * 1024 * 1024
      ) {
        errors.file = messages.general.file.size;
      }

      return errors;
    },
    []
  );

  const fromikInitialValues = useMemo<{
    name: string;
    file: File | null;
  }>(
    () => ({
      name: '',
      file: null
    }),
    []
  );

  return (
    <ZRUBox className='p-1'>
      <ZRUBox className='flex items-center justify-between'>
        <ZRUHeading
          as={ZRUHeadingAsE.h3}
          className='text-2xl font-semibold text-success-dark'
        >
          Attach File
        </ZRUHeading>

        <ZRUBox
          className={ZClassNames(
            'flex items-center justify-center w-8 h-8 p-1 transition-all duration-500 bg-transparent rounded-full hover:bg-medium/20',
            {
              'cursor-not-allowed': loading,
              'cursor-pointer': !loading
            }
          )}
          onClick={() => {
            if (!loading) {
              hideModal(null);
            }
          }}
        >
          <ZCloseIcon className='w-[90%] h-[90%] text-medium' />
        </ZRUBox>
      </ZRUBox>

      <ZFormik
        initialValues={fromikInitialValues}
        validate={(values) => {
          return formikValidation(values);
        }}
        onSubmit={(values) => {
          void addJobAttachment(values);
        }}
      >
        {({
          setFieldValue,
          submitForm,
          handleBlur,
          handleChange,
          values,
          errors,
          isValid
        }) => {
          return (
            <>
              <ZRUBox className='mt-5'>
                <ZRUInput
                  placeholder='Enter File Name'
                  label='Name'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size='3'
                  labelClassName='font-semibold mb-1 block text-[.8rem]'
                />

                <ZUploadInput
                  onChange={(e) => {
                    setFieldValue('file', e.target.files?.[0] ?? null);
                  }}
                  isValid={errors.file === undefined}
                  errorNode={errors?.file}
                />
              </ZRUBox>

              <ZRUBox className='flex items-center justify-end mt-5 *:tracking-wider'>
                <ZRUButton
                  variant={ZRUVariantE.ghost}
                  size='3'
                  className='font-medium me-3'
                  type='button'
                  disabled={loading}
                  onClick={() => {
                    if (!loading) {
                      hideModal(null);
                    }
                  }}
                >
                  Cancel
                </ZRUButton>
                <ZRUButton
                  loading={loading}
                  disabled={!isValid}
                  type='submit'
                  className='px-4'
                  onClick={() => {
                    if (isValid) {
                      void submitForm();
                    }
                  }}
                >
                  Save Job
                </ZRUButton>
              </ZRUBox>
            </>
          );
        }}
      </ZFormik>
    </ZRUBox>
  );
};

const Attachments: React.FC = () => {
  const [jobAttachments, setJobAttachments] = useState<
    Array<{ url: string; name: string }>
  >([]);

  // #region Hooks
  const { jobId } = useParams({
    from: AppRoutes.dashboardSub.jobView.completePath
  });

  const { showModal: showAttachmentModal } = useZModal({
    component: AttachmentModal,
    width: modalsConstants.modalsWidth.ZAttachmentForm,
    componentProps: {
      jobId
    },
    onDidDismiss: (data) => {
      const _data = data as { url: string; name: string } | null;
      if (_data !== null && isZNonEmptyString(_data?.url)) {
        setJobAttachments([...jobAttachments, _data]);
      }
    }
  });
  // #endregion

  // #region Functions
  const getJobAttachments = useCallback(async () => {
    const attachments = await listZFirebaseFiles(
      `${ZFBStorageBucketFoldersEnum.jobsData}/${jobId}`
    );
    if (attachments !== null) {
      console.log({ attachments });
      setJobAttachments(() => [...attachments]);
    }
  }, []);
  // #endregion

  // #region useEffect
  useEffect(() => {
    void getJobAttachments();
  }, []);
  console.log({ jobAttachments });
  // #endregion

  return (
    <ZRUBox className='py-4 w-[22rem] pe-1'>
      <ZRUBox className='flex items-center justify-between p-2 border-b text-tertiary border-tertiary/20'>
        <ZRUText className='flex items-center'>
          <ZAttachmentIcon className='w-5 h-5' />
          <ZRUText className='text-xl font-medium ms-2'>Attachments</ZRUText>
        </ZRUText>

        <ZCloseCircleOutlineIcon className='w-6 h-6 cursor-pointer' />
      </ZRUBox>

      <ZRUBox className='py-3 mx-2'>
        <ZRUInput placeholder='Search Teal Resumes' />
        <ZRUButton
          className='w-full mt-3'
          onClick={() => {
            showAttachmentModal();
          }}
        >
          Create A New Resume
        </ZRUButton>
      </ZRUBox>

      {/* <ZRUBox className='py-3 mx-2 border-b border-tertiary/20'>
        <ZRUBox className='flex items-start p-2 border rounded-md border-tertiary/30'>
          <ZRUBox>
            <ZRUText className='block mb-2 text-sm font-medium text-primary'>
              React Native Developer - Xtecsoft at Karāchi, Sindh, Pakistan
            </ZRUText>

            <ZRUText className='text-base text-tertiary me-4'>
              Match: <ZRUText className='font-semibold'>31%</ZRUText>
            </ZRUText>
            <ZRUText className='text-base text-tertiary'>
              Score: <ZRUText className='font-semibold'>31%</ZRUText>
            </ZRUText>
          </ZRUBox>

          <ZRUBox className='flex items-center justify-center p-2 border border-gray-100 rounded-md cursor-pointer hover:border-primary hover:bg-primary/20 hover:text-primary'>
            <ZEllipsisVerticalIcon />
          </ZRUBox>
        </ZRUBox>
      </ZRUBox> */}
      <ZRUBox className='py-3 mx-2 border-b border-tertiary/20'>
        {jobAttachments.map((attachment, index) => {
          return (
            <ZRUBox
              className='flex items-start p-2 border rounded-md border-tertiary/30'
              key={index}
            >
              <ZRUBox className='mt-1 me-2'>
                <ZFileIcon className='w-6 h-6 text-medium/80' />
              </ZRUBox>
              <ZRUBox className='overflow-hidden line-clamp-1'>
                <ZRUText className='block mb-2 overflow-hidden text-sm font-medium line-clamp-1 text-primary'>
                  {attachment?.name}
                </ZRUText>
              </ZRUBox>

              <ZRUBox className='flex items-center justify-center p-2 border border-gray-100 rounded-md cursor-pointer hover:border-primary hover:bg-primary/20 hover:text-primary'>
                <ZEllipsisVerticalIcon />
              </ZRUBox>
            </ZRUBox>
          );
        })}
      </ZRUBox>
    </ZRUBox>
  );
};

export default React.memo(Attachments);
