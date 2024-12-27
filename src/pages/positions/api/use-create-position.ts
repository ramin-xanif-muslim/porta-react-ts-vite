import { useMutation, useQueryClient } from "@tanstack/react-query";
import { positionsApi } from "./positionsApi";
import { notification } from "antd";
import { t } from "i18next";
import { CreatePosition } from "../types";

export function useCreatePosition(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createPositionMutation = useMutation<
    Record<string, string>,
    Error,
    CreatePosition
  >({
    mutationFn: async (data) => {
      const response = await positionsApi.createPosition(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Position created") });
    },
    onError: () =>
      notification.error({ message: t("Error creating position") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        positionsApi.getPositionsListQueryOptions(),
      );
    },
  });

  return createPositionMutation;
}
