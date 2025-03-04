import { useEffect, useRef } from "react";
import { Form, Input, InputRef, Modal } from "antd";
import { t } from "i18next";

import { queryClient } from "../api/query-client";
import { rolesApi } from "../pages/roles/api/rolesApi";
import { useGlobalStore, useModalStore } from "../store";
import { useRenameDocument } from "../pages/document/api/use-rename-document";

export default function RenameDocumentModal() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();
  const selectedFolderId = useGlobalStore((state) => state.selectedFolderId);

  useEffect(() => {
    if (modalState?.["rename-document"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["rename-document"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("rename-document");
    queryClient.invalidateQueries({
      queryKey: [rolesApi.baseKey],
    });
  };  

  const { mutate: renameDocument, isPending } = useRenameDocument(onSuccessCallback);

  const onFinish = (values: { name: string; description: string }) => {
    
    renameDocument({
      documentId: modalState?.["rename-document"]?.props?.documentId as string,
      name: values.name,
      folderId: selectedFolderId || "",
    });
  };

  return (
    <Modal
      open={modalState?.["rename-document"]?.isOpen}
      onCancel={() => closeModal("rename-document")}
      title={t("Rename")}
      onOk={form.submit}
      okText={t("Rename")}
      confirmLoading={isPending}
    >
      <Form form={form} onFinish={onFinish} initialValues={{ name: modalState?.["rename-document"]?.props?.name }} layout="vertical">
        <Form.Item name="name" label={t("Name")} 
          rules={[
            { required: true, message: t("Please enter a name") },
            { min: 1, message: t("Name must be at least 1 character") },
          ]}>
          <Input ref={inputRef} disabled={isPending} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
