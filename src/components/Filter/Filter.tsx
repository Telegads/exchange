import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import style from '../../scss/catalog.module.scss';
import { getParameterFromQuery } from '../../utils/getParameterFromQuery';

import { CategorySelect } from './components/CategorySelect/CategorySelect';
import { Search } from './components/Search/Search';
import { FilterRangeRange } from './components/FilterRangeRange/FilterRangeRange';

type FilterProps = {
  categories: Category[];
  maxSubscribers: number;
  maxViews: number;
};

export const Filter: FC<FilterProps> = ({ categories, maxSubscribers, maxViews }) => {
  const router = useRouter();

  const selectedSortType = getParameterFromQuery(router.query, 'sort_type');
  const sortDirection = getParameterFromQuery(router.query, 'sort_dir');

  const newQuery: { sort_type?: string; sort_dir?: string } = {};

  if (selectedSortType !== undefined) {
    newQuery.sort_type = selectedSortType;
  }

  if (sortDirection !== undefined) {
    newQuery.sort_dir = sortDirection;
  }

  const handleFilterClear = useCallback(() => {
    router.push({
      query: newQuery,
    });
  }, [router]);

  return (
    <div className={style.wrapper_content}>
      <div className={style.filter}>
        <div className={style.filter__close}>
          <img src="/img/icons/close.svg" alt="" />
        </div>
        <div className={style.filter__reset}>
          <p>Фильтр</p>
          <button type="reset" onClick={handleFilterClear}>
            Очистить все
          </button>
        </div>
        <Search />
        <CategorySelect categories={categories} />
        <FilterRangeRange maxAllowedValue={maxSubscribers} fieldName="Подписчики" parameterName="subscriptionsCount" />
        <FilterRangeRange maxAllowedValue={maxViews} fieldName="Просмотры" parameterName="views" />
      </div>
    </div>
  );
};
