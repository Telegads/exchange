import React, { FC } from 'react';
import { ProgressBar as BootstrapProgressBar, ProgressBarProps } from 'react-bootstrap';

import style from './progress.module.scss';

type ProgressProps = {
  position: number;
} & ProgressBarProps;

export const Progress: FC<ProgressProps> = (props) => {
  return <BootstrapProgressBar className={`${style.progress} ${props.className}`} now={props.position} {...props} />;
};
