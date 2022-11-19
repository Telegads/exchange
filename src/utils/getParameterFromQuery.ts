import { ParsedUrlQuery } from "querystring";

export const getParameterFromQuery = (
  query: ParsedUrlQuery | undefined,
  parameter: string
) =>
  query
    ? Array.isArray(query[parameter])
      ? (query[parameter]?.[0] as string)
      : (query[parameter] as string)
    : undefined;
