import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const page = Number(req.query["page"]) || 0;
  const limit = Number(req.query["limit"]) || 50;

  const channels = await  prisma.channel.findMany({
    take: limit,
    skip: page * limit,
    include: {
      formats: true,
      category: true,
    },
  });

  res.status(200).json(channels);
};
