import { FC } from 'react';

import { Campaign, IconsProps } from '../components/Sidebar/Icons';

type SideBarMenuItem = {
  name: string;
  link: string;
  icon: FC<IconsProps>;
};

export const SIDEBAR_ITEMS: SideBarMenuItem[] = [
  {
    icon: Campaign,
    link: '/campaign',
    name: 'sidebar.campaign',
  },
];
