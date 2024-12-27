import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { departmentsApi, useCreateDepartment } from "../pages/departments/api";
import { useModalStore } from "../store";
import { CreateDepartment } from "../pages/departments/types";

export default function CreateDepartmentModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["create-department"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-department"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-department");
    queryClient.invalidateQueries({
      queryKey: [departmentsApi.baseKey],
    });
  };

  const { mutate: createDepartment, isPending } =
    useCreateDepartment(onSuccessCallback);

  const onFinish = (values: CreateDepartment) => {
    createDepartment({ name: values.name, managerId: values.managerId });
  };

  return (
    <Modal
      open={modalState?.["create-department"]?.isOpen}
      onCancel={() => closeModal("create-department")}
      title={t("Create department")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Create")}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ managerId: '1' }}
        layout="vertical"
      >
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input ref={inputRef} disabled={isPending} />
        </Form.Item>
        <Form.Item name="managerId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
