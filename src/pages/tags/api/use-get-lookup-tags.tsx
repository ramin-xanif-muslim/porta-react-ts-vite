import { useQuery } from "@tanstack/react-query";

import { tagsApi } from "./tagsApi";
import { BaseQueryParams, LookupFilters } from "../../../types/query-params";

export const useGetLookupTag = (
  params?: BaseQueryParams<LookupFilters>,
) => {
  return useQuery({
    queryKey: [tagsApi.baseKey, "lookup", params],
    queryFn: () => {
      return tagsApi.getLookupTag({
        ...params,
      });
    },
    select: (data) => data.data.list,
    staleTime: 1000 * 60 * 1,
  });
};
