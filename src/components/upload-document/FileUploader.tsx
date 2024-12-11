import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { notification } from "antd";
import { MdOutlineCloudUpload } from "react-icons/md";


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
  const [isDragging, setIsDragging] = useState(false);

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
        <div className="absolute inset-0 bg-brand-50 border-2 border-dashed border-brand rounded-lg flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-md flex flex-col items-center gap-2">
            <MdOutlineCloudUpload className="text-brand text-6xl" />
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
