import { useQuery } from "@tanstack/react-query";
import { SortOption } from "../../../types/query-params";
import { tagsApi } from "./tagsApi";

export function useGetTagsList(params?: {
  pageSize?: number;
  currentPage?: number;
  sort?: SortOption[];
  searchText?: string;
}){
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [tagsApi.baseKey, "list", params],
    queryFn: () =>
      tagsApi.getTagsList({
        requireTotalCount: true,
        skip,
        take,
        sort: params?.sort,
        filters: {
          searchText: params?.searchText || "",
        },
      }),
  });

  return {
    ...query,
    tags: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};