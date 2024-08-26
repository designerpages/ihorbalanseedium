import { useMutation } from "@tanstack/react-query";

type UserUpdateParams = {
  name?: string;
  job?: string;
};

export const useUserUpdate = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UserUpdateParams }) =>
      fetch(`https://reqres.in/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });
};
