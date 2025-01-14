import { useQuery } from "@tanstack/react-query";

import { commentsApi } from "./commentsApi";

export const useGetCommentsList = (params?: {
  documentId: string;
}) => {

  const query = useQuery({
    queryKey: [commentsApi.baseKey, "list", params],
    queryFn: () =>
      commentsApi.getCommentsList({
        params: {
          requireTotalCount: true,
        },
        documentId: params?.documentId || "",
      }),
  });

  return {
    ...query,
    comments: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
