import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { documentsApi } from "./documentsApi";

export const useGetDocumentsVersionsList = ({ folderId, documentId, open }: { folderId: string; documentId: string; open: boolean }) => {

  return useQuery({
    ...documentsApi.getDocumentsVersionsListQueryOptions({ folderId, documentId }),
    placeholderData: keepPreviousData,
    // select: (data) => data.data.list,
    enabled: Boolean(folderId && documentId && open),
    retry: false,
  });
};

