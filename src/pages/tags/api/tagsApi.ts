import { API } from "../../../api/api-instance";
import { BaseQueryParams } from "../../../types/query-params";
import { Tag } from "../types";

export enum TagsApi {
  tags = "/api/v0.01/vms/dms/tags",
  list = "/api/v0.01/vms/dms/tags/list",
  lookup = "/api/v0.01/vms/lookups/tags",
}

export const tagsApi = {
  baseKey: "tags",

  getTagsList: (params?: BaseQueryParams) => {
    return API.post(TagsApi.list, params);
  },

  getTag: (id: string) => {
    const url = TagsApi.tags + "/" + id;
    return API.get(url);
  },

  createTag: (data: Tag) => API.post(TagsApi.tags, data),

  updateTag: ({ data, id }: { data: Tag; id: string }) => {
    const url = TagsApi.tags + "/" + id;
    return API.put(url, data);
  },

  deleteTag: (id: string) => {
    const url = TagsApi.tags + "/" + id;
    return API.delete(url);
  },

  getLookupTag: (data = {}) => API.post(TagsApi.lookup, data),
};
