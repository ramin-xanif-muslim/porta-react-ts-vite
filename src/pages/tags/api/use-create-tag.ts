import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { Tag } from "../types";
import { tagsApi } from "./tagsApi";

export function useCreateTag(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const createTagMutation = useMutation<void, Error, Tag>({
    mutationFn: async (data) => {
      await tagsApi.createTag(data);
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Tag created") });
    },
    onError: () => notification.error({ message: t("Error creating tag") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [tagsApi.baseKey],
      });
    },
  });

  return createTagMutation;
}
