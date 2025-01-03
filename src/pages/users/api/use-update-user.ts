import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { User } from "../types";
import { usersApi } from "./usersApi";

export function useUpdateUser(id: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<void, Error, User>({
    mutationFn: async (data) => {
      await usersApi.updateUser({ id, data });
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("User updated") });
    },
    onError: () => notification.error({ message: t("Error updating user") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [usersApi.baseKey],
      });
    },
  });

  return updateUserMutation;
}
