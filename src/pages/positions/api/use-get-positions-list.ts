import { useQuery } from "@tanstack/react-query";
import { Position } from "../types";
import { positionsApi } from "./positionsApi";

interface UseGetPositionsListParams {
  pageSize: number;
  currentPage: number;
}

interface PositionsListResponse {
  positions: Position[];
  total: number;
  isLoading: boolean;
}

export const useGetPositionsList = ({
  pageSize,
  currentPage,
}: UseGetPositionsListParams): PositionsListResponse => {
  const query = useQuery({
    ...positionsApi.getPositionsListQueryOptions({
      pageSize,
      currentPage,
    }),
  });

  return {
    ...query,
    positions: query.data?.data.list ?? [],
    total: query.data?.data.totalCount ?? 0,
  };
};
