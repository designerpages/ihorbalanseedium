export const getSearchParam = (param: string | string[]) => {
  if (Array.isArray(param)) {
    return param[0];
  }

  return param;
};
