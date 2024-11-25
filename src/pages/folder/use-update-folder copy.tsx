import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { FolderDTO } from "../../types";

export function useUpdateFolder() {
    const queryClient = useQueryClient();

    const updateFolderMutation = useMutation({
        mutationFn: foldersApi.updateFolder,
        onMutate: async (newData: FolderDTO) => {
            // Cancel outgoing queries
            await queryClient.cancelQueries({
                queryKey: foldersApi.getFoldersListQueryOptions().queryKey
            });

            // Get current data
            const previousData = queryClient.getQueryData<FolderDTO[]>(
                foldersApi.getFoldersListQueryOptions().queryKey
            );

            // Update cache
            if (previousData) {
                queryClient.setQueryData<FolderDTO[]>(
                    foldersApi.getFoldersListQueryOptions().queryKey,
                    oldData => {
                        if (!oldData) return previousData;
                        return oldData.map((folder) =>
                            folder.id === newData.id
                                ? { ...folder, ...newData }
                                : folder
                        );
                    }
                );
            }

            return { previousData };
        },
        onError: (_, __, context) => {
            // Rollback to previous data on error
            if (context?.previousData) {
                queryClient.setQueryData<FolderDTO[]>(
                    foldersApi.getFoldersListQueryOptions().queryKey,
                    context.previousData
                );
            }
        },
        onSettled: () => {
            // Refetch after error or success
            queryClient.invalidateQueries({
                queryKey: foldersApi.getFoldersListQueryOptions().queryKey
            });
        },
    });

    const handleUpdate = ({
        id,
        name,
        parentId,
    }: {
        id: string;
        name: string;
        parentId?: string | null | undefined;
    }) => {
        console.log({ id, name, parentId });
        updateFolderMutation.mutate({ id, name, parentId });
    };

    return {
        handleUpdate,
        isPending: updateFolderMutation.isPending,
    };
}