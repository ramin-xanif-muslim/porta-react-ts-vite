import { useQuery } from "@tanstack/react-query";

import { rolesApi } from "./rolesApi";
import { SortOption } from "../../../types/query-params";

export const useGetRolesList = (params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [rolesApi.baseKey, "list", params],
    queryFn: () =>
      rolesApi.getRolesList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
      }),
  });

  return {
    ...query,
    roles: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
