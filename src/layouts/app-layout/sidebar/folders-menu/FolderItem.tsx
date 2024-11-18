import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

interface FolderItemI {
    id: string;
    name: string;
    children: FolderItemI[];
}

interface Props {
    item: FolderItemI;
    openParents: string[];
}

export default function FolderItem({ item, openParents }: Props) {
    const [open, setOpen] = useState(openParents.includes(item.id));
    const location = useLocation();

    const isActiveFolder = () => {
        const isFoldersPath = !!location.pathname?.includes("folders");
        const lastPathSegment = location.pathname.split("/").pop();
        return isFoldersPath && lastPathSegment === item.id;
    };

    return (
        <Link to={`/folders/${item.id}`}>
            <div
                className={classNames({
                    "menu-item": true,
                    "active-menu": isActiveFolder(),
                })}
            >
                <span className="flex flex-col w-4">
                    {item.children.length > 0 && (
                        <div onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setOpen(!open)
                        }}>
                            <IoIosArrowForward
                                className={classNames({
                                    "transition-all": true,
                                    "rotate-90": open,
                                })}
                            />
                        </div>
                    )}
                </span>
                <div>
                    <FaRegFolder className="size-6" />
                </div>
                <span>{item.name}</span>
            </div>
            <div className="flex flex-col pl-4">
                {item.children.length > 0 && open && (
                    <>
                        {item.children.length &&
                            item.children.map((child) => (
                                <FolderItem key={child.id} item={child} openParents={openParents} />
                            ))}
                    </>
                )}
            </div>
        </Link>
    );
}
