import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <div className="header__logo">
      <Link href="/">
        <a href="/">
          <img src="/img/logo.svg" alt="" />
        </a>
      </Link>
    </div>
  );
};
