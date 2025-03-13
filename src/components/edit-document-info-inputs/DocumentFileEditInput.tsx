import { Form } from "antd";
import { t } from "i18next";

import { useUploadFile } from "../../pages/document/api/use-upload-file";
import FileUploader from "../upload-document/FileUploader";

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
          <div className="h-8 w-[350px] border border-dashed rounded p-2  overflow-scroll no-scrollbar">{defaultValue}</div>
        </Form.Item>
        <div className="mt-auto">
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
          <div className="ml-8  min-h-5 cursor-pointer py-2 text-sm text-gray-400 underline hover:text-gray-600">
            {t("Edit")}
          </div>
        </FileUploader>
        </div>
      </div>
    </Form>
  );
};
