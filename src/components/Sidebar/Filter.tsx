import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import style from '../../scss/catalog.module.scss';

type FilterProps = {
  categories: Category[];
};

export const Filter: FC<FilterProps> = ({ categories }) => {
  const router = useRouter();

  const category = router.query.category;
  const search = router.query.search;

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      router.push({
        query: {
          ...router.query,
          category: event.target.value,
        },
      });
    },
    [router.push],
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      router.push({
        query: {
          ...router.query,
          search: event.target.value,
        },
      });
    },
    [router.push],
  );

  const handleFilterClear = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        search: undefined,
        category: undefined,
      },
    });
  }, []);

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
        <div className={style.filter__search}>
          <input type="search" placeholder="Поиск" value={search} onChange={handleSearchChange} />
          <button type="submit">
            <img src="/img/icons/search.svg" alt="" />
          </button>
        </div>
        <div className={style.filter__select}>
          <select tabIndex={0} name="items" onChange={handleCategoryChange}>
            <option selected={category === 'all'} value="all">
              Все тематики
            </option>
            {categories.map((cat) =>
              cat.id === '' ? (
                <option value="" selected={category === ''}>
                  Без тематики
                </option>
              ) : (
                <option value={cat.id} selected={category === cat.id}>
                  {cat.name}
                </option>
              ),
            )}
          </select>
        </div>

        {/* <div className={`${style.filter__format_title} ${style.filter__title}`}>
          <p>Формат</p>
          <img
            className={style.close_title}
            src="/img/icons/arrow.svg"
            alt=""
          />
        </div> */}
        {/* <div className={style.filter__format_wrapper}>
          <p>Формат размещения:</p>
          <div className={style.filter__format_items}>
            <div className={`${style.filter__format_item} ${style.active}`}>
              1/24
            </div>
            <div className={style.filter__format_item2}>2/48</div>
            <div className={style.filter__format_item3}>3/72</div>
            <div className={style.filter__format_item4}>Eternal</div>
            <div className={style.filter__format_item5}>Forwards</div>
          </div>
        </div>
        <div className={`${style.filter__range_title} ${style.filter__title}`}>
          <p>Диапазоны</p>
          <img
            className={style.close_range_title}
            src="/img/icons/arrow.svg"
            alt=""
          />
        </div>
        <div className={style.filter__slider_range}>
          <div className={style.filter__range_er}>er %</div>
          <div className={style.slider_range_container_er}>
            <input
              type="text"
              className={style.slider_range_input_subscribers_left}
            />
            <input
              type="text"
              className={style.slider_range_input_subscribers_right}
            />
            <div className={style.slider_range_er}></div>
          </div>
          <div className={style.filter__range_subscribers}>Подписчиков</div>
          <div className={style.slider_range_container_subscribers}>
            <input
              type="text"
              className={style.slider_range_input_subscribers_left}
            />
            <input
              type="text"
              className={style.slider_range_input_subscribers_right}
            />
            <div className={style.slider_range_subscribers}></div>
          </div>
        </div>
        <div
          className={`${style.filter__format2_title} ${style.filter__title}`}
        >
          <p>Формат</p>
          <img
            className={style.close_title_format2}
            src="/img/icons/arrow.svg"
            alt=""
          />
        </div>
        <div className={style.filter__artical_blog}>
          <div className={style.item__articl}>
            <div>Статьи</div>
            <div className={style.item__articl_btn}>
              <input type="checkbox" role="switch" />
            </div>
          </div>
          <div className={style.item__blog}>
            <div>Блог</div>
            <div className={style.item__blog_btn}>
              <input type="checkbox" role="switch" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
