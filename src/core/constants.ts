type PrismaErrorCodeType = {
  code: string;
  message: string;
};

export const PRISMA_ERROR_CODES: Record<string, PrismaErrorCodeType> = {
  RECORD_NOT_FOUND: {
    code: "P2025",
    message: "Record to update not found.",
  },
};
