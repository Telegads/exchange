import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import useDebounce from '../../../../hooks/useDebounce';

import style from './search.module.scss';

export const Search = () => {
  const router = useRouter();

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
      <input type="search" placeholder="Поиск" value={searchInput} onChange={handleSearchChange} />
      <button type="submit">
        <img src="/img/icons/search.svg" alt="" />
      </button>
    </div>
  );
};
