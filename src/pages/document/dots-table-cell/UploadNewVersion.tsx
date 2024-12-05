import { Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { DocumentDataDTO } from "../../../types";
import { useUploadNewVersion } from "../use-upload-new-version";
import { useParams } from "react-router-dom";
import FileUploader from "../../../components/upload-document/FileUploader";

interface UploadNewVersionProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentDataDTO;
}

const UploadNewVersion = ({ isOpen, onClose, document }: UploadNewVersionProps) => {
  const { id = '' } = useParams();
  const uploadDocument = useUploadNewVersion({ folderId: id });

  return (
    <Modal
      title={t("Upload New Version")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="w-full max-w-lg"
    >
      <div className="p-6">
        <FileUploader 
          handleUpload={(file) => uploadDocument.mutateAsync({ 
            file, 
            documentId: document.id, 
            folderId: id 
          }).then(() => {
            onClose();
          })}
          multiple={false}
          input
        >
          <div className="space-y-6 text-center">
            <div className="text-5xl text-blue-500">
              <InboxOutlined />
            </div>
            <p className="text-lg font-medium text-gray-700">
              {t("Click or drag file to this area to upload")}
            </p>
            <p className="text-sm text-gray-500">
              {t("Support for a single file upload. Strictly prohibited from uploading company data or other banned files.")}
            </p>
          </div>
        </FileUploader>
      </div>
    </Modal>
  );
};

export default UploadNewVersion; 