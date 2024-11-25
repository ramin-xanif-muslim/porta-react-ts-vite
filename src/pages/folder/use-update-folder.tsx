import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";

export function useUpdateFolder() {
    const queryClient = useQueryClient();

    const updateFolderMutation = useMutation({
        mutationFn: foldersApi.updateFolder,
        async onSettled() {
            await queryClient.invalidateQueries(
                foldersApi.getFoldersListQueryOptions()
            );
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
        updateFolderMutation.mutate({ id, name, parentId });
    };

    return {
        handleUpdate,
        isPending: updateFolderMutation.isPending,
    };
}
