import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const page = Number(req.query["page"]) || 0;
  const limit = Number(req.query["limit"]) || 50;
  const sortType = req.query.sort_type;
  const sortDir = req.query.sort_dir;

  const sorting = sortType
    ? {
        orderBy: {
          [sortType as string]: sortDir,
        },
      }
    : { orderBy: undefined };

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

  const channels = await prisma.channel.findMany({
    take: limit,
    skip: page * limit,
    include: {
      formats: true,
      category: true,
    },
    ...search,
    ...sorting,
  });

  console.log();

  res.status(200).json(channels);
};
