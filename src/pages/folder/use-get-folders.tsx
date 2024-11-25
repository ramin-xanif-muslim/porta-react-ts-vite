import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { foldersApi } from "./api";

export function useGetFolders() {
    const {
        data,
        error,
        isPlaceholderData,
        isLoading
    } = useQuery({
        ...foldersApi.getFoldersListQueryOptions(),
        placeholderData: keepPreviousData,
    });

    return { error, folders: data?.data, isPlaceholderData, isLoading };
}
