import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS } from "../../../constants";
import { handleApiError } from "../../../helpers/handleApiError";
import { backgroundTaskRepository } from "../../../repositories/backgroundTaskRepository";
import { validateApiHeader } from "../../../utils/validateApiHeader";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!validateApiHeader(req, res)) {
    return;
  }

  if (req.method !== "POST") {
    res
      .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
      .send({ message: "Only POST requests allowed" });
    return;
  }

  if (!req.body.taskName) {
    res
      .status(HTTP_STATUS.INVALID_CLIENT_REQUEST)
      .send({ message: "taskName should not be empty" });
    return;
  }

  try {
    await backgroundTaskRepository.startTaskByName(req.body.taskName);
    res.status(HTTP_STATUS.OK).send({ message: `Task is started` });
  } catch (error) {
    handleApiError(res, error);
  }
};
