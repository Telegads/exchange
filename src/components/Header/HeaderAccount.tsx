import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../Button/Button";

import style from "./headerAcceunt.module.scss";

type HeaderAccountProps = {
  session: Session | null;
};

export const HeaderAccount: FC<HeaderAccountProps> = ({ session }) => {
  return (
    <>
      {!session && (
        <div className="header__btn_reg header__btn_none">
          <Link href="/api/auth/signin">
            <a href="#">Вход</a>
          </Link>
          <img src="/img/icons/adduser.svg" alt="" />
        </div>
      )}
      {session && (
        <Button onClick={() => signOut()} type={"primary"} rounded size="lg" >
          <div className={style.accauntButtonText}>
            <span>{session.user?.name}</span>
            <img src="/img/icons/adduser.svg" alt="" />
          </div>
        </Button>
      )}
    </>
  );
};
