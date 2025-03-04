import {
  Button,
  Form,
  Input,
  InputRef,
  Modal,
  Select,
  Table,
  notification,
} from "antd";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiUploadLine } from "react-icons/ri";

import { queryClient } from "../api/query-client";
import { CreateBtn } from "../components/ui/buttons";
import FileUploader from "../components/upload-document/FileUploader";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "../constants";
import { convertFileSize } from "../lib/utils";
import { documentsApi } from "../pages/document/api/documentsApi";
import { useUploadDocument } from "../pages/document/api/use-upload-document";
import { getFileIcon } from "../pages/document/utils/file-icons";
import { useTagSelectOptions } from "../pages/tags/api/useTagSelectOptions";
import { useModalStore } from "../store";

export default function FileUploaderForm() {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  const folderId = modalState?.["file-uploader-form"]?.props
    ?.folderId as string;

  const tagSelectOptions = useTagSelectOptions();

  const fileListDefault =
    (modalState?.["file-uploader-form"]?.props?.files as File[]) || [];

  const [fileList, setFileList] = useState<File[]>(fileListDefault);
  const [newFile, setNewFile] = useState<File>();

  useEffect(() => {
    if (newFile) setFileList((prevList) => [...prevList, newFile]);
  }, [newFile]);

  useEffect(() => {
    if (modalState?.["file-uploader-form"]?.isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [modalState]);

  const onSuccessCallback = () => {
    closeModal("file-uploader-form");
    queryClient.invalidateQueries({
      queryKey: [documentsApi.baseKey],
    });
  };

  const uploadDocument = useUploadDocument({
    folderId,
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
      // if (file.type && !SUPPORTED_FILE_TYPES.includes(file.type)) {
      //   return notification.error({
      //     message: t(
      //       "{{fileName}} is not a supported file type. Supported file types are {{supportedFileTypes}}.",
      //       {
      //         fileName: file.name,
      //         supportedFileTypes: SUPPORTED_FILE_EXTENSIONS,
      //       },
      //     ),
      //   });
      // }

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
              folderId,
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
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-2">
        <Form.Item>
          <Table
            className="modal-table"
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
                render: (_, record) => (
                  <div className="flex flex-col">
                    <span className="font-semibold">{record.name}</span>
                    <span className="text-xs text-gray-500">{record.size}</span>
                  </div>
                ),
              },
              {
                dataIndex: "delete",
                width: 50,
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
        </Form.Item>

        <Form.Item
          name="tags"
          label={
            <a
              className="text-blue-500 hover:text-blue-600"
              href="/documents/tags"
              target="_blank"
            >
              {t("Tags")}{" "}
            </a>
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
