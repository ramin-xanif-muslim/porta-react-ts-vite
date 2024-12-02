import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { documentsApi } from "./documentsApi";
import { t } from "i18next";

export function useUploadDocument({folderId}: {folderId: string}) {
    const queryClient = useQueryClient();

    const uploadDocumentMutation = useMutation({
        mutationFn: documentsApi.uploadDocument,
        onSuccess: () => {},
        onError: () => notification.error({ message: t("Error creating document") }),
        async onSettled() {
            await queryClient.invalidateQueries(
                documentsApi.getDocumentsListQueryOptions({ folderId })
            );
        },
    });

    const handleCreate = async ({
        file,
    }: {
        file: File;
    }) => {
        if(!folderId) {
            console.log("folderId not found");
            return 
        }
        uploadDocumentMutation.mutate({ file, folderId });
    };

    return {
        handleCreate,
        isPending: uploadDocumentMutation.isPending,
    };
}

