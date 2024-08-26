import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user.type";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      fetch(`https://reqres.in/api/users/${id}`).then(
        (res) => res.json() as Promise<{ data: User }>,
      ),
  });
};
