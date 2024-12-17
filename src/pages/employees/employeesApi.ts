import { API } from "../../api/api-instance";
import { queryOptions } from "@tanstack/react-query";
import { EmployeeDTO } from "../../types";

export enum EmployeesApi {
  employees = "/api/v0.01/vms/cms/employees",
  list = "/api/v0.01/vms/cms/employees/list",
}

export const employeesApi = {
  baseKey: "employees",

  getEmployeesListQueryOptions: (params?: { pageSize?: number; currentPage?: number }) => {
    const url = EmployeesApi.list;
    const skip = params?.currentPage ? (params.currentPage - 1) * (params?.pageSize || 10) : 0;
    const take = params?.pageSize || 10;

    return queryOptions({
      queryKey: [employeesApi.baseKey, "list", params],
      queryFn: (meta) => API.post(url, { 
        requireTotalCount: true,
        signal: meta?.signal,
        skip,
        take,
      }),
    });
  },

  getEmployeeQueryOptions: (id: string) => {
    const url = EmployeesApi.employees + "/" + id;

    return queryOptions({
      queryKey: [employeesApi.baseKey, id],
      queryFn: (meta) => API.get(url, { signal: meta?.signal }),
    });
  },

  createEmployee: (data: EmployeeDTO) => API.post(EmployeesApi.employees, data),

  updateEmployee: ({ data, id }: { data: EmployeeDTO; id: string }) => {
    const url = EmployeesApi.employees + "/" + id;

    return API.put(url, data);
  },

  deleteEmployee: (id: string) => {
    const url = EmployeesApi.employees + "/" + id;

    return API.delete(url);
  },
};
