import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import style from './categorySelect.module.scss';

type CategorySelectProps = {
  categories: Category[];
};

export const CategorySelect: FC<CategorySelectProps> = ({ categories }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const category = router.query.category;

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      router.push({
        query: {
          ...router.query,
          category: event.target.value,
        },
      });
    },
    [router],
  );

  return (
    <div className={style.filter__select}>
      <select onChange={handleCategoryChange} value={category ? category : 'all'}>
        <option value="all">{t('filter.categories')}</option>
        {categories.map((cat) =>
          cat.id === '' ? (
            <option value="" key="empty">
              {t('filter.categories')}
            </option>
          ) : (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ),
        )}
      </select>
    </div>
  );
};
