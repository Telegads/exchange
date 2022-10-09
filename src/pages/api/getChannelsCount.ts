import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const filter =
    req.query.category !== undefined && req.query.category !== "all"
      ? {
          where: {
            categoryId: req.query.category as string,
          },
        }
      : {
          where: undefined,
        };

  const search =
    req.query.search !== undefined
      ? {
          where: {
            ...filter.where,
            OR: [
              {
                name: {
                  contains: (req.query.search as string).trim(),
                },
              },
              {
                description: {
                  contains: (req.query.search as string).trim(),
                },
              },
            ],
          },
        }
      : {
          ...filter,
        };

  const channelsCount = await prisma.channel.aggregate({
    _count: {
      id: true,
    },
    ...search,
  });

  res.status(200).json(channelsCount._count.id);
};
