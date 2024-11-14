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

export default function FoldersMenu({ folders }: Props) {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <Link to={path} className="flex flex-col">
            <div
                className={classNames({
                    "menu-item": true,
                    "active-menu": !!pathname?.includes(path),
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
                        <FolderItem key={item.id} item={item} />
                    ))}
            </div>
        </Link>
    );
}
