import { notification } from "antd";
import { t } from "i18next";

import { API } from "../../api/api-instance";
import { queryOptions } from "@tanstack/react-query";

export enum DocumentsApi {
  documents = "/api/v0.01/vms/dms/folders/{folderId}/documents",
  list = "/api/v0.01/vms/dms/folders/{folderId}/documents/list",
  rename = "/api/v0.01/vms/dms/folders/{folderId}/documents/{documentId}/name",
  newVersion = "/api/v0.01/vms/dms/folders/{folderId}/documents/{documentId}/versions",
  file = "/api/v0.01/vms/dms/folders/{folderId}/documents/{documentId}/file",
  versionsList = "/api/v0.01/vms/dms/folders/{folderId}/documents/{documentId}/versions/list",
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

  getDocumentsVersionsListQueryOptions: ({ folderId, documentId }: { folderId: string; documentId: string }) => {
    const url = DocumentsApi.versionsList
    .replace("{folderId}", folderId)
    .replace("{documentId}", documentId)

    return queryOptions({
      queryKey: [documentsApi.baseKey, folderId, documentId],
      queryFn: (meta) =>
        API.post(url, {
          signal: meta?.signal,
        }),
    });
  },

  renameDocument: ({ folderId, documentId, name }: { folderId: string; documentId: string; name: string }) => {
    
    const url = DocumentsApi.rename
      .replace("{folderId}", folderId)
      .replace("{documentId}", documentId);

    return API.patch(url, {
      name,
    });
  },

  uploadFile: ({ folderId, documentId, file }: { folderId: string; documentId: string; file: File }) => {
    const url = DocumentsApi.file
    .replace("{folderId}", folderId)
    .replace("{documentId}", documentId);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    notification.info({
      message: t("Uploading {{fileName}}...", { fileName: file.name }),
      showProgress: true,
      key: "uploadFile",
    });
    return API.patch(url, formData, {
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

  uploadNewVersion: ({ folderId, documentId, file }: { folderId: string; documentId: string; file: File }) => {
    const url = DocumentsApi.newVersion
    .replace("{folderId}", folderId)
    .replace("{documentId}", documentId);

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
