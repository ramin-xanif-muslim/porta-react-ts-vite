import { Button, Form, FormInstance } from "antd";
import { t } from "i18next";

import { PiArrowLeft } from "react-icons/pi";

import { Employee } from "../../types";
import { PhotoSection } from "./PhotoSection";
import { GeneralInformationSection } from "./GeneralInformationSection";
import {
  useFormDirtyState,
  useFormNavigation,
  useEmployeeFormSubmit,
} from "./hooks";

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
