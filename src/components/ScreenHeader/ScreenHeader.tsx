import React, { FC, ReactElement } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

import style from './screenHeader.module.scss';

export type ScreenHeaderProps = {
  action?: ReactElement | undefined;
  preHeader?: string | undefined;
  subHeader?: string | undefined;
};

export const ScreenHeader: FC<ScreenHeaderProps> = ({ children, action, preHeader, subHeader }) => {
  return (
    <div className={preHeader ? style.WithPreHeader : style.NoPreHeader}>
      <Stack direction="vertical" gap={4}>
        {preHeader && <div className={style.PreHeader}>{preHeader}</div>}
        <div className={style.header}>
          <Row>
            <Col>
              <Stack direction="vertical" gap={4}>
                {children}
                {subHeader && <div>{subHeader}</div>}
              </Stack>
            </Col>
            {action && <Col md={3}>{action}</Col>}
          </Row>
        </div>
      </Stack>
    </div>
  );
};
