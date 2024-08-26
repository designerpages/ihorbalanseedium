import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserListResponse } from "@/hooks/api/useUserList";
import { User } from "@/types/user.type";

export const useUserDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      }).then((res) => res.status),
    onMutate: (id) => {
      queryClient.setQueriesData(
        { queryKey: ["users"] },
        (oldData: UserListResponse | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: oldData.data.filter((user: User) => user.id !== id),
          };
        },
      );
    },
  });
};
