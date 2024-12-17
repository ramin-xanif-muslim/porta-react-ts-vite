import {
  Button,
  Card,
  Switch,
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  FormInstance,
  Modal,
} from "antd";
import dayjs from "dayjs";
import { t } from "i18next";

import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { MdOutlineInsertPhoto, MdOutlineCloudUpload } from "react-icons/md";
import { ImFileText } from "react-icons/im";

import { EmployeeDTO } from "../../types";
import React from "react";

const EmployeePage = ({
  initialValues,
  isPending,
  onFinish,
  mode = "create",
  form,
}: {
  initialValues?: Partial<EmployeeDTO>;
  isPending: boolean;
  onFinish: (values: EmployeeDTO) => void;
  mode?: "create" | "update";
  form: FormInstance<EmployeeDTO>;
}) => {
  const navigate = useNavigate();
  const isOffice = Form.useWatch("isOffice", form);
  const [isFormDirty, setIsFormDirty] = React.useState(false);

  // Handle form changes
  const handleFormChange = () => {
    setIsFormDirty(form.isFieldsTouched());
  };

  // Split into two separate navigation handlers
  const handleBackNavigation = () => {
    if (!isFormDirty) {
      navigate(-1);
      return;
    }

    Modal.confirm({
      title: t('Unsaved Changes'),
      content: t('You have unsaved changes. Are you sure you want to leave?'),
      okText: t('Leave'),
      cancelText: t('Stay'),
      onOk: () => {
        navigate(-1);
      },
    });
  };

  // Update the beforeunload handler
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);

  const handleFinish = (values: EmployeeDTO) => {
    const transformedValues = {
      ...values,
      birthDate: values.birthDate
        ? dayjs(values.birthDate).format("YYYY-MM-DD")
        : "",
      dateIn: values.dateIn ? dayjs(values.dateIn).format("YYYY-MM-DD") : "",
    };
    onFinish(transformedValues);
  };

  return (
    <main className="flex w-full flex-col p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleBackNavigation}
            type="text"
            icon={<PiArrowLeft size={24} />}
          />
          <h1 className="text-2xl font-bold">
            {mode === "create" ? t("Create Employee") : t("Update Employee")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleBackNavigation}>{t("Cancel")}</Button>
          <Button
            htmlType="submit"
            form="employee-create"
            type="primary"
            loading={isPending}
          >
            {mode === "create" ? t("Create") : t("Update")}
          </Button>
        </div>
      </div>

      {/* BODY */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[35%_1fr]">
        {/* PHOTO */}
        <Card
          className="w-full bg-white"
          title={
            <div className="">
              <div className="flex items-center gap-2">
                <MdOutlineInsertPhoto className="text-brand" size={24} />
                <h3 className="font-bold">{t("Photo")}</h3>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">{t("Avatar")}</span>
            <div className="flex items-center gap-2">
              <div className="size-12 overflow-hidden rounded-full">
                <img src="/avatar.jpg" alt="" />
              </div>
              <Button
                className="text-brand hover:!bg-brand-100 hover:!text-brand"
                type="text"
              >
                {t("Change")}
              </Button>
              <Button
                className="text-brand hover:!bg-brand-100 hover:!text-brand"
                type="text"
              >
                {t("Remove")}
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-bold">{t("ID Images")}</p>

              <div className="inset-0 mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-brand bg-brand-50">
                <div className="flex flex-col items-center gap-2 rounded-lg px-6 py-4">
                  <MdOutlineCloudUpload className="text-brand" size={24} />
                  <p>{t("Drag & drop your files here")}</p>
                  <p>{t("OR")}</p>
                  <Button type="primary">{t("Browse files")}</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* GENERAL INFORMATION */}
        <Card
          className="w-full bg-white"
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
          <Form
            name="employee-create"
            form={form}
            layout="vertical"
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            onFinish={handleFinish}
            initialValues={initialValues}
            onFieldsChange={handleFormChange}
          >
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
            <Form.Item name="gender" label={t("Gender")}>
              <Radio.Group>
                <Radio value="Male">{t("Male")}</Radio>
                <Radio value="Female">{t("Female")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="email"
              label={t("Email")}
              rules={[
                { required: true, message: t("Please input your email!") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label={t("Phone Number")}>
              <Input type="number" className="w-full" />
            </Form.Item>
            <Form.Item name="isOffice" label={t("Is Office")}>
              <Switch />
            </Form.Item>
            <Form.Item name="departmentId" label={t("Department")}>
              <Select disabled={!isOffice}>
                <Select.Option value={1}>HR</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="positionId" label={t("Position")}>
              <Select disabled={!isOffice}>
                <Select.Option value={1}>Manager</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="officeNumber" label={t("Office Number")}>
              <Input disabled={!isOffice} />
            </Form.Item>
            <Form.Item name="dateIn" label={t("Date In")}>
              <DatePicker format="DD-MM-YYYY" disabled={!isOffice} />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </main>
  );
};

export default EmployeePage;
