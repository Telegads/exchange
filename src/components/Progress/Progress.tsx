import React, { FC } from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

import style from './progress.module.scss';

type ProgressProps = {
  position: number;
};

export const Progress: FC<ProgressProps> = ({ position }) => {
  return <BootstrapProgressBar className={style.progress} now={position} />;
};
