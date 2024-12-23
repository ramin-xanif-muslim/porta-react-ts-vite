import { DocumentDataDTO } from "../../../../types";
import { useParams } from "react-router-dom";
import FileUploader from "../../../../components/upload-document/FileUploader";
import { useUploadFile } from "../../api/use-upload-file";

const UploadFile = ({
  document,
  children,
}: {
  children: React.ReactNode;
  document: DocumentDataDTO;
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
    >
      {children}
    </FileUploader>
  );
};

export default UploadFile;
