import React, { FC, useCallback } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import style from './rangeInput.module.scss';

type RangeInputProps = {
  minValue: number | undefined;
  maxValue: number | undefined;
  onMinValueChange: (value: number | undefined) => void;
  onMaxValueChange: (value: number | undefined) => void;
  fieldName: string;
};

const RangeInput: FC<RangeInputProps> = ({ maxValue, minValue, onMaxValueChange, onMinValueChange, fieldName }) => {
  const handleMinValueChange = useCallback(
    (event) => {
      if (onMinValueChange) {
        onMinValueChange(event.target.value !== '' ? Number(event.target.value) : undefined);
      }
    },
    [onMinValueChange],
  );

  const handleMaxValueChange = useCallback(
    (event) => {
      console.log(event);

      if (onMaxValueChange) {
        onMaxValueChange(event.target.value !== '' ? Number(event.target.value) : undefined);
      }
    },
    [onMaxValueChange],
  );

  return (
    <Row>
      <Form.Label className={style.header}>{fieldName}</Form.Label>

      <Form.Group as={Col} className="mb-3" controlId="formGroupEmail">
        <Form.Label>от</Form.Label>
        <Form.Control type="number" placeholder="max" value={minValue} onChange={handleMinValueChange} />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGroupPassword">
        <Form.Label>до</Form.Label>
        <Form.Control type="number" placeholder="max" value={maxValue} onChange={handleMaxValueChange} />
      </Form.Group>
    </Row>
  );
};

export default RangeInput;
