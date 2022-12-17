import React, { FC } from 'react';
import { BsXCircleFill } from 'react-icons/bs';

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
            <BsXCircleFill
              type="reset"
              size={30}
              color={'#EBEDF2'}
              className={style.popup__close}
              onClick={handleClose}
            ></BsXCircleFill>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
