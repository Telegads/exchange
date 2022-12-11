import { User } from '@prisma/client';

import { getByTgAuthToken } from '../repository';

type AuthUserByTokenArgs = {
  token: string;
};

export type AuthUserByTokenResponse =
  | {
      status: 'found';
      user: User;
    }
  | {
      status: 'notFound';
      user: null;
    };

export const authUserByToken = async ({ token }: AuthUserByTokenArgs): Promise<AuthUserByTokenResponse> => {
  // eslint-disable-next-line testing-library/no-await-sync-query
  const user = await getByTgAuthToken(token);

  if (!user.length) {
    return { status: 'notFound', user: null };
  }

  return { status: 'found', user: user[0] };
};
