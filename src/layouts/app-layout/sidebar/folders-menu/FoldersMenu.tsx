import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { buildHierarchy } from "../../../../lib/utils";
import { FolderDTO } from "../../../../types";
import FolderItem from "./FolderItem";
import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import { useGetFolders } from "../../../../pages/folder/use-get-folders";

const path = "/folders";

function getParentFoldersId(folders: FolderDTO[], pathname: string): string[] {
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
    const [open, setOpen] = useState(pathname.includes(path));

    const { data: folders, isLoading } = useGetFolders();

    

    return (
        <ErrorBoundary>
            <div className="flex flex-col">
                <Link to={path}>
                    <Spin spinning={isLoading}>
                        <div
                            className={classNames({
                                "menu-item": true,
                                "active-menu": pathname === path,
                            })}
                            onClick={() => setOpen(!open)}
                        >
                            <div>
                                <FaRegFolder className="size-6" />
                            </div>
                            <span className="">All files</span>
                            <span className="flex flex-col ml-auto">
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
                                key={item.id}
                                item={item}
                                openParents={getParentFoldersId(
                                    folders,
                                    pathname
                                )}
                            />
                        ))}
                </div>
            </div>
        </ErrorBoundary>
    );
}
