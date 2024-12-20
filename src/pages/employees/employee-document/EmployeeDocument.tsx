import {
  Button,
  Form,
  FormInstance,
  Modal,
} from "antd";
import dayjs from "dayjs";
import { t } from "i18next";

import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import { EmployeeDTO } from "../../../types";
import React from "react";
import { PhotoSection } from "./PhotoSection";
import { GeneralInformationSection } from "./GeneralInformationSection";

const EmployeeDocument = ({
  initialValues = {},
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
      title: t("Unsaved Changes"),
      content: t("You have unsaved changes. Are you sure you want to leave?"),
      okText: t("Leave"),
      cancelText: t("Stay"),
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

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  const handleFinish = (values: EmployeeDTO) => {
    const transformedValues: Partial<EmployeeDTO> = {
      ...values,
      birthDate: values.birthDate
        ? dayjs(values.birthDate).format("YYYY-MM-DD")
        : "",
      dateIn: values.dateIn ? dayjs(values.dateIn).format("YYYY-MM-DD") : "",
    };
    if (!isOffice) {
      delete transformedValues.departmentId;
      delete transformedValues.positionId;
      delete transformedValues.officeNumber;
      delete transformedValues.dateIn;
    }
    onFinish(transformedValues as EmployeeDTO);

    setIsFormDirty(false);
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
            form="employee-document"
            type="primary"
            loading={isPending}
          >
            {mode === "create" ? t("Create") : t("Update")}
          </Button>
        </div>
      </div>

      {/* BODY */}
      <Form
        name="employee-document"
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        onFieldsChange={handleFormChange}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[35%_1fr]">
          {/* PHOTO */}
          <PhotoSection />

          {/* GENERAL INFORMATION */}
          <GeneralInformationSection isOffice={isOffice} />
        </div>
      </Form>
    </main>
  );
};

export default EmployeeDocument;
