import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { useModalStore } from "../store";
import { commentsApi, useUpdateComment } from "../pages/comments/api";

export default function UpdateCommentModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  useEffect(() => {
    if (modalState?.["update-comment"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["update-comment"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("update-comment");
    queryClient.invalidateQueries({
      queryKey: [commentsApi.baseKey],
    });
    form.resetFields();
  };

  const { mutate: updateComment, isPending } =
    useUpdateComment(onSuccessCallback);

  const onFinish = (values: { comment: string; documentId: string }) => {
    updateComment({
      data: { comment: values.comment, documentId: values.documentId },
      id: modalState?.["update-comment"]?.props?.commentId as string,
    });
  };

  return (
    <Modal
      open={modalState?.["update-comment"]?.isOpen}
      onCancel={() => closeModal("update-comment")}
      title={t("Update comment")}
      onOk={form.submit}
      okText={t("Update")}
      confirmLoading={isPending}
    >
      <Form
        form={form}
        initialValues={{
          documentId: modalState?.["update-comment"]?.props?.documentId,
          comment: modalState?.["update-comment"]?.props?.comment,
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
