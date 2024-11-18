import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { buildHierarchy } from "../../../../lib/utils";
import { FolderDTO } from "../../../../types";
import FolderItem from "./FolderItem";
import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

interface Props {
    folders: FolderDTO[];
}

const path = "/folders";

function getParentFoldersId(
    folders: FolderDTO[],
    pathname: string
): string[] {
    const openIds: string[] = [];
    const folderId = pathname.split("/").pop() || null;
    let currentId = folderId

    while (currentId) {
        openIds.push(currentId);
        const currentFolder = folders.find(folder => folder.id === currentId);
        currentId = currentFolder?.parentId || null;
    }

    return openIds.filter(id => id !== folderId); 
}


export default function FoldersMenu({ folders }: Props) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(pathname.includes(path));


    return (
        <Link to={path} className="flex flex-col">
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

            <div className="flex flex-col pl-4">
                {open &&
                    buildHierarchy(folders).map((item) => (
                        <FolderItem key={item.id} item={item} openParents={getParentFoldersId(folders, pathname)} />
                    ))}
            </div>
        </Link>
    );
}
