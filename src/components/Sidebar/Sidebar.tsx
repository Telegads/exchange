import React from 'react';
import { useTranslation } from 'react-i18next';

import { SIDEBAR_ITEMS } from '../../core/menu';

import style from './sidebar.module.scss';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className={style.navbar}>
        <ul>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem linkPath={item.link} title={t(item.name)} key={item.link}>
              <item.icon className={style.hover__img} />
            </SidebarItem>
          ))}
        </ul>
      </div>
      <div className={style.line_navbar} />
    </>
  );
};
