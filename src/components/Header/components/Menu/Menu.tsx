import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.scss';

type MenuProps = {
  isBurgerOpen?: boolean;
};

export const Menu: FC<MenuProps> = ({ isBurgerOpen }) => {
  const { t } = useTranslation('common');

  return (
    <nav>
      <div className={isBurgerOpen ? styles.burger__menu : styles.header__menu}>
        <ul>
          <li>
            <Link href="/catalog">{t('headmenu.catalog')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
