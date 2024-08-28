import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './NftList.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useRouter } from 'next/router';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import NftItem from './NftItem';
import * as apiService from '@/generated/api/api-service';
import Filter from '@/features/console/common/Filter';
import Accordion from '@/features/common/components/common/Accordion/Accordion';
import FilterConditions from '@/features/console/common/FilterConditions';
import SearchOnList from '@/features/console/main/components/SearchOnList';
import { nameSearch } from '@/libs/utils/nameSearch';
import SkeletonNFTCard from '@/features/console/common/SkeletonNFTCard';

interface NftListProps {
  title?: React.ReactNode;
  nftList?: apiService.NftItemDataType[];
  appName?: string;
  skeleton?: boolean;
  skeletonItemCount?: number;
  counts?: number;
  selectedFilters?: { key: string; value: string }[];
  setSelectedFilter?: (key: 'status' | 'type', value: string) => void;
  onResetFilter?: () => void;
}

const renderItems = (count: number) => {
  return Array.from({ length: count }, (v, i) => ({
    ...(
      <li key={`${v}-${i}`}>
        <SkeletonNFTCard />
      </li>
    ),
  }));
};

const renderSkeleton = (useTop?: boolean, count?: number) => {
  return (
    <>
      {useTop && (
        <div className="listTop">
          <button className="iconBtn filter" />
          <button className="iconBtn search" />
        </div>
      )}
      <ul className="nftList">{renderItems(count || 12)}</ul>
    </>
  );
};

const defaultStatusConditions: NFTFilterConditionType = {
  field: 'status',
  condition: [
    { name: 'All', value: 'all', checked: true },
    {
      name: 'On sale',
      value: 'sale',
      checked: false,
    },
    {
      name: 'Not for sale',
      value: 'not',
      checked: false,
    },
    {
      name: 'Sold out',
      value: 'out',
      checked: false,
    },
  ],
};

const defaultTypeConditions: NFTFilterConditionType = {
  field: 'type',
  condition: [
    { name: 'All', value: 'all', checked: true },
    {
      name: 'Multiple',
      value: 'm',
      checked: false,
    },
    {
      name: 'Duplicate',
      value: 'd',
      checked: false,
    },
    {
      name: 'Single',
      value: 's',
      checked: false,
    },
  ],
};

const defaultNFTFilterConditions = [
  defaultStatusConditions,
  defaultTypeConditions,
];

export interface NFTFilterColumnConditionType {
  name: string;
  value: string;
  checked: boolean;
}

