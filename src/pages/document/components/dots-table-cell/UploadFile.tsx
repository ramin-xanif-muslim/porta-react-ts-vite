import { useParams } from "react-router-dom";

import { Document } from "../../types";
import FileUploader from "../../../../components/upload-document/FileUploader";
import { useUploadFile } from "../../api/use-upload-file";

const UploadFile = ({
  document,
  children,
}: {
  children: React.ReactNode;
  document: Document;
}) => {
  const { id = "" } = useParams();
  const uploadDocument = useUploadFile({ folderId: id });

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
      folderId={id}
    >
      {children}
    </FileUploader>
  );
};

export default UploadFile;
