import { Outlet, useParams } from "react-router-dom";

import CreateFolderBnt from "./create-folder/CreateFolderBnt";
import UploadDocumentBtn from "../../components/upload-document/UploadDocumentBtn";
import FileUploader from "../../components/upload-document/FileUploader";
import { useUploadDocument } from "../../pages/document/api/use-upload-document";
import Breadcrumb from "./Breadcrumb";
import { ToggleSidebar } from "./sidebar/toggle-sideber";

const DocumentLayout = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const uploadDocument = useUploadDocument({ folderId: id });

  return (
    <div className="page">
      <div className="header-page bg-bg">
        <div className="flex items-center gap-2">
          <ToggleSidebar />
          <Breadcrumb />
        </div>
        <div className="header-page__actions">
          {id && (
            <FileUploader
              key={id}
              input
              handleUpload={uploadDocument.handleCreate}
            >
              <UploadDocumentBtn />
            </FileUploader>
          )}
          <CreateFolderBnt />
        </div>
      </div>


      <Outlet />
    </div>
  );
};

export default DocumentLayout;
