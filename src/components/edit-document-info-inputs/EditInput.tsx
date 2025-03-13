import { Button, Form } from "antd";
import { t } from "i18next";
import { useState } from "react";

import { cn } from "../../lib/utils";

interface Props {
  defaultValue?: string;
  name: string;
  label: string;
  placeholder?: string;
  heightDiv?: string;
  isPending?: boolean;
  handleSave?: (value: string, callback?: () => void) => void;
  FormInput?: React.ReactNode;
}

export const EditInput = ({
  defaultValue = "",
  name,
  label,
  heightDiv = "h-8",
  isPending = false,
  handleSave,
  FormInput,
}: Props) => {
  const [edit, setEdit] = useState(false);

  const closeEdit = () => {
    setEdit(false);
  };

  const [form] = Form.useForm();

  const onFinish = async () => {
    handleSave?.(String(form.getFieldValue(name)) as string, closeEdit);
  };

  return (
    <>
      <Form
        initialValues={{ [name]: defaultValue }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="flex">
          <Form.Item className="!mb-0" label={t(label)}>
            {edit ? (
              <Form.Item name={name} className="!mb-0 min-w-[350px]">
                {FormInput}
              </Form.Item>
            ) : (
              <div
                className={cn(
                  "h-8 min-w-[350px] border border-dashed rounded p-2 overflow-scroll no-scrollbar",
                  heightDiv,
                )}
                title={defaultValue}
              >
                {defaultValue}
              </div>
            )}
          </Form.Item>
          <div className="ml-4 mt-auto">
            {edit ? (
              <div className="flex gap-2">
                <Button
                  size="small"
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  disabled={isPending}
                >
                  {t("Save")}
                </Button>
                <Button size="small" onClick={() => setEdit(false)}>
                  {t("Cancel")}
                </Button>
              </div>
            ) : (
              <div
                className="ml-4 min-h-5 cursor-pointer py-2 text-sm text-gray-400 underline hover:text-gray-600"
                onClick={() => {
                  setEdit(true);
                }}
              >
                {t("Edit")}
              </div>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};
