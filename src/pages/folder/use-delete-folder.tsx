import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { notification } from "antd";

export function useDeleteFolder(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    const deleteFolderMutation = useMutation({
        mutationFn: foldersApi.deleteFolder,
        onSuccess: async () => {
            notification.success({ message: "Folder deleted" })
            onSuccessCallback?.()
        },
        onError: () => notification.error({ message: "Error deleting folder" }),
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

