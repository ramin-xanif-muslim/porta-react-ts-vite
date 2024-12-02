import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { notification } from "antd";
import { t } from "i18next";

export function useUpdateFolder() {
    const queryClient = useQueryClient();

    const updateFolderMutation = useMutation({
        mutationFn: foldersApi.updateFolder,

        onSuccess: () => notification.success({ message: t("Folder updated") }),
        
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
