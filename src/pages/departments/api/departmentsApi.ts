import { queryOptions } from "@tanstack/react-query";

import { API } from "../../../api/api-instance";
import { CreateDepartment, UpdateDepartment } from "../types";

export enum DepartmentsApi {
  departments = "/api/v0.01/vms/cms/departments",
  list = "/api/v0.01/vms/cms/departments/list",
  lookup = "/api/v0.01/vms/lookups/departments",
}

export const departmentsApi = {
  baseKey: "departments",

  getDepartmentsListQueryOptions: (params?: {
    pageSize?: number;
    currentPage?: number;
  }) => {
    const url = DepartmentsApi.list;
    const skip = params?.currentPage
      ? (params.currentPage - 1) * (params?.pageSize || 10)
      : 0;
    const take = params?.pageSize || 10;

    return queryOptions({
      queryKey: [departmentsApi.baseKey, "list", params],
      queryFn: (meta) =>
        API.post(url, {
          requireTotalCount: true,
          signal: meta?.signal,
          skip,
          take,
        }),
    });
  },

  getDepartmentQueryOptions: (id: string) => {
    const url = DepartmentsApi.departments + "/" + id;

    return queryOptions({
      queryKey: [departmentsApi.baseKey, id],
      queryFn: (meta) => API.get(url, { signal: meta?.signal }),
    });
  },

  createDepartment: (data: CreateDepartment) =>
    API.post(DepartmentsApi.departments, data),

  updateDepartment: ({ data, id }: { data: UpdateDepartment; id: string }) => {
    const url = DepartmentsApi.departments + "/" + id;

    return API.put(url, data);
  },

  deleteDepartment: (id: string) => {
    const url = DepartmentsApi.departments + "/" + id;

    return API.delete(url);
  },

  getLookupDepartments: (data = {}) => API.post(DepartmentsApi.lookup, data),
};
