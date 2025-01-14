import { Card, Form, FormInstance, Input, Select } from "antd";
import { t } from "i18next";
import { ImFileText } from "react-icons/im";
import { useRoleSelectOptions } from "../../../roles/api/use-role-select-options";
import { useEmployeeSelectTableOptions } from "../../../employees/api/use-employee-select-table-options";

export const GeneralInformationSection = ({
  isEmployee,
  form,
  mode,
}: {
  isEmployee: boolean;
  form: FormInstance;
  mode: "create" | "update";
}) => {
  const employeeSelectOptions = useEmployeeSelectTableOptions({ form });
  const roleSelectOptions = useRoleSelectOptions();
  return (
    <Card
      title={
        <div className="">
          <div className="flex items-center gap-2">
            <ImFileText className="text-brand" size={24} />
            <h3 className="font-bold">{t("General information")}</h3>
          </div>
        </div>
      }
    >
      <div className="grid w-full grid-cols-1 gap-4 bg-white lg:grid-cols-2">
        <Form.Item
          name="username"
          label={t("Username")}
          rules={[{ required: true }]}
        >
          <Input disabled={mode === "update"} />
        </Form.Item>
        <Form.Item name="email" label={t("Email")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="relative">
          <Form.Item label={t("Employee")} name="employeeId">
            <Select
              onClear={() => {
                form.setFieldsValue({
                  firstName: "",
                  lastName: "",
                });
              }}
              showSearch
              filterOption={false}
              {...employeeSelectOptions.selectOptions}
              className="w-full"
              allowClear
              popupClassName="hidden"
            />
          </Form.Item>
          {employeeSelectOptions.dropdownContainer}
        </div>
        <div />
        <Form.Item
          name="firstName"
          label={t("First Name")}
          rules={[{ required: true }]}
        >
          <Input disabled={isEmployee} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={t("Last Name")}
          rules={[{ required: true }]}
        >
          <Input disabled={isEmployee} />
        </Form.Item>
        <Form.Item label={t("Roles")} name="roleIds">
          <Select
            showSearch
            filterOption={false}
            options={roleSelectOptions.options}
            onSearch={roleSelectOptions.onSearch}
            loading={roleSelectOptions.loading}
            className="w-full"
            allowClear
            mode="multiple"
            onChange={(value) => {
              form.setFieldsValue({
                mainRoleId: value[0],
              });
            }}
          />
        </Form.Item>
        <Form.Item label={t("Main Role")} shouldUpdate>
          {({ getFieldValue }) => {
            return (
              <Form.Item name="mainRoleId" noStyle>
                <Select
                  showSearch
                  filterOption={false}
                  options={
                    roleSelectOptions.options.filter(
                      (option: { key: string; value: string; label: string }) =>
                        form.getFieldValue("roleIds")?.includes(option.value),
                    ) || []
                  }
                  onSearch={roleSelectOptions.onSearch}
                  loading={roleSelectOptions.loading}
                  className="w-full"
                  allowClear
                  disabled={!getFieldValue("roleIds")?.[0]}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
      </div>
    </Card>
  );
};
