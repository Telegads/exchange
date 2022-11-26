import { PrismaClient } from '@prisma/client';

declare global {
  /* eslint-disable no-var */
  // eslint-disable-next-line vars-on-top
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['info', 'warn', 'error'] : ['warn', 'error'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
export default prisma;
