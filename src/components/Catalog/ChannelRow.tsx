import React, { FC, useCallback, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { useRouter } from 'next/router';
import { BsFillCartPlusFill, BsFillCartDashFill } from 'react-icons/bs';

import { Button } from '../Button/Button';
import style from '../../scss/catalog.module.scss';
import { ChannelWithTagsAndFormats } from '../../pages/catalog';
import { useCartContext } from '../Cart/context/CartContext';

import channelRowStyle from './channelRow.module.scss';

export const ChannelRow: FC<{ channelInfo: ChannelWithTagsAndFormats }> = ({ channelInfo }) => {
  const router = useRouter();
  const { updateCartValue, isInCart } = useCartContext();

  const searchWords = useMemo(() => [router.query.search as string], [router.query.search]);

  const handleCartButtonClick = useCallback(() => updateCartValue(channelInfo), [channelInfo, updateCartValue]);

  return (
    <div
      className={`${isInCart(channelInfo.id) && style.card__wrapper_selected}
          ${style.card__wrapper}`}
    >
      <div className={style.card__content}>
        <div className={style.content__logo}>{channelInfo.avatar && <img src={channelInfo.avatar} alt="" />}</div>
        <div className={style.content__title}>
          <p>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={channelInfo.name}
            />
          </p>
          {channelInfo.category && channelInfo.category.name !== '' && (
            <div className={style.title__options}>
              <div>{channelInfo.category.name}</div>
            </div>
          )}

          <p>
            <Highlighter
              highlightClassName="YourHighlightClass"
              className={channelRowStyle.channelRow__description}
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={channelInfo.description || ''}
            />
          </p>
        </div>
      </div>
      <div className={style.card__border}>
        <div className={style.border__line}></div>
      </div>
      <div className={style.card__statistics}>
        <div className={style.statistics__subscribers}>
          <p className={style.subscribers__title}>Подписчики:</p>
          <p className={style.subscribers__number}>
            {channelInfo.subscribers ? channelInfo.subscribers?.toLocaleString('ru-RU') : '–'}
          </p>

          <p className={style.subscribers__er}>ER:</p>
          <p className={style.subscribers__er_number}>{channelInfo.er ? `${channelInfo.er}%` : '–'}</p>

          <div className={style.subscribers__people}>
            <img src="/img/icons/male.svg" alt="" />
            <p>{channelInfo.malePercent ? `${channelInfo.malePercent}%` : '–'}</p>
          </div>
        </div>
        <div className={style.statistics__views}>
          <p className={style.views__title}>Просмотры:</p>
          <p className={style.views__number}>{channelInfo.views ? channelInfo.views?.toLocaleString('ru-RU') : '–'}</p>

          <p className={style.views__cpv}>CPV:</p>
          <p className={style.views__cpv_number}>{channelInfo.cpv ? `${channelInfo.cpv}р` : '–'}</p>

          <div className={style.views__people}>
            <img src="/img/icons/femal.svg" alt="" />
            <p>{channelInfo.malePercent ? `${100 - channelInfo.malePercent}%` : '–'}</p>
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
        {channelInfo.formats?.length > 0 ? (
          <div className={style.card__filter}>
            <div className={style.filter__forms}>
              <div className={style.form__format}>
                <p className={style.format__title}>Формат:</p>
                <div className={style.format__select}>
                  <select name="items">
                    {channelInfo.formats.map((format) => (
                      <option value={format.id} key={`${channelInfo.id}-${format.id}`}>
                        {format.name}
                      </option>
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
            {channelInfo.postPrice && <p className={style.filter__sum}>{channelInfo.postPrice}</p>}
          </div>
        ) : (
          <div className={style.card__filter}>
            <p className={style.filter__sum}>
              Цена <br /> по запросу
            </p>
          </div>
        )}

        <Button
          onClick={handleCartButtonClick}
          type={isInCart(channelInfo.id) ? 'inverted' : 'primary'}
          fillHeight
          rounded="square"
          className={channelRowStyle.channelRow__cartButton}
        >
          {isInCart(channelInfo.id) ? <BsFillCartDashFill size={20} /> : <BsFillCartPlusFill size={20} />}
        </Button>
      </div>
    </div>
  );
};
