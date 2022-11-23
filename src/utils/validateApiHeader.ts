import { NextApiRequest, NextApiResponse } from 'next';

import { API_AUTH_VALUE, HTTP_STATUS } from '../constants';

export const validateApiHeader = (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers['authorization'];

  if (authHeader !== API_AUTH_VALUE) {
    res.status(HTTP_STATUS.NOT_AUTHORIZED).send("authorization isn't provided or incorrect");
    return false;
  }
  return true;
};
