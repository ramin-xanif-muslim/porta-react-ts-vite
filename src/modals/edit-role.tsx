import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { rolesApi } from "../pages/roles/api";
import { useModalStore } from "../store";
import { useUpdateRole } from "../pages/roles/api/use-update-role";

export default function EditRoleModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["edit-role"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["edit-role"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("edit-role");
    queryClient.invalidateQueries({
      queryKey: [rolesApi.baseKey],
    });
  };

  const { mutate: updateRole, isPending } = useUpdateRole(onSuccessCallback);

  const onFinish = (values: { name: string; id: string }) => {
    updateRole({ name: values.name, id: values.id });
  };

  return (
    <Modal
      open={modalState?.["edit-role"]?.isOpen}
      onCancel={() => closeModal("edit-role")}
      title={t("Edit role")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Update")}
    >
      <Form
        initialValues={modalState?.["edit-role"]?.props?.role || {}}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="id" hidden>
          <Input disabled={isPending} />
        </Form.Item>
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input
            onPressEnter={form.submit}
            ref={inputRef}
            disabled={isPending}
          />
        </Form.Item>
        <Form.Item name="description" label={t("Description")}>
          <Input.TextArea disabled={isPending} autoSize={{ minRows: 3 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
