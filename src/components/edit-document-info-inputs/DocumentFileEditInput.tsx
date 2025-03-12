import { Form } from "antd";
import { t } from "i18next";

import FileUploader from "../upload-document/FileUploader";
import { useUploadFile } from "../../pages/document/api/use-upload-file";

interface Props {
  defaultValue?: string;
  documentId: string;
  folderId?: string;
}

export const DocumentFileEditInput = ({
  defaultValue = "",
  documentId,
  folderId,
}: Props) => {
  const uploadDocument = useUploadFile({ folderId: folderId || "" });

  return (
    <Form layout="vertical">
      <div className="flex">
        <Form.Item className="!mb-0 flex" name="file" label={t("File")}>
          <div className="w-[300px]">{defaultValue}</div>
        </Form.Item>
        <FileUploader
          input
          folderId={folderId}
          multiple={false}
          handleUpload={(file: File) =>
            uploadDocument
              .mutateAsync({
                file,
                documentId,
                folderId: folderId || "",
              })
              .then(() => {})
          }
        >
          <div className="ml-8 mt-auto min-h-5 cursor-pointer py-2 text-sm text-gray-400 underline hover:text-gray-600">
            {t("Edit")}
          </div>
        </FileUploader>
      </div>
    </Form>
  );
};
