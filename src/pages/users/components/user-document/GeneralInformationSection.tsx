import { Card, Form, FormInstance, Input, Select } from "antd";
import { t } from "i18next";
import { ImFileText } from "react-icons/im";
import { useEmployeeSelectOptions } from "../../../employees/api/use-employee-select-options";
import { useRoleSelectOptions } from "../../../roles/api/use-role-select-options";

export const GeneralInformationSection = ({
  isEmployee,
  form,
  mode,
}: {
  isEmployee: boolean;
  form: FormInstance;
  mode: "create" | "update";
}) => {
  const employeeSelectOptions = useEmployeeSelectOptions();
  const roleSelectOptions = useRoleSelectOptions();

  const onChangeEmployee = (value: string) => {
    if (!value) {
      form.setFieldsValue({
        firstName: "",
        lastName: "",
      });
      return;
    }

    const employee = employeeSelectOptions?.options?.find(
      (option: { value: string }) => option.value === value,
    );

    if (!employee) {
      return;
    }

    const [firstName, lastName] = employee.label.split(" ");
    form.setFieldsValue({
      firstName,
      lastName,
    });
  };
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
        <Form.Item label={t("Employee")} name="employeeId">
          <Select
            showSearch
            filterOption={false}
            {...employeeSelectOptions}
            className="w-full"
            onChange={onChangeEmployee}
            allowClear
          />
        </Form.Item>
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
        <Form.Item
          label={t("Main Role")}
          name="mainRoleId"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            filterOption={false}
            {...roleSelectOptions}
            className="w-full"
            allowClear
            onChange={(value) => {
              if (!value) {
                form.setFieldsValue({
                  roleIds: [],
                });
              }
            }}
          />
        </Form.Item>
        <Form.Item label={t("Roles")} shouldUpdate>
          {({ getFieldValue }) => {
              return (
                <Form.Item name="roleIds" noStyle>
                  <Select
                    showSearch
                    filterOption={false}
                    options={
                      roleSelectOptions.options.filter(
                        (option: {
                          key: string;
                          value: string;
                          label: string;
                        }) => option.value !== form.getFieldValue("mainRoleId"),
                      ) || []
                    }
                    onSearch={roleSelectOptions.onSearch}
                    loading={roleSelectOptions.loading}
                    className="w-full"
                    allowClear
                    mode="multiple"
                    disabled={!getFieldValue("mainRoleId")}
                  />
                </Form.Item>
              );
          }}
        </Form.Item>
      </div>
    </Card>
  );
};
