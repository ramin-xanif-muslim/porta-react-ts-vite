import { t } from "i18next";
import { Dropdown } from "antd";
    
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiFileEditLine, RiDeleteBinLine } from "react-icons/ri";

import { Department } from "../types";
import { useModalStore } from "../../../store";

interface DotsTableCellProps {
  department: Department;
}

export default function DotsTableCell({ department }: DotsTableCellProps) {
  const { openModal } = useModalStore();

  const items = [
    {
      key: "edit",
      label: t("Edit"),
      icon: <RiFileEditLine className="size-5" />,
      onClick: () => openModal("edit-department", { department }),
    },
    {
      key: "delete",
      label: t("Delete"),
      icon: <RiDeleteBinLine className="size-5" />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <BsThreeDotsVertical className="cursor-pointer" />
    </Dropdown>
  );
}
