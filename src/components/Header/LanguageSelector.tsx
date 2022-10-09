import React from "react";

export const LanguageSelector = () => {
  return (
    <div className="header__language">
      <div className="header__language_active header__language_none">RU</div>
      <div className="header__language_btn">
        <a href="#">RU</a>
        <a href="#">EN</a>
      </div>
    </div>
  );
};
