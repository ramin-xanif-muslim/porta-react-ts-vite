import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { foldersApi } from "./folderApi";

export const useGetFolders = () => {

  return useQuery({
    ...foldersApi.getFoldersListQueryOptions(),
    placeholderData: keepPreviousData,
    select: (data) => data.data.list,
    retry: false,
  });
};
