import { useQuery } from "@tanstack/react-query";

import { rolesApi } from "./rolesApi";
import { BaseQueryParams, LookupFilters } from "../../../types/query-params";

export const useGetLookupRole = (
  params?: BaseQueryParams<LookupFilters>,
) => {
  return useQuery({
    queryKey: [rolesApi.baseKey, "lookup", params],
    queryFn: () => {
      return rolesApi.getLookupRole({
        ...params,
      });
    },
    select: (data) => data.data.list,
  });
};
