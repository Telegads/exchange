import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react';

import { Button } from '../../../Button/Button';
import { Popup } from '../../../Popup/Popup';
import SignIn from '../../../SignIn/SignIn';

import styles from './accountButton.module.scss';

export const AccountButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleSingOutClick = useCallback(() => signOut(), []);
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Button onClick={handleSingOutClick} variant="primary" rounded="rounded" size="lg">
          <div className={styles.accountButtonText}>
            <span>{session.user?.name}</span>
            <img src="/img/icons/adduser.svg" alt="" />
          </div>
        </Button>
      ) : (
        <Button
          variant="primary"
          className={`${styles.header__btn_reg} ${styles.header__btn_none}`}
          onClick={togglePopup}
        >
          <a href="#1">Вход</a>
          <img src="/img/icons/adduser.svg" alt="" />
        </Button>
      )}
      {isOpen && (
        <Popup handleClose={togglePopup}>
          <SignIn />
        </Popup>
      )}
    </>
  );
};
