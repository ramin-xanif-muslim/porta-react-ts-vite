import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "./rolesApi";
import { notification } from "antd";
import { t } from "i18next";
import { CreateRole } from "../types";

export function useCreateRole(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createRoleMutation = useMutation<
    Record<string, string>,
    Error,
    CreateRole
  >({
    mutationFn: async (data) => {
      const response = await rolesApi.createRole(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Role created") });
    },
    onError: () => notification.error({ message: t("Error creating role") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [rolesApi.baseKey],
      });
    },
  });

  return createRoleMutation;
}
