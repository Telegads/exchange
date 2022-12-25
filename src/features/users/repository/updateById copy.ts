import { User } from '@prisma/client';

import prisma from '../../../core/prisma';

export type UpdateUserByIdArg = Partial<User>;

export function updateUserById(user: UpdateUserByIdArg) {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}
