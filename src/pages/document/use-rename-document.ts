import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsApi } from "./documentsApi";
import { notification } from "antd";
import { t } from "i18next";

interface RenameDocumentParams {
  folderId: string ;
  documentId: string;
  name: string;
}

export const useRenameDocument = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RenameDocumentParams) => documentsApi.renameDocument(params),
    onSuccess: (_, { folderId, documentId }) => {
      queryClient.invalidateQueries({
        queryKey: [documentsApi.baseKey, folderId, documentId],
      });

      notification.success({
        message: t("Document renamed successfully"),
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      notification.error({
        message: t("Failed to rename document"),
        description: error instanceof Error ? error.message : undefined,
      });
    },
    async onSettled(_, __, { folderId }) {
      await queryClient.invalidateQueries(
        documentsApi.getDocumentsListQueryOptions({ folderId })
      );
    },
  });
}; 