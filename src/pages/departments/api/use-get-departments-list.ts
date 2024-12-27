import { useQuery } from "@tanstack/react-query";
import { Department } from "../types";
import { departmentsApi } from "./departmentsApi";

interface UseGetDepartmentsListParams {
  pageSize: number;
  currentPage: number;
}

interface DepartmentsListResponse {
  departments: Department[];
  total: number;
  isLoading: boolean;
}

export const useGetDepartmentsList = ({
  pageSize,
  currentPage,
}: UseGetDepartmentsListParams): DepartmentsListResponse => {
  const query = useQuery({
    ...departmentsApi.getDepartmentsListQueryOptions({
      pageSize,
      currentPage,
    }),
  });

  return {
    ...query,
    departments: query.data?.data.list ?? [],
    total: query.data?.data.totalCount ?? 0,
  };
};
