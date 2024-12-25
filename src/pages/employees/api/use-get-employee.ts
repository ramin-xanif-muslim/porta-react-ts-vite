import { useQuery } from "@tanstack/react-query";

import { employeesApi } from "./employeesApi";

export const useGetEmployee = (id: string) => {
  return useQuery({
    ...employeesApi.getEmployeeQueryOptions(id),
    enabled: Boolean(id),
  });
}; 