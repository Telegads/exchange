import React, { FC, ReactElement } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

import style from './screenHeader.module.scss';

export type ScreenHeaderProps = {
  rightSection?: ReactElement | undefined;
  preHeader?: string | ReactElement | undefined;
  subHeader?: string | ReactElement | undefined;
};

export const ScreenHeader: FC<ScreenHeaderProps> = ({ children, rightSection, preHeader, subHeader }) => {
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
            {rightSection && <Col md={3}>{rightSection}</Col>}
          </Row>
        </div>
      </Stack>
    </div>
  );
};
