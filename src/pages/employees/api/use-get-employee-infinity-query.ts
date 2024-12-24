import { useInfiniteQuery } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";
import { BaseQueryParams } from "../../../types/query-params";

type EmployeeFilters = {
  searchText: string;
};

export type LookupEmployeeParams = BaseQueryParams<EmployeeFilters>;

export const useGetEmployeeInfinityQuery = (params?: LookupEmployeeParams) => {
  const pageSize = params?.take ?? 10;

  return useInfiniteQuery({
    queryKey: [employeesApi.baseKey, "lookup", params],
    queryFn: ({ pageParam = 0 }) => {
      return employeesApi.getLookupEmployee({
        ...params,
        skip: pageParam * pageSize,
        take: pageSize,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });
      const totalPages = Math.ceil(lastPage.data.totalCount / pageSize);
      const currentPage = allPages.length;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.data.list),
  });
};
