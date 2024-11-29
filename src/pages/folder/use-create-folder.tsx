import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foldersApi } from "./api";
import { notification } from "antd";

export function useCreateFolder(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createFolderMutation = useMutation({
    mutationFn: foldersApi.createFolder,
    onSuccess: async (data: Record<string, string>) => {
      onSuccessCallback?.(data.data);
      notification.success({ message: "Folder created" });
    },
    onError: () => notification.error({ message: "Error creating folder" }),
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
  }) => createFolderMutation.mutate({ name, parentId });

  return {
    handleCreate,
    isPending: createFolderMutation.isPending,
  };
}
