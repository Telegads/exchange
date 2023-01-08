type PrismaErrorCodeType = {
  code: string;
  message: string;
};

export const PRISMA_ERROR_CODES: Record<string, PrismaErrorCodeType> = {
  RECORD_NOT_FOUND: {
    code: 'P2025',
    message: 'Not found',
  },
};

export const USER_GROUP_SYSTEM_NAMES = {
  admins: 'ADMINS',
  users: 'USERS',
};
