import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';
import { Stack } from 'react-bootstrap';

import { getParameterFromQuery } from '../../utils/getParameterFromQuery';
import { Button } from '../Button/Button';

import style from './sorting.module.scss';

type SortDirection = 'asc' | 'desc';

type SortOption = {
  name: string;
  sortType: string;
  action: () => void;
};

type SortButtonProps = SortOption & { selectedSortType: string | undefined; sortDirection: string };

const SortButton: FC<SortButtonProps> = ({ action, name, sortDirection, sortType, selectedSortType }) => {
  return (
    <Button variant="link" onClick={action} className={style.sort_button}>
      <div className={style.sorting_text}>{name} </div>
      {selectedSortType === sortType && (
        <img
          width={20}
          height={20}
          alt={`sort direction ${sortDirection}`}
          src={`/img/icons/sort_${sortDirection}.svg`}
        />
      )}
    </Button>
  );
};

export const Sorting = () => {
  const router = useRouter();

  const selectedSortType = getParameterFromQuery(router.query, 'sort_type');
  const sortDirection = getParameterFromQuery(router.query, 'sort_dir') as SortDirection;

  const handleSortButtonClick = useCallback(
    (selectedSort) => {
      router.push({
        query: {
          ...router.query,
          sort_type: selectedSort,
          sort_dir: sortDirection === 'asc' ? 'desc' : 'asc',
        },
      });
    },
    [router, sortDirection],
  );

  const SORTING_OPTIONS = useMemo(
    (): SortOption[] => [
      {
        name: 'Просмотры',
        action: () => handleSortButtonClick('views'),
        sortType: 'views',
      },
      {
        name: 'ER',
        action: () => handleSortButtonClick('er'),
        sortType: 'er',
      },
      {
        name: 'Подписчики',
        action: () => handleSortButtonClick('subscribers'),

        sortType: 'subscribers',
      },
    ],
    [handleSortButtonClick],
  );

  return (
    <div className={style.wrapper}>
      <Stack direction="horizontal" gap={3}>
        <div>Сортировка: </div>
        {SORTING_OPTIONS.map(({ name, sortType, action }) => (
          <SortButton
            key={sortType}
            action={action}
            name={name}
            sortDirection={sortDirection}
            sortType={sortType}
            selectedSortType={selectedSortType}
          />
        ))}
      </Stack>
    </div>
  );
};
