import * as Sentry from "@sentry/nextjs";

export const captureException = (exaction: any) => {
  Sentry.captureException(exaction);
  console.error(exaction);
};
