
import { Outlet } from "react-router-dom";

import { useListPageContext } from "../../HOC/withListPageContext";
import { ActionComponent } from "../../components/action-component/ActionComponent";
import FileUploader from "../../components/upload-document/FileUploader";
import UploadDocumentBtn from "../../components/upload-document/UploadDocumentBtn";
import { useGlobalStore } from "../../store";

import Breadcrumb from "./Breadcrumb";
import CreateFolderBnt from "./create-folder/CreateFolderBnt";
import { ToggleSidebar } from "./sidebar/toggle-sideber";

const DocumentLayout = () => {
  const selectedFolderId = useGlobalStore((state) => state.selectedFolderId);

  const { action, selectedRowKeys, handleCloseAction } = useListPageContext();

  return (
    <div className="page">
      <div className="header-page bg-bg">
        <div className="flex items-center gap-2">
          <ToggleSidebar />
          <Breadcrumb />
        </div>
        <div className="header-page__actions">
          <ActionComponent
            action={action}
            selectedRowKeys={selectedRowKeys}
            handleClose={handleCloseAction}
          />
          {selectedFolderId && (
            <FileUploader
              key={selectedFolderId}
              input
              folderId={selectedFolderId}
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
