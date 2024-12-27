import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "./departmentsApi";
import { notification } from "antd";
import { t } from "i18next";
import { CreateDepartment } from "../types";

export function useCreateDepartment(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  const createDepartmentMutation = useMutation<
    Record<string, string>,
    Error,
    CreateDepartment
  >({
    mutationFn: async (data) => {
      const response = await departmentsApi.createDepartment(data);
      return { ...response.data, id: response.data };
    },
    onSuccess: async (data) => {
      onSuccessCallback?.(data.id);
      notification.success({ message: t("Department created") });
    },
    onError: () =>
      notification.error({ message: t("Error creating department") }),
    async onSettled() {
      await queryClient.invalidateQueries(
        departmentsApi.getDepartmentsListQueryOptions(),
      );
    },
  });

  return createDepartmentMutation;
}
