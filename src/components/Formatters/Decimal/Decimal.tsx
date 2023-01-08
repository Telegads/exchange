import { useRouter } from 'next/router';
import React, { FC } from 'react';

type DecimalProps = {
  number: number;
};

export const Decimal: FC<DecimalProps> = ({ number }) => {
  const { locale } = useRouter();

  return <>{number.toLocaleString(locale)}</>;
};
