import React from "react";

import styles from "./languageSelector.module.scss";

export const LanguageSelector = () => {
  return (
    <div className={ styles.header__language }>
      <div className={ `${styles.header__language_active} ${styles.header__language_none}` }>RU</div>
      <div className={ styles.header__language_btn }>
        <a href="#">RU</a>
        <a href="#">EN</a>
      </div>
    </div>
  );
};
