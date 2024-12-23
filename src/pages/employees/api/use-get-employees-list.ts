import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "./employeesApi";

export const useGetEmployeesList = (params?: { pageSize?: number; currentPage?: number }) => {
  const query = useQuery({
    ...employeesApi.getEmployeesListQueryOptions(params),
  });

  return {
    ...query,
    employees: query.data?.data.list || [],
    total: query.data?.data.totalCount || 0,
  };
};
