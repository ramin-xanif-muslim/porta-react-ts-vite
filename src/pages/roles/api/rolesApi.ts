import { API } from "../../../api/api-instance";
import { BaseQueryParams } from "../../../types/query-params";
import { Role } from "../types";

export enum RolesApi {
  roles = "/api/v0.01/vms/cms/roles",
  list = "/api/v0.01/vms/cms/roles/list",
  lookup = "/api/v0.01/vms/lookups/roles",
}

export const rolesApi = {
  baseKey: "roles",

  getRolesList: (params?: BaseQueryParams) => {
    return API.post(RolesApi.list, params);
  },

  getRole: (id: string) => {
    const url = RolesApi.roles + "/" + id;
    return API.get(url);
  },

  createRole: (data: Role) => API.post(RolesApi.roles, data),

  updateRole: ({ data, id }: { data: Role; id: string }) => {
    const url = RolesApi.roles + "/" + id;
    return API.put(url, data);
  },

  deleteRole: (id: string) => {
    const url = RolesApi.roles + "/" + id;
    return API.delete(url);
  },

  getLookupRole: (data = {}) => API.post(RolesApi.lookup, data),
};
