import React from "react";
import { Basket } from "../Icons";
import style from "../../scss/catalog.module.scss";

export const CatalogRow = () => {
  return (
    <div className={style.card__wrapper}>
      <div className={style.card__content}>
        <div className={style.content__logo}>
          <img src="/img/icons/logo_topor.jpg" alt="" />
          <div className={style.content__sell}>
            <div>%</div>
          </div>
        </div>
        <div className={style.content__title}>
          <p>Топор 18+</p>
          <div className={style.title__options}>
            <div>другое</div>
            <div>статьи</div>
          </div>
          <p>Живой активный канал без накруток и ботов!</p>
        </div>
      </div>
      <div className={style.card__border}>
        <div className={style.border__line}></div>
      </div>
      <div className={style.card__statistics}>
        <div className={style.statistics__subscribers}>
          <p className={style.subscribers__title}>Подписчики:</p>
          <p className={style.subscribers__number}>18 101</p>
          <p className={style.subscribers__er}>ER:</p>
          <p className={style.subscribers__er_number}>49%</p>
          <div className={style.subscribers__people}>
            <img src="/img/icons/male.svg" alt="" />
            <p>90%</p>
          </div>
        </div>
        <div className={style.statistics__views}>
          <p className={style.views__title}>Просмотры:</p>
          <p className={style.views__number}>4К</p>
          <p className={style.views__cpv}>CPV:</p>
          <p className={style.views__cpv_number}>0.08р</p>
          <div className={style.views__people}>
            <img src="/img/icons/femal.svg" alt="" />
            <p>10%</p>
          </div>
        </div>
      </div>
      <div className={style.card__btn_mb}>
        <div className={style.btn_mb__wrapper}>
          <div>
            <p className={style.btn_mb__text}>Показать больше</p>
            <img src="/img/icons/arrow.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={style.card__wrapper_fil_buy}>
        <div className={style.card__filter}>
          <div className={style.filter__forms}>
            <div className={style.form__format}>
              <p className={style.format__title}>Формат:</p>
              <div className={style.format__select}>
                <select name="items">
                  <option selected value="num1">
                    1/24
                  </option>
                  <option value="num2">2/48</option>
                  <option value="num3">3/72</option>
                </select>
              </div>
            </div>
            <div className={style.form__amount}>
              <p className={style.amount__title}>Количество:</p>
              <div className={style.amount__select}>
                <select name="items">
                  <option selected value="num1">
                    3
                  </option>
                  <option value="num2">6</option>
                  <option value="num3">8</option>
                </select>
              </div>
            </div>
          </div>
          <p className={style.filter__sum}>360р</p>
        </div>
        <div className={style.card__buy}>
          <div className={style.card__buy_hover}>
            <a href="#">
              <Basket />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
