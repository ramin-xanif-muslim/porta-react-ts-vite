import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { notification } from "antd";

export function useDeleteFolder() {
    const queryClient = useQueryClient();

    const deleteFolderMutation = useMutation({
        mutationFn: foldersApi.deleteFolder,
        onSuccess: () => notification.success({ message: "Folder deleted" }),
        async onSettled() {
            await queryClient.invalidateQueries(
                foldersApi.getFoldersListQueryOptions()
            );
        },
    });

    return {
        handleDelete: deleteFolderMutation.mutate,
        isPending: deleteFolderMutation.isPending,
    };
}

