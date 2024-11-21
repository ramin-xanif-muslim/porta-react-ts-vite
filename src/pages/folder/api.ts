import { queryOptions } from "@tanstack/react-query";
import { API } from "../../api/api-instance";
import { FolderDataDTO } from "../../types";

// url: /api/v0.01/vms/dms/folders/list
// url: /api/v0.01/vms/dms/folders/{folderId}

enum FoldersApi {
    list = "/api/v0.01/vms/dms/folders/",
    byId = "/api/v0.01/vms/dms/folders/{folderId}",
}

export const foldersApi = {
    baseKey: "folders",
    getFoldersListQueryOptions: ({ folderId }: { folderId?: string }) => {
        return queryOptions({
            queryKey: [foldersApi.baseKey, "list", folderId],
            queryFn: (meta) =>
                API.get<FolderDataDTO[]>(FoldersApi.list + folderId, {
                    signal: meta?.signal,
                }),
        });
    },

      createFolder: (data: {name: string, parentId?: string}) => {
        return API.post(`/api/v0.01/vms/dms/folders/`, data);
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
