import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "./departmentsApi";
import { SortOption } from "../../../types/query-params";

export const useGetDepartmentsList = (params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [departmentsApi.baseKey, "list", params],
    queryFn: () =>
      departmentsApi.getDepartmentsList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
      }),
  });

  return {
    ...query,
    departments: query.data?.data.list ?? [],
    total: query.data?.data.totalCount ?? 0,
  };
};
