import { Modal, Form, Input } from "antd";
import { t } from "i18next";
import { useRenameDocument } from "../../api/use-rename-document";
import { useParams } from "react-router-dom";
import { Button } from "antd/lib";
import { useEffect, useRef } from "react";
import { InputRef } from "antd";

interface RenameProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: string;
}

const RenameDocument = ({ isOpen, onClose, name, id }: RenameProps) => {
  const [form] = Form.useForm();
  const { mutate: renameDocument, isPending } = useRenameDocument(() => {
    onClose();
    form.resetFields();
  });
  const { id: folderId } = useParams();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async ({ name }: { name: string }) => {
    if (!folderId) {
      console.log("folderId not found");
      return;
    }

    try {
      renameDocument({
        documentId: id,
        name: name,
        folderId: folderId,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={t("Rename")}
      open={isOpen}
      onCancel={onClose}
      confirmLoading={isPending}
      destroyOnClose
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: name }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label={t("Name")}
          rules={[
            { required: true, message: t("Please enter a name") },
            { min: 1, message: t("Name must be at least 1 character") },
          ]}
        >
          <Input autoFocus ref={inputRef} />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>{t("Cancel")}</Button>
          <Button loading={isPending} type="primary" htmlType="submit">
            {t("Rename")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default RenameDocument;
