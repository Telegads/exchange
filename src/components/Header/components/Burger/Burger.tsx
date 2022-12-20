import React, { FC } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

import style from './burger.module.scss';

type BurgerProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const BurgerMenu: FC<BurgerProps> = ({ isOpen, onClick }) => {
  return (
    <>
      <BsXCircleFill
        type="reset"
        size={30}
        className={isOpen ? style.burger__button_close : style.burger__button_close_none}
        onClick={onClick}
      />
      <Button
        variant="link"
        className={isOpen ? style.header__wrapper_burger_none : style.header__wrapper_burger}
        onClick={onClick}
      >
        <img src="/img/icons/burger.svg" alt="" />
      </Button>
    </>
  );
};
