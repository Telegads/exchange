import { Channel } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { channelRepository } from "../../repositories/channelRepository";
import { HTTP_STATUS } from "../../constants";
import { PRISMA_ERROR_CODES } from "../../core/constants";

const AUTH_VALUE = `secret: ${process.env.API_AUTH_SECRET}`;

type UpdateChannelBody = {
  channel: Channel;
};

const validateMethod = (req: NextApiRequest, method: string) =>
  req.method === method;

const updateChannelHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const requestBody: UpdateChannelBody = req.body;
  const authHeader = req.headers["authorization"];

  if (!validateMethod(req, "POST")) {
    res
      .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
      .send({ message: "Only POST requests allowed" });
    return;
  }

  if (!requestBody.channel) {
    res
      .status(HTTP_STATUS.INVALID_CLIENT_REQUEST)
      .send({ message: "channel should not be empty" });
    return;
  }

  if (!requestBody.channel.url) {
    res
      .status(HTTP_STATUS.INVALID_CLIENT_REQUEST)
      .send({ message: "channel.url should not be empty" });
    return;
  }

  if (authHeader !== AUTH_VALUE) {
    res
      .status(HTTP_STATUS.NOT_AUTHORIZED)
      .send("authorization isn't provided or incorrect");
    return;
  }

  try {
    await channelRepository.updateChannel(requestBody.channel);

    res.status(HTTP_STATUS.OK).send({ message: `Channel updated` });
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    res.status(HTTP_STATUS.INTERNAL_ERROR);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND.code) {
        res.send(PRISMA_ERROR_CODES.RECORD_NOT_FOUND.message);
        return;
      }
    }
    res.send("Internal error");
  }
};

export default updateChannelHandler;
