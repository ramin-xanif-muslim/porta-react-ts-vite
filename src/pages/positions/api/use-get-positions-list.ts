import { useQuery } from "@tanstack/react-query";
import { positionsApi } from "./positionsApi";
import { SortOption } from "../../../types/query-params";

export const useGetPositionsList = (params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [positionsApi.baseKey, "list", params],
    queryFn: () =>
      positionsApi.getPositionsList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
      }),
  });

  return {
    ...query,
    positions: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
