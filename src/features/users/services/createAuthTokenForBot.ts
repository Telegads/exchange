import { getUserByTgId } from '../repository';
import { createFromTgBot } from '../repository/createFromTgBot';
import { createTempTokenForTgBot } from '../repository/createTempTokenForTgBot';
import { getTokenByTgId } from '../repository/getTokenByTgId';

type CreateAuthTokenForBotArg = {
  tgId: string;
  name: string;
};

export const createAuthTokenForBot = async ({ tgId, name }: CreateAuthTokenForBotArg): Promise<{ token: string }> => {
  const tokens = await getTokenByTgId({ tgId });

  if (tokens.length) {
    return { token: tokens[0].token };
  }

  const user = await getUserByTgId({ tgId });

  if (!user.length) {
    await createFromTgBot({ tgId, name });
  }
  const { token } = await createTempTokenForTgBot({ userTgId: tgId });

  return { token };
};
