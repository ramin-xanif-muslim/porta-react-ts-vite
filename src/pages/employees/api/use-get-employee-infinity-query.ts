import { useInfiniteQuery } from "@tanstack/react-query";

import { employeesApi } from "./employeesApi";
import { BaseQueryParams, LookupFilters } from "../../../types/query-params";

export const useGetEmployeeInfinityQuery = (params?: BaseQueryParams<LookupFilters>) => {
  const pageSize = params?.take ?? 100;

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
      const totalFetched = allPages.length * pageSize;
      return totalFetched < lastPage.data.totalCount
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
    select: (data) => ({
      list: data.pages.flatMap((page) => page.data.list),
      totalCount: data?.pages[0]?.data.totalCount,
    }),
    staleTime: 1000 * 60 * 5,
  });
};
