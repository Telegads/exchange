import React, { useRef } from 'react';

export const Burger: React.FC = () => {
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  const handleBurgerOpen = () => {
    menuWrapperRef.current.classList.toggle('active');
  }
  const handleBurgerClose = () => {
    menuWrapperRef.current.classList.remove('active');
  }

  return (
    <>
      <div className='header__burger' ref={menuWrapperRef}>
        <div className="burder__wrapper">
          <div className="burger__header">
            <div className="burder__logo">
              <a href="#"><img src="img/logo.svg" alt="" /></a>
            </div>
            <div className="burger__cross" onClick={handleBurgerClose}>
              <a href="#"><img src="img/cross.svg" alt="" /></a>
            </div>
          </div>
          <ul className="burger__menu">
            <li>
              <a href="#">О нас</a>
            </li>
            <li>
              <a href="#">Преимущества</a>
            </li>
            <li>
              <a href="catalog.html">Каталог</a>
            </li>
            <li>
              <a href="#">Контакты</a>
            </li>
          </ul>
          <div className="burger__language header__language">
            <div className="burger__language_active header__language_active">RU</div>
            <div className="burger__language_btn header__language_btn">
              <a href="#">RU</a>
              <a href="#">EN</a>
            </div>
          </div>
          <div className="burger__btn header__btn_reg">
            <a href="#">Вход</a>
            <p>/</p>
            <a href="#">Регистрация</a>
            <img src="img/icons/Add User.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="header__wrapper_burger" onClick={handleBurgerOpen} >
        <div className="header__burger_btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  )
};