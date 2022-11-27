import React from 'react';

import styles from './languageSelector.module.scss';

export const LanguageSelector = () => {
  return (
    <div className={styles.header__language}>
      <div className={`${styles.header__language_active} ${styles.header__language_none}`}>RU</div>
      <div className={styles.header__language_btn}>
        <a href="#1">RU</a>
        <a href="#2">EN</a>
      </div>
    </div>
  );
};
