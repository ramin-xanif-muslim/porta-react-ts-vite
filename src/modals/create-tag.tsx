import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { tagsApi } from "../pages/tags/api/tagsApi";
import { useModalStore } from "../store";
import { useCreateTag } from "../pages/tags/api/use-create-tag";

export default function CreateTagModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["create-tag"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-tag"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-tag");
    queryClient.invalidateQueries({
      queryKey: [tagsApi.baseKey],
    });
  };

  const { mutate: createTag, isPending } = useCreateTag(onSuccessCallback);

  const onFinish = (values: { name: string; description: string }) => {
    createTag({ name: values.name, description: values.description });
  };

  return (
    <Modal
      open={modalState?.["create-tag"]?.isOpen}
      onCancel={() => closeModal("create-tag")}
      title={t("Create tag")}
      onOk={form.submit}
      okText={t("Create")}
      confirmLoading={isPending}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input ref={inputRef} disabled={isPending} />
        </Form.Item>
        <Form.Item name="description" label={t("Description")}>
          <Input.TextArea disabled={isPending} autoSize={{ minRows: 3 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
