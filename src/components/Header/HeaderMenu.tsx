import Link from "next/link";
import React from "react";

export const HeaderMenu = () => {
  return (
    <nav>
      <div className="header__menu">
        <ul>
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
      </div>
    </nav>
  );
};
