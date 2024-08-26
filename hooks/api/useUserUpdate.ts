import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserListResponse } from "@/hooks/api/useUserList";
import { User } from "@/types/user.type";

type UserUpdateParams = {
  name?: string;
  job?: string;
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UserUpdateParams }) =>
      fetch(`https://reqres.in/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onMutate: (data) => {
      queryClient.setQueriesData(
        { queryKey: ["users"] },
        (oldData: UserListResponse | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: oldData.data.map((user: User) => {
              if (user.id === data.id) {
                return {
                  ...user,
                  first_name: data.body.name ?? user.first_name,
                  job: data.body.job,
                };
              }

              return user;
            }),
          };
        },
      );
      queryClient.setQueriesData(
        { queryKey: ["user"] },
        (oldData: { data: User } | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              first_name: data.body.name ?? oldData.data.first_name,
              job: data.body.job,
            },
          };
        },
      );
    },
  });
};
