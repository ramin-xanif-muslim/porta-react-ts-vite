import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "./departmentsApi";
import { BaseQueryParams, LookupFilters } from "../../../types/query-params";




interface UseGetLookupDepartmentsParams {
  enabled?: boolean;
}

export function useGetLookupDepartments(params: BaseQueryParams<LookupFilters>, options?: UseGetLookupDepartmentsParams) {
  return useQuery({
    queryKey: ["lookupDepartments", params],
    queryFn: () => departmentsApi.getLookupDepartments(params),
    select: (data) => data.data.list,
    ...options,
  });
}
