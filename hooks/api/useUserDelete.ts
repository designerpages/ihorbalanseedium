import { useMutation } from "@tanstack/react-query";

export const useUserDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      }).then((res) => res.status),
  });
};
