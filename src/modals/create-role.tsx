import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { rolesApi } from "../pages/roles/api/rolesApi";
import { useModalStore } from "../store";
import { useCreateRole } from "../pages/roles/api/use-create-role";

export default function CreateRoleModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["create-role"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-role"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-role");
    queryClient.invalidateQueries({
      queryKey: [rolesApi.baseKey],
    });
  };  

  const { mutate: createRole, isPending } = useCreateRole(onSuccessCallback);

  const onFinish = (values: { name: string; description: string }) => {
    createRole({ name: values.name, description: values.description });
  };

  return (
    <Modal
      open={modalState?.["create-role"]?.isOpen}
      onCancel={() => closeModal("create-role")}
      title={t("Create role")}
      onOk={form.submit}
      okText={t("Create")}
      confirmLoading={isPending}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input ref={inputRef} disabled={isPending} />
        </Form.Item>
        <Form.Item name="description" label={t("Description")}>
          <Input.TextArea disabled={isPending} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
