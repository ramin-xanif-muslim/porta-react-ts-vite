import type { MenuProps } from "antd";

import { Tag } from "../types";
import { useModalStore } from "../../../store";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

const DotsTableCell = ({ tag }: { tag: Tag }) => {
  const { openModal } = useModalStore();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      openModal("edit-tag", {
        tag,
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
