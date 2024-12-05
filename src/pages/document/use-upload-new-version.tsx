import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { documentsApi } from "./documentsApi";
import { t } from "i18next";

export function useUploadNewVersion({folderId}: {folderId: string}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: documentsApi.uploadNewVersion,
        onSuccess: () => {},
        onError: () => notification.error({ message: t("Error creating document") }),
        async onSettled() {
            await queryClient.invalidateQueries(
                documentsApi.getDocumentsListQueryOptions({ folderId })
            );
        },
    });
}

