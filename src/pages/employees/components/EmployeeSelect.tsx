import { Select } from "antd";
import { useGetLookupEmployee } from "../use-get-lookup-employee";
import { t } from "i18next";

interface EmployeeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function EmployeeSelect({
  value,
  onChange,
  disabled,
}: EmployeeSelectProps) {
  const { data: lookupEmployees } = useGetLookupEmployee();

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={t("Select employee")}
    >
      {lookupEmployees?.data?.list?.map(
        (employee: { id: string; name: string }) => (
          <Select.Option key={employee.id} value={employee.id}>
            {employee.name}
          </Select.Option>
        ),
      )}
    </Select>
  );
}
