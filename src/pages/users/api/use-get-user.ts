import { useQuery } from "@tanstack/react-query";

import { usersApi } from "./usersApi";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: [usersApi.baseKey, id],
    queryFn: () => usersApi.getUser(id),
    enabled: Boolean(id),
  });
};
