import React, { FC, ReactElement } from 'react';

import style from './emptyState.module.scss';

type EmptyStateProps = {
  title: string;
  subtitle: string;
  button?: ReactElement | undefined;
};

export const EmptyState: FC<EmptyStateProps> = ({ title, subtitle, button }) => {
  return (
    <div className={style.emptyState}>
      <p className={style.emptyState_title}>{title}</p>
      <p className={style.emptyState_subtitle}>{subtitle}</p>
      {button && <>{button}</>}
    </div>
  );
};
