import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';

import useDebounce from '../../../../hooks/useDebounce';
import { getParameterFromQuery } from '../../../../utils/getParameterFromQuery';
import RangeInput from '../../../RangeInput/RangeInput';

type FilterRangeProps = {
  parameterName: string;
  fieldName: string;
};

export const FilterRangeRange: FC<FilterRangeProps> = ({ parameterName, fieldName }) => {
  const router = useRouter();
  const initialMin = getParameterFromQuery(router.query, `${parameterName}Min`);
  const initialMax = getParameterFromQuery(router.query, `${parameterName}Max`);

  const [min, setMin] = useState(initialMin ? Number(initialMin) : undefined);
  const [max, setMax] = useState(initialMax ? Number(initialMax) : undefined);

  const minDebounced = useDebounce(min);
  const maxDebounced = useDebounce(max);

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
      />
    </>
  );
};
