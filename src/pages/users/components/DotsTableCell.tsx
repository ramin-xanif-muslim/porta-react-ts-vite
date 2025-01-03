import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { t } from "i18next";

import { BsThreeDotsVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";

import { User } from "../types";

const items: MenuProps["items"] = [
  {
    key: "Edit",
    label: t("Edit"),
    icon: <RiFileEditLine className="size-5" />,
  },
];

const DotsTableCell = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      navigate(`/users/edit/${user.id}`);
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
