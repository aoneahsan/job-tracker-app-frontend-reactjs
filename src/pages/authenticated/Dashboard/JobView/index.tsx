// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----

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
  ZRUScrollArea,
  ZRUText
} from '@/components/RadixUI';

// #endregion

// #region ---- Types Imports ----
import {
  ZRUColorE,
  ZRUHeadingAsE,
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
  ZCheckboxOutline
} from '@/assets';

// #endregion

const JobView: React.FC = () => {
  return (
    <ZRUBox className='flex items-start w-full h-full'>
      {/* Side bar/Jobs list */}
      <ZRUBox className='w-[17.5rem] border-e border-gray-100 h-full'>
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
          <ZRUBox className='flex items-start *:flex-1 p-3'>
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
          <ZRUBox className='flex items-center *:py-2 mt-5 *:flex-1 *:flex *:items-center *:justify-center *:bg-tertiary/60 gap-2 *:rounded-md overflow-hidden *:text-light/90 *:font-medium *:cursor-pointer p-3'>
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
          <ZRUAccordingGroup type='multiple' className='p-3 mt-5'>
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
              variant={ZRUVariantE.ghost}
              size='3'
              className='text-success-dark'
            >
              <ZNotesIcon className='w-5 h-5' /> Notes
            </ZRUButton>

            <ZRUButton
              variant={ZRUVariantE.ghost}
              size='3'
              className='text-success-dark'
            >
              <ZAttachmentIcon className='w-5 h-5' /> Attachments
            </ZRUButton>

            <ZRUButton
              variant={ZRUVariantE.ghost}
              size='3'
              className='text-success-dark'
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
              <ZCheckboxOutline className='w-5 h-5' /> Check List
            </ZRUButton>
          </ZRUBox>

          {/* Job info */}
          <ZRUBox className='border-t border-gray-100'>
            <ZRUScrollArea>
              <ZRUAccordingGroup type='multiple'>
                <ZRUAccordionItem value='date' className='!rounded-none'>
                  <ZRUAccordionTrigger className='py-4 border-b border-body/30'>
                    <ZRUText className='block text-xl text-tertiary'>
                      Dates
                    </ZRUText>
                  </ZRUAccordionTrigger>

                  <ZRUAccordionContent className='p-3'>
                    <ZRUBox className='flex items-center gap-2 *:flex-1'>
                      <ZRUInput type='date' className='' />
                      <ZRUInput type='date' />
                      <ZRUInput type='date' />
                      <ZRUInput type='date' />
                    </ZRUBox>
                  </ZRUAccordionContent>
                </ZRUAccordionItem>
              </ZRUAccordingGroup>
            </ZRUScrollArea>
          </ZRUBox>
        </ZRUBox>
      </ZRUBox>
    </ZRUBox>
  );
};

export default JobView;
