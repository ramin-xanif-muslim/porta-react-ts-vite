import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { documentsApi } from "./documentsApi";

interface RenameDocumentParams {
  folderId: string ;
  documentId: string;
  description: string;
}

export const useRenameDocumentDescription = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RenameDocumentParams) => documentsApi.renameDocumentDescription(params),
    onSuccess: (_, { folderId, documentId }) => {
      queryClient.invalidateQueries({
        queryKey: [documentsApi.baseKey, folderId, documentId],
      });

      notification.success({
        message: t("Document description renamed successfully"),
      });
      onSuccessCallback?.();
    },
    async onSettled(_, __, { folderId }) {
      await queryClient.invalidateQueries(
        documentsApi.getDocumentsListQueryOptions({ folderId })
      );
    },
  });
}; 