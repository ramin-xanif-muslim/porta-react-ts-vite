import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { notification } from "antd";

import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "../../../constants";
import { useUploadDocument } from "../../../pages/document/use-upload-document";

const FileUploader = ({
  children,
  input,
  folderId,
}: {
  children?: React.ReactNode;
  input?: boolean;
  folderId: string;
}) => {
  const uploadDocument = useUploadDocument({ folderId });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > MAX_FILE_COUNT) {
      return notification.error({
        message: `You can only upload a maximum of ${MAX_FILE_COUNT} files.`,
      });
    }

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        return notification.error({
          message: `${file.name} is too large. Max file size is 50MB.`,
        });
      }

      return uploadDocument.handleCreate({ file });
    });

    await Promise.all(uploadPromises);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      {input && <input {...getInputProps()} />}
      {children}
    </div>
  );
};

export default FileUploader;
