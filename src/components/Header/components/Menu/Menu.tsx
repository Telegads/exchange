import Link from 'next/link';
import React from 'react';

import styles from './Menu.module.scss';

export const Menu = () => {
  return (
    <nav>
      <div className={styles.header__menu}>
        <ul>
          <li>
            <Link href="/catalog">
              <a href="catalog.html">Каталог</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
