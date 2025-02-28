import { notification } from "antd";
import { t } from "i18next";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";

import {
  MAX_FILE_SIZE,
} from "../../constants";
import { MAX_FILE_COUNT } from "../../constants";
import { useModalStore } from "../../store";

const FileUploader = ({
  children,
  input,
  multiple = true,
  folderId,
  handleUpload,
}: {
  children?: React.ReactNode;
  input?: boolean;
  multiple?: boolean;
  folderId?: string;
  handleUpload?: (file: File) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { openModal } = useModalStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > MAX_FILE_COUNT) {
      return notification.error({
        message: t("You can only upload a maximum of {{count}} files.", {
          count: MAX_FILE_COUNT,
        }),
      });
    }
    const updateFiles = acceptedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        notification.error({
          message: t(
            "{{fileName}} is too large. Max file size is {{maxFileSize}}MB.",
            { fileName: file.name, maxFileSize: MAX_FILE_SIZE },
          ),
        });
        return false;
      }

      // if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      //   notification.error({
      //     message: t(
      //       "{{fileName}} is not a supported file type. Supported file types are {{supportedFileTypes}}.",
      //       {
      //         fileName: file.name,
      //         supportedFileTypes: SUPPORTED_FILE_EXTENSIONS,
      //       },
      //     ),
      //   });
      //   return false;
      // }

      if (handleUpload) {
        return handleUpload(file);
      }
      return true;
    });

    if (!handleUpload) {
      openModal("file-uploader-form", {
        files: updateFiles,
        folderId,
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <div {...getRootProps()} className="relative cursor-pointer">
      {input && <input {...getInputProps()} />}
      {children}

      {/* Drag overlay */}
      {isDragging && !input && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-brand bg-brand-50">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white px-6 py-4 shadow-md">
            <MdOutlineCloudUpload className="text-6xl text-brand" />
            <p className="text-lg font-medium text-brand">
              {t("Drop files here to upload")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
