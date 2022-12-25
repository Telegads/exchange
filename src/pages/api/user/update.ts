import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { handleApiError } from '../../../helpers/handleApiError';
import { getUserById } from '../../../features/users/repository/';
import { options } from '../auth/[...nextauth]';
import { updateUserById, UpdateUserByIdArg } from '../../../features/users/repository/updateById copy';

export type UpdateUserRequestBody = {
  userData: UpdateUserByIdArg;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userData } = req.body as UpdateUserRequestBody;
    const session = await unstable_getServerSession(req, res, options);

    if (req.method !== 'POST') {
      throw new Error('only POST methods allowed');
    }

    if (!userData) {
      throw new Error('userData should be defined');
    }

    if (!session?.user?.id) {
      throw new Error('Session user was not provided');
    }

    const user = getUserById(session?.user.id);

    if (!user) {
      throw new Error('Unknown user');
    }

    await updateUserById({
      ...userData,
      id: session?.user.id,
    });

    res.json({
      status: 'success',
    });
  } catch (error) {
    handleApiError(res, error);
  }
}
