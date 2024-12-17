import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";
import { notification } from "antd";
import { t } from "i18next";
import { EmployeeDTO } from "../../types";

export function useCreateEmployee(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createEmployeeMutation = useMutation<
    Record<string, string>,
    Error,
    EmployeeDTO
  >({
    mutationFn: async (data) => {
      const response = await employeesApi.createEmployee(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Employee created") });
    },
    onError: () =>
      notification.error({ message: t("Error creating employee") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        employeesApi.getEmployeesListQueryOptions(),
      );
    },
  });

  return createEmployeeMutation;
}
