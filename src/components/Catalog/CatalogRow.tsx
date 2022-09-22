import React, { FC } from "react";
import { Basket } from "../Icons";
import style from "../../scss/catalog.module.scss";
import { ChannelWithTagsAndFormats } from "../../pages/catalog";

export const CatalogRow: FC<ChannelWithTagsAndFormats> = ({
  avatar,
  cpv,
  description,
  er,
  malePercent,
  name,
  subscribers,
  views,
  formats,
  tags,
}) => {
  return (
    <div className={style.card__wrapper}>
      <div className={style.card__content}>
        <div className={style.content__logo}>
          <img src={avatar} alt="" />
          {/* <div className={style.content__sell}>
            <div>%</div>
          </div> */}
        </div>
        <div className={style.content__title}>
          <p>{name}</p>
          {tags.length > 0 && (
            <div className={style.title__options}>
              {tags.map((tag) => (
                <div>{tag.name}</div>
              ))}
            </div>
          )}
          <p>{description}</p>
        </div>
      </div>
      <div className={style.card__border}>
        <div className={style.border__line}></div>
      </div>
      <div className={style.card__statistics}>
        <div className={style.statistics__subscribers}>
          {subscribers && (
            <>
              <p className={style.subscribers__title}>Подписчики:</p>
              <p className={style.subscribers__number}>{subscribers}</p>
            </>
          )}

          {er && (
            <>
              <p className={style.subscribers__er}>ER:</p>
              <p className={style.subscribers__er_number}>{er}%</p>
            </>
          )}

          {malePercent && (
            <div className={style.subscribers__people}>
              <img src="/img/icons/male.svg" alt="" />
              <p>{malePercent}%</p>
            </div>
          )}
        </div>
        <div className={style.statistics__views}>
          {views && (
            <>
              <p className={style.views__title}>Просмотры:</p>
              <p className={style.views__number}>{views}</p>
            </>
          )}
          {cpv && (
            <>
              <p className={style.views__cpv}>CPV:</p>
              <p className={style.views__cpv_number}>{cpv}р</p>
            </>
          )}

          {malePercent && (
            <div className={style.views__people}>
              <img src="/img/icons/femal.svg" alt="" />
              <p>{100 - malePercent}%</p>
            </div>
          )}
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
                  {formats.map((format) => (
                    <option value={format.id}>{format.name}</option>
                  ))}
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
