import { useRef, useEffect } from "react";
import { useState } from "react";
import { Modal, Form, Input, Button, InputRef } from "antd";
import { FaRegFolder } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateFolder } from "../../../pages/folder/api/use-create-folder";
import { t } from "i18next";
import { CreateBtn } from "../../../components/ui/buttons";

const CreateFolderBnt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  const { id } = useParams();

  const navigate = useNavigate()

  const onSuccessCallback = (folderId: string) => {
    handleCancel();
    navigate(`/documents/documents/folders/${folderId}`)
  }

  const createFolder = useCreateFolder((id) => onSuccessCallback(id));

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async ({ name }: { name: string }) => {
    try {
      createFolder.handleCreate({ name, parentId: id })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        
        <CreateBtn>{t("Create Folder")}</CreateBtn>
      </div>

      <Modal
        title={
          <div className="flex items-center">
            <span className="mr-3 p-2 bg-yellow-50 rounded-full">
              <FaRegFolder className="text-[#EFB034FF] size-5" />
            </span>
            <span>{t("Create Folder")}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("Cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createFolder.isPending}
            onClick={() => form.submit()}
          >
            {createFolder.isPending ? t("Creating...") : t("Create")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-folder"
          className="space-y-4"
          onFinish={handleCreate}
        >
          <Form.Item
            label={t("Folder name")}
            name="name"
            rules={[
              {
                required: true,
                message: t("Please input folder name!"),
              },
            ]}
          >
            <Input ref={inputRef} placeholder={t("Enter folder name")} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFolderBnt;
