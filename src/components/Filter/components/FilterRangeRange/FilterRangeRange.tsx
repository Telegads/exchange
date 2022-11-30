import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';

import useDebounce from '../../../../hooks/useDebounce';
import { getParameterFromQuery } from '../../../../utils/getParameterFromQuery';
import RangeInput from '../../../RangeInput/RangeInput';

type FilterRangeProps = {
  parameterName: string;
  fieldName: string;
  maxAllowedValue: number;
};

export const FilterRangeRange: FC<FilterRangeProps> = ({ parameterName, fieldName, maxAllowedValue }) => {
  const router = useRouter();
  const initialMin = getParameterFromQuery(router.query, `${parameterName}Min`);
  const initialMax = getParameterFromQuery(router.query, `${parameterName}Max`);

  const [min, setMin] = useState<number | undefined>(initialMin ? Number(initialMin) : 0);
  const [max, setMax] = useState<number | undefined>(initialMax ? Number(initialMax) : maxAllowedValue);

  const minDebounced = useDebounce(min, 1000);
  const maxDebounced = useDebounce(max, 1000);

  const handleRangeChange = useCallback(
    (parameter: string, value: number | undefined) => {
      router.push({
        query: {
          ...router.query,
          [parameter]: value,
        },
      });
    },
    [router],
  );

  useEffect(() => handleRangeChange(`${parameterName}Min`, minDebounced), [minDebounced, parameterName]);
  useEffect(() => handleRangeChange(`${parameterName}Max`, maxDebounced), [maxDebounced, parameterName]);

  return (
    <>
      <RangeInput
        onMinValueChange={setMin}
        onMaxValueChange={setMax}
        minValue={min}
        maxValue={max}
        fieldName={fieldName}
        maxAllowedValue={maxAllowedValue}
      />
    </>
  );
};
