import queryString from "query-string";

export const stringifyQueryParams = (params: Record<string, any>) => {
  return queryString.stringify(params, {
    arrayFormat: "bracket",
  });
};
