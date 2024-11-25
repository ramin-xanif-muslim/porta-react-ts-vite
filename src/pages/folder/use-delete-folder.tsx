import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";

export function useDeleteFolder() {
    const queryClient = useQueryClient();

    const deleteFolderMutation = useMutation({
        mutationFn: foldersApi.deleteFolder,
        async onSettled() {
            await queryClient.invalidateQueries(
                foldersApi.getFoldersListQueryOptions()
            );
        },
    });

    // const handleDelete = ({
    //     id,
    //     parentId,
    // }: {
    //     name: string;
    //     parentId?: string;
    // }) => {
    //     deleteFolderMutation.mutate({ name, parentId });
    // };

    return {
        handleDelete: deleteFolderMutation.mutate,
        isPending: deleteFolderMutation.isPending,
    };
}
