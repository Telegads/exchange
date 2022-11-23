import { Session } from 'next-auth';
import React from 'react';

import style from '../scss/index.module.scss';

import Header from './Header/Header';

type Props = {
  session: Session | null;
};

const Layout: React.FC<Props> = ({ children, session }) => (
  <div className={style.wrapper}>
    <Header session={session} />
    {children}
  </div>
);

export default Layout;
