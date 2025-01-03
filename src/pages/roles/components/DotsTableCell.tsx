import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { t } from "i18next";

import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";

import { Role } from "../types";
import { useModalStore } from "../../../store";

const items: MenuProps["items"] = [
  {
    key: "Edit",
    label: t("Edit"),
    icon: <RiFileEditLine className="size-5" />,
  },
  {
    key: "delete",
    label: t("Delete"),
    icon: <RiDeleteBinLine className="size-5" />,
  },
];

const DotsTableCell = ({ role }: { role: Role }) => {
  const { openModal } = useModalStore();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      openModal("edit-role", {
        role,
      });
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomRight"
      className="cursor-pointer"
      overlayClassName="text-[#565D6DFF]"
      >
        <BsThreeDotsVertical className="text-grayColor-600" />
      </Dropdown>
  );
};

export default DotsTableCell;
