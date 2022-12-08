import React, { FC } from 'react';

import style from '../../scss/index.module.scss';
import Header from '../Header/Header';

import layoutStyle from './layout.module.scss';

const Layout: FC = ({ children }) => (
  <div className={style.wrapper}>
    <Header />
    <div className={layoutStyle.line}></div>
    {children}
  </div>
);

export default Layout;
