import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";

export const useGetLookupEmployee = () => {
  return useQuery({
    queryKey: [employeesApi.baseKey, "lookup"],
    queryFn: employeesApi.getLookupEmployee,
  });
};
