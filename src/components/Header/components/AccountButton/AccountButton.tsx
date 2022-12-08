import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useCallback } from 'react';

import { Button } from '../../../Button/Button';

import styles from './accountButton.module.scss';

export const AccountButton = () => {
  const handleSingOutClick = useCallback(() => signOut(), []);
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <div className={`${styles.header__btn_reg} ${styles.header__btn_none}`}>
          <Link href="/api/auth/signin">
            <a href="#1">Вход</a>
          </Link>
          <img src="/img/icons/adduser.svg" alt="" />
        </div>
      )}
      {session && (
        <Button onClick={handleSingOutClick} variant="primary" rounded="rounded" size="lg">
          <div className={styles.accountButtonText}>
            <span>{session.user?.name}</span>
            <img src="/img/icons/adduser.svg" alt="" />
          </div>
        </Button>
      )}
    </>
  );
};
