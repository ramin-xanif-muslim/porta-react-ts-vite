import { queryOptions } from "@tanstack/react-query";
import { API } from "../../api/api-instance";
import { FolderDataDTO } from "../../types";

// url: /api/v0.01/vms/dms/folders/list
// url: /api/v0.01/vms/dms/folders/{folderId}

export enum FoldersApi {
    list = "/api/v0.01/vms/dms/folders",
}

export const foldersApi = {
    baseKey: "folders",
    getFoldersListQueryOptions: () => {
        return queryOptions({
            queryKey: [foldersApi.baseKey, "list"],
            queryFn: (meta) =>
                API.get<FolderDataDTO[]>(FoldersApi.list, {
                    signal: meta?.signal,
                }),
        });
    },
    getFolderListByIdQueryOptions: ({ folderId }: { folderId?: string }) => {
        return queryOptions({
            queryKey: [foldersApi.baseKey, "list", folderId],
            queryFn: (meta) =>
                API.get<FolderDataDTO[]>(FoldersApi.list + "/" + folderId, {
                    signal: meta?.signal,
                }),
        });
    },
    getFolderListByFiltersQueryOptions: ({ folderId, searchParams }: { folderId?: string, searchParams?: string }) => {

        const url = `${FoldersApi.list}/${folderId}?${searchParams}`
        return queryOptions({
            queryKey: [foldersApi.baseKey, "list", folderId, searchParams],
            queryFn: (meta) =>
                API.get<FolderDataDTO[]>(FoldersApi.list + "/" + url, {
                    signal: meta?.signal,
                }),
        });
    },

    createFolder: (data: { name: string; parentId?: string }) => {
        return API.post(FoldersApi.list, data);
    },

    //   updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    //     return API<TodoDto>(`/tasks/${data.id}`, {
    //       method: "PATCH",
    //       json: data
    //     });
    //   },
    //   deleteTodo: (id: string) => {
    //     return API(`/tasks/${id}`, {
    //       method: "DELETE"
    //     });
    //   }
};
