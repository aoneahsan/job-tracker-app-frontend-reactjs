// #region ---- Core Imports ----
import React, { useMemo, useState } from 'react';
// #endregion

// #region ---- Packages Imports ----
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
// #endregion

// #region ---- Custom Imports ----
import {
  ZRUBox,
  ZRUCheckbox,
  ZRUSelect,
  ZRUSeparator,
  ZRUText
} from '@/components/RadixUI';
import ZJobPostForm from '@/components/auth/jobTracker/JobPostFormModal';
import constants from '@/utils/constants';
import {
  useZRQDeleteRequest,
  useZRQGetRequest,
  useZUpdateRQCacheData
} from '@/hooks/zreactquery.hooks';
import { queryKeys } from '@/utils/constants/query';
import { AppRoutes } from '@/Routes/AppRoutes';
import { useZNavigate } from '@/hooks/navigation.hook';
import { ZClassNames } from '@/Packages/ClassNames';
import { reportCustomError, showZConfirm } from '@/utils/helpers';
import { messages } from '@/utils/messages';
import { useZLoader, useZModal } from '@/hooks/globalComponents.hook';
import { showSuccessNotification } from '@/utils/helpers/notification';
// #endregion

// #region ---- Types Imports ----
import {
  ApiUrlEnum,
  RouteParams,
  ZRQUpdaterAction
} from '@/utils/enums/apis.enum';
import { ZJobI, ZJobsTableColumnsIds } from '@/types/jobs/index.type';
import {
  ZRUColorE,
  ZRUOrientationE,
  ZRUVariantE
} from '@/types/radixUI/index.type';
// #endregion

// #region ---- Images Imports ----
import {
  ZAddCircleOutlineIcon,
  ZArchiveIcon,
  ZArrowDropdownIcon,
  ZEditIcon,
  ZTrashBinSvg,
  ZInboxesIcon
} from '@/assets';
import modalsConstants from '@/utils/constants/modals';
import { ZButton } from 'zaions-react-ui-kit'
// #endregion

