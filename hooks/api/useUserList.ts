import { useQuery } from "@tanstack/react-query";
import { stringifyQueryParams } from "@/helpers/stringifyQueryParams";

type UserListParams = {
  page?: number;
  per_page?: number;
};

export const useUserList = (params?: UserListParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      fetch(
        `https://reqres.in/api/users?${stringifyQueryParams(params ?? {})}`,
      ).then((res) => res.json()),
  });
};
