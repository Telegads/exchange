import React, { FC } from 'react';

import Header from '../Header/Header';

import layoutStyle from './layout.module.scss';

const Layout: FC = ({ children }) => (
  <div>
    <Header />
    <div className={layoutStyle.line}></div>
    {children}
  </div>
);

export default Layout;