export interface NFTFilterConditionType {
  field: 'status' | 'type';
  condition: {
    name: string;
    value: string;
    checked: boolean;
  }[];
}
const NftList = ({
  title,
  nftList,
  appName,
  skeleton,
  skeletonItemCount,
  selectedFilters,
  setSelectedFilter,
  onResetFilter,
}: NftListProps) => {
  const router = useRouter();
  const { baseUrl, currentMenu } = useBaseUrl();
  const [isNftPage, setIsNftPage] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<
    NFTFilterConditionType[]
  >(defaultNFTFilterConditions);

  const [selectedConditionsTemp, setSelectedConditionsTemp] = useState<
    NFTFilterConditionType[] | undefined
  >(undefined);

  const [nftListData, setNftListData] = useState<
    apiService.NftItemDataType[] | undefined
  >(nftList ?? []);

  const [applied, setApplied] = useState(false);
  const [filterOpened, setFilteredOpened] = useState(false);
  const [allowSearch, setAllowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (applied) {
      if (
        !filterOpened &&
        selectedConditions &&
        selectedConditions.length > 0
      ) {
        setSelectedConditionsTemp(selectedConditions);
        onApply();
      }
    }
    setApplied(false);
  }, [applied]);

  useEffect(() => {
    setNftListData(nftList);
  }, [nftList]);

  useEffect(() => {
    setIsNftPage(currentMenu === 'nft');
  }, [currentMenu]);

  const deleteCondition = (field: 'status' | 'type') => {
    setSelectedConditions((prev) => {
      if (prev[0].field === field) {
        return [
          defaultStatusConditions,
          ...prev.filter((f) => f.field !== field),
        ];
      } else {
        return [
          ...prev.filter((f) => f.field !== field),
          defaultTypeConditions,
        ];
      }
    });

    if (!filterOpened) {
      setSelectedFilter && setSelectedFilter(field, 'all');
      setApplied(true);
    }
  };

  const onApply = () => {
    if (nftListData && nftList && selectedFilters) {
      const statusValue = selectedFilters.find((f) => f.key === 'status')
        ?.value;

      const typeValue = selectedFilters?.find((f) => f.key === 'type')?.value;

      let filteredList: apiService.NftItemDataType[];

      switch (statusValue) {
        case 'sale':
          filteredList = [...nftList.filter((f) => f.sales)];
          break;
        case 'not':
          filteredList = [...nftList.filter((f) => !f.sales)];
          break;
        case 'out':
          filteredList = [...nftList.filter((f) => Number(f.rest) === 0)];
          break;
        default:
          filteredList = [...nftList];
          break;
      }

      switch (typeValue) {
        case 'd':
          filteredList = filteredList.filter((f) => Number(f.total) !== 1);
          break;
        case 's':
          filteredList = filteredList.filter((f) => Number(f.total) === 1);
          break;
        case 'm':
          filteredList = [];
          break;
        default:
          break;
      }

      if (searchKeyword) {
        const searchedKeywords = nameSearch(searchKeyword, nftList, 'nftName');
        setNftListData(
          filteredList.filter((f) =>
            searchedKeywords.find(
              (sa: { name: string }) =>
                sa.name === ((f.nftName as unknown) as string)
            )
          )
        );
      } else {
        setNftListData(filteredList);
      }
    }
  };
  useEffect(() => {
    onApply();
  }, [searchKeyword]);

  const renderSelected = useCallback(
    (field: 'status' | 'type', value?: string) => {
      if (value) {
        setSelectedConditions((prev) => {
          return prev.map((filter) => {
            if (filter.field === field) {
              return {
                field,
                condition: filter.condition.map((condition) => {
                  return {
                    ...condition,
                    checked: condition.value === value,
                  };
                }),
              };
            } else {
              return { ...filter };
            }
          });
        });
      }
    },
    []
  );

  const timer = useRef<NodeJS.Timer>();
  const searchTimer = () => {
    timer.current && clearTimeout(timer.current!);
    timer.current = setTimeout(() => {
      setAllowSearch(false);
    }, 400);
  };

  return (
    <>
      {title && title}
      <div className={`nftListWrap ${styles.nftListWrap}`}>
        {title && (
          <button
            className="more"
            onClick={() => router.push(`${baseUrl}/nft`)}
          >
            View more
          </button>
        )}
        {skeleton && renderSkeleton(isNftPage, skeletonItemCount)}
        {nftList && nftList.length > 0 ? (
          <>
            {isNftPage && (
              <div className="listTop">
                <Filter
                  onChangeFilterStatus={setFilteredOpened}
                  onClose={(type) => {
                    if (type === 'apply') {
                      setSelectedConditionsTemp(selectedConditions);
                    } else if (type === 'close') {
                      if (
                        selectedConditionsTemp &&
                        selectedConditionsTemp.length > 0
                      ) {
                        setSelectedConditions(selectedConditionsTemp);
                      }
                    } else {
                      onResetFilter && onResetFilter();
                      setSelectedConditions(defaultNFTFilterConditions);
                      setSelectedConditionsTemp(undefined);
                      setNftListData(nftList);
                    }
                  }}
                  onApply={onApply}
                  selectedConditions={
                    <>
                      {selectedConditions.map((selectedFilter, index) => {
                        if (
                          selectedFilter.condition.find((f) => f.checked)
                            ?.name !== 'All'
                        )
                          return (
                            <span key={`${selectedFilter.field}${index}`}>
                              {
                                selectedFilter.condition.find((f) => f.checked)
                                  ?.name
                              }
                              <button
                                onClick={() =>
                                  deleteCondition(selectedFilter.field)
                                }
                              />
                            </span>
                          );
                      })}
                    </>
                  }
                  body={
                    <Accordion
                      items={[
                        {
                          title: 'Status',
                          open:
                            selectedFilters &&
                            !!selectedFilters.find((f) => f.key === 'status') &&
                            selectedFilters.find((f) => f.key === 'status')!
                              .value !== 'all',
                          content: (
                            <FilterConditions
                              conditions={selectedConditions[0]}
                              selected={(e) => {
                                setSelectedFilter &&
                                  setSelectedFilter(
                                    'status',
                                    e.condition[0].value ?? ''
                                  );
                                renderSelected('status', e.condition[0].value);
                              }}
                            />
                          ),
                        },
                        {
                          title: 'Type',
                          open:
                            selectedFilters &&
                            !!selectedFilters?.find((f) => f.key === 'type') &&
                            selectedFilters?.find((f) => f.key === 'type')!
                              .value !== 'all',
                          content: (
                            <FilterConditions
                              conditions={selectedConditions[1]}
                              selected={(e) => {
                                setSelectedFilter &&
                                  setSelectedFilter(
                                    'type',
                                    e.condition[0].value ?? ''
                                  );
                                renderSelected('type', e.condition[0].value);
                              }}
                            />
                          ),
                        },
                      ]}
                    />
                  }
                />
                {allowSearch ? (
                  <SearchOnList
                    setKeyword={(keyword) => setSearchKeyword(keyword)}
                    onMouseLeave={() =>
                      searchKeyword.length < 1 && searchTimer()
                    }
                    onMouseEnter={() =>
                      timer.current && clearTimeout(timer.current!)
                    }
                  />
                ) : (
                  <button
                    className="iconBtn search"
                    onClick={() => setAllowSearch(true)}
                  />
                )}
              </div>
            )}
            <ul className="nftList">
              {nftListData?.map((nft, i) => {
                return (
                  <li key={`${nft.id}${i}`}>
                    <NftItem
                      nftItem={nft}
                      isNftPage={isNftPage}
                      appName={appName}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div
            className={`noList${currentMenu === 'nft' ? ' inNft' : ''}`}
            style={{ background: skeleton ? 'none' : '' }}
          >
            {currentMenu === 'dashboard' && !skeleton && (
              <div>
                <img src="/assets/images/console/img-ufo.png" alt="" />
                <strong>Your app doesn't have NFTs yet!</strong>
                <p>Let's make your own NFT!</p>
                <SolidButton
                  onClick={() =>
                    router.push(`/console/${router.query.appId}/nft/createnft`)
                  }
                  size="xlarge"
                  styleType="color"
                  label="Go to Create NFT"
                />
              </div>
            )}
            {currentMenu === 'nft' && !skeleton && (
              <>
                <div className="bg">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="content">
                  <img src="/assets/images/console/img-ufo.png" alt="" />
                  <strong>Nothing found</strong>
                  <p>There are no NFTs created yet.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NftList;
