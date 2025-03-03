import { useParams } from "react-router-dom";

import { useUploadNewVersion } from "../../api/use-upload-new-version";
import FileUploader from "../../../../components/upload-document/FileUploader";

const UploadNewVersion = ({
  documentId,
  children,
}: {
  children: React.ReactNode;
  documentId: string;
}) => {
  const { id = "" } = useParams();
  const uploadDocument = useUploadNewVersion({ folderId: id });

  return (
    <FileUploader
      handleUpload={(file: File) =>
        uploadDocument
          .mutateAsync({
            file,
            documentId,
            folderId: id,
          })
          .then(() => {})
      }
      multiple={false}
      input
      folderId={id}
    >
      {children}
    </FileUploader>
  );
};

export default UploadNewVersion;
