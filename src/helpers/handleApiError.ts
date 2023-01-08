import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextApiResponse } from 'next';

import { HTTP_STATUS } from '../constants';
import { PRISMA_ERROR_CODES } from '../core/constants';
import { captureException } from '../core/sentry';

export const handleApiError = (res: NextApiResponse, error: any) => {
  captureException(error);

  res.status(HTTP_STATUS.INTERNAL_ERROR);

  let message = 'Internal error';

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND.code) {
      message = PRISMA_ERROR_CODES.RECORD_NOT_FOUND.message;
    }
  }

  if (error instanceof Error) {
    message = error.message;
  }

  res.json({ status: 'error', message });
};
