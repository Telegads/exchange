import Link from "next/link";
import React from "react";

import styles from "./logo.module.scss";

export const Logo = () => {
  return (
    <div className={ styles.header__logo }>
      <Link href="/">
        <a href="/">
          <img src="/img/logo.svg" alt="" />
        </a>
      </Link>
    </div>
  );
};
