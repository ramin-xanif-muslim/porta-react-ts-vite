import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { documentsApi } from "./documentsApi";

export function useUploadNewVersion({folderId}: {folderId: string}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: documentsApi.uploadNewVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [documentsApi.baseKey],
            })
        },
        onError: () => notification.error({ message: t("Error creating document") }),
        async onSettled() {
            await queryClient.invalidateQueries(
                documentsApi.getDocumentsListQueryOptions({ folderId })
            );
        },
    });
}

