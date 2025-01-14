import { useQuery } from "@tanstack/react-query";

import { commentsApi } from "./commentsApi";

export const useGetRepliesList = (params?: { documentId: string; commentId: string, enabled: boolean }) => {
  const query = useQuery({
    queryKey: [commentsApi.baseKey, "replies", params],
    queryFn: () =>
      commentsApi.getRepliesList({
        documentId: params?.documentId || "",
        commentId: params?.commentId || "",
      }),
    enabled: params?.enabled,
  });

  return {
    ...query,
    replies: query?.data?.data?.list || [],
    total: query?.data?.data?.totalCount || 0,
  };
};
