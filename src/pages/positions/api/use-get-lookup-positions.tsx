import { useQuery } from "@tanstack/react-query";
import { positionsApi } from "./positionsApi";

interface GetLookupPositionParams {
  take?: number;
  filters?: {
    searchText?: string;
  };
}

interface UseGetLookupPositionsParams {
  enabled?: boolean;
}

export function useGetLookupPositions(
  params: GetLookupPositionParams,
  options: UseGetLookupPositionsParams,
) {
  return useQuery({
    queryKey: [positionsApi.baseKey, "lookup", params],
    queryFn: () => positionsApi.getLookupPositions(params),
    select: (data) => data.data.list,
    ...options,
  });
}
