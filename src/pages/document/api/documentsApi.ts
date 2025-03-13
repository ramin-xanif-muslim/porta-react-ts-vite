import { notification } from "antd";
import { t } from "i18next";

import { queryOptions } from "@tanstack/react-query";
import { API } from "../../../api/api-instance";
import { BaseQueryParams } from "../../../types/query-params";

interface FilterParams {
  folderId: string;
  searchText: string;
}

export enum DocumentsApi {
  documents = "/api/v0.01/vms/dms/documents",
  move = "/api/v0.01/vms/dms/documents/folder",
  list = "/api/v0.01/vms/dms/documents/list",
  info = "/api/v0.01/vms/dms/documents/{documentId}/info",
  rename = "/api/v0.01/vms/dms/documents/{documentId}/name",
  renameDescription = "/api/v0.01/vms/dms/documents/{documentId}/description",
  renameTags = "/api/v0.01/vms/dms/documents/{documentId}/tags",
  newVersion = "/api/v0.01/vms/dms/documents/{documentId}/versions",
  file = "/api/v0.01/vms/dms/documents/{documentId}/file",
  versionsList = "/api/v0.01/vms/dms/documents/{documentId}/versions/list",
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

  getDocumentList: (params: BaseQueryParams<FilterParams>) => {
    return API.post(DocumentsApi.list, params);
  },

  getDocumentsVersionsListQueryOptions: ({
    folderId,
    documentId,
  }: {
    folderId: string;
    documentId: string;
  }) => {
    const url = DocumentsApi.versionsList
      .replace("{folderId}", folderId)
      .replace("{documentId}", documentId);

    return queryOptions({
      queryKey: [documentsApi.baseKey, folderId, documentId],
      queryFn: (meta) =>
        API.post(url, {
          signal: meta?.signal,
        }),
    });
  },

  move: ({
    documentIds,
    folderId,
  }: {
    documentIds: string[];
    folderId: string;
  }) => {
    const url = DocumentsApi.move;

    return API.patch(url, {
      documentIds,
      folderId,
    });
  },

  deleteDocuments: ({
    documentIds,
  }: {
    documentIds: string[];
  }) => {
    const url = DocumentsApi.documents;

   return API.delete(url, {
      data: { documentIds },
    })
  },

  info: ({
    documentId,
  }: {
    documentId: string;
  }) => {
    const url = DocumentsApi.info.replace("{documentId}", documentId);

    return API.get(url);
  },

  renameDocument: ({
    documentId,
    name,
  }: {
    documentId: string;
    name: string;
  }) => {
    const url = DocumentsApi.rename.replace("{documentId}", documentId);

    return API.patch(url, {
      name,
    });
  },

  renameTags: ({
    documentId,
    tags,
  }: {
    documentId: string;
    tags: string;
  }) => {
    const url = DocumentsApi.renameTags.replace("{documentId}", documentId);

    return API.patch(url, {
      tags,
    });
  },

  renameDocumentDescription: ({
    documentId,
    description,
  }: {
    documentId: string;
    description: string;
  }) => {
    const url = DocumentsApi.renameDescription.replace("{documentId}", documentId);

    return API.patch(url, {
      description,
    });
  },

  uploadFile: ({
    folderId,
    documentId,
    file,
  }: {
    folderId: string;
    documentId: string;
    file: File;
  }) => {
    const url = DocumentsApi.file.replace("{documentId}", documentId);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("folderId", folderId);
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

  uploadNewVersion: ({
    folderId,
    documentId,
    file,
  }: {
    folderId: string;
    documentId: string;
    file: File;
  }) => {
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

  uploadDocument: ({
    folderId,
    file,
    description = "",
    tags = [],
  }: {
    folderId: string;
    file: File;
    description: string;
    tags: string[];
  }) => {
    const url = DocumentsApi.documents;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("folderId", folderId);
    formData.append("description", description);
    tags.forEach((tag, index) => {
      formData.append(`tagIds[${index}]`, tag);
    });
    notification.info({
      message: t("Uploading {{fileName}}...", { fileName: file.name }),
      showProgress: true,
      key: file.name,
    });
    return API.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        notification.destroy(file.name);
        notification.success({
          message: t("{{fileName}} uploaded", { fileName: file.name }),
        });
        return res;
      })
      .catch((error) => {
        notification.destroy(file.name);
        notification.error({
          message: t("Error uploading {{fileName}}", { fileName: file.name }),
          description: error.message,
        });
        throw new Error("Error uploading document");
      });
  },
};
