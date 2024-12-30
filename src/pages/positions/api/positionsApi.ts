import { queryOptions } from "@tanstack/react-query";
import { API } from "../../../api/api-instance";
import { CreatePosition, UpdatePosition } from "../types";
import { BaseQueryParams } from "../../../types/query-params";

export enum PositionsApi {
  positions = "/api/v0.01/vms/cms/positions",
  list = "/api/v0.01/vms/cms/positions/list",
  lookup = "/api/v0.01/vms/lookups/positions",
}

export const positionsApi = {
  baseKey: "positions",

  getPositionsListQueryOptions: (params?: {
    pageSize?: number;
    currentPage?: number;
  }) => {
    const url = PositionsApi.list;
    const skip = params?.currentPage
      ? (params.currentPage - 1) * (params?.pageSize || 10)
      : 0;
    const take = params?.pageSize || 10;

    return queryOptions({
      queryKey: [positionsApi.baseKey, "list", params],
      queryFn: (meta) =>
        API.post(url, {
          requireTotalCount: true,
          signal: meta?.signal,
          skip,
          take,
        }),
    });
  },

  getPositionQueryOptions: (id: string) => {
    const url = PositionsApi.positions + "/" + id;

    return queryOptions({
      queryKey: [positionsApi.baseKey, id],
      queryFn: (meta) => API.get(url, { signal: meta?.signal }),
    });
  },

  getPositionsList: (params?: BaseQueryParams) => {
    return API.post(PositionsApi.list, params);
  },

  createPosition: (data: CreatePosition) =>
    API.post(PositionsApi.positions, data),

  updatePosition: (data: UpdatePosition) => {
    const url = PositionsApi.positions + "/" + data.id;

    return API.put(url, data);
  },

  deletePosition: (id: string) => {
    const url = PositionsApi.positions + "/" + id;

    return API.delete(url);
  },

  getLookupPositions: (data = {}) => API.post(PositionsApi.lookup, data),
};
