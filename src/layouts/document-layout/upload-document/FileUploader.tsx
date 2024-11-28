import React, { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
// import { getFileType } from "../../../lib/utils";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "../../../constants";
import { notification } from "antd";

const uploadFile = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });
    notification.success({ message: `${file.name} uploaded successfully` });

    if (!res.ok) {
      throw new Error("Failed to upload file");
    }

    return res.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

const FileUploader = ({ children, input }: { children?: React.ReactNode, input?: boolean }) => {
  const [files, setFiles] = useState<File[]>([]);
  console.log(files)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    if (acceptedFiles.length > MAX_FILE_COUNT) {
      return notification.error({
        message: `You can only upload a maximum of ${MAX_FILE_COUNT} files.`,
      });
    }
    
    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return notification.error({
          message: `${file.name} is too large. Max file size is 50MB.`,
        });
      }

      return uploadFile({ file }).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
        }
      });
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
