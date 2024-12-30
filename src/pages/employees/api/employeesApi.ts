import { queryOptions } from "@tanstack/react-query";
import { API } from "../../../api/api-instance";
import { Employee } from "../types";
import { BaseQueryParams, SortOption } from "../../../types/query-params";

export enum EmployeesApi {
  employees = "/api/v0.01/vms/cms/employees",
  list = "/api/v0.01/vms/cms/employees/list",
  lookup = "/api/v0.01/vms/lookups/employees",
}

export const employeesApi = {
  baseKey: "employees",

  getEmployeesListQueryOptions: (params?: {
    pageSize?: number;
    currentPage?: number;
    sort?: SortOption[];
  }) => {
    const url = EmployeesApi.list;
    const skip = params?.currentPage
      ? (params.currentPage - 1) * (params?.pageSize || 10)
      : 0;
    const take = params?.pageSize || 10;

    return queryOptions({
      queryKey: [employeesApi.baseKey, "list", params],
      queryFn: (meta) =>
        API.post(url, {
          requireTotalCount: true,
          signal: meta?.signal,
          skip,
          take,
          sort: params?.sort,
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
  
  getEmployeesList: (params?: BaseQueryParams) => {
    return API.post(EmployeesApi.list, params);
  },

  createEmployee: (data: Employee) => API.post(EmployeesApi.employees, data),

  updateEmployee: ({ data, id }: { data: Employee; id: string }) => {
    const url = EmployeesApi.employees + "/" + id;

    return API.put(url, data);
  },

  deleteEmployee: (id: string) => {
    const url = EmployeesApi.employees + "/" + id;

    return API.delete(url);
  },

  getLookupEmployee: (data = {}) => API.post(EmployeesApi.lookup, data),
};
