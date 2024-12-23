import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";
import { notification } from "antd";
import { t } from "i18next";
import { EmployeeDTO } from "../../../types";

export function useUpdateEmployee(id: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const updateEmployeeMutation = useMutation<void, Error, EmployeeDTO>({
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
