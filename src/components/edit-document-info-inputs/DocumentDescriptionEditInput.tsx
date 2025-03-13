import { useMutation } from "@tanstack/react-query";
import { Input, notification } from "antd";
import { t } from "i18next";

import { queryClient } from "../../api/query-client";
import { documentsApi } from "../../pages/document/api/documentsApi";

import { EditInput } from "./EditInput";

interface Props {
  defaultValue?: string;
  documentId: string;
  folderId?: string;
}

interface RenameDocumentParams {
  folderId: string;
  documentId: string;
  description: string;
  callback?: () => void;
}
export const DocumentDescriptionEditInput = ({
  defaultValue = "",
  documentId,
  folderId,
}: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (params: RenameDocumentParams) =>
      documentsApi.renameDocumentDescription(params),
    onSuccess: (_, { documentId, callback }) => {
      queryClient.invalidateQueries({
        queryKey: [documentsApi.baseKey, documentId],
      });

      notification.success({
        message: t("Document description renamed successfully"),
      });
      callback?.();
    },
  });

  const handleSave = (description: string, callback?: () => void) => {
    mutate({
      documentId: documentId,
      folderId: folderId || "",
      description,
      callback,
    });
  };

  return (
    <>
      <EditInput
        defaultValue={defaultValue}
        name="description"
        label="Description"
        FormInput={<Input.TextArea placeholder={t("Description")} autoFocus rows={4} />}
        heightDiv="h-32"
        isPending={isPending}
        handleSave={handleSave}
      />
    </>
  );
};
