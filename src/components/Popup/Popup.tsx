import React, { FC } from 'react';

import style from './popup.module.scss';

type PopupProps = {
  open: boolean;
  handleClose: () => void;
};

export const Popup: FC<PopupProps> = ({ open, handleClose, children }) => {
  return (
    <>
      {open && (
        <div className={style.popup}>
          <div className={style.popup__container}>
            <button type="reset" className={style.popup__close} onClick={handleClose}></button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
