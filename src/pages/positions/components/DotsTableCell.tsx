import type { MenuProps } from "antd";

import { Position } from "../types";
import { useModalStore } from "../../../store";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

const DotsTableCell = ({ position }: { position: Position }) => {

  const { openModal } = useModalStore();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      openModal("edit-position", {
        position,
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
