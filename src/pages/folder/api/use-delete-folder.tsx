import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { foldersApi } from "./folderApi";

export function useDeleteFolder(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: foldersApi.deleteFolder,
    onSuccess: async () => {
      notification.success({ message: t("Folder deleted") });
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: [foldersApi.baseKey] });
    },
    onError: () => notification.error({ message: t("Error deleting folder") }),
  });
}
