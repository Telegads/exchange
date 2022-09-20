// Header.tsx
import React from "react";
import { HeaderAccount } from "./HeaderAccount";
import { LanguageSelector } from "./LanguageSelector";
import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__img_line"></div>
      <div className="header__container">
        <Logo />
        <LanguageSelector />
        <HeaderMenu />
        <HeaderAccount />
      </div>
    </header>
  );
};

export default Header;
