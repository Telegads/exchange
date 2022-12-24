import prisma from '../../../core/prisma';

export function getUsersByGroup(groupSystemName: string) {
  return prisma.user.findMany({
    where: {
      userGroups: {
        systemName: groupSystemName,
      },
    },
  });
}
