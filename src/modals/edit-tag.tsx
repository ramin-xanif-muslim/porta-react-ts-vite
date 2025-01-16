import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { tagsApi } from "../pages/tags/api/tagsApi";
import { useModalStore } from "../store";
import { useUpdateTag } from "../pages/tags/api/use-update-tag";

export default function EditTagModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["edit-tag"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["edit-tag"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("edit-tag");
    queryClient.invalidateQueries({
      queryKey: [tagsApi.baseKey],
    });
  };

  const { mutate: updateTag, isPending } = useUpdateTag(onSuccessCallback);

  const onFinish = (values: {
    name: string;
    description: string;
    id: string;
  }) => {
    updateTag({
      name: values.name,
      description: values.description,
      id: values.id,
    });
  };

  return (
    <Modal
      open={modalState?.["edit-tag"]?.isOpen}
      onCancel={() => closeModal("edit-tag")}
      title={t("Edit tag")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Update")}
    >
      <Form
        initialValues={modalState?.["edit-tag"]?.props?.tag || {}}
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
