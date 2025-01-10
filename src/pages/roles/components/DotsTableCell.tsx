import type { MenuProps } from "antd";

import { Role } from "../types";
import { useModalStore } from "../../../store";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

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
    <DropdownDotsTableCell
      items={["Edit", "Delete"]}
      onClick={handleMenuClick}
    />
  );
};

export default DotsTableCell;
