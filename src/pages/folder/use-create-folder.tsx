import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { notification } from "antd";

export function useCreateFolder() {
    const queryClient = useQueryClient();

    const createFolderMutation = useMutation({
        mutationFn: foldersApi.createFolder,
        onSuccess: () => notification.success({ message: "Folder created" }),
        async onSettled() {
            await queryClient.invalidateQueries(
                foldersApi.getFoldersListQueryOptions()
            );
        },
    });

    const handleCreate = async ({
        name,
        parentId,
    }: {
        name: string;
        parentId?: string;
    }) => {
       const resp = await createFolderMutation.mutate({ name, parentId });

       console.log(resp)
    };

    return {
        handleCreate,
        isPending: createFolderMutation.isPending,
    };
}
