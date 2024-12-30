import { useQuery } from "@tanstack/react-query";

import { employeesApi } from "./employeesApi";
import { SortOption } from "../../../types/query-params";

export const useGetEmployeesList = (params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [employeesApi.baseKey, "list", params],
    queryFn: () =>
      employeesApi.getEmployeesList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
      }),
  });

  return {
    ...query,
    employees: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
