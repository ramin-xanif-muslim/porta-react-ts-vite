import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

import { Employee } from "../types";
import { employeesApi } from "./employeesApi";

export function useUpdateEmployee(id: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateEmployeeMutation = useMutation<void, Error, Employee>({
    mutationFn: async (data) => {
      await employeesApi.updateEmployee({ id, data });
    },
    onSuccess: () => {
      onSuccessCallback?.();
      notification.success({ message: t("Employee updated") });
    },
    onError: () =>
      notification.error({ message: t("Error updating employee") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        employeesApi.getEmployeesListQueryOptions(),
      );
    },
  });

  return updateEmployeeMutation;
}
