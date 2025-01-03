import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { UpdateRole } from "../types";
import { rolesApi } from "./index";

export function useUpdateRole(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateRoleMutation = useMutation<void, Error, UpdateRole>({
    mutationFn: async (data) => {
      await rolesApi.updateRole({ data, id: data.id });
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Role updated") });
    },
    onError: () => notification.error({ message: t("Error updating role") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [rolesApi.baseKey],
      });
    },
  });

  return updateRoleMutation;
}
