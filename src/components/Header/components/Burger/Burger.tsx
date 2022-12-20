import React, { FC } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

import style from './burger.module.scss';

type BurgerProps = {
  onClick: () => void;
  isBurgerOpen: boolean;
};

export const Burger: FC<BurgerProps> = ({ isBurgerOpen, onClick }) => {
  return (
    <>
      <BsXCircleFill
        type="reset"
        size={30}
        className={isBurgerOpen ? style.burger__button_close : style.burger__button_close_none}
        onClick={onClick}
      />
      <Button
        variant="link"
        className={isBurgerOpen ? style.header__wrapper_burger_none : style.header__wrapper_burger}
        onClick={onClick}
      >
        <img src="/img/icons/burger.svg" alt="" />
      </Button>
    </>
  );
};
