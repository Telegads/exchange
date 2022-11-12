import Link from "next/link";
import React from "react";
import { Button } from "../Button/Button";

export const HeaderAccount = () => {
  const handleLoginModal = () => {
    console.log('test');
    
  }

  const loggedIn = (
    <div className="header__balance_logout">
      <div className="header__balance">
        <p className="balance__text">Баланс:</p>
        <p className="balace">360Р</p>
        <a href="#">
          <img src="/img/icons/plus.svg" alt="" />
        </a>
      </div>
      <div className="header__logout">
        <a href="#">Выйти</a>
        <a href="#">
          Dmitry001
          <img src="/img/icons/adduser.svg" alt="" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="header__btn_reg header__btn_none">
      <Link href="/api/auth/signin">
        <a href="#">Вход</a>
      </Link>
      <p>/</p>
      <Link href="/api/auth/signin">
        <a href="#">Регистрация</a>
      </Link>
      <img src="/img/icons/adduser.svg" alt="" />
    </div>
  );
};
