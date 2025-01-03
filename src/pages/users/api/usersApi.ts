import { API } from "../../../api/api-instance";
import { User } from "../types";
import { BaseQueryParams } from "../../../types/query-params";

export enum UsersApi {
  users = "/api/v0.01/vms/cms/users",
  list = "/api/v0.01/vms/cms/users/list",
  lookup = "/api/v0.01/vms/lookups/users",
}

export const usersApi = {
  baseKey: "users",

  getUsersList: (params?: BaseQueryParams) => {
    return API.post(UsersApi.list, params);
  },

  getUser: (id: string) => {
    const url = UsersApi.users + "/" + id;

    return API.get(url);
  },

  createUser: (data: User) => API.post(UsersApi.users, data),

  updateUser: ({ data, id }: { data: User; id: string }) => {
    const url = UsersApi.users + "/" + id;

    return API.put(url, data);
  },

  deleteUser: (id: string) => {
    const url = UsersApi.users + "/" + id;

    return API.delete(url);
  },

  getLookupUser: (data = {}) => API.post(UsersApi.lookup, data),
};
