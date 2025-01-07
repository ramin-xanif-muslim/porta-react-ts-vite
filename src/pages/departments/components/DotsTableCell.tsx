import type { MenuProps } from "antd";

import { Department } from "../types";
import { useModalStore } from "../../../store";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

interface DotsTableCellProps {
  department: Department;
}

export default function DotsTableCell({ department }: DotsTableCellProps) {
  const { openModal } = useModalStore();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      openModal("edit-department", {
        department,
      });
    }
  };

  return (
    <DropdownDotsTableCell
      items={["Edit", "Delete"]}
      onClick={handleMenuClick}
    />
  );
}
