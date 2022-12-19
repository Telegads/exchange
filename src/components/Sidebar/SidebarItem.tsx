import Link from 'next/link';
import React, { FC } from 'react';

import style from './sidebar.module.scss';

interface NavbarItemProps {
  linkPath: string;
  title: string;
}

export const SidebarItem: FC<NavbarItemProps> = ({ linkPath, title, children }) => {
  return (
    <li className={style.hover_left_line}>
      <Link href={linkPath}>
        <a href={linkPath}>
          <span className={style.tooltip}>{title}</span>
          {children}
        </a>
      </Link>
    </li>
  );
};
