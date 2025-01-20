import { useMutation } from "@tanstack/react-query";

import { documentsApi } from "./documentsApi";

export function useUploadDocument({ folderId, onSuccessCallback }: { folderId: string, onSuccessCallback?: () => void }) {

  const uploadDocumentMutation = useMutation({
    mutationFn: documentsApi.uploadDocument,
    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  const handleCreate = async (file: File, comment: string, tags: string[]) => {
    if (!folderId) {
      console.error("folderId not found");
      return;
    }
    uploadDocumentMutation.mutate({ file, folderId, comment, tags });
  };

  return {
    handleCreate,
    isPending: uploadDocumentMutation.isPending,
  };
}
