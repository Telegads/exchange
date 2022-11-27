import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { FC, useCallback } from 'react';

import { Button } from '../Button/Button';

import styles from './headerAccount.module.scss';

type HeaderAccountProps = {
  session: Session | null;
};

export const HeaderAccount: FC<HeaderAccountProps> = ({ session }) => {
  const handleSingOutClick = useCallback(() => signOut(), []);

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
        <Button onClick={handleSingOutClick} type={'primary'} rounded="rounded" size="lg">
          <div className={styles.accountButtonText}>
            <span>{session.user?.name}</span>
            <img src="/img/icons/adduser.svg" alt="" />
          </div>
        </Button>
      )}
    </>
  );
};
