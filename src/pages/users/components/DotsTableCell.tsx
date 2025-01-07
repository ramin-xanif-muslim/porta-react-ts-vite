import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

import { User } from "../types";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

const DotsTableCell = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "edit") {
      navigate(`/users/edit/${user.id}`);
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
