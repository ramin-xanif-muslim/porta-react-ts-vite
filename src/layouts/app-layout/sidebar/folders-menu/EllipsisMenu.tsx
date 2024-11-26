import { LiaEllipsisVSolid } from "react-icons/lia";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { FolderItemI } from "./FolderItem";
import { useState } from "react";
import classNames from "classnames";
import useStore from "../../../../store/useStore";
import { useDeleteFolder } from "../../../../pages/folder/use-delete-folder";
import { useNavigate } from "react-router-dom";

const EllipsisMenu = ({ folder }: { folder: FolderItemI }) => {
    const [open, setOpen] = useState(false);
    const setRenamedFolder = useStore((state) => state.setRenamedFolder);

    const { handleDelete, isPending } = useDeleteFolder();

    const navigate = useNavigate();

    const items: MenuProps["items"] = [
        {
            key: "delete",
            label: (
                <div
                    onClick={() => {
                        handleDelete(folder.id);
                        navigate(-1);
                    }}
                >
                    Delete
                </div>
            ),
            disabled: isPending,
            icon: <MdOutlineDeleteForever className="size-5" />,
        },
        {
            key: "rename",
            label: (
                <div
                    onClick={() => {
                        setRenamedFolder(folder.id);
                    }}
                >
                    Rename
                </div>
            ),
            icon: <MdOutlineDriveFileRenameOutline className="size-5" />,
        },
    ];

    if (isPending) return null;

    return (
        <div className="group">
            <Dropdown
                open={open}
                onOpenChange={setOpen}
                menu={{ items }}
                trigger={["click"]}
            >
                <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
                    <LiaEllipsisVSolid
                        className={classNames({
                            "size-4 hover:text-gray-600 hidden group-hover:block":
                                true,
                            "!block": open,
                        })}
                    />
                </div>
            </Dropdown>
        </div>
    );
};

export default EllipsisMenu;
