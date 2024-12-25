import { Card, Switch, Form, Input, DatePicker, Select, Radio } from "antd";
import { ImFileText } from "react-icons/im";
import { t } from "i18next";

import { useDepartmentSelectOptions } from "../../../departments/api/use-department-select-options";
import { usePositionSelectOptions } from "../../../positions/api/use-position-select-options";
import { useEmployeeSelectOptionsWithInfinityScroll } from "../../api/use-employee-select-options-with-infinity-scroll";

interface GeneralInformationSectionProps {
  isOffice: boolean;
}

export function GeneralInformationSection({
  isOffice,
}: GeneralInformationSectionProps) {
  const employeeSelectOptions = useEmployeeSelectOptionsWithInfinityScroll();
  const departmentSelectOptions = useDepartmentSelectOptions();
  const positionSelectOptions = usePositionSelectOptions();

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
      extra={
        <div className="flex items-center gap-2">
          <span>{t("Active")}</span>
          <Switch size="small" defaultChecked />
        </div>
      }
    >
      <div className="grid w-full grid-cols-1 gap-4 bg-white lg:grid-cols-2">
        <Form.Item
          name="firstName"
          label={t("First Name")}
          rules={[
            { required: true, message: t("Please input your first name!") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={t("Last Name")}
          rules={[
            { required: true, message: t("Please input your last name!") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="birthDate" label={t("Birth Date")}>
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="gender"
          label={t("Gender")}
          rules={[{ required: true, message: t("Please select gender!") }]}
        >
          <Radio.Group>
            <Radio value="Male">{t("Male")}</Radio>
            <Radio value="Female">{t("Female")}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="email"
          label={t("Email")}
          rules={[{ required: true, message: t("Please input your email!") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label={t("Phone Number")}>
          <Input type="number" className="w-full" />
        </Form.Item>
        <Form.Item name="isOffice" label={t("Is Office")}>
          <Switch />
        </Form.Item>
        <div />
        <Form.Item
          name="employeeId"
          label={t("Employee")}
          rules={[
            { required: isOffice, message: t("Please select employee!") },
          ]}
        >
          <Select
            disabled={!isOffice}
            showSearch
            filterOption={false}
            {...employeeSelectOptions}
          />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label={t("Department")}
          rules={[
            { required: isOffice, message: t("Please select department!") },
          ]}
        >
          <Select
            disabled={!isOffice}
            showSearch
            filterOption={false}
            {...departmentSelectOptions}
          />
        </Form.Item>
        <Form.Item
          name="positionId"
          label={t("Position")}
          rules={[
            { required: isOffice, message: t("Please select position!") },
          ]}
        >
          <Select
            disabled={!isOffice}
            showSearch
            filterOption={false}
            {...positionSelectOptions}
          />
        </Form.Item>
        <Form.Item name="officeNumber" label={t("Office Number")}>
          <Input disabled={!isOffice} />
        </Form.Item>
        <Form.Item name="dateIn" label={t("Date In")}>
          <DatePicker format="DD-MM-YYYY" disabled={!isOffice} />
        </Form.Item>
      </div>
    </Card>
  );
}
