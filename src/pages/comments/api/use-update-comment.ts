import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "./commentsApi";
import { notification } from "antd";
import { t } from "i18next";
import { Comment } from "../types";

export function useUpdateComment(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation<
    Record<string, string>,
    Error,
    { data: Comment; id: string }
  >({
    mutationFn: async (data: { data: Comment; id: string }) => {
      const response = await commentsApi.updateComment(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Comment updated") });
    },
    onError: () => notification.error({ message: t("Error updating comment") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [commentsApi.baseKey],
      });
    },
  });

  return updateCommentMutation;
}
