import { Outlet, useParams } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import CreateFolderBnt from "./create-folder/CreateFolderBnt";
import UploadDocumentBtn from "./upload-document/UploadDocumentBtn";
import FileUploader from "./upload-document/FileUploader";
import { t } from "i18next";

const DocumentLayout = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="flex flex-col mt-2 bg-white p-2">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-3 ">
          {id && (
            <FileUploader key={id} input folderId={id}>
              <UploadDocumentBtn />
            </FileUploader>
          )}
          <CreateFolderBnt />
        </div>

        {id && (
          <div>
            <button className="border border-grayColor-50 flex items-center p-2 rounded-full px-4 py-2">
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
