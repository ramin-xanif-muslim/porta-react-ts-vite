import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { useModalStore } from "../store";
import { commentsApi, useCreateComment } from "../pages/comments/api";

export default function CreateCommentModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["create-comment"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["create-comment"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("create-comment");
    queryClient.invalidateQueries({
      queryKey: [commentsApi.baseKey],
    });
  };

  const { mutate: createComment, isPending } =
    useCreateComment(onSuccessCallback);

  const onFinish = (values: { comment: string; documentId: string }) => {
    createComment({ comment: values.comment, documentId: values.documentId });
  };

  return (
    <Modal
      open={modalState?.["create-comment"]?.isOpen}
      onCancel={() => closeModal("create-comment")}
      title={t("Create comment")}
      onOk={form.submit}
      okText={t("Create")}
      confirmLoading={isPending}
    >
      <Form
        form={form}
        initialValues={{
          documentId: modalState?.["create-comment"]?.props?.documentId,
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="comment"
          label={t("Comment")}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            ref={inputRef}
            disabled={isPending}
            autoSize={{ minRows: 3, maxRows: 5 }}
            autoFocus
          />
        </Form.Item>
        <Form.Item name="documentId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
