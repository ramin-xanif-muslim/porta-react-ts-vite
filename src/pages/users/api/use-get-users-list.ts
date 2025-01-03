import { useQuery } from "@tanstack/react-query";

import { usersApi } from "./usersApi";
import { SortOption } from "../../../types/query-params";

export const useGetUsersList = (params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [usersApi.baseKey, "list", params],
    queryFn: () =>
      usersApi.getUsersList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
      }),
  });

  return {
    ...query,
    users: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
