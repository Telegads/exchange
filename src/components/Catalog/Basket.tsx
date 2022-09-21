import React from "react";
import style from "../../scss/catalog.module.scss";

export const Basket = () => {
  return (
    <div className={style.content__basket}>
      <div className={style.basket__selected}>
        <p className={style.basket__subtitle}>Выбран:</p>
        <p className={style.basket__number}>1 канал</p>
      </div>
      <div className={style.basket__sum}>
        <p className={style.basket__subtitle}>На сумму:</p>
        <p className={style.basket__number}>1 440р</p>
      </div>
      <div className={style.basket__subscribers}>
        <p className={style.basket__subtitle}>Подписчики:</p>
        <p className={style.basket__number}>30 000</p>
      </div>
      <div className={style.basket__views}>
        <p className={style.basket__subtitle}>Просмотры:</p>
        <p className={style.basket__number}>10к</p>
      </div>
      <div className={style.basket__btn}>
        <a href="#">Перейти в корзину</a>
      </div>
    </div>
  );
};
