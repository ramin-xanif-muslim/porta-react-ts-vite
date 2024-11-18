import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import { LiaCopySolid } from "react-icons/lia";

//  text-[#565D6DFF]
const items: MenuProps["items"] = [
    {
        key: "1",
        label: "Open in",
        icon: <FaRegFolderOpen className="size-5"/>,
    },
    {
        type: "divider",
    },
    {
        key: "2",
        label: "Share",
        icon: <FaShareFromSquare  className="size-5"/>,
    },
    {
        key: "3",
        label: "Copy link",
        icon: <IoMdLink className="size-5"/>,
    },
    {
        key: "4",
        label: "Download",
        icon: <FiDownload className="size-5"/>,
    },
    {
        type: "divider",
    },
    {
        key: "5",
        label: "Delete",
        icon: <MdOutlineDeleteForever className="size-5"/>,
    },
    {
        key: "6",
        label: "Rename",
        icon: <MdOutlineDriveFileRenameOutline className="size-5"/>,
    },
    {
        key: "7",
        label: "Move",
        icon: <IoMdMove className="size-5"/>,
    },
    {
        key: "8",
        label: "Copy",
        icon: <LiaCopySolid className="size-5"/>,
    },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
};
const DotsTableCell = () => {
    return (
        <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomRight"
            className="cursor-pointer"
            overlayClassName="w-[180px] text-[#565D6DFF]"
        >
            <BsThreeDotsVertical className="text-grayColor-600" />
        </Dropdown>
    );
};

export default DotsTableCell;
