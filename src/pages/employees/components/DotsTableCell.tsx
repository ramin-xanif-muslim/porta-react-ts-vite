import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

import { Employee } from "../types";
import { DropdownDotsTableCell } from "../../../components/ui/dropdowns";

const DotsTableCell = ({ employee }: { employee: Employee }) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Edit") {
      navigate(`/employees/edit/${employee.id}`);
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
