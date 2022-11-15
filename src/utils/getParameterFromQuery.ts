import { ParsedUrlQuery } from "querystring";

type Query = Record<string, string | string[]>;

export const getParameterFromQuery = (
  query: ParsedUrlQuery | undefined,
  parameter: string
) =>
  query
    ? Array.isArray(query[parameter])
      ? (query[parameter]?.[0] as string)
      : (query[parameter] as string)
    : undefined;
