import { Outlet, useParams } from "react-router-dom";
import { t } from "i18next";

import { IoFilter } from "react-icons/io5";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import CreateFolderBnt from "./create-folder/CreateFolderBnt";
import UploadDocumentBtn from "../../components/upload-document/UploadDocumentBtn";
import FileUploader from "../../components/upload-document/FileUploader";
import { useUploadDocument } from "../../pages/document/api/use-upload-document";

const DocumentLayout = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const uploadDocument = useUploadDocument({ folderId: id });

  return (
    <div className="mt-2 flex flex-col bg-white p-2">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-3">
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

        {id && (
          <div>
            <button className="flex items-center rounded-full border border-grayColor-50 p-2 px-4 py-2">
              <span>
                <IoFilter />
              </span>
              <span className="ml-2 hidden lg:block">
                {t("Sort")}: {t("Last Modified")}
              </span>
              <span className="ml-6">
                <HiOutlineArrowSmDown />
              </span>
            </button>
          </div>
        )}
      </div>

      <hr className="border border-grayColor-50" />

      <Outlet />
    </div>
  );
};

export default DocumentLayout;
