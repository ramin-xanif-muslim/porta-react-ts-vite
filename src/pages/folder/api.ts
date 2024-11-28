import { queryOptions } from "@tanstack/react-query";
import { API } from "../../api/api-instance";
import { FolderDataDTO, FolderDTO } from "../../types";

// url: /api/v0.01/vms/dms/folders/list
// url: /api/v0.01/vms/dms/folders/{folderId}

export enum FoldersApi {
  baseUrl = "/api/v0.01/vms/dms/folders",
  list = "/api/v0.01/vms/dms/folders/list",
}

export const foldersApi = {
  baseKey: "folders",
  getFoldersListQueryOptions: () => {
    return queryOptions({
      queryKey: [foldersApi.baseKey],
      queryFn: (meta) =>
        API.post(FoldersApi.list, {
          signal: meta?.signal,
        }),
    }); ``          
  },
  getFolderListByIdQueryOptions: ({ folderId }: { folderId?: string }) => {
    const url = `${FoldersApi.list}/${folderId}`;
    return queryOptions({
      queryKey: [foldersApi.baseKey, folderId],
      queryFn: (meta) =>
        API.post<FolderDataDTO[]>(url, {
          signal: meta?.signal,
        }),
    });
  },
  getFolderListByFiltersQueryOptions: ({
    folderId,
    searchParams,
  }: {
    folderId?: string;
    searchParams?: string;
  }) => {
    const url = `${FoldersApi.baseUrl}/${folderId}`;
    // const url = `${FoldersApi.list}/${folderId}?${searchParams}`
    return queryOptions({
      queryKey: [foldersApi.baseKey, folderId, searchParams],
      queryFn: (meta) =>
        API.post<FolderDataDTO[]>(url, {
          signal: meta?.signal,
        }),
    });
  },

  createFolder: (data: { name: string; parentId?: string }) => {
    return API.post(FoldersApi.baseUrl, data);
  },

  deleteFolder: (id: string) => {
    return API.delete(`${FoldersApi.baseUrl}/${id}`);
  },

  updateFolder: ({ id, name, parentId }: FolderDTO) => {
    return API.put(`${FoldersApi.baseUrl}/${id}`, {
      name,
      parentId,
    });
  },
};
