import React, { FC } from 'react';

import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

import layoutStyle from './layout.module.scss';

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <div className={layoutStyle.line}></div>

    <div className={layoutStyle.wrapper}>
      <Sidebar />
      {children}
    </div>
  </>
);

export default Layout;
