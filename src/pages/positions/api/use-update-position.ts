import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { UpdatePosition } from "../types";
import { positionsApi } from "./positionsApi";

export function useUpdatePosition(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updatePositionMutation = useMutation<void, Error, UpdatePosition>({
    mutationFn: async (data) => {
      await positionsApi.updatePosition(data);
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Position updated") });
    },
    onError: () =>
      notification.error({ message: t("Error updating position") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        positionsApi.getPositionsListQueryOptions(),
      );
    },
  });

  return updatePositionMutation;
}
