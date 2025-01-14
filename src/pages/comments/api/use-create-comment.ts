import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "./commentsApi";
import { notification } from "antd";
import { t } from "i18next";
import { Comment } from "../types";

export function useCreateComment(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation<
    Record<string, string>,
    Error,
    Comment
  >({
    mutationFn: async (data: Comment) => {
      const response = await commentsApi.createComment(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
        notification.success({ message: t("Comment created") });
    },
    onError: () => notification.error({ message: t("Error creating comment") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [commentsApi.baseKey],
      });
    },
  });

  return createCommentMutation;
}
