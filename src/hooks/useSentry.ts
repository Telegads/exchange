import { captureException } from '../core/sentry';

export const useSentry = () => {
  return captureException;
};
