import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { documentsApi } from "./documentsApi";

export function useUploadFile({folderId}: {folderId: string}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: documentsApi.uploadFile,
        onSuccess: () => {},
        onError: () => {
            notification.destroy("uploadFile");
            notification.error({ message: t("Error uploading file") })
        },
        async onSettled() {
            await queryClient.invalidateQueries(
                documentsApi.getDocumentsListQueryOptions({ folderId })
            );
        },
    });
}

