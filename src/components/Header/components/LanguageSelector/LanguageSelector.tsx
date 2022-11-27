import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import styles from './languageSelector.module.scss';

export const LanguageSelector = () => {
  const router = useRouter();

  const changeToRu = useCallback(() => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: 'ru' });
  }, [router]);

  const changeToEn = useCallback(() => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: 'en' });
  }, [router]);

  const changeToUz = useCallback(() => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: 'uz' });
  }, [router]);

  return (
    <div className={styles.header__language}>
      <div className={`${styles.header__language_active} ${styles.header__language_none}`}>
        {router.locale?.toUpperCase()}
      </div>
      <div className={styles.header__language_btn}>
        <button onClick={changeToRu}>RU</button>
        <button onClick={changeToEn}>EN</button>
        <button onClick={changeToUz}>UZ</button>
      </div>
    </div>
  );
};
