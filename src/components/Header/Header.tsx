import React, { FC, useState, useCallback } from 'react';

import { AccountButton } from './components/AccountButton/AccountButton';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { Menu } from './components/Menu/Menu';
import { Logo } from './components/Logo/Logo';
import styles from './header.module.scss';
import { BurgerMenu } from './components/Burger/Burger';

const Header: FC = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const toggleBurger = useCallback(() => setIsOpenBurger(!isOpenBurger), [isOpenBurger]);

  return (
    <header className={styles.header}>
      <div className={`${isOpenBurger ? styles.header__container_burger : styles.header__container}`}>
        <Logo />
        <LanguageSelector isBurgerOpen={isOpenBurger} />
        <Menu isBurgerOpen={isOpenBurger} />
        <AccountButton isBurgerOpen={isOpenBurger} />
        <BurgerMenu onClick={toggleBurger} isOpen={isOpenBurger} />
      </div>
    </header>
  );
};

export default Header;
