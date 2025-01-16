import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { Tag } from "../types";
import { tagsApi } from "./tagsApi";

interface UpdateTag extends Tag {
  id: string;
}

export function useUpdateTag(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateTagMutation = useMutation<void, Error, UpdateTag>({
    mutationFn: async (data) => {
      await tagsApi.updateTag({ data, id: data.id });
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Tag updated") });
    },
    onError: () => notification.error({ message: t("Error updating tag") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [tagsApi.baseKey],
      });
    },
  });

  return updateTagMutation;
}
