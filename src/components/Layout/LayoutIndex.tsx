import React, { FC } from 'react';

import style from '../../scss/index.module.scss';
import Header from '../Header/Header';

export const LayoutIndex: FC = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <Header />
      {children}
    </div>
  );
};
