import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.scss';

export const Menu = () => {
  const { t } = useTranslation('common');

  return (
    <nav>
      <div className={styles.header__menu}>
        <ul>
          <li>
            <Link href="/catalog">{t('headmenu.catalog')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
