import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { positionsApi } from "../pages/positions/api";
import { useModalStore } from "../store";
import { useUpdatePosition } from "../pages/positions/api/use-update-position";

export default function CreatePositionModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["edit-position"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["edit-position"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("edit-position");
    queryClient.invalidateQueries({
      queryKey: [positionsApi.baseKey],
    });
  };

  const { mutate: updatePosition, isPending } =
    useUpdatePosition(onSuccessCallback);

  const onFinish = (values: { name: string; id: string }) => {
    updatePosition({ name: values.name, id: values.id });
  };
  return (
    <Modal
      open={modalState?.["edit-position"]?.isOpen}
      onCancel={() => closeModal("edit-position")}
      title={t("Edit position")}
      onOk={form.submit}
      confirmLoading={isPending}
      okText={t("Update")}
    >
      <Form
        initialValues={modalState?.["edit-position"]?.props?.position || {}}
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
      </Form>
    </Modal>
  );
}
