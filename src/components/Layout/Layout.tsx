import React, { FC } from 'react';

import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

import layoutStyle from './layout.module.scss';

const Layout: FC = ({ children }) => (
  <div className={layoutStyle.pageWrapper}>
    <Header />
    <div className={layoutStyle.line}></div>

    <div className={layoutStyle.contentWrapper}>
      <Sidebar />
      <div className={layoutStyle.childrenWrapper}>{children}</div>
    </div>
  </div>
);

export default Layout;
