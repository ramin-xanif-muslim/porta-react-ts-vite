import { useParams } from "react-router-dom";

import { DocumentDataDTO } from "../../../../types";
import { useUploadNewVersion } from "../../api/use-upload-new-version";
import FileUploader from "../../../../components/upload-document/FileUploader";

const UploadNewVersion = ({
  document,
  children,
}: {
  children: React.ReactNode;
  document: DocumentDataDTO;
}) => {
  const { id = "" } = useParams();
  const uploadDocument = useUploadNewVersion({ folderId: id });

  return (
    <FileUploader
      handleUpload={(file) =>
        uploadDocument
          .mutateAsync({
            file,
            documentId: document.id,
            folderId: id,
          })
          .then(() => {})
      }
      multiple={false}
      input
    >
      {children}
    </FileUploader>
  );
};

export default UploadNewVersion;
