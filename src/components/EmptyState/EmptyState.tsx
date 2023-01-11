import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';

import style from './emptyState.module.scss';

type ActionType = 'channel' | 'campaign';

type EmptyStateProps = {
  title: string;
  subtitle: string;
  action?: ActionType;
};

export const EmptyState: FC<EmptyStateProps> = ({ title, subtitle, action }) => {
  const { t } = useTranslation('common');

  return (
    <div className={style.emptyState}>
      <p className={style.emptyState_title}>{title}</p>
      {subtitle && <p className={style.emptyState_subtitle}>{subtitle}</p>}
      {action === 'channel' && (
        <Button className={style.emptyState_button} variant="outline-primary" href="/channels/add">
          {t('emptyState.buttons.channel')}
          <img src="/img/icons/plus.svg" alt="add channel" />
        </Button>
      )}
      {action === 'campaign' && (
        <Button className={style.emptyState_button} variant="outline-primary" href="/catalog">
          {t('emptyState.buttons.campaign')}
          <img src="/img/icons/plus.svg" alt="add campain" />
        </Button>
      )}
    </div>
  );
};
