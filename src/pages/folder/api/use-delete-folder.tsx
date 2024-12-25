import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { foldersApi } from "./folderApi";

export function useDeleteFolder(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const deleteFolderMutation = useMutation({
    mutationFn: foldersApi.deleteFolder,
    onSuccess: async () => {
      notification.success({ message: t("Folder deleted") });
      onSuccessCallback?.();
    },
    onError: () => notification.error({ message: t("Error deleting folder") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        foldersApi.getFoldersListQueryOptions(),
      );
    },
  });

  return {
    handleDelete: deleteFolderMutation.mutate,
    isPending: deleteFolderMutation.isPending,
  };
}
