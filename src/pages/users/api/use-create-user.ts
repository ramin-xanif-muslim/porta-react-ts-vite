import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "./usersApi";
import { notification } from "antd";
import { t } from "i18next";
import { User } from "../types";

export function useCreateUser(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation<Record<string, string>, Error, User>({
    mutationFn: async (data) => {
      const response = await usersApi.createUser(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("User created") });
    },
    onError: () => notification.error({ message: t("Error creating user") }),
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [usersApi.baseKey, "list"],
      });
    },
  });

  return createUserMutation;
}
