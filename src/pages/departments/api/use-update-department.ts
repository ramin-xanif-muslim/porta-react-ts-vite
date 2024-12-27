import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { UpdateDepartment } from "../types";
import { departmentsApi } from "./departmentsApi";

export function useUpdateDepartment(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateDepartmentMutation = useMutation<void, Error, UpdateDepartment>({
    mutationFn: async (data) => {
      await departmentsApi.updateDepartment({ data, id: data.id });
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Department updated") });
    },
    onError: () =>
      notification.error({ message: t("Error updating department") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        departmentsApi.getDepartmentsListQueryOptions(),
      );
    },
  });

  return updateDepartmentMutation;
}
