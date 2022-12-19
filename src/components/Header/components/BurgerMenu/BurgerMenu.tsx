import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsXCircleFill } from 'react-icons/bs';

import { AccountButton } from '../AccountButton/AccountButton';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { Logo } from '../Logo/Logo';

import style from './burgermenu.module.scss';

type Variant = 'index' | 'other';

type BurgerMenuProps = {
  variant?: Variant;
};

export const BurgerMenu: FC<BurgerMenuProps> = ({ variant }) => {
  const { t } = useTranslation('common');

  const [isOpenBurger, setIsOpenBurger] = useState(true);
  const toggleBurger = useCallback(() => setIsOpenBurger(!isOpenBurger), [isOpenBurger]);

  return (
    <>
      <div
        className={`${isOpenBurger ? style.header__burger : `${style.header__burger} ${style.header__burger_active}`}`}
      >
        <div className={style.burder__wrapper}>
          <div className={style.burger__header}>
            <Logo />
            <BsXCircleFill type="reset" size={30} className={style.burger__button_close} onClick={toggleBurger} />
          </div>
          <div className={style.burger__menu}>
            <ul>
              <li>
                <a href="/catalog">{t('headmenu.catalog')}</a>
              </li>
            </ul>
          </div>
          <LanguageSelector className={style.burger__language} />
          <AccountButton className={`${style.header__btn__burgermenu} ${style.burger__bnt}`} />
        </div>
      </div>
      <div
        className={style.header__wrapper_burger}
        onClick={toggleBurger}
        onKeyDown={toggleBurger}
        role="button"
        tabIndex={0}
      >
        <div className={variant == 'index' ? style.header__burger_btn_index : style.header__burger_btn}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};
