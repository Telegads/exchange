import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useDebounce from '../../../../hooks/useDebounce';

import style from './search.module.scss';

export const Search = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [searchInput, setSearchInput] = useState(router.query.search);

  const debouncedSearchValue = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearchValue) {
      router.push({
        query: {
          ...router.query,
          search: debouncedSearchValue,
        },
      });
    }
  }, [debouncedSearchValue]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);

  return (
    <div className={style.filter__search}>
      <input
        type="search"
        placeholder={t('filter.searchHolder') || undefined}
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button type="submit">
        <img src="/img/icons/search.svg" alt="" />
      </button>
    </div>
  );
};
