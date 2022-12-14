import React, { FC } from 'react';

import style from './popup.module.scss';

type PopupProps = {
  handleClose: () => void;
};

export const Popup: FC<PopupProps> = ({ handleClose, children }) => {
  return (
    <div className={style.popup}>
      <div className={style.popup__container}>
        <button type="reset" className={style.popup__close} onClick={handleClose}></button>
        {children}
      </div>
    </div>
  );
};
