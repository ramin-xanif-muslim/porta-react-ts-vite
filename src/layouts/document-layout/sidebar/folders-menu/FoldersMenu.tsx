import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { t } from "i18next";

import { IoIosArrowForward } from "react-icons/io";
import { FaRegFolder } from "react-icons/fa";

import { buildHierarchy } from "../../../../lib/utils";
import FolderItem from "./FolderItem";
import { useGetFolders } from "../../../../pages/folder/api/use-get-folders";
import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../../components/error-boundary/ErrorFallback";
import { Folder } from "../../../../pages/folder/types";
import { useListPageContext } from "../../../../HOC/withListPageContext";

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
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const { data: folders, isLoading, isFetching } = useGetFolders();

  const {setCurrentPage} = useListPageContext()

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback error={new Error("Failed to load FoldersMenu")} />
      }
    >
      <div className="flex flex-col">
        <Link to={path} onClick={() => setCurrentPage(1)}>
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
              <span className="ml-auto flex flex-col" onClick={() => setOpen(!open)}>
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
              />
            ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}
