import React, { FC, useCallback, useMemo } from 'react';
import { Portal } from 'react-portal';

import { Button } from '../Button/Button';

import { useCartContext } from './context/CartContext';
import style from './Cart.module.scss';

export const Cart: FC = () => {
  const cartContext = useCartContext();

  const channelsCount = useMemo(
    () => cartContext?.cartValue?.cartItems?.length || 0,
    [cartContext?.cartValue?.cartItems?.length],
  );
  const channelsSubscribersCount = useMemo(
    () => cartContext?.cartValue?.cartItems.reduce((prev, cur) => prev + (cur.subscribers || 0), 0),
    [cartContext?.cartValue],
  );
  const channelsViewsCount = useMemo(
    () => cartContext?.cartValue?.cartItems.reduce((prev, cur) => prev + (cur.views || 0), 0),
    [cartContext?.cartValue],
  );

  const handleDownloadListButtonClick = useCallback(() => ({}), []);

  if (channelsCount === 0) {
    return null;
  }

  return (
    <Portal>
      <div className={style.content__basket}>
        <div className={style.basket__selected}>
          <p className={style.basket__subtitle}>Выбрано каналов:</p>
          <p className={style.basket__number}>{channelsCount}</p>
        </div>
        {/* <div className="basket__sum">
        <p className="basket__subtitle">На сумму:</p>
        <p className="basket__number">1 440р</p>
      </div> */}
        <div className={style.basket__subscribers}>
          <p className={style.basket__subtitle}>Подписчики:</p>
          <p className={style.basket__number}>{channelsSubscribersCount}</p>
        </div>
        <div className={style.basket__views}>
          <p className={style.basket__subtitle}>Просмотры:</p>
          <p className={style.basket__number}>{channelsViewsCount}</p>
        </div>
        <Button onClick={handleDownloadListButtonClick} type="ghost">
          Скачать список каналов
        </Button>
      </div>
    </Portal>
  );
};
