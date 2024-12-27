import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { documentsApi } from "./documentsApi";

export const useGetDocuments = ({ folderId }: { folderId: string }) => {

  return useQuery({
    queryKey: [documentsApi.baseKey, folderId],
    queryFn: () => documentsApi.getDocumentList({ folderId }),
    placeholderData: keepPreviousData,
    select: (data) => data.data.list,
    enabled: Boolean(folderId),
    staleTime: 1 * 10 * 1000,
    retry: false,
  });
};

