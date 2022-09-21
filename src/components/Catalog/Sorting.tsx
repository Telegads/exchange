import React from "react";
import style from "../../scss/catalog.module.scss";

export const Sorting = () => {
  return (
    <div className={style.content__filters}>
      <div className={style.filter_item}>
        <div className={style.filter__views}>Просмотры</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__rating}`}>
        <div>Рейтинг</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__er}`}>
        <div>ER</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__subscribers}`}>
        <div>Подписчики</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__price}`}>
        <div>Стоимость</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__add}`}>
        <div>Добавлен</div>
      </div>
      <div className={`${style.filter_item} ${style.filter__cpv}`}>
        <div>CPV</div>
      </div>
    </div>
  );
};
