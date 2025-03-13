import { useMutation } from "@tanstack/react-query";
import { Select, notification } from "antd";
import { t } from "i18next";

import { queryClient } from "../../api/query-client";
import { documentsApi } from "../../pages/document/api/documentsApi";
import { useTagSelectOptions } from "../../pages/tags/api/useTagSelectOptions";

import { EditInput } from "./EditInput";

interface Props {
  defaultValue?: string;
  documentId: string;
  folderId?: string;
}

interface RenameDocumentParams {
  folderId: string;
  documentId: string;
  tags: string;
  callback?: () => void;
}

export const DocumentTagsEditInput = ({
  defaultValue = "",
  documentId,
  folderId,
}: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (params: RenameDocumentParams) =>
      documentsApi.renameTags(params),
    onSuccess: (_, { documentId, callback }) => {
      queryClient.invalidateQueries({
        queryKey: [documentsApi.baseKey, documentId],
      });

      notification.success({
        message: t("Document tags renamed successfully"),
      });
      callback?.();
    },
  });

  const handleSave = (tags: string, callback?: () => void) => {
    mutate({
      documentId: documentId,
      folderId: folderId || "",
      tags,
      callback,
    });
  };

  const tagSelectOptions = useTagSelectOptions();

  return (
    <>
      <EditInput
        defaultValue={defaultValue}
        name="tags"
        label="Tags"
        isPending={isPending}
        handleSave={handleSave}
        FormInput={
          <Select
            placeholder={t("Select tags")}
            autoFocus
            mode="multiple"
            {...tagSelectOptions}
          />
        }
      />
    </>
  );
};
