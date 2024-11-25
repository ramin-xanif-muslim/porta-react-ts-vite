import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";

export function useCreateFolder({ id }: { id?: string }) {
    const queryClient = useQueryClient();

    const createFolderMutation = useMutation({
        mutationFn: foldersApi.createFolder,
        async onSettled() {
            await queryClient.invalidateQueries(
                foldersApi.getFolderListByIdQueryOptions({ folderId: id })
            );
        },
    });

    const handleCreate = ({
        name,
        parentId,
    }: {
        name: string;
        parentId?: string;
    }) => {
        createFolderMutation.mutate({ name, parentId });
    };

    return {
        handleCreate,
        isPending: createFolderMutation.isPending,
    };
}
