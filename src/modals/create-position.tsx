import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { useCreatePosition } from "../pages/positions/api/use-create-position";
import { queryClient } from "../api/query-client";
import { positionsApi } from "../pages/positions/api";
import { useModalStore } from "../store";

export default function CreatePositionModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();
  
  useEffect(() => {
    if (modalState?.["create-position"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-position"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-position");
    queryClient.invalidateQueries({
      queryKey: [positionsApi.baseKey],
    });
  };

  const { mutate: createPosition, isPending } = useCreatePosition(onSuccessCallback);
  const onFinish = (values: { name: string }) => {
    createPosition({ name: values.name });
  };
  return (
    <Modal
      open={modalState?.["create-position"]?.isOpen}
      onCancel={() => closeModal("create-position")}
      title={t("Create position")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Create")}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label={t("Name")} rules={[{ required: true }]}>
          <Input ref={inputRef} disabled={isPending} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
