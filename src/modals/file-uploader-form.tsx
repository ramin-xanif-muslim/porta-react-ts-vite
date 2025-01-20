import { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputRef,
  Modal,
  notification,
  Select,
  Table,
} from "antd";
import { t } from "i18next";
import { RiUploadLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

import { queryClient } from "../api/query-client";
import { useModalStore } from "../store";
import { useUploadDocument } from "../pages/document/api/use-upload-document";
import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  SUPPORTED_FILE_EXTENSIONS,
  SUPPORTED_FILE_TYPES,
} from "../constants";
import { documentsApi } from "../pages/document/api/documentsApi";
import { CreateBtn } from "../components/ui/buttons";
import { convertFileSize } from "../lib/utils";
import FileUploader from "../components/upload-document/FileUploader";
import { getFileIcon } from "../pages/document/utils/file-icons";
import { useTagSelectOptions } from "../pages/tags/api/useTagSelectOptions";

export default function FileUploaderForm() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal, openModal } = useModalStore();

  const tagSelectOptions = useTagSelectOptions();

  const fileListDefault =
    (modalState?.["file-uploader-form"]?.props?.files as File[]) || [];

  const [fileList, setFileList] = useState<File[]>(fileListDefault);
  const [newFile, setNewFile] = useState<File>();

  useEffect(() => {
    if (newFile) setFileList([...fileList, newFile]);
  }, [newFile]);

  useEffect(() => {
    if (modalState?.["file-uploader-form"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState?.["file-uploader-form"]?.isOpen]);

  const onSuccessCallback = () => {
    closeModal("file-uploader-form");
  };

  const uploadDocument = useUploadDocument({
    folderId: modalState?.["file-uploader-form"]?.props?.folderId as string,
    onSuccessCallback,
  });

  const handleUpload = async (
    acceptedFiles: File[],
    comment: string,
    tags: string[],
  ) => {
    if (acceptedFiles.length > MAX_FILE_COUNT) {
      return notification.error({
        message: t("You can only upload a maximum of {{count}} files.", {
          count: MAX_FILE_COUNT,
        }),
      });
    }

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        return notification.error({
          message: t(
            "{{fileName}} is too large. Max file size is {{maxFileSize}}MB.",
            { fileName: file.name, maxFileSize: MAX_FILE_SIZE },
          ),
        });
      }
      if (file.type && !SUPPORTED_FILE_TYPES.includes(file.type)) {
        return notification.error({
          message: t(
            "{{fileName}} is not a supported file type. Supported file types are {{supportedFileTypes}}.",
            {
              fileName: file.name,
              supportedFileTypes: SUPPORTED_FILE_EXTENSIONS,
            },
          ),
        });
      }

      return uploadDocument.handleCreate(
        file as unknown as File,
        comment,
        tags,
      );
    });

    await Promise.allSettled(uploadPromises).then((results) => {
      if (results.every((result) => result.status === "fulfilled")) {
        queryClient.invalidateQueries({
          queryKey: [
            documentsApi.getDocumentsListQueryOptions({
              folderId: modalState?.["file-uploader-form"]?.props
                ?.folderId as string,
            }),
          ],
        });
      }
    });
  };

  const onFinish = async (values: { comment: string; tags: string[] }) => {
    handleUpload(fileList, values.comment, values.tags);
  };

  return (
    <Modal
      open={modalState?.["file-uploader-form"]?.isOpen}
      onCancel={() => closeModal("file-uploader-form")}
      title={t("Create Document")}
      onOk={form.submit}
      okText={t("Create")}
      confirmLoading={uploadDocument.isPending}
      maskClosable={false}
    >
      <div className="flex items-center justify-between">
        {/* Files  count: 1/5   size: 2mq/5gb  */}
        <div className="flex gap-2 font-semibold">
          <span>
            Files count: {fileList.length}/{MAX_FILE_COUNT}
          </span>
          <span>
            size:{" "}
            {convertFileSize(
              fileList.reduce((acc, file) => acc + (file.size || 0), 0),
            )}
            /{convertFileSize(MAX_FILE_SIZE)}
          </span>
        </div>

        <FileUploader input handleUpload={setNewFile}>
          <CreateBtn
            disabled={
              fileList.length >= MAX_FILE_COUNT || uploadDocument.isPending
            }
            icon={<RiUploadLine />}
          >
            {t("Upload")}
          </CreateBtn>
        </FileUploader>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Table
          size="small"
          dataSource={fileList.map((file) => ({
            name: file.name,
            size: convertFileSize(file.size || 0),
          }))}
          columns={[
            {
              title: t("Ext"),
              dataIndex: "extension",
              render: (_, record) =>
                getFileIcon({
                  fileExtension: record.name.split(".").pop() as string,
                }),
            },
            {
              title: t("File"),
              dataIndex: "name",
            },
            {
              dataIndex: "delete",
              render: (_, record) => (
                <Button
                  type="text"
                  onClick={() =>
                    setFileList(
                      fileList.filter((file) => file.name !== record.name),
                    )
                  }
                  shape="circle"
                  className="!hover:text-red-600 !text-red-500"
                  icon={<IoClose />}
                />
              ),
            },
          ]}
          pagination={false}
        />

        <Form.Item
          name="tags"
          label={
            <div className="flex items-center">
              <span>{t("Tags")}</span>
              <Button
                type="link"
                onClick={() => openModal("create-tag")}
                icon={<FaCirclePlus />}
                shape="circle"
                size="small"
                className="ml-1"
              />
            </div>
          }
        >
          <Select mode="multiple" {...tagSelectOptions} />
        </Form.Item>

        <Form.Item name="comment" label={t("Comment")}>
          <Input.TextArea ref={inputRef} rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
