import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { toastConsole } from '@/features/console/common/toastConsole';
import WebhookDetail from './WebhookDetail';
import Filter, {
  ColumnConditionType,
  ConditionType,
  DateConditionType,
  SelectedConditionsType,
} from '@/features/console/common/Filter';
import FilterDateRange from '@/features/console/common/FilterDateRange';
import FilterConditions from '@/features/console/common/FilterConditions';
import { useRouter } from 'next/router';
import Accordion from '@/features/common/components/common/Accordion/Accordion';
import { AppWebhookLogsQueryResponse } from '@/generated/api/api-service';
import dayjs from 'dayjs';

export const WebhookLog = observer(() => {
  const { webhookLogStore: store, commonStore } = useStore();
  const router = useRouter();

  const [showDetail, setShowDetail] = useState(false);
  const [selectedNo, setSelectedNo] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<
    SelectedConditionsType[]
  >([]);
  const [selectedConditionsTemp, setSelectedConditionsTemp] = useState<
    SelectedConditionsType[]
  >([]);
  const [currentRange, setCurrentRange] = useState('a');

  useEffect(() => {
    if (router.query.appId) {
      store.load(Number(router.query.appId)).then();
    }
  }, [store, router.isReady, commonStore.currentChainId]);

  useEffect(() => {
    renderConditions();
  }, []);

  const deleteCondition = (field: string) => {
    setSelectedConditions((prev) => {
      return [...prev.filter((f) => f.field !== field)];
    });
  };

  const renderChecked = (field: string, value: string) => {
    return (
      ((selectedConditions?.find((f) => f.field === field) as ConditionType)
        ?.condition as ColumnConditionType[])?.[0].value === value
    );
  };

  const renderConditions = () => {
    if (store.filterData) {
      const arry: { key: string; value: string }[] = Object.entries(
        store.filterData
      ).map(([key, value]) => ({ key, value }));
      console.log('arry', arry);
    }
  };

  const inputFilterData = () => {
    selectedConditions.forEach((v) => {
      switch (v.field) {
        case 'date': {
          store.filterData!.from = (v.condition as DateConditionType).from;
          store.filterData!.to = (v.condition as DateConditionType).to;
          break;
        }
        default: {
          store.filterData![
            v.field as 'webhookKindCd' | 'logStatus'
          ] = (v.condition as ColumnConditionType[])?.[0].value as any;
        }
      }
    });
  };

  return (
    <>
      <TableWrapperCard style={{ width: '100%', marginTop: 24 }}>
        <DataTable
          value={store.listData?.data}
          paginator={
            store.listData &&
            store.listData.data &&
            store.listData.data.length > 10
          }
          onPage={(e) => {
            // console.log('e', e);
            store.pageData.pageNo = e.page! + 1 ?? 1;
          }}
          first={(store.pageData.pageNo - 1) * store.pageData.pageSize}
          rows={store.pageData.pageSize}
          totalRecords={store.listData?.total}
          header={
            <div className={'flex flex-row justify-center align-items-center'}>
              <span>Webhook log</span>
              <BasicTag
                color={'l-gray'}
                line={'on'}
                styleClass={'round'}
                stateDot={false}
                containerStyle={{ marginLeft: '0.5rem' }}
              >
                Total {(store.listData?.total ?? 0).toLocaleString()} logs
              </BasicTag>
              <Filter
                onClose={(e) => {
                  console.log('close', e);
                  renderConditions();
                  if (e === 'apply') {
                    setSelectedConditionsTemp(selectedConditions);
                  } else if (e === 'close') {
                    setCurrentRange(
                      (selectedConditionsTemp.find((f) => f.field === 'date')
                        ?.condition as DateConditionType)?.id ?? 'a'
                    );
                    setSelectedConditions(selectedConditionsTemp);
                  } else {
                    setCurrentRange('a');
                    setSelectedConditions([]);
                    setSelectedConditionsTemp([]);
                    store.init();
                    store.load(Number(router.query.appId)).then();
                  }
                }}
                onApply={() => {
                  // console.log('onApply', store.filterData);
                  inputFilterData();
                  store.load(Number(router.query.appId)).then();
                }}
                selectedConditions={
                  <>
                    {selectedConditions.map((v) => {
                      if (Array.isArray(v.condition)) {
                        if (
                          v.condition[0]?.value &&
                          v.condition[0].value !== 'all'
                        )
                          return (
                            <span key={v.field}>
                              {v.condition[0].name}
                              <button
                                onClick={() => {
                                  deleteCondition(v.field);
                                  setTimeout(() => inputFilterData());
                                  store.load(Number(router.query.appId)).then();
                                }}
                              />
                            </span>
                          );
                      } else {
                        if (v.condition.from) {
                          return (
                            <span key={v.field}>
                              {v.condition.from} ~ {v.condition.to}
                              <button
                                onClick={() => {
                                  deleteCondition(v.field);
                                  setCurrentRange('a');
                                  setTimeout(() => inputFilterData());
                                  store.load(Number(router.query.appId)).then();
                                }}
                              />
                            </span>
                          );
                        }
                      }
                    })}
                  </>
                }
                body={
                  <Accordion
                    items={[
                      {
                        title: 'Date range (within the last 1 years)',
                        open: true,
                        content: (
                          <FilterDateRange
                            currentRange={currentRange}
                            selected={(e) => {
                              console.log('e.condition.id', e.condition.id);
                              setCurrentRange(e.condition.id);
                              if (e.condition.id !== 'a') {
                                // store.filterData!.to = e.condition.to;
                                // store.filterData!.from = e.condition.from;
                                setSelectedConditions((prev) => {
                                  if (prev) {
                                    return [
                                      ...prev.filter(
                                        (f) => f.field !== e.field
                                      ),
                                      e,
                                    ];
                                  } else {
                                    return [e];
                                  }
                                });
                              } else {
                                // store.filterData!.to = undefined;
                                // store.filterData!.from = undefined;
                                setSelectedConditions((prev) => {
                                  return [
                                    ...prev.filter((f) => f.field !== e.field),
                                  ];
                                });
                              }
                            }}
                          />
                        ),
                      },
                      // {
                      //   title: 'Profile',
                      //   open: !!selectedConditions.find(
                      //     (f) => f.field === 'profile'
                      //   ),
                      //   content: (
                      //     <FilterConditions
                      //       conditions={{
                      //         field: 'profile',
                      //         condition: [
                      //           {
                      //             name: 'All',
                      //             value: 'all',
                      //             checked:
                      //               !renderChecked('profile', 'DEV') &&
                      //               !renderChecked('profile', 'PRD'),
                      //           },
                      //           {
                      //             name: 'Test',
                      //             value: 'DEV',
                      //             checked: renderChecked('profile', 'DEV'),
                      //           },
                      //           {
                      //             name: 'Production',
                      //             value: 'PRD',
                      //             checked: renderChecked('profile', 'PRD'),
                      //           },
                      //         ],
                      //       }}
                      //       selected={(e) => {
                      //         if (e.condition[0]?.value !== 'all') {
                      //           // store.filterData!.profile = e.condition[0]
                      //           //   .value as 'DEV' | 'PRD';
                      //           setSelectedConditions((prev) => {
                      //             if (prev) {
                      //               return [
                      //                 ...prev.filter(
                      //                   (f) => f.field !== e.field
                      //                 ),
                      //                 e,
                      //               ];
                      //             } else {
                      //               return [e];
                      //             }
                      //           });
                      //         } else {
                      //           // store.filterData!.profile = undefined;
                      //           setSelectedConditions((prev) => {
                      //             return [
                      //               ...prev.filter((f) => f.field !== e.field),
                      //             ];
                      //           });
                      //         }
                      //       }}
                      //     />
                      //   ),
                      // },
                      {
                        title: 'Webhook type',
                        open: !!selectedConditions.find(
                          (f) => f.field === 'webhookKindCd'
                        ),
                        content: (
                          <FilterConditions
                            conditions={{
                              field: 'webhookKindCd',
                              condition: [
                                {
                                  name: 'All',
                                  value: 'all',
                                  checked:
                                    !renderChecked('webhookKindCd', 'SWAP') &&
                                    !renderChecked(
                                      'webhookKindCd',
                                      'TOKEN_IN'
                                    ) &&
                                    !renderChecked(
                                      'webhookKindCd',
                                      'NFT_MINT'
                                    ) &&
                                    !renderChecked(
                                      'webhookKindCd',
                                      'REVIEW_RESULT'
                                    ),
                                },
                                {
                                  name: 'SWAP',
                                  value: 'SWAP',
                                  checked: renderChecked(
                                    'webhookKindCd',
                                    'SWAP'
                                  ),
                                },
                                {
                                  name: 'TOKEN_IN',
                                  value: 'TOKEN_IN',
                                  checked: renderChecked(
                                    'webhookKindCd',
                                    'TOKEN_IN'
                                  ),
                                },
                                {
                                  name: 'NFT_MINT',
                                  value: 'NFT_MINT',
                                  checked: renderChecked(
                                    'webhookKindCd',
                                    'NFT_MINT'
                                  ),
                                },
                                {
                                  name: 'REVIEW_RESULT',
                                  value: 'REVIEW_RESULT',
                                  checked: renderChecked(
                                    'webhookKindCd',
                                    'REVIEW_RESULT'
                                  ),
                                },
                              ],
                            }}
                            selected={(e) => {
                              if (e.condition[0]?.value !== 'all') {
                                // store.filterData!.webhookKindCd = e.condition[0]
                                //   .value as
                                //   | 'SWAP'
                                //   | 'TOKEN_IN'
                                //   | 'NFT_MINT'
                                //   | 'REVIEW_RESULT';
                                setSelectedConditions((prev) => {
                                  if (prev) {
                                    return [
                                      ...prev.filter(
                                        (f) => f.field !== e.field
                                      ),
                                      e,
                                    ];
                                  } else {
                                    return [e];
                                  }
                                });
                              } else {
                                // store.filterData!.webhookKindCd = undefined;
                                setSelectedConditions((prev) => {
                                  return [
                                    ...prev.filter((f) => f.field !== e.field),
                                  ];
                                });
                              }
                            }}
                          />
                        ),
                      },
                      {
                        title: 'Status',
                        open: !!selectedConditions.find(
                          (f) => f.field === 'logStatus'
                        ),
                        content: (
                          <FilterConditions
                            conditions={{
                              field: 'logStatus',
                              condition: [
                                {
                                  name: 'All',
                                  value: 'all',
                                  checked:
                                    !renderChecked('logStatus', 'success') &&
                                    !renderChecked('logStatus', 'fail'),
                                },
                                {
                                  name: 'Success',
                                  value: 'success',
                                  checked: renderChecked(
                                    'logStatus',
                                    'success'
                                  ),
                                },
                                {
                                  name: 'Fail',
                                  value: 'fail',
                                  checked: renderChecked('logStatus', 'fail'),
                                },
                              ],
                            }}
                            selected={(e) => {
                              if (e.condition[0].value !== 'all') {
                                // store.filterData!.logStatus =
                                //   e.condition[0].value;
                                setSelectedConditions((prev) => {
                                  if (prev) {
                                    return [
                                      ...prev.filter(
                                        (f) => f.field !== e.field
                                      ),
                                      e,
                                    ];
                                  } else {
                                    return [e];
                                  }
                                });
                              } else {
                                // store.filterData!.logStatus = undefined;
                                setSelectedConditions((prev) => {
                                  return [
                                    ...prev.filter((f) => f.field !== e.field),
                                  ];
                                });
                              }
                            }}
                          />
                        ),
                      },
                    ]}
                  />
                }
                style={{ marginLeft: 'auto' }}
              />
              <LineButton
                size="small"
                styleType="neutral"
                label="Download CSV"
                icon={
                  <i
                    style={{
                      display: 'block',
                      width: 14,
                      height: 14,
                      background: 'var(--color-f2f2f2)',
                      WebkitMask:
                        'url(/assets/images/icons/icon-download.svg) no-repeat center center',
                      WebkitMaskSize: 'cover',
                    }}
                  />
                }
                style={{ marginLeft: 16 }}
              />
            </div>
          }
        >
          <Column
            field="webhookKindCode"
            header="Webhook type"
            style={{ width: 150 }}
          />
          <Column
            field="webhookName"
            header="Webhook name"
            style={{ width: 150 }}
          />
          <Column field="url" header="URL" />
          <Column
            field="date"
            header="Date"
            body={(row) => {
              return dayjs(row.date).format('YYYY.MM.DD HH:mm:ss');
            }}
            style={{ width: 160 }}
          />
          <Column
            field="status"
            header="Status"
            body={(row) => {
              return (
                <span
                  className={`__tag status ${row.status.toLowerCase()}`}
                  style={{ margin: '0 auto' }}
                >
                  {row.status}
                </span>
              );
            }}
            alignHeader={'center'}
            style={{ width: 125 }}
          />
          <Column
            field=""
            header=""
            body={(row: AppWebhookLogsQueryResponse) => {
              return (
                <LineButton
                  onClick={() => {
                    const { no, date: processDate } = row;
                    console.log('row ~', row);
                    store.resendAppWebhook(Number(no), processDate).then(() => {
                      toastConsole(
                        <>
                          <i
                            className="iconBtn successFill"
                            style={{ marginRight: 8 }}
                          />
                          Webhook has been resent.
                        </>
                      );
                    });
                  }}
                  size="xsmall"
                  styleType="neutral"
                  label="Resend"
                  style={{ margin: '0 auto' }}
                />
              );
            }}
            style={{ width: 120 }}
          />
          <Column
            body={(row) => {
              return (
                <button
                  onClick={() => {
                    setSelectedNo(row.no);
                    setShowDetail(true);
                  }}
                  className="iconBtn report"
                  style={{ margin: '0 auto' }}
                />
              );
            }}
            style={{ width: 80 }}
          />
        </DataTable>
      </TableWrapperCard>
      {showDetail && (
        <WebhookDetail
          setShowDetail={() => setShowDetail(false)}
          selectedNo={selectedNo}
        />
      )}
    </>
  );
});
