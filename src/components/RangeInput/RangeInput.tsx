import React, { FC, useCallback } from 'react';
import { Col, Form, Row, Stack } from 'react-bootstrap';

import { Slider } from './components/Slider';
import style from './rangeInput.module.scss';

type RangeInputProps = {
  minValue: number | undefined;
  maxValue: number | undefined;
  onMinValueChange: (value: number | undefined) => void;
  onMaxValueChange: (value: number | undefined) => void;
  fieldName: string;
  maxAllowedValue: number;
};

const RangeInput: FC<RangeInputProps> = ({
  maxValue,
  minValue,
  onMaxValueChange,
  onMinValueChange,
  fieldName,
  maxAllowedValue,
}) => {
  const handleMinValueChange = useCallback(
    (event) => {
      let newValue: number | string;

      if (typeof event === 'number') {
        newValue = event;
      } else {
        newValue = event.target.value;
      }

      if (onMinValueChange) {
        onMinValueChange(newValue !== '' ? Number(newValue) : undefined);
      }
    },
    [onMinValueChange],
  );

  const handleMaxValueChange = useCallback(
    (event) => {
      let newValue: number | string;

      if (typeof event === 'number') {
        newValue = event;
      } else {
        newValue = event.target.value;
      }

      if (onMaxValueChange) {
        onMaxValueChange(newValue !== '' ? Number(newValue) : undefined);
      }
    },
    [onMaxValueChange],
  );

  return (
    <Stack gap={4} direction="vertical">
      <Form.Label className={style.header}>{fieldName}</Form.Label>
      <Slider
        currentMax={maxValue}
        currentMin={minValue}
        max={maxAllowedValue}
        min={0}
        onMaxChange={handleMaxValueChange}
        onMinChange={handleMinValueChange}
      />
      <Row>
        <Form.Group as={Col}>
          <Form.Control type="number" placeholder="max" value={minValue} onChange={handleMinValueChange} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control type="number" placeholder="max" value={maxValue} onChange={handleMaxValueChange} />
        </Form.Group>
      </Row>
    </Stack>
  );
};

export default RangeInput;
