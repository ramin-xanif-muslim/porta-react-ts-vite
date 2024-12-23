import { useInfiniteQuery } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";
import { BaseQueryParams } from "../../../types/query-params";

type EmployeeFilters = {
  searchText: string;
};

export type LookupEmployeeParams = BaseQueryParams<EmployeeFilters>;

export const useGetLookupEmployee = (data?: LookupEmployeeParams) => {
  return useInfiniteQuery({
    queryKey: [employeesApi.baseKey, "lookup", data],
    queryFn: () =>
      employeesApi.getLookupEmployee({
        ...data,
      }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.data.list),
  });
};
