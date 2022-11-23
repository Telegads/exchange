import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import style from './sorting.module.scss';

type SortDirection = 'asc' | 'desc';

export const Sorting = () => {
  const router = useRouter();

  const sortType = router.query.sort_type;
  const sortDirection = (router.query.sort_dir as SortDirection) === 'asc' ? 'desc' : 'asc';

  const isActive = (type: string) => (sortType === type ? style.active : '');

  const sortByViews = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        sort_type: 'views',
        sort_dir: sortDirection,
      },
    });
  }, [router, sortDirection]);

  const sortByEr = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        sort_type: 'er',
        sort_dir: sortDirection,
      },
    });
  }, [router, sortDirection]);

  const sortBySubscribers = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        sort_type: 'subscribers',
        sort_dir: sortDirection,
      },
    });
  }, [router, sortDirection]);

  return (
    <div className={style.content__filters}>
      <div
        className={`${style.filter_item} ${style.filter_item} ${isActive('views')} ${style[sortDirection]}`}
        onClick={sortByViews}
        role="button"
        onKeyPress={sortByViews}
        tabIndex={0}
      >
        Просмотры
      </div>
      <div
        className={`${style.filter_item} ${style.filter_item} ${isActive('er')} ${style[sortDirection]}`}
        onClick={sortByEr}
        role="button"
        onKeyPress={sortByViews}
        tabIndex={0}
      >
        <div>ER</div>
      </div>
      <div
        className={`${style.filter_item} ${style.filter_item} ${isActive('subscribers')} ${style[sortDirection]}`}
        onClick={sortBySubscribers}
        role="button"
        onKeyPress={sortByViews}
        tabIndex={0}
      >
        <div>Подписчики</div>
      </div>
      {/* <div className={`${style.filter_item} ${style.filter_item} ${isActive(
          "cpv"
        )} ${style[sortDirection]}`}
        onClick={sortByCpv} >
        <div>CPV</div> 
      </div> */}
      {/* 
      <div className={`${style.filter_item} ${style.filter__rating}`}>
        <div>Рейтинг</div>
      </div>
      
   
      <div className={`${style.filter_item} ${style.filter__price}`}>
        <div>Стоимость</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__add}`}>
        <div>Добавлен</div>
      </div>
       */}
    </div>
  );
};
