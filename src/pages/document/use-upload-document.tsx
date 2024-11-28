import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { documentsApi } from "./documentsApi";
import { useParams } from "react-router-dom";

export function useUploadDocument() {
    const queryClient = useQueryClient();
    const { id } = useParams();

    const uploadDocumentMutation = useMutation({
        mutationFn: documentsApi.uploadDocument,
        onSuccess: () => {
            notification.success({ message: "Document created" })
        },
        onError: () => notification.error({ message: "Error creating document" }),
        async onSettled() {
            await queryClient.invalidateQueries(
                documentsApi.getDocumentsListQueryOptions({ folderId: id || "1" })
            );
        },
    });

    const handleCreate = async ({
        file,
    }: {
        file: File;
    }) => {
        if (!id) return;
        uploadDocumentMutation.mutate({ file, folderId: id });
    };

    return {
        handleCreate,
        isPending: uploadDocumentMutation.isPending,
    };
}
