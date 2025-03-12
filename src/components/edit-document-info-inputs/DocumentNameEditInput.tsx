import { useMutation } from "@tanstack/react-query";
import { Input, notification } from "antd";
import { t } from "i18next";

import { documentsApi } from "../../pages/document/api/documentsApi";

import { EditInput } from "./EditInput";
import { queryClient } from "../../api/query-client";

interface Props {
  defaultValue?: string;
  documentId: string;
  folderId?: string;
}

interface RenameDocumentParams {
  folderId: string;
  documentId: string;
  name: string;
  callback?: () => void;
}

export const DocumentNameEditInput = ({
  defaultValue = "",
  documentId,
  folderId,
}: Props) => {

  const { mutate, isPending } = useMutation({
    mutationFn: (params: RenameDocumentParams) =>
      documentsApi.renameDocument(params),
    onSuccess: (_, { folderId, callback }) => {
      queryClient.invalidateQueries({
        queryKey: [documentsApi.baseKey, folderId],
      });

      notification.success({
        message: t("Document renamed successfully"),
      });
      callback?.();
    },
  });

  const handleSave = (name: string, callback?: () => void) => {
    mutate({
      documentId: documentId,
      folderId: folderId || "",
      name,
      callback,
    });
  };

  return (
    <>
      <EditInput
        defaultValue={defaultValue}
        name="name"
        label="Name"
        isPending={isPending}
        handleSave={handleSave}
        FormInput={<Input placeholder={t("Name")} autoFocus />}
      />
    </>
  );
};
