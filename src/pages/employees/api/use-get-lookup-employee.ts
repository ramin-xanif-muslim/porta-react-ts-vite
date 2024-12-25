import { useQuery } from "@tanstack/react-query";

import { employeesApi } from "./employeesApi";
import { BaseQueryParams, LookupFilters } from "../../../types/query-params";

export const useGetLookupEmployee = (
  params?: BaseQueryParams<LookupFilters>,
) => {
  return useQuery({
    queryKey: [employeesApi.baseKey, "lookup", params],
    queryFn: () => {
      return employeesApi.getLookupEmployee({
        ...params,
      });
    },
    select: (data) => data.data.list,
  });
};
