import { useQuery } from "@tanstack/react-query";
import { documentsApi } from "./documentsApi";
import { SortOption } from "../../../types/query-params";

export const useGetDocuments = ({
  folderId,
  params,
}: {
  folderId: string;
  params?: {
    pageSize?: number;
    currentPage?: number;
    sort?: SortOption[];
    searchText?: string;
    filterParams?: Record<string, unknown>;
  };
}) => {
  const skip = params?.currentPage
    ? (params.currentPage - 1) * (params?.pageSize || 10)
    : 0;
  const take = params?.pageSize || 10;

  const query = useQuery({
    queryKey: [documentsApi.baseKey, folderId, params],
    queryFn: () =>
      documentsApi.getDocumentList({
        skip,
        take,
        sort: params?.sort || [],
        requireTotalCount: true,
        filters: {
          searchText: params?.searchText || "",
          folderId,
          ...params?.filterParams,
        },
      }),
    // enabled: Boolean(folderId),
  });

  return {
    ...query,
    documents: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
