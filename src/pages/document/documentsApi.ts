import { notification } from "antd";
import { API } from "../../api/api-instance";
import { queryOptions } from "@tanstack/react-query";
import { t } from "i18next";

export enum DocumentsApi {
  documents = "/api/v0.01/vms/dms/folders/{folderId}/documents",
  list = "/api/v0.01/vms/dms/folders/{folderId}/documents/list",
}

export const documentsApi = {
  baseKey: "documents",
  getDocumentsListQueryOptions: ({ folderId }: { folderId: string }) => {
    const url = DocumentsApi.list.replace("{folderId}", folderId);

    return queryOptions({
      queryKey: [documentsApi.baseKey, folderId],
      queryFn: (meta) =>
        API.post(url, {
          signal: meta?.signal,
        }),
    });
  },

  uploadDocument: ({ folderId, file }: { folderId: string; file: File }) => {
    const url = DocumentsApi.documents.replace("{folderId}", folderId);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    notification.info({
      message: t("Uploading {{fileName}}...", { fileName: file.name }),
      showProgress: true,
      key: file.name,
    });
    return API.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      notification.destroy(file.name);
      notification.success({
        message: t("{{fileName}} uploaded", { fileName: file.name }),
      });
      return res;
    });
  },
};
