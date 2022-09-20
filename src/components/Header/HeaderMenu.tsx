import Link from "next/link";
import React from "react";

export const HeaderMenu = () => {
  return (
    <nav>
      <div className="header__menu">
        <ul>
          <Link href="/catalog">
            <a href="catalog.html">Каталог</a>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
