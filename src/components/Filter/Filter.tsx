import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getParameterFromQuery } from '../../utils/getParameterFromQuery';
import { Button } from '../Button/Button';

import style from './filter.module.scss';
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
  const { t } = useTranslation('common');

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

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const toggleMobileFilter = useCallback(() => setIsMobileFilterOpen(!isMobileFilterOpen), [isMobileFilterOpen]);

  return (
    <>
      <Button variant="link" className={style.mob_filter} onClick={toggleMobileFilter}>
        {t('filter.header')}
        <img src="/img/icons/filter.svg" alt="" />
      </Button>
      <div className={isMobileFilterOpen ? style.wrapper_content : style.mob_filter_content}>
        <div className={style.filter}>
          <Button
            variant="link"
            className={isMobileFilterOpen ? style.filter__close_none : style.filter__close}
            onClick={toggleMobileFilter}
          >
            <img src="/img/icons/close.svg" alt="" />
          </Button>
          <div className={style.filter__reset}>
            <p>{t('filter.header')}</p>
            <button type="reset" onClick={handleFilterClear}>
              {t('filter.button')}
            </button>
          </div>
          <Search />
          <CategorySelect categories={categories} />
          <FilterRangeRange
            maxAllowedValue={maxSubscribers}
            fieldName={t('filter.rangeSubscribers')}
            parameterName="subscriptionsCount"
          />
          <FilterRangeRange maxAllowedValue={maxViews} fieldName={t('filter.rangeViews')} parameterName="views" />
        </div>
      </div>
    </>
  );
};
