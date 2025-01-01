import { FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import RenameFolder from "./RenameFolder";
import EllipsisMenu from "./EllipsisMenu";

export interface FolderItemI {
  id: string;
  name: string;
  parentId?: string | null | undefined;
  children: FolderItemI[];
}

interface Props {
  item: FolderItemI;
  openParents: string[];
  callback?: (bool: boolean) => void;
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
    <>
      <Link
        to={`/documents/documents/folders/${item.id}`}
        className={classNames({
          "menu-item group": true,
          "active-menu": isActiveFolder(),
        })}
      >
        <span className="w-4 shrink-0">
          {item.children.length > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpen(!open);
              }}
            >
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
        <span className="line-clamp-1 w-full" title={item.name}>
          <RenameFolder
            folderName={item.name}
            id={item.id}
            parentId={item.parentId}
          />
        </span>

        <div className="ml-auto">
          <EllipsisMenu folder={item} />
        </div>
      </Link>
      <div className="flex flex-col pl-4">
        {item.children.length > 0 && open && (
          <>
            {item.children.length &&
              item.children.map((child) => (
                <FolderItem
                  key={child.id}
                  item={child}
                  openParents={openParents}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
}
