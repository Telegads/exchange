import { signOut, useSession } from 'next-auth/react';
import React, { FC, useCallback, useState } from 'react';

import { Button } from '../../../Button/Button';
import { Popup } from '../../../Popup/Popup';
import SignIn from '../../../SignIn/SignIn';

import styles from './accountButton.module.scss';

type AccountButtonProps = {
  isMobileMenuOpen?: boolean;
};

export const AccountButton: FC<AccountButtonProps> = ({ isMobileMenuOpen }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const togglePopup = useCallback(() => setIsOpenPopup(!isOpenPopup), [isOpenPopup]);

  const handleSingOutClick = useCallback(() => signOut(), []);
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Button
          onClick={handleSingOutClick}
          variant="primary"
          rounded="rounded"
          size="lg"
          className={isMobileMenuOpen ? styles.header__btn : styles.header__btn_none}
        >
          <div className={styles.accountButtonText}>
            <span>{session.user?.name}</span>
            <img src="/img/icons/adduser.svg" alt="" />
          </div>
        </Button>
      ) : (
        <Button
          variant="primary"
          rounded="rounded"
          size="lg"
          className={isMobileMenuOpen ? styles.header__btn_reg : `${styles.header__btn_reg} ${styles.header__btn_none}`}
          onClick={togglePopup}
        >
          Вход
          <img src="/img/icons/adduser.svg" alt="" />
        </Button>
      )}
      <Popup open={isOpenPopup} handleClose={togglePopup}>
        <SignIn />
      </Popup>
    </>
  );
};
