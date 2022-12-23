import React, { FC, useState, useCallback } from 'react';

import { AccountButton } from './components/AccountButton/AccountButton';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { Menu } from './components/Menu/Menu';
import { Logo } from './components/Logo/Logo';
import styles from './header.module.scss';
import { Burger } from './components/Burger/Burger';

const Header: FC = () => {
  const [isMobileMenuOpen, setIsOpenBurger] = useState(false);
  const toggleBurger = useCallback(() => setIsOpenBurger(!isMobileMenuOpen), [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={`${isMobileMenuOpen ? styles.header__container_burger : styles.header__container}`}>
        <Logo />
        <LanguageSelector isMobileMenuOpen={isMobileMenuOpen} />
        <Menu isMobileMenuOpen={isMobileMenuOpen} />
        <AccountButton isMobileMenuOpen={isMobileMenuOpen} />
        <Burger onClick={toggleBurger} isMobileMenuOpen={isMobileMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
