import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "./commentsApi";
import { notification } from "antd";
import { t } from "i18next";

export function useCreateReply(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createReplyMutation = useMutation<
    Record<string, string>,
    Error,
    {
      comment: string;
      documentId: string;
      commentId: string;
    }
  >({
    mutationFn: async (data: {
      comment: string;
      documentId: string;
      commentId: string;
    }) => {
      const response = await commentsApi.createReply({
        comment: data.comment,
        documentId: data.documentId,
        commentId: data.commentId,
      });
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Reply created") });
    },
    onError: () => notification.error({ message: t("Error creating reply") }),
    async onSettled(_, __, variables) {
      await queryClient.invalidateQueries({
        queryKey: [commentsApi.baseKey, variables.documentId],
      });
    },
  });

  return createReplyMutation;
}
