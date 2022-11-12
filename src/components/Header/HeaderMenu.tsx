import Link from "next/link";
import React from "react";

export const HeaderMenu = () => {
  return (
    <ul className="header__menu">
      <li>
        <Link href="/about">
          <a href="catalog.html">О нас</a>
        </Link>
      </li>
      <li>
        <Link href="/advantages">
          <a href="catalog.html">Преимущества</a>
        </Link>
      </li>
      <li>
        <Link href="/catalog">
          <a href="catalog.html">Каталог</a>
        </Link>
      </li>
      <li>
        <Link href="/contacts">
          <a href="catalog.html">Контакты</a>
        </Link>
      </li>
    </ul>
  );
};
