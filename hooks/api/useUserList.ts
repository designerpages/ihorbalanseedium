import { useQuery } from "@tanstack/react-query";
import { stringifyQueryParams } from "@/helpers/stringifyQueryParams";
import { User } from "@/types/user.type";

type UserListParams = {
  page?: number;
  per_page?: number;
};

export type UserListResponse = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export const useUserList = (params?: UserListParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      fetch(
        `https://reqres.in/api/users?${stringifyQueryParams(params ?? {})}`,
      ).then((res) => res.json() as Promise<UserListResponse>),
    staleTime: 5000,
  });
};
