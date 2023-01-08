import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';

type DateTimeStringProps = {
  date: DateTime;
};

export const DateTimeString: FC<DateTimeStringProps> = ({ date }) => {
  const { locale } = useRouter();

  return <>{date.toLocaleString(DateTime.DATE_FULL, { locale })}</>;
};
