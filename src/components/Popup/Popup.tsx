import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
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
        <Modal show={open} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
        </Modal>
      )}
    </>
  );
};
