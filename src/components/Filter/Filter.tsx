import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import style from '../../scss/catalog.module.scss';

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

  const handleFilterClear = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        search: undefined,
        category: undefined,
      },
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
