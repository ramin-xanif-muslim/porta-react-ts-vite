import { Button, Form, FormInstance } from "antd";
import { t } from "i18next";
import { PiArrowLeft } from "react-icons/pi";

import { User } from "../../types";
import { GeneralInformationSection } from "./GeneralInformationSection";
import { useFormDirtyState } from "../../../../hooks/useFormDirtyState";
import { useCallback } from "react";
import { useFormNavigation } from "../../../../hooks/useFormNavigation";
import { PhotoSection } from "./PhotoSection";

const UserDocument = ({
  initialValues = {},
  isPending,
  onFinish,
  mode = "create",
  form,
}: {
  initialValues?: Partial<User>;
  isPending: boolean;
  onFinish: (values: User) => void;
  mode?: "create" | "update";
  form: FormInstance<User>;
}) => {
  const isEmployee = Form.useWatch("employeeId", form);

  const { isFormDirty, setIsFormDirty, handleFormChange } =
    useFormDirtyState(form);
  const { handleBackNavigation } = useFormNavigation(isFormDirty);

  const handleFinish = useCallback(
    (values: User) => {
      onFinish(values);
      setIsFormDirty(false);
    },
    [onFinish, setIsFormDirty],
  );

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
            {mode === "create" ? t("Create User") : t("Update User")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleBackNavigation}>{t("Cancel")}</Button>
          <Button
            htmlType="submit"
            form="user-document"
            type="primary"
            loading={isPending}
          >
            {mode === "create" ? t("Create") : t("Update")}
          </Button>
        </div>
      </div>

      {/* BODY */}
      <Form
        name="user-document"
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFieldsChange={handleFormChange}
        initialValues={{
          ...initialValues,
        }}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[35%_1fr]">
          {/* PHOTO */}
          <PhotoSection />

          {/* GENERAL INFORMATION */}
          <GeneralInformationSection form={form} isEmployee={!!isEmployee} mode={mode} />
        </div>
      </Form>
    </main>
  );
};

export default UserDocument;
