import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { notification } from "antd";

import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  SUPPORTED_FILE_EXTENSIONS,
  SUPPORTED_FILE_TYPES,
} from "../../constants";
import { t } from "i18next";

const FileUploader = ({
  children,
  input,
  handleUpload,
  multiple = true,
}: {
  children?: React.ReactNode;
  input?: boolean;
  handleUpload: (file: File) => Promise<void>;
  multiple?: boolean;
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
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
            { fileName: file.name, maxFileSize: MAX_FILE_SIZE }
          ),
        });
      }
      if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
        return notification.error({
          message: t(
            "{{fileName}} is not a supported file type. Supported file types are {{supportedFileTypes}}.",
            {
              fileName: file.name,
              supportedFileTypes: SUPPORTED_FILE_EXTENSIONS,
            }
          ),
        });
      }
      return handleUpload(file);
    });

    await Promise.all(uploadPromises);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple
    // accept: {
    //   "application/msword": [".doc"],
    //   "application/pdf": [".pdf"],
    //   "text/plain": [".txt", ".text"],
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    //     [".docx"],
    // },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      {input && <input {...getInputProps()} />}
      {children}
    </div>
  );
};

export default FileUploader;
