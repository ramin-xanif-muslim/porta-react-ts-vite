import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { useModalStore } from "../store";
import { departmentsApi } from "../pages/departments/api/departmentsApi";
import { UpdateDepartment } from "../pages/departments/types";
import { useUpdateDepartment } from "../pages/departments/api/use-update-department";

export default function CreateDepartmentModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["edit-department"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["edit-department"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("edit-department");
    queryClient.invalidateQueries({
      queryKey: [departmentsApi.baseKey],
    });
  };

  const { mutate: updateDepartment, isPending } =
    useUpdateDepartment(onSuccessCallback);

  const onFinish = (values: UpdateDepartment) => {
    updateDepartment({
      name: values.name,
      id: values.id,
      managerId: values.managerId,
    });
  };
  return (
    <Modal
      open={modalState?.["edit-department"]?.isOpen}
      onCancel={() => closeModal("edit-department")}
      title={t("Edit department")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Update")}
    >
      <Form
        initialValues={modalState?.["edit-department"]?.props?.department || {}}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="id" hidden>
          <Input disabled={isPending} />
        </Form.Item>
        <Form.Item name="managerId" hidden>
          <Input disabled={isPending} />
        </Form.Item>
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input
            onPressEnter={form.submit}
            ref={inputRef}
            disabled={isPending}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
