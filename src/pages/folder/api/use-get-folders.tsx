import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { foldersApi } from "./folderApi";

export const useGetFolders = () => {
  const { pathname } = useLocation();

  return useQuery({
    ...foldersApi.getFoldersListQueryOptions(),
    placeholderData: keepPreviousData,
    select: (data) => data.data.list,
    enabled: pathname.includes("folders"),
    retry: false,
  });
};
