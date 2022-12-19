import React, { FC } from 'react';

import { AccountButton } from './components/AccountButton/AccountButton';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { Menu } from './components/Menu/Menu';
import { Logo } from './components/Logo/Logo';
import styles from './header.module.scss';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__img_line}></div>
      <div className={styles.header__container}>
        <Logo />
        <LanguageSelector />
        <Menu />
        <AccountButton />
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
