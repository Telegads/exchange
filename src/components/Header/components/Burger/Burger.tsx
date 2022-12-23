import React, { FC } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

import style from './burger.module.scss';

type BurgerProps = {
  onClick: () => void;
  isMobileMenuOpen: boolean;
};

export const Burger: FC<BurgerProps> = ({ isMobileMenuOpen, onClick }) => {
  return (
    <>
      {' '}
      {isMobileMenuOpen ? (
        <BsXCircleFill type="reset" size={30} className={style.burger__button_close} onClick={onClick} />
      ) : (
        <Button variant="link" className={style.header__wrapper_burger} onClick={onClick}>
          <img src="/img/icons/burger.svg" alt="" />
        </Button>
      )}
    </>
  );
};
