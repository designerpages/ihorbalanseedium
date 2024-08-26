import { useMutation } from "@tanstack/react-query";

type UserCreateParams = {
  name: string;
  job: string;
};

export const useUserCreate = () => {
  return useMutation({
    mutationFn: (body: UserCreateParams) =>
      fetch(`https://reqres.in/api/users`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });
};
