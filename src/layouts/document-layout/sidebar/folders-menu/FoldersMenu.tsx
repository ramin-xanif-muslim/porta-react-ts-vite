import { Spin } from "antd";
import classNames from "classnames";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";

import { useListPageContext } from "../../../../HOC/withListPageContext";
import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../../components/error-boundary/ErrorFallback";
import { buildHierarchy } from "../../../../lib/utils";
import { useGetFolders } from "../../../../pages/folder/api/use-get-folders";
import { Folder } from "../../../../pages/folder/types";
import { useGlobalStore } from "../../../../store";

import FolderItem from "./FolderItem";

const path = "/documents/documents/folders";

function getParentFoldersId(folders: Folder[], pathname: string): string[] {
  const openIds: string[] = [];
  const folderId = pathname.split("/").pop() || null;
  let currentId = folderId;

  while (currentId) {
    openIds.push(currentId);
    const currentFolder = folders.find((folder) => folder.id === currentId);
    currentId = currentFolder?.parentId || null;
  }

  return openIds.filter((id) => id !== folderId);
}

export default function FoldersMenu() {
  const { id = "" } = useParams();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const { data: folders, isLoading, isFetching } = useGetFolders();

  const selectFolderId = useGlobalStore((state) => state.selectFolderId);

  useEffect(() => {
    selectFolderId(id);
  }, []);

  const { setCurrentPage, handleCloseAction } = useListPageContext();

  const handleSelectFolder = (id: string) => {
    selectFolderId(id);
    setCurrentPage(1);
    handleCloseAction();
  };

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback error={new Error("Failed to load FoldersMenu")} />
      }
    >
      <div className="flex flex-col">
        <Link to={path} onClick={() => handleSelectFolder("")}>
          <Spin spinning={isLoading}>
            <div
              className={classNames({
                "menu-item": true,
                "active-menu": pathname === path,
              })}
            >
              <div>
                <FaRegFolder className="size-6" />
              </div>
              <span className="">{t("All files")}</span>
              <span
                className="ml-auto flex flex-col"
                onClick={() => setOpen(!open)}
              >
                <IoIosArrowForward
                  className={classNames({
                    "transition-all": true,
                    "rotate-90": open,
                  })}
                />
              </span>
            </div>
          </Spin>
        </Link>
        <div className="flex flex-col">
          {open &&
            !!folders?.[0] &&
            buildHierarchy(folders).map((item) => (
              <FolderItem
                key={isFetching ? item.id + Math.random() : item.id + pathname}
                item={item}
                openParents={getParentFoldersId(folders, pathname)}
                handleSelectFolder={handleSelectFolder}
              />
            ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}