const ZJobsTable: React.FC = () => {
  // #region Component useSates
  const [zJobsTablePagination, setZJobsTablePagination] = useState({
    pageSize: 30,
    pageIndex: 0
  }); // zJobsTable pagination state
  // #endregion

  // #region Custom hooks
  const navigate = useZNavigate();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { showModal: showJobFormModal } = useZModal({
    component: ZJobPostForm,
    width: modalsConstants.modalsWidth.ZJobPostForm
  });
  const { showLoader, hideLoader } = useZLoader();
  // #endregion

  // #region APIs
  const { data: zJobsData, isFetching: isZJobsDataFetching } = useZRQGetRequest<
    Array<ZJobI>
  >({
    _url: ApiUrlEnum.jobs,
    _key: [queryKeys.jobs.list]
  });

  const { mutateAsync: deleteJobMutateAsync } = useZRQDeleteRequest({
    _url: ApiUrlEnum.jobsById
  });
  // #endregion

  // #region Functions
  const deleteJobHandler = async (jobId: string) => {
    try {
      showLoader(messages.jobs.deletingLoader);
      const _response = await deleteJobMutateAsync({
        urlDynamicParts: [RouteParams.jobId],
        itemIds: [jobId]
      });

      if (
        _response !== undefined &&
        _response !== null &&
        (_response as { success: boolean })?.success === true
      ) {
        await updateRQCDataHandler({
          key: [queryKeys.jobs.list],
          id: jobId,
          updaterAction: ZRQUpdaterAction.delete
        });

        hideLoader();
        showSuccessNotification(messages.jobs.deleted);
      }
    } catch (error) {
      hideLoader();
      reportCustomError(error);
    }
  };
  // #endregion

  // #region Table
  const columnHelper = createColumnHelper<ZJobI>();

  const zJobsTableColumns = useMemo(
    () => [
      columnHelper.display({
        id: ZJobsTableColumnsIds.id,
        header: '',
        cell: () => {
          return <ZRUCheckbox />;
        }
      }),

      columnHelper.accessor((job) => job.title, {
        id: ZJobsTableColumnsIds.title,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Job Position
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.companyName, {
        id: ZJobsTableColumnsIds.companyName,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Company
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.salary?.max, {
        id: ZJobsTableColumnsIds.maxSalary,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Max. Salary
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.location, {
        id: ZJobsTableColumnsIds.location,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Location
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.status?.currentStatus, {
        id: ZJobsTableColumnsIds.status,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Status
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.savedDate, {
        id: ZJobsTableColumnsIds.savedDate,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Date Saved
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.appliedDate, {
        id: ZJobsTableColumnsIds.appliedDate,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Date Applied
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.followUpDate, {
        id: ZJobsTableColumnsIds.followUpDate,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Follow Up
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.excitement, {
        id: ZJobsTableColumnsIds.excitement,
        header: () => {
          return (
            <ZRUBox className='flex items-center justify-between gap-1'>
              Excitement
              <ZArrowDropdownIcon className='w-5 h-5 cursor-pointer' />
            </ZRUBox>
          );
        },
        cell: (row) => {
          return (
            <ZRUText className='line-clamp-2'>
              {row.getValue() ?? constants.defaultValues.noValueFound}
            </ZRUText>
          );
        }
      }),

      columnHelper.accessor((job) => job.actions, {
        id: ZJobsTableColumnsIds.actions,
        header: 'Actions',
        cell: (row) => {
          return (
            <ZRUBox className='flex items-center justify-center w-full gap-2 line-clamp-2'>
              <ZButton
                color={ZRUColorE.violet}
                onClick={() => {
                  showJobFormModal({
                    componentProps: {
                      jobId: row?.row?.original?.id
                    }
                  });
                }}
              >
                Edit
              </ZButton>
              <ZButton
                color={ZRUColorE.tomato}
                onClick={async () => {
                  const { value } = await showZConfirm({
                    message: 'Are you sure you want to delete this job post?'
                  });

                  if (value === true) {
                    void deleteJobHandler(row?.row?.original?.id ?? '');
                  }
                }}
              >
                Delete
              </ZButton>
            </ZRUBox>
          );
        }
      })
    ],
    []
  );
  const zJobsTableData = useMemo(() => [...(zJobsData ?? [])], [zJobsData]);

  const zJobsTable = useReactTable({
    columns: zJobsTableColumns,
    data: zJobsTableData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: zJobsTablePagination
    },
    onPaginationChange: setZJobsTablePagination
  });
  // #endregion

  return (
    <>
      {/* Action buttons */}
      <ZRUBox className='flex items-center justify-between py-3 border-b border-body/30'>
        <ZRUBox className='flex items-center gap-3'>
          {/* Select Checkbox */}
          <ZRUBox className='flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-md w-max'>
            <ZRUCheckbox disabled={isZJobsDataFetching} />
            <ZRUText className='font-medium'>
              <ZRUText>0</ZRUText> selected
            </ZRUText>
          </ZRUBox>

          {/* Separator */}
          <ZRUSeparator
            orientation={ZRUOrientationE.vertical}
            size='2'
            color={ZRUColorE.violet}
          />

          {/* Edit Button */}
          <ZButton
            variant={ZRUVariantE.outline}
            disabled={isZJobsDataFetching}
          >
            <ZEditIcon className='w-4 h-4' />
            Status
          </ZButton>

          {/* Separator */}
          <ZRUSeparator
            orientation={ZRUOrientationE.vertical}
            size='2'
            color={ZRUColorE.violet}
          />

          {/* Archive Button */}
          <ZButton
            variant={ZRUVariantE.outline}
            disabled={isZJobsDataFetching}
          >
            <ZArchiveIcon className='w-4 h-4' />
            Archive
          </ZButton>

          {/* Delete Button */}
          <ZButton
            variant={ZRUVariantE.outline}
            color={ZRUColorE.tomato}
            disabled={isZJobsDataFetching}
          >
            <ZTrashBinSvg className='w-4 h-4' />
            Delete
          </ZButton>
        </ZRUBox>

        <ZRUBox className='flex items-center gap-2'>
          {/* Group by */}
          <ZRUSelect
            label='Group by:'
            labelOrientation={ZRUOrientationE.horizontal}
            trigger={{
              placeholder: 'none'
            }}
            disabled={isZJobsDataFetching}
          ></ZRUSelect>

          {/* Columns */}
          <ZRUSelect
            trigger={{
              placeholder: 'Columns'
            }}
            disabled={isZJobsDataFetching}
          ></ZRUSelect>

          {/* Menu */}
          <ZRUSelect
            trigger={{
              placeholder: 'Menu'
            }}
            disabled={isZJobsDataFetching}
          ></ZRUSelect>
          <ZButton
            disabled={isZJobsDataFetching}
            onClick={() => {
              showJobFormModal();
            }}
          >
            <ZAddCircleOutlineIcon className='w-5 h-5' /> Add a New Job
          </ZButton>
        </ZRUBox>
      </ZRUBox>

      <ZRUBox className='relative mt-6 overflow-x-auto border border-medium/30 sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
          <thead className='text-xs uppercase text-lightDark bg-medium/10'>
            {isZJobsDataFetching ? (
              <tr className='*:px-3 *:py-2 *:animate-pulse *:border-e *:border-medium/30 last-of-type:*:border-transparent first-of-type:*:w-max *:w-[11rem] h-9'>
                {[...Array(10)].map((_, index) => (
                  <th scope='col' key={index}>
                    <div className='h-4 rounded-sm bg-tertiary/20'></div>
                  </th>
                ))}
              </tr>
            ) : (
              zJobsTable
                ?.getHeaderGroups()
                ?.map((_headerInfo, _headerIndex) => {
                  return (
                    <tr
                      className='*:px-3 *:py-2 *:border-e *:border-medium/30 last-of-type:*:border-transparent'
                      key={_headerIndex}
                    >
                      {_headerInfo?.headers?.map(
                        (_columnInfo, _columnIndex) => {
                          return (
                            <th scope='col' key={_columnIndex}>
                              {flexRender(
                                _columnInfo.column.columnDef.header,
                                _columnInfo.getContext()
                              )}
                            </th>
                          );
                        }
                      )}
                    </tr>
                  );
                })
            )}
          </thead>

          <tbody className='bg-white/30 *:border-b last-of-type:*:border-transparent'>
            {isZJobsDataFetching
              ? [...Array(4)].map((_, index) => {
                  return (
                    <tr
                      key={index}
                      className='*:px-3 *:py-2 *:border-e border-medium/30 *:border-medium/30 last-of-type:*:border-transparent first-of-type:*:w-10 *:w-[11rem] h-9'
                    >
                      {[...Array(10)].map((_, index) => (
                        <td scope='col' key={index}>
                          <div className='h-4 rounded-sm bg-tertiary/20'></div>
                        </td>
                      ))}
                    </tr>
                  );
                })
              : zJobsTable?.getRowModel()?.rows?.map((_rowInfo, _rowIndex) => {
                  return (
                    <tr
                      key={_rowIndex}
                      className='*:px-3 *:py-2 *:border-e border-medium/30 *:border-medium/30 last-of-type:*:border-transparent'
                    >
                      {_rowInfo?.getAllCells()?.map((_cellInfo, _cellIndex) => {
                        return (
                          <td
                            key={_cellIndex}
                            scope='col'
                            className={ZClassNames({
                              'hover:bg-primary/10 cursor-pointer transition-all hover:underline':
                                _cellInfo?.column?.columnDef?.id ==
                                ZJobsTableColumnsIds.title,
                              'w-[13rem]':
                                _cellInfo?.column?.columnDef?.id !==
                                  ZJobsTableColumnsIds.id &&
                                _cellInfo?.column?.columnDef?.id !==
                                  ZJobsTableColumnsIds.actions
                            })}
                            onClick={() => {
                              if (
                                _cellInfo?.row?.original?.id?.trim()?.length &&
                                _cellInfo?.column?.columnDef?.id ==
                                  ZJobsTableColumnsIds.title
                              ) {
                                navigate({
                                  to: AppRoutes.dashboardSub.jobView
                                    .completePath,
                                  params: {
                                    jobId: _cellInfo?.row?.original?.id ?? ''
                                  }
                                });
                              }
                            }}
                          >
                            {flexRender(
                              _cellInfo.column.columnDef.cell,
                              _cellInfo.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {!isZJobsDataFetching && zJobsData?.length === 0 ? (
          <ZRUBox className='flex flex-col items-center justify-center w-full pt-6 pb-2 text-center text-tertiary gap-y-3'>
            <ZInboxesIcon className='w-8 h-8' />
            <ZRUText>No Jobs Found! Add a New Job.</ZRUText>
          </ZRUBox>
        ) : null}
      </ZRUBox>

      {/* Table Pagination */}
      <ZRUBox className='flex flex-wrap items-center justify-between px-1 py-4 flex-column md:flex-row'>
        <ZRUText className='block w-full mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto'>
          Showing
          <ZRUText className='mx-1 font-semibold text-gray-900 dark:text-white'>
            1-10
          </ZRUText>
          of
          <ZRUText className='font-semibold text-gray-900 ms-1 dark:text-white'>
            1000
          </ZRUText>
        </ZRUText>
        <ul className='inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse *:flex *:items-center *:justify-center *:h-8 *:px-3 *:leading-tight *:text-medium *:bg-white *:border *:border-medium *:cursor-pointer *:ms-0 hover:*:bg-gray-100 hover:*:text-primary'>
          <li
            className='rounded-s-lg'
            onClick={() => zJobsTable.previousPage()}
          >
            Previous
          </li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li className='rounded-e-lg'>Next</li>
        </ul>
      </ZRUBox>
    </>
  );
};

export default ZJobsTable;
