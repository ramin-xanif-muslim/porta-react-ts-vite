import { useQuery } from "@tanstack/react-query";

import { positionsApi } from "./positionsApi";
import { BaseQueryParams } from "../../../types/query-params";

interface Options {
  enabled?: boolean;
  staleTime?: number;
}

export function useGetLookupPositions(
  params: BaseQueryParams,
  options: Options,
) {
  return useQuery({
    queryKey: [positionsApi.baseKey, "lookup", params],
    queryFn: () => positionsApi.getLookupPositions(params),
    select: (data) => data.data.list,
    ...options,
  });
}
