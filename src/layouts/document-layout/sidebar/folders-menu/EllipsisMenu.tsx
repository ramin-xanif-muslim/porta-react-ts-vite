import { LiaEllipsisVSolid } from "react-icons/lia";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Dropdown, Popconfirm, Spin } from "antd";
import { t } from "i18next";
import { useState } from "react";
import classNames from "classnames";

import useStore from "../../../../store/useStore";
import { useDeleteFolder } from "../../../../pages/folder/use-delete-folder";
import { FolderItemI } from "./FolderItem";

const EllipsisMenu = ({ folder }: { folder: FolderItemI }) => {
  const [open, setOpen] = useState(false);
  const setRenamedFolder = useStore((state) => state.setRenamedFolder);

  const navigate = useNavigate();

  const { handleDelete, isPending } = useDeleteFolder(() =>
    navigate("/document-management/documents/folders")
  );

  const items: MenuProps["items"] = [
    {
      key: "delete",
      label: (
        <Popconfirm
          title={t("Delete the folder")}
          description={t("Are you sure to delete this folder?")}
          onConfirm={() => {
            handleDelete(folder.id);
          }}
          okText={isPending ? <Spin size="small" /> : t("Yes")}
          cancelText={t("No")}
        >
          <div className="flex items-center gap-2">
            <span>
              <MdOutlineDeleteForever className="size-5" />
            </span>
            <span>{t("Delete")}</span>
          </div>
        </Popconfirm>
      ),
      disabled: isPending,
    },
    {
      key: "rename",
      label: (
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setRenamedFolder(folder.id);
          }}
        >
          <span>
            <MdOutlineDriveFileRenameOutline className="size-5" />
          </span>
          <span>{t("Rename")}</span>
        </div>
      ),
    },
  ];

  return (
    <Spin size="small" spinning={isPending} className="group">
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        menu={{ items }}
        trigger={["click"]}
      >
        <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
          <LiaEllipsisVSolid
            className={classNames({
              "size-4 hover:text-gray-600 hidden group-hover:block": true,
              "!block": open,
            })}
          />
        </div>
      </Dropdown>
    </Spin>
  );
};

export default EllipsisMenu;
