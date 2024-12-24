import { useQuery } from "@tanstack/react-query";
import { departmentsApi } from "./departmentsApi";

interface GetLookupDepartmentParams {
  take?: number;
  filters?: {
    searchText?: string;
  };
}



interface UseGetLookupDepartmentsParams {
  enabled?: boolean;
}

export function useGetLookupDepartments(params: GetLookupDepartmentParams, options?: UseGetLookupDepartmentsParams) {
  return useQuery({
    queryKey: ["lookupDepartments", params],
    queryFn: () => departmentsApi.getLookupDepartments(params),
    select: (data) => data.data.list,
    ...options,
  });
}
