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
  const minInQuery = getParameterFromQuery(router.query, `${parameterName}Min`);
  const maxInQuery = getParameterFromQuery(router.query, `${parameterName}Max`);

  const [min, setMin] = useState<number | undefined>(minInQuery ? Number(minInQuery) : undefined);
  const [max, setMax] = useState<number | undefined>(maxInQuery ? Number(maxInQuery) : undefined);

  const minDebounced = useDebounce(min, 1000);
  const maxDebounced = useDebounce(max, 1000);

  useEffect(() => {
    if (minInQuery === undefined) {
      setMin(undefined);
    }
    if (maxInQuery === undefined) {
      setMax(undefined);
    }
  }, [maxInQuery, minInQuery]);

  const handleRangeChange = useCallback(
    (parameter: string, value: number | undefined) => {
      if (value) {
        router.push({
          query: {
            ...router.query,
            [parameter]: value,
          },
        });
      }
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
