import { API } from "../../api/api-instance";
// import { FolderDataDTO } from "../../types";
import { queryOptions } from "@tanstack/react-query";




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
    const formData = new FormData();
    formData.append("file", file);
    return API.post(DocumentsApi.documents.replace("{folderId}", folderId), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },


};