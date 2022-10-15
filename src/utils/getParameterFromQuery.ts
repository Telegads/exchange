type Query = Record<string, string | string[]>;

export const getParameterFromQuery = (query: Query, parameter: string) =>
  Array.isArray(query[parameter])
    ? (query[parameter][0] as string)
    : (query[parameter] as string);
