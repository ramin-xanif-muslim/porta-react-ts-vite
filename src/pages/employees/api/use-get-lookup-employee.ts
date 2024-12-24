import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";
import { BaseQueryParams } from "../../../types/query-params";

type EmployeeFilters = {
  searchText: string;
};

export type LookupEmployeeParams = BaseQueryParams<EmployeeFilters>;

export const useGetLookupEmployee = (params?: LookupEmployeeParams) => {

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
