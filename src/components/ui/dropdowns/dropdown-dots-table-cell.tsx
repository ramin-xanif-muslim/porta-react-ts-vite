import { Dropdown, MenuProps } from "antd";
import { t } from "i18next";

import { BsThreeDots } from "react-icons/bs";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoMdLink, IoMdMove } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LiaCopySolid } from "react-icons/lia";

type ActionItem =
  | "edit"
  | "delete"
  | "open in"
  | "share"
  | "copy link"
  | "download"
  | "rename"
  | "move"
  | "divider"
  | "copy";

type CapitalizedActionItem = Capitalize<ActionItem>;

const getIcon = (icon: string) => {
  switch (icon) {
    case "Edit":
      return <RiFileEditLine className="size-5" />;
    case "Delete":
      return <RiDeleteBinLine className="size-5" />;
    case "Open in":
      return <FaRegFolderOpen className="size-5" />;
    case "Share":
      return <FaShareFromSquare className="size-5" />;
    case "Copy link":
      return <IoMdLink className="size-5" />;
    case "Download":
      return <FiDownload className="size-5" />;
    case "Rename":
      return <MdOutlineDriveFileRenameOutline className="size-5" />;
    case "Move":
      return <IoMdMove className="size-5" />;
    case "Copy":
      return <LiaCopySolid className="size-5" />;
    default:
      return null;
  }
};

const getItems = (items: string[]): MenuProps["items"] => {
  return items.map((item) => {
    if (item === "Divider") {
      return {
        type: "divider",
      };
    }
    return {
      key: item,
      label: t(item),
      icon: getIcon(item),
    };
  });
};

interface DropdownDotsProps {
  items: CapitalizedActionItem[];
  onClick: MenuProps["onClick"];
  placement?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
  overlayClassName?: string;
  children?: React.ReactNode;
}

export const DropdownDotsTableCell = ({
  items,
  onClick,
  placement = "bottomRight",
  overlayClassName = "text-[#565D6DFF]",
  children = <BsThreeDots className="text-grayColor-600" />,
}: DropdownDotsProps) => {
  return (
    <Dropdown
      menu={{ items: getItems(items), onClick }}
      placement={placement}
      className="cursor-pointer"
      overlayClassName={overlayClassName}
    >
      {children}
    </Dropdown>
  );
};
