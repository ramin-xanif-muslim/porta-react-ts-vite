import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { documentsApi } from "./documentsApi";

export const useGetDocuments = () => {
  const { id } = useParams();

  return useQuery({
    ...documentsApi.getDocumentsListQueryOptions({ folderId: id || "1" }),
    placeholderData: keepPreviousData,
    select: (data) => data.data.list,
    enabled: Boolean(id),
    staleTime: 1 * 10 * 1000,
    retry: false,
  });
};

