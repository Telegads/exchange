import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';

import style from './categorySelect.module.scss';

type CategorySelectProps = {
  categories: Category[];
};

export const CategorySelect: FC<CategorySelectProps> = ({ categories }) => {
  const router = useRouter();

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
      <select tabIndex={0} name="items" onChange={handleCategoryChange} defaultValue={category}>
        <option value="all">Все тематики</option>
        {categories.map((cat) =>
          cat.id === '' ? (
            <option value="" key="empty">
              Без тематики
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
