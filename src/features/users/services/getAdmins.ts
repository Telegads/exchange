import { getUsersByGroup } from '../repository/getByGroup';

export const getAdminsTgIds = async () => {
  const admins = await getUsersByGroup('ADMINS');

  return admins.map((user) => user.tgId);
};
