import React, { FC, useCallback, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { useRouter } from 'next/router';
import { BsFillCartPlusFill, BsFillCartDashFill } from 'react-icons/bs';

import { Button } from '../Button/Button';
import style from '../../scss/catalog.module.scss';
import { useCartContext } from '../Cart/context/CartContext';

import channelRowStyle from './channelRow.module.scss';

type ChannelRowProps = {
  name: string;
  avatar?: string | null;
  description?: string | null;
  er?: number | null;
  malePercent?: number | null;
  views?: number | null;
  category?: string | null;
  id: string;
  subscribers?: number | null;
};

export const ChannelRow: FC<ChannelRowProps> = ({
  name,
  avatar,
  category,
  description,
  er,
  subscribers,
  malePercent,
  views,
  id,
}) => {
  const router = useRouter();
  const { updateCartValue, isInCart } = useCartContext();

  const searchWords = useMemo(() => [router.query.search as string], [router.query.search]);

  const handleCartButtonClick = useCallback(() => updateCartValue(id), [id, updateCartValue]);

  return (
    <div
      className={`${isInCart(id) && style.card__wrapper_selected}
          ${style.card__wrapper}`}
    >
      <div className={style.card__content}>
        <div className={style.content__logo}>{avatar && <img src={avatar} alt="" />}</div>
        <div className={style.content__title}>
          <p>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={name}
            />
          </p>
          {category !== '' && (
            <div className={style.title__options}>
              <div>{category}</div>
            </div>
          )}

          <p>
            <Highlighter
              highlightClassName="YourHighlightClass"
              className={channelRowStyle.channelRow__description}
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={description || ''}
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
          <p className={style.subscribers__number}>{subscribers ? subscribers?.toLocaleString('ru-RU') : '–'}</p>

          <p className={style.subscribers__er}>ER:</p>
          <p className={style.subscribers__er_number}>{er ? `${er}%` : '–'}</p>

          <div className={style.subscribers__people}>
            <img src="/img/icons/male.svg" alt="" />
            <p>{malePercent ? `${malePercent}%` : '–'}</p>
          </div>
        </div>
        <div className={style.statistics__views}>
          <p className={style.views__title}>Просмотры:</p>
          <p className={style.views__number}>{views ? views?.toLocaleString('ru-RU') : '–'}</p>

          {/* <p className={style.views__cpv}>CPV:</p>
          <p className={style.views__cpv_number}>{cpv ? `${cpv}р` : '–'}</p> */}

          <div className={style.views__people}>
            <img src="/img/icons/femal.svg" alt="" />
            <p>{malePercent ? `${100 - malePercent}%` : '–'}</p>
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
          <p className={style.filter__sum}>
            Цена <br /> по запросу
          </p>
        </div>

        <Button
          onClick={handleCartButtonClick}
          variant={isInCart(id) ? 'inverted' : 'primary'}
          fillHeight
          rounded="square"
          className={channelRowStyle.channelRow__cartButton}
        >
          {isInCart(id) ? <BsFillCartDashFill size={20} /> : <BsFillCartPlusFill size={20} />}
        </Button>
      </div>
    </div>
  );
};
