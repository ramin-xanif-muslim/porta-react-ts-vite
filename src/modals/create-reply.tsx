import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { useModalStore } from "../store";
import { commentsApi, useCreateReply } from "../pages/comments/api";

export default function CreateReplyModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["create-reply"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-reply"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-reply");
    queryClient.invalidateQueries({
      queryKey: [commentsApi.baseKey],
    });
  };

  const { mutate: createReply, isPending } = useCreateReply(onSuccessCallback);

  const onFinish = (values: { reply: string; commentId: string }) => {
    createReply({
      comment: values.reply,
      commentId: modalState?.["create-reply"]?.props?.commentId as string,
      documentId: modalState?.["create-reply"]?.props?.documentId as string,
    });
  };

  return (
    <Modal
      open={modalState?.["create-reply"]?.isOpen}
      onCancel={() => closeModal("create-reply")}
      title={t("Reply to comment")}
      onOk={form.submit}
      okText={t("Reply")}
      confirmLoading={isPending}
    >
      <Form
        form={form}
        initialValues={{
          commentId: modalState?.["create-reply"]?.props?.commentId,
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="reply" label={t("Reply")} rules={[{ required: true }]}>
          <Input.TextArea
            ref={inputRef}
            disabled={isPending}
            autoSize={{ minRows: 3, maxRows: 5 }}
            autoFocus
          />
        </Form.Item>
        <Form.Item name="commentId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
