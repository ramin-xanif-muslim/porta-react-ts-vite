import { Button, Form, FormInstance } from "antd";
import { t } from "i18next";

import { PiArrowLeft } from "react-icons/pi";

import { Employee } from "../../types";
import { PhotoSection } from "./PhotoSection";
import { GeneralInformationSection } from "./GeneralInformationSection";
import {
  useEmployeeFormSubmit,
} from "./hooks";
import { useFormDirtyState } from "../../../../hooks/useFormDirtyState";
import { useFormNavigation } from "../../../../hooks/useFormNavigation";

const EmployeeDocument = ({
  initialValues = {},
  isPending,
  onFinish,
  mode = "create",
  form,
}: {
  initialValues?: Partial<Employee>;
  isPending: boolean;
  onFinish: (values: Employee) => void;
  mode?: "create" | "update";
  form: FormInstance<Employee>;
}) => {
  const isOffice = Form.useWatch("isOffice", form);
  const { isFormDirty, setIsFormDirty, handleFormChange } =
    useFormDirtyState(form);
  const { handleBackNavigation } = useFormNavigation(isFormDirty);
  const { handleFinish } = useEmployeeFormSubmit(onFinish, setIsFormDirty);

  return (
    <main className="page">
      {/* HEADER */}
      <div className="header-page">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleBackNavigation}
            type="text"
            icon={<PiArrowLeft size={24} />}
          />
          <h1 className="header-page__title">
            {mode === "create" ? t("Create Employee") : t("Update Employee")}
          </h1>
        </div>

        <div className="header-page__actions">
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
